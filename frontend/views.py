from django.shortcuts import render

# Create your views here.
def index(request):
    template_path = 'frontend/index.html'
    return render(request, template_path)
