FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock if present
COPY back/package.json ./back/package.json

RUN apk add --no-cache python3 make g++ \
    && cd back && npm install --production \
    && apk del python3 make g++ || true

# Copy project files
COPY . /usr/src/app

# Expose the application port
EXPOSE 5000

CMD ["node", "back/app.js"]