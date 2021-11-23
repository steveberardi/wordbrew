FROM python:3.9.4-slim as base

EXPOSE 8000

WORKDIR /app

# Add WordNet data
ADD ./data/wndb.tar.gz /app/data
ENV WN_DATA_PATH="/app/data"

COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy source code
COPY ./src /app/src

# Development Base
FROM base as devbase
COPY requirements-dev.txt .
RUN pip install -r requirements-dev.txt

# Lint, Format, Tests
FROM devbase as test
RUN flake8 /app/src &&  black /app/src --check && pytest --cov=/app/src --cov-report=term --cov-report=html /app/src

# Development Server
FROM devbase as devserver
ENV GUNICORN_CMD_ARGS="--reload --bind=0.0.0.0:8000 --workers=2 --threads=2 --timeout=0 --chdir=/app/src"
CMD  ["gunicorn", "server:app"]

# Production
FROM base as prod
ENV GUNICORN_CMD_ARGS="--bind=0.0.0.0:8000 --workers=2 --threads=2 --max-requests=100 --max-requests-jitter=10 --chdir=/app/src"
CMD  ["gunicorn", "server:app"]
