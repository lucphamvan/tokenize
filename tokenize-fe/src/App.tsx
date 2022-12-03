import { ChakraProvider, theme } from "@chakra-ui/react";
import { socket, SocketContext } from "websocket";
import HomePage from "./pages/home";

export const App = () => {
    return (
        <SocketContext.Provider value={socket}>
            <ChakraProvider theme={theme}>
                <HomePage />
            </ChakraProvider>
        </SocketContext.Provider>
    );
};
