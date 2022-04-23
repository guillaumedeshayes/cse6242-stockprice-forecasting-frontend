# # develop stage
# FROM node:lts-alpine as develop-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# RUN npm install -g @quasar/cli
# COPY . .
# # # build stage
# # FROM develop-stage as build-stage
# # RUN npm run build
# # # production stage
# # FROM nginx:alpine as production-stage
# # COPY default.conf /etc/nginx/conf.d
# # COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# EXPOSE 3022
# CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 3022;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

# develop stage
FROM node:16.14.2-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @quasar/cli
COPY . .
# build stage
FROM develop-stage as build-stage
# RUN npm run build
RUN quasar build
# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 3022;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
