from django.urls import path
from . import views

urlpatterns = [
    path('topics/', views.TopicListView.as_view(), name='topic-list'),
    path('topics/<slug:slug>/', views.TopicDetailView.as_view(), name='topic-detail'),
    path('topics/<slug:topic_slug>/lessons/<slug:lesson_slug>/',
         views.LessonDetailView.as_view(), name='lesson-detail'),
    path('search/', views.search, name='search'),
    path('run/', views.run_code, name='run-code'),
    path('topics/<slug:topic_slug>/lessons/<slug:lesson_slug>/quiz/',views.quiz_detail, name='quiz-detail'),
]
