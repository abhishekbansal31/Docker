#Stage 1: We are copying our app code in the "app" folder and installing app dependencies from requirements.txt file 
#         and running server from the command given in docker-compose.yml command.
FROM python:3 AS build-step
ENV PYTHONUNBUFFERED=1

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy backend dependencies.
COPY requirements.txt /app

# Install backend dependencies.
RUN pip install -r requirements.txt

# Copy app files.
COPY . /app/