from rest_framework import routers
from .api import TodoViewSet

router = routers.DefaultRouter()
router.register('todo', TodoViewSet, 'todo')

urlpatterns = router.urls
