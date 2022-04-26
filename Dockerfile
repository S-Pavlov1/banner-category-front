FROM node:16-alpine as build
WORKDIR /my-app
ENV PATH /my-app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=prod
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /my-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]