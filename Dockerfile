FROM node:18-alpine

# Minimal image: install deps for backend and copy app
WORKDIR /usr/src/app/back

# Copy only backend package files and install production deps
COPY back/package*.json ./
# Use npm install when package-lock.json is not present or out of sync
RUN npm install --production --no-audit --no-fund

# Copy full project
WORKDIR /usr/src/app
COPY . /usr/src/app

# Expose port and run backend
EXPOSE 5000
WORKDIR /usr/src/app/back
CMD ["node", "app.js"]