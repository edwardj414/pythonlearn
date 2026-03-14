from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok", "service": "PythonLearn API"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tutorials.urls')),
    path('health/', health),
]
