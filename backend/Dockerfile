FROM python:3.9.4-slim as base

EXPOSE 8000

WORKDIR /app

ADD requirements.txt .
RUN pip install -r requirements.txt

# Add WordNet data
ADD ./data/wndb.tar.gz /app/data
ENV WN_DATA_PATH="/app/data"

# Copy source code
COPY ./src /app/src

# Development Base
FROM base as devbase
ADD requirements-dev.txt .
RUN pip install -r requirements-dev.txt

# Lint, Format, Tests
FROM devbase as test
RUN flake8 /app/src
RUN black /app/src --check
RUN pytest --cov=/app/src --cov-report=term --cov-report=html /app/src

# Development Server
FROM devbase as devserver
CMD exec gunicorn --reload --bind :8000 --workers 1 --threads 4 --timeout 0 --chdir /app/src server:app

# Production
FROM base as prod
CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 --chdir /app/src server:app
