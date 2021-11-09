FROM node:16.10-buster-slim as base

WORKDIR /app

COPY package*.json .babelrc *.config.js /app
RUN npm install

COPY ./src /app/src
COPY ./images /app/images

# Dev
FROM base as dev
ENV WORDBREW_API_URL="http://localhost:8000"
CMD ["npm", "start"]

# Prod
FROM base as prod
ENV WORDBREW_API_URL="https://wordbrew-api-xizsvrbq4a-wl.a.run.app/"
CMD ["npm", "run", "build"]
