from rest_framework import serializers
from .models import Topic, Lesson

class LessonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'slug', 'difficulty', 'order']

class LessonDetailSerializer(serializers.ModelSerializer):
    topic_title = serializers.CharField(source='topic.title', read_only=True)
    topic_slug = serializers.CharField(source='topic.slug', read_only=True)

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'slug', 'content', 'code_example',
                  'difficulty', 'order', 'topic_title', 'topic_slug']

class TopicSerializer(serializers.ModelSerializer):
    lessons = LessonListSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'title', 'slug', 'description', 'icon', 'order', 'lessons']
