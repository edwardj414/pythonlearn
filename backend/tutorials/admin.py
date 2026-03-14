from django.contrib import admin
from .models import Topic, Lesson

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['icon', 'title', 'slug', 'order']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['order']

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'topic', 'difficulty', 'order']
    list_filter = ['topic', 'difficulty']
    search_fields = ['title', 'content']
    ordering = ['topic__order', 'order']
