from rest_framework import serializers
from .models import Topic, Lesson, Quiz, Question

# 1. NEW: Quiz & Question Serializers
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id', 'question_type', 'text', 'code_snippet', 
            'option_a', 'option_b', 'option_c', 'option_d', 
            'correct', 'explanation', 'order'
        ]

class QuizSerializer(serializers.ModelSerializer):
    # This automatically fetches all associated questions and nests them in the JSON
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'xp_reward', 'questions']


# 2. UPDATED: Lesson & Topic Serializers
class LessonListSerializer(serializers.ModelSerializer):
    # This dynamic field tells the React Sidebar if a quiz exists for this lesson
    has_quiz = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'slug', 'difficulty', 'order', 'has_quiz']

    def get_has_quiz(self, obj):
        # Checks if the OneToOne 'quiz' relationship exists on this lesson
        return hasattr(obj, 'quiz')

class LessonDetailSerializer(serializers.ModelSerializer):
    topic_title = serializers.CharField(source='topic.title', read_only=True)
    topic_slug = serializers.CharField(source='topic.slug', read_only=True)
    has_quiz = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'content', 'code_example',
            'difficulty', 'order', 'xp_reward', 'topic_title', 'topic_slug', 'has_quiz'
        ]
        
    def get_has_quiz(self, obj):
        return hasattr(obj, 'quiz')

class TopicSerializer(serializers.ModelSerializer):
    # Uses the updated LessonListSerializer that now includes 'has_quiz'
    lessons = LessonListSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        # Added 'color' here to match your updated models.py
        fields = ['id', 'title', 'slug', 'description', 'icon', 'color', 'order', 'lessons']
