from django.core.cache.backends.base import DEFAULT_TIMEOUT

from django.utils.decorators import method_decorator
from django.views.decorators.vary import vary_on_cookie
from django.views.decorators.cache import cache_page

# from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from auth_app.models import User

import server.settings as settings 
# Create your views here.

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
class restricted(APIView):
    permission_classes = ( IsAuthenticated, )

    @method_decorator(cache_page(CACHE_TTL))
    @method_decorator(vary_on_cookie)
    def get(self, request, format=None):
        # user = User.objects.get(pk=1)
        return Response(data='any message !!!!!!!!! ', status=status.HTTP_200_OK)