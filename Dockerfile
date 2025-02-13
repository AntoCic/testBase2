FROM node:22
WORKDIR /app
RUN npm install -g netlify-cli
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8888
CMD ["ntl", "dev"]