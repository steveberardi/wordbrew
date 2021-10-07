FROM python:3.8.5-slim

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Download WordNet database
ENV WN_DATA_PATH="/tmp"
RUN python loadwn.py

CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 server:app
