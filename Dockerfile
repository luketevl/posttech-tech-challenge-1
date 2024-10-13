from node:lts as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:lts as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --omit=dev --ignore-scripts

COPY . . 

COPY --from=development /usr/src/app/dist ./dist

USER node

CMD ["node", "dist"]
