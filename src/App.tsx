import { Route, Routes } from "react-router-dom";
import { Spinner, Flex } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Index from "./pages/Index";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      // @ts-ignore
      <Flex justify={"center"} align={"center"} minH={"100vh"} backgroundColor={"gray.300"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Routes>
        {!isAuthenticated && !isLoading && <Route path="/" element={<Index />} />}
        {isAuthenticated && !isLoading && <Route path="/" element={<Index />} />}
        {isAuthenticated && !isLoading && <Route path="/movies" element={<Home />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
