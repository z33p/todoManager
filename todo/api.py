from rest_framework import viewsets, permissions
from .serializers import TodoSerializer
from .models import Todo


# Todo viewset
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TodoSerializer
