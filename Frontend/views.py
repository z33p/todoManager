from django.shortcuts import render

# Create your views here.
def index(request):
    template_path = 'Frontend/index.html'
    return render(request, template_path)
