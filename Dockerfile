FROM node:22

RUN apt update && apt install -y netcat && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app
RUN npm install

CMD ["npm", "start"]
