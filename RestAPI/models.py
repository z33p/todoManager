from django.db import models

# Create your models here.
class Todo(models.Model):
    title       = models.CharField(max_length=120)
    description = models.CharField(max_length=200, blank=True)
    
    rangeOfPriority = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5)
    )

    priority    = models.IntegerField(choices=rangeOfPriority)
    completed   = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
