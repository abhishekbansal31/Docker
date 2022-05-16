from celery import shared_task

@shared_task()
def add(number1, number2):
    print(number1 + number2)