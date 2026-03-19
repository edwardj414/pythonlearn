from django.urls import path
from . import views

urlpatterns = [
    path('topics/', views.TopicListView.as_view(), name='topic-list'),
    path('topics/<slug:slug>/', views.TopicDetailView.as_view(), name='topic-detail'),
    path('topics/<slug:topic_slug>/lessons/<slug:lesson_slug>/',
         views.LessonDetailView.as_view(), name='lesson-detail'),
    path('search/', views.SearchView.as_view(), name='search'),
    path('run/', views.RunCodeView.as_view(), name='run-code'),
    path('topics/<slug:topic_slug>/lessons/<slug:lesson_slug>/quiz/',views.QuizDetailView.as_view(), name='quiz-detail'),
]
