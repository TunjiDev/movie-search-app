import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // @ts-ignore
    <Flex justify={"center"} align={"center"} h={"full"} as="footer" backgroundColor={"brown"} minH={"5vh"}>
      <Text color={"wheat"} textAlign={"center"}>
        Created by{" "}
        <Link to={"https://github.com/TunjiDev"} target="blank">
          @TunjiDev.
        </Link>{" "}
        ALL RIGHTS RESERVED.
      </Text>
    </Flex>
  );
}

export default Footer;
