import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

function Header() {
  return (
    <Box as="header" h={"10"} backgroundColor={"brown"}>
      <Flex justify={"center"} align={"center"} h="full">
        <Text color={"wheat"} textAlign={"center"}>
          MOVIE APP - FIND YOUR FAVORITE SHOWS HERE!!!
        </Text>
      </Flex>
    </Box>
  );
}

export default Header;
