FROM python:3.8.5-slim as base

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Extract WordNet database
ENV WN_DATA_PATH="/app/data"
RUN tar -xvzf data/wndb.tar.gz -C $WN_DATA_PATH


FROM base as dev
RUN pip install -r requirements-dev.txt
CMD exec gunicorn --reload --bind :8000 --workers 1 --threads 4 --timeout 0 src.server:app


FROM base as prod
CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 src.server:app
