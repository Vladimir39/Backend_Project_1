FROM node:20 as build
WORKDIR /app
ARG DATABASE_URL
ADD . .
RUN yarn install
RUN echo DATABASE_URL=${DATABASE_URL} > .env
RUN npx prisma generate
RUN yarn build --prod

FROM node:20
WORKDIR /app
ARG DATABASE_URL
COPY --from=build /app/dist ./dist
ADD package.json ./
ADD ./prisma ./prisma
RUN echo DATABASE_URL=${DATABASE_URL} > .env
RUN npx prisma generate
RUN yarn install --omit=dev
CMD ["node", "dist/main.js"]