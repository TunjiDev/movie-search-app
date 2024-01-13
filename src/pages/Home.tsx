import { Box } from "@chakra-ui/react";

import MovieSearch from "../components/MovieSearch";
import Layout from "../components/shared/Layout";

function Home() {
  return (
    <Box backgroundColor={"gray.300"} data-testid="parent-component">
      <Layout>
        <MovieSearch />
      </Layout>
    </Box>
  );
}

export default Home;
