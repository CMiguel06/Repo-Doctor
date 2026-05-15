FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps ./apps
COPY packages ./packages
COPY tsconfig.base.json ./

RUN npm install
RUN npm run build

CMD ["npm", "run", "doctor", "--", "."]
