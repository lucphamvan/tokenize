import { Box, BoxProps, Flex } from "@chakra-ui/react";

interface Props extends BoxProps {
    lData: React.ReactNode | string;
    rData: React.ReactNode | string;
    revert?: boolean;
}
const RowData = ({ lData: left, rData: right, revert, ...props }: Props) => {
    if (revert) {
        return (
            <Flex justifyContent="space-between">
                <Box {...props}>{right}</Box>
                <Box {...props}>{left}</Box>
            </Flex>
        );
    }

    return (
        <Flex justifyContent="space-between">
            <Box {...props}>{left}</Box>
            <Box {...props}>{right}</Box>
        </Flex>
    );
};

export default RowData;
