# syntax=docker/dockerfile:1

FROM python:3.9.5-slim-buster

# set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1
ENV APP /app

RUN mkdir $APP
WORKDIR $APP

# Expose the port uWSGI will listen on
EXPOSE 5000

# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . .

# run entrypoint.sh
# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
CMD [ "uwsgi", "--ini", "app.ini" ]