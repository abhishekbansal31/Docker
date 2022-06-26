from django.shortcuts import render
from django.core.cache.backends.base import DEFAULT_TIMEOUT

from django.utils.decorators import method_decorator
from django.views.decorators.vary import vary_on_cookie
from django.views.decorators.cache import cache_page

# from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .models import XYZ

import server.settings as settings

from auth_app.tasks import add as task_add
from server.celery import debug_task

# Create your views here.

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
class home(APIView):
    permission_classes = ( IsAuthenticated, )

    # @method_decorator(cache_page(CACHE_TTL))  # cache the request and take response form cache, ttl = cache_ttl
    @method_decorator(vary_on_cookie)
    def get(self, request, format=None):
        debug_task.delay()
        task_add.delay(5, 7)
        return Response(data='any mesage !!!!!!!!! ', status=status.HTTP_200_OK)