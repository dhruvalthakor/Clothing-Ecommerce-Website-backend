#Sample Dockerfile for NodeJS Apps

FROM node:18



WORKDIR /app

COPY package*json ./

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 8060

CMD [ "node", "index.js" ]