from django.http.response import HttpResponseRedirect

def demo(request):
          return HttpResponseRedirect("/api/users/demo")

def login(request):
          return HttpResponseRedirect("/api/users/demo")

def logout(request):
          return HttpResponseRedirect("/api/users/demo")

def register(request):
          return HttpResponseRedirect("/api/users/demo")