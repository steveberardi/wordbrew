FROM python:3.8.5-slim as base

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Download WordNet database
ENV WN_DATA_PATH="/tmp"
RUN python loadwn.py

FROM base as dev
RUN pip install -r requirements-dev.txt
CMD exec gunicorn --bind :8000 --workers 1 --threads 4 --timeout 0 server:app


FROM base as prod
CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 server:app
