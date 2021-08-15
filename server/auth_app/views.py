from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.

class restricted(APIView):
    permission_classes = ( IsAuthenticated, )

    def get(self, request, format=None):
        return Response(data='any message !!!!!!!!!', status=status.HTTP_200_OK)