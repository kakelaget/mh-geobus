FROM node:alpine

EXPOSE 3000
RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn

COPY . .
CMD ["yarn", "start"]
