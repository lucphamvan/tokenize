import { Box, Card, CardBody, Flex, chakra } from "@chakra-ui/react";
import { Order } from "model/order";
import { useEffect, useMemo, useState } from "react";
import RowData from "./row-data";

interface Props {
    orders?: Order[];
}
const Asks = ({ orders }: Props) => {
    const [totalSize, setTotalSize] = useState<Number>();

    useEffect(() => {
        const _totalSize = orders?.reduce((a, current) => {
            return a + current.size;
        }, 0);
        setTotalSize(_totalSize);
    }, [orders]);

    const orderList = useMemo(() => {
        return orders?.map((o) => {
            return <RowData key={`ask-${o.id}`} lData={o.price} rData={o.size} color="red.400" />;
        });
    }, [orders]);

    return (
        <>
            <Card>
                <CardBody>
                    <Flex flexDir="column" gap="2">
                        <RowData color="gray.500" fontWeight="bold" lData="Ask" rData="Size" />
                        {orderList}
                    </Flex>
                </CardBody>
            </Card>
            <Box fontWeight="semibold" mt="2">
                Sum (size) :{" "}
                <chakra.span fontWeight="bold" color="orange.400">
                    {totalSize?.toFixed(3)}
                </chakra.span>
            </Box>
        </>
    );
};

export default Asks;
