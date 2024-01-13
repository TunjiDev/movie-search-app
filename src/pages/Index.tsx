import { Flex, Text } from "@chakra-ui/react";
import AuthButton from "../components/AuthBtn";
import { blink } from "../components/BlinkingText";
import Layout from "../components/shared/Layout";

function Index() {
  return (
    <Layout>
      {/* @ts-ignore */}
      <Flex
        backgroundColor={"gray.300"}
        minHeight={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        px={"2rem"}
      >
        <Flex direction={"column"}>
          <Text
            mb="6"
            animation={`${blink} 1s linear infinite`}
            textAlign={"center"}
            fontSize="xl"
            fontWeight="bold"
            color="brown"
          >
            Explore and discover your favorite movies. Search by title, genre, or release date to find the latest and
            trending films. Login to get started.
          </Text>
          <AuthButton />
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Index;
