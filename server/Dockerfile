FROM python:3 AS build-step
ENV PYTHONUNBUFFERED=1

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY requirements.txt /app

# Install app dependencies.
RUN pip install -r requirements.txt

# Copy app files.
COPY . /app/