FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY ./requirements/requirements.txt ./requirements/requirements.txt
RUN pip install -r ./requirements/requirements.txt
RUN rm -rf ./requirements/

COPY squash /app
