import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  return (
    // @ts-ignore
    <Button
      onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
      bg={"brown"}
      color={"gray.300"}
      _hover={{ color: "brown", backgroundColor: "gray.300" }}
    >
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
  );
};

export default LoginButton;
