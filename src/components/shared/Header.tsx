import { Text, Flex, Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthButton from "../AuthBtn";

function Header() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    // @ts-ignore
    <Flex
      as="header"
      backgroundColor={"brown"}
      position={"fixed"}
      top={0}
      right={0}
      left={0}
      zIndex={10}
      minH={"5vh"}
      alignItems={"center"}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify={"space-between"}
        align={"center"}
        h="full"
        w={"90%"}
        m={"0 auto"}
      >
        <Text color={"wheat"} textAlign={"center"}>
          MOVIE APP - FIND YOUR FAVORITE SHOWS HERE!!!
        </Text>

        {location.pathname === "/" && isAuthenticated ? (
          <Button
            onClick={() => navigate("/movies")}
            bg={"brown"}
            color={"gray.300"}
            _hover={{ color: "brown", backgroundColor: "gray.300" }}
          >
            Go to Movies
          </Button>
        ) : (
          <AuthButton />
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
