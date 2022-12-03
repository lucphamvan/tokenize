import { Box, BoxProps, Flex } from "@chakra-ui/react";

interface Props extends BoxProps {
    lData: React.ReactNode | string;
    rData: React.ReactNode | string;
}
const RowData = ({ lData: left, rData: right, ...props }: Props) => {
    return (
        <Flex justifyContent="space-between">
            <Box {...props}>{left}</Box>
            <Box {...props}>{right}</Box>
        </Flex>
    );
};

export default RowData;
