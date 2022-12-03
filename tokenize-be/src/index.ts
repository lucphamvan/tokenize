import express, { Express, Router } from "express";
import cors from "cors";
import cookie from "cookie-parser";
import http from "http";
import { listRouter } from "router";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketManager } from "websocket";
import { WebSocket } from "ws";

const PORT = 8080;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SYMBOL = "ethbtc";
const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${SYMBOL}@bookTicker`);

class Application {
    constructor(
        private app: Express,
        private server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
        private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        private ws: WebSocket
    ) {
        this.initialize();
    }

    private initialize() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(cookie());
    }

    private connectRouter(routers: Router[]) {
        routers.forEach((router) => {
            this.app.use("/", router);
        });
    }

    private loadWebsocket() {
        const socketManger = new SocketManager(this.io, this.ws);
        socketManger.load();
    }

    // start function
    public async start() {
        try {
            this.connectRouter(listRouter);
            this.loadWebsocket();
            this.server.listen(PORT, () => {
                console.log(`listening on *:${PORT}`);
            });
        } catch (error: any) {
            console.log("[app start error] : ", error.message);
        }
    }
}

const application = new Application(app, server, io, ws);
application.start();
