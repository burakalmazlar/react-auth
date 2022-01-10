FROM node:17 as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY public/ ./public
COPY src/ ./src
COPY package.json .env.development .env.production ./

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install && npm run build

FROM nginx:alpine as serve

COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

