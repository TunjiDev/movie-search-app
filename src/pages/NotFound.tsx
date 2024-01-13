import { Flex } from "@chakra-ui/react";

function NotFound() {
  return (
    // @ts-ignore
    <Flex
      backgroundColor={"gray.300"}
      minHeight={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={"3xl"}
      fontWeight={"semibold"}
      color={"brown"}
    >
      OOPS! Page Not Found!! 🤷‍♂️
    </Flex>
  );
}

export default NotFound;
