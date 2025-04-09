import { Flex } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

export function Loading() {
    return (
        <Flex
            w="100%"
            h="75vh"
            alignItems="center"
            justifyContent="center"
        >
            <ClipLoader 
                color="#645CAA"
                loading={true}
                size={40}
            />
        </Flex> 
    );
}