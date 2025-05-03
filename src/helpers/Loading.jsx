import { Flex } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

export function Loading({ isHeight }) {
    return (
        <Flex
            w="100%"
            h={isHeight ? "auto" : "70vh"}
            alignItems="center"
            justifyContent="center"
        >
            <ClipLoader 
                color="#2fa33a"
                loading={true}
                size={50}
            />
        </Flex> 
    );
}