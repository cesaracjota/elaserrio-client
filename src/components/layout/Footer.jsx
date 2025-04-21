import React from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';
import globalInformation from '../../helpers/globalInformation';

const Footer = ({ isOpen }) => {
    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="justify-between"
                ml={{
                    base: 0,
                    lg: isOpen ? "300px" : "0"
                }}
                transition=".08s ease-out"
            >
                <Flex
                    w="full"
                    as="footer"
                    flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
                    align="center"
                    justify="space-between"
                    px="6"
                    py="4"
                    bgColor="#f8f9fa"
                    _dark={{
                        bg: "primary.1100",
                    }}
                >
                    <Text fontSize="xs" color="gray.700" _dark={{ color: 'gray.200' }}>
                        © { new Date().getFullYear() } <chakra.a fontWeight={'bold'}>{globalInformation?.colegioNombre}</chakra.a>
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default Footer