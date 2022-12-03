import { Container, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { SocketContext } from "websocket";
import { OrderData } from "model/order";
import { useContext, useEffect, useState } from "react";
import Asks from "./components/asks";
import Bids from "./components/bids";
import axios from "config/axios";
import { API } from "config/api";

const HomePage = () => {
    const [orderData, setOrderData] = useState<OrderData>();
    const [loading, setLoading] = useState(false);
    const socket = useContext(SocketContext);

    useEffect(() => {
        const getOrderData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API.ORDERS);
                setOrderData(response.data);
            } catch (error: any) {
                console.log("failed to get order data", error.message);
            } finally {
                setLoading(false);
            }
        };
        getOrderData();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("orders", (data) => {
                console.log("receive data", data);
                setOrderData(data);
            });
        }
    }, [socket]);

    return (
        <Container py="6" maxW={"container.xl"}>
            <Flex flexDir="column" gap="4">
                <Heading color="orange.400">TOKENIZE EXCHANGE</Heading>
                <Heading as="h4" size="md" color="orange.400">
                    ETH/BTC
                </Heading>
                <Grid gap="4" templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
                    <GridItem>
                        <Bids orders={orderData?.bids} />
                    </GridItem>
                    <GridItem>
                        <Asks orders={orderData?.asks} />
                    </GridItem>
                </Grid>
            </Flex>
        </Container>
    );
};
export default HomePage;
