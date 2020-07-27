FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=prod

# Bundle app source
COPY . .

EXPOSE 3001

CMD ["node", "index.js"]


