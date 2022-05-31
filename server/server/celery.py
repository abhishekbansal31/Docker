import os
from celery import Celery
from server.settings import REDIS_LOCATION

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
app = Celery('server', broker_url=REDIS_LOCATION)
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r} ')