FROM node:12.18.4 AS builder

COPY . ./ng-app

WORKDIR /ng-app

RUN npm i

ENV PATH="./node_modules/.bin:$PATH" 

RUN ng build --prod

FROM nginx:latest
COPY --from=builder /ng-app/dist/weather-app /usr/share/nginx/html