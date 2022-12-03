import express, { Express, Router } from "express";
import cors from "cors";
import cookie from "cookie-parser";
import http from "http";
import { listRouter } from "router";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketManager } from "websocket";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8000;

class Application {
    constructor(
        private app: Express,
        private server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
        private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
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

    private startWebsocket() {
        const socketManger = new SocketManager(this.io);
        socketManger.load();
    }

    public async start() {
        try {
            this.connectRouter(listRouter);
            this.startWebsocket();
            this.server.listen(PORT, () => {
                console.log(`listening on *:${PORT}`);
            });
        } catch (error: any) {
            console.log("[app start error] : ", error.message);
        }
    }
}

const application = new Application(app, server, io);
application.start();
