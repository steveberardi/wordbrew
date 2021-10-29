FROM python:3.9.4-slim as base

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Extract WordNet database
ENV WN_DATA_PATH="/app/data"
RUN tar -xvzf data/wndb.tar.gz -C $WN_DATA_PATH

# Development Base
FROM base as devbase
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
