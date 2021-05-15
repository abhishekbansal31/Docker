from django.http.response import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views import View

from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import user
from .serializers import UserSerializer
# Create your views here.

class Demo(View) :
          def get(self, request):
                    return render(request, "home.html",{'name':'Abhishek'})
#                    return HttpResponse("<div>Hello</div></br><h1><b>Aditi Aggarwal</b></h1>")

class UsersList(APIView):
          def get(self, request, format=None):
                    """
                    All users
                    """
                    users = user.objects.all()
                    serializer = UserSerializer(users, many=True)
                    return Response(serializer.data)

          def post(self, request, format=None):
                    """
                    Create a user
                    """
                    serializer = UserSerializer(data=request.data)
                    if serializer.is_valid():
                              serializer.save()
                              return Response(serializer.data, status=status.HTTP_201_CREATED)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''
class UsersList(generics.ListAPIView):
          """
          View all users
          """
          queryset = user.objects.all()
          serializer_class = UserSerializer

class UsersList(generics.ListCreateAPIView):
          """
          List and creates users.
          """
          queryset = user.objects.all()
          serializer_class = UserSerializer
'''

class UserDetail(APIView) :

          def getUserDetail(self, user_id):
                    try:
                              return user.objects.get(id=user_id)
                    except:
                              raise Http404

          def get(self, request, user_id, format=None):
                    user = self.getUserDetail(user_id)
                    serializer = UserSerializer(user)
                    return Response(serializer.data)

          def put(self, request, user_id, format=None):
                    user = self.getUserDetail(user_id)
                    serializer = UserSerializer(user, data=request.data)
                    if serializer.is_valid():
                              serializer.save()
                              return Response(serializer.data)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
          def delete(self, request, user_id, format=None):
                    user = self.getUserDetail(user_id)
                    user.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)