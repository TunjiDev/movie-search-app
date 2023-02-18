import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box as="footer" h={"10"} backgroundColor={"brown"}>
      <Flex justify={"center"} align={"center"} h={"full"}>
        <Text color={"wheat"} textAlign={"center"}>
          Created by @TunjiDev. ALL RIGHTS RESERVED.
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;
