import subprocess
import sys
import tempfile
import os
import json
import base64
import hashlib

from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer    
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

from .models import Topic, Lesson, Quiz
from .serializers import TopicSerializer, LessonDetailSerializer, QuizSerializer


# --- AES ENCRYPTION UTILITY ---
# --- AES ENCRYPTION UTILITY ---
def encrypt_payload(data):
    # 1. Get the raw string
    raw_key = getattr(settings, 'AES_SECRET_KEY', 'x9P!mQ2v$L8zT#wY5kR@bN7cX4jH1fG6')
    
    # 2. MUST use .digest() (not .hexdigest()) to get exactly 32 raw bytes
    key = hashlib.sha256(raw_key.encode('utf-8')).digest()

    # 3. Use DRF's JSONRenderer instead of json.dumps. 
    # This safely converts the DRF data directly into a bytes object!
    json_bytes = JSONRenderer().render(data)
    
    # 4. Pad and Encrypt
    padded_data = pad(json_bytes, AES.block_size)
    cipher = AES.new(key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(padded_data)

    return {
        'iv': base64.b64encode(cipher.iv).decode('utf-8'),
        'ciphertext': base64.b64encode(ct_bytes).decode('utf-8'),
    }
# --- READ-ONLY TOPIC & LESSON VIEWS ---
class TopicListView(generics.ListAPIView):
    queryset = Topic.objects.prefetch_related('lessons').all()
    serializer_class = TopicSerializer


class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.prefetch_related('lessons').all()
    serializer_class = TopicSerializer
    lookup_field = 'slug'


class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.select_related('topic').all()
    serializer_class = LessonDetailSerializer

    def get_object(self):
        return get_object_or_404(
            Lesson,
            topic__slug=self.kwargs['topic_slug'],
            slug=self.kwargs['lesson_slug']
        )


# --- REFACTORED: SEARCH APIVIEW ---
class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('q', '')
        if not query:
            return Response([])

        lessons = Lesson.objects.filter(title__icontains=query).select_related('topic')[:10]
        results = [
            {
                'title': l.title,
                'topic': l.topic.title,
                'url': f"/topic/{l.topic.slug}/{l.slug}"
            } for l in lessons
        ]
        return Response(results)


# --- REFACTORED: COMPILER APIVIEW ---
class RunCodeView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', '')
        if not code.strip():
            return Response({'stdout': '', 'stderr': 'No code provided.', 'code': 1})

        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile(
                    mode='w', suffix='.py', delete=False, encoding='utf-8'
            ) as f:
                f.write(code)
                tmp_path = f.name

            result = subprocess.run(
                [sys.executable, tmp_path],
                capture_output=True,
                text=True,
                encoding='utf-8',
                timeout=10,
                env={**os.environ, 'PYTHONIOENCODING': 'utf-8'},
            )
            return Response({
                'stdout': result.stdout,
                'stderr': result.stderr,
                'code': result.returncode,
            })
        except subprocess.TimeoutExpired:
            return Response({'stdout': '', 'stderr': 'Error: Timed out (10s limit).', 'code': 1})
        except Exception as e:
            return Response({'stdout': '', 'stderr': str(e), 'code': 1})
        finally:
            if tmp_path:
                try:
                    os.unlink(tmp_path)
                except Exception:
                    pass


# --- REFACTORED & ENCRYPTED: QUIZ DETAIL APIVIEW ---
class QuizDetailView(generics.RetrieveAPIView):
    serializer_class = QuizSerializer

    def get_object(self):
        print(f"[QUIZ] KEY='{raw_key}' SHA256={sha}")
        return get_object_or_404(
            Quiz,
            lesson__slug=self.kwargs['lesson_slug'],
            lesson__topic__slug=self.kwargs['topic_slug']
        )

    def retrieve(self, request, *args, **kwargs):
        import hashlib

        # DEBUG — check what key is actually being used
        raw_key = getattr(settings, 'AES_SECRET_KEY', 'FALLBACK_NOT_SET')
        sha = hashlib.sha256(raw_key.encode()).hexdigest()
        print(f"[QUIZ] KEY='{raw_key}' SHA256={sha}")
        # 1. Get the standard quiz object using DRF
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # 2. Encrypt the serialized data to prevent cheating
        encrypted_data = encrypt_payload(serializer.data)

        # 3. Return the encrypted payload
        return Response(encrypted_data)
