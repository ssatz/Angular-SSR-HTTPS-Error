FROM node:8.9-alpine 

COPY ./ /var/www/angular

WORKDIR /var/www/angular

RUN npm install

RUN npm install pm2 -g

#RUN npm run build

RUN npm run build:ssr

CMD [ "node", "dist/server.js" ]

EXPOSE  9000/tcp