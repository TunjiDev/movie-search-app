import React from "react";
import { Box } from "@chakra-ui/react";

import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";
import Footer from "./components/Footer";

function App() {
  return (
    <Box backgroundColor={"gray.300"} data-testid="parent-component">
      <Header />
      <MovieSearch />
      <Footer />
    </Box>
  );
}

export default App;
