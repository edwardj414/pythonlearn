from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    email          = models.EmailField(unique=True)
    bio            = models.TextField(blank=True)
    avatar         = models.CharField(max_length=10, default='🐍')
    streak_days    = models.PositiveIntegerField(default=0)
    total_xp       = models.PositiveIntegerField(default=0)
    created_at     = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Topic(models.Model):
    title       = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    description = models.TextField()
    icon        = models.CharField(max_length=10, default='📘')
    order       = models.PositiveIntegerField(default=0)
    color       = models.CharField(max_length=20, default='yellow')

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

    @property
    def lesson_count(self):
        return self.lessons.count()


class Lesson(models.Model):
    DIFFICULTY_CHOICES = [
        ('beginner',     'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced',     'Advanced'),
    ]

    topic        = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='lessons')
    title        = models.CharField(max_length=200)
    slug         = models.SlugField()
    content      = models.TextField()
    code_example = models.TextField(blank=True)
    difficulty   = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    order        = models.PositiveIntegerField(default=0)
    xp_reward    = models.PositiveIntegerField(default=10)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        unique_together = ['topic', 'slug']

    def __str__(self):
        return f"{self.topic.title} — {self.title}"


class Quiz(models.Model):
    lesson      = models.OneToOneField(Lesson, on_delete=models.CASCADE, related_name='quiz')
    title       = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    xp_reward   = models.PositiveIntegerField(default=20)

    def __str__(self):
        return f"Quiz: {self.lesson.title}"


class Question(models.Model):
    QUESTION_TYPES = [
        ('mcq',     'Multiple Choice'),
        ('code',    'Code Output'),
        ('truefalse', 'True/False'),
    ]

    quiz          = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default='mcq')
    text          = models.TextField()
    code_snippet  = models.TextField(blank=True)
    option_a      = models.CharField(max_length=300)
    option_b      = models.CharField(max_length=300)
    option_c      = models.CharField(max_length=300, blank=True)
    option_d      = models.CharField(max_length=300, blank=True)
    correct       = models.CharField(max_length=1)  # 'a', 'b', 'c', 'd'
    explanation   = models.TextField(blank=True)
    order         = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Q{self.order}: {self.text[:50]}"


class LessonProgress(models.Model):
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson     = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress')
    completed  = models.BooleanField(default=False)
    xp_earned  = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'lesson']

    def __str__(self):
        return f"{self.user.email} — {self.lesson.title}"


class QuizAttempt(models.Model):
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_attempts')
    quiz       = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    score      = models.PositiveIntegerField(default=0)
    total      = models.PositiveIntegerField(default=0)
    passed     = models.BooleanField(default=False)
    xp_earned  = models.PositiveIntegerField(default=0)
    attempted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-attempted_at']

    @property
    def percentage(self):
        return round((self.score / self.total) * 100) if self.total else 0