### Website URL

https://tokenize.denojs.info/

### API URL

https://api-tokenize.denojs.info/orders

### SOCKET-IO

wss://api-tokenize.denojs.info/socket.io/?EIO=4&transport=websocket

### CONFIG API_URL IN TOKENIZE-FE

src/config/api.tsx

### RUN WITH DOCKER-COMPOSE

### Note

your computer need to install [docker-compose]

### Usage

```bash
docker-compose up -d
```

## RUN MANUAL

### Run tokenize-be

```bash
cd ./tokenize-fe
npm install
npm run build
npm start
```

### Run tokenize-fe

```bash
cd ./tokenize-fe
npm install
npm start
```
