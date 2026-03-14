import subprocess
import sys
import tempfile
import os

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Topic, Lesson, Quiz
from .serializers import TopicSerializer, LessonDetailSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

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
        return Lesson.objects.get(
            topic__slug=self.kwargs['topic_slug'],
            slug=self.kwargs['lesson_slug']
        )


@api_view(['GET'])
def search(request):
    query = request.GET.get('q', '')
    if not query:
        return Response([])
    lessons = Lesson.objects.filter(title__icontains=query).select_related('topic')[:10]
    results = [{'title': l.title, 'topic': l.topic.title,
                'url': f"/topic/{l.topic.slug}/{l.slug}"} for l in lessons]
    return Response(results)


@api_view(['POST'])
def run_code(request):
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

def quiz_detail(request, topic_slug, lesson_slug):
    quiz = get_object_or_404(
        Quiz,
        lesson__slug=lesson_slug,
        lesson__topic__slug=topic_slug
    )
    data = {
        "id": quiz.id,
        "title": quiz.title,
        "xp_reward": quiz.xp_reward,
        "questions": [
            {
                "id": q.id, "text": q.text,
                "type": q.question_type,
                "code_snippet": q.code_snippet,
                "option_a": q.option_a, "option_b": q.option_b,
                "option_c": q.option_c, "option_d": q.option_d,
                "correct": q.correct, "explanation": q.explanation,
            }
            for q in quiz.questions.order_by('order')
        ]
    }
    return JsonResponse(data)