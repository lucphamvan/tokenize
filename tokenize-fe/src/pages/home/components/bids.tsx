import { Box, Card, CardBody, Flex, chakra, useBreakpointValue } from "@chakra-ui/react";
import { Order } from "model/order";
import { useEffect, useMemo, useState } from "react";
import RowData from "./row-data";

interface Props {
    orders?: Order[];
}

const Bids = ({ orders }: Props) => {
    const [totalPriceSize, setTotalPriceSize] = useState<Number>();
    // responsive display
    const ordersData = useBreakpointValue({
        base: orders ? [...orders].reverse() : orders,
        md: orders,
    });

    const revert = useBreakpointValue({
        base: true,
        md: false,
    });

    const orderList = useMemo(() => {
        return ordersData?.map((o) => {
            return <RowData key={`bids-${o.id}`} revert={revert} lData={o.size} rData={o.price} color="green.400" />;
        });
    }, [ordersData]);

    useEffect(() => {
        const _total = orders?.reduce((a, b) => {
            return a + b.price * b.size;
        }, 0);

        setTotalPriceSize(_total);
    }, [orders]);

    return (
        <>
            <Card>
                <CardBody>
                    <Flex flexDir="column" gap="2">
                        <RowData revert={revert} color="gray.500" fontWeight="bold" lData="Size" rData="Bid" />
                        {orderList}
                    </Flex>
                </CardBody>
            </Card>
            <Box fontWeight="semibold" mt="2">
                Sum (price * size) :{" "}
                <chakra.span fontWeight="bold" color="orange.400">
                    {" "}
                    {totalPriceSize?.toFixed(3)}
                </chakra.span>
            </Box>
        </>
    );
};
export default Bids;
