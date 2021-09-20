FROM node:14-alpine

WORKDIR /app
RUN mkdir /app/backend

COPY ./package*.json .
COPY ./backend/package*.json ./backend

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install && cd ./backend && npm install; \
        else npm install --only=production && cd ./backend && npm install --only=production; \
    fi

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
    fi

EXPOSE 3000
EXPOSE 4000

CMD [ "npm", "run", "start", "--prefix", "backend" ]
