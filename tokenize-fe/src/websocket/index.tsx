import { API_URL } from "config/api";
import React from "react";
import { io } from "socket.io-client";

const socket = io(API_URL, {
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("websocket connect success");
});

socket.on("disconnect", (reason) => {
    // the disconnection was initiated by the server, you need to reconnect manually
    if (reason === "io server disconnect") {
        socket.connect();
    }
});

const SocketContext = React.createContext(socket);
export { socket, SocketContext };
