import orderService from "service/order.service";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { WebSocket } from "ws";

// const INTERVAL_TIME = 5000; // milisecond

export class SocketManager {
    constructor(private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, private ws: WebSocket) {}

    // handle logic here
    public load() {
        // handle socket backend-frontend
        this.io.on("connection", (socket) => {
            console.log("connect", socket.id);
            socket.on("disconnect", (reason) => {
                console.log("socket disconnect", socket.id, reason);
            });
        });

        // VERSION 2: generate list orders realtime from binance stream
        this.ws.on("message", (data) => {
            // console.log(data.toString());
            const orderData = orderService.generateListOrdersByStream(data.toString(), 10);
            this.io.emit("orders", orderData);
        });

        // VERSION 1: interval generate list orders
        // setInterval(async () => {
        //     try {
        //         const orderData = await orderService.generateListOrders(10);
        //         this.io.emit("orders", orderData);
        //         // console.log(`emit event 'orders' at ${new Date().toString()}`);
        //     } catch (error: any) {
        //         console.log("failed to generate list orders", error.message);
        //     }
        // }, INTERVAL_TIME);
    }
}
