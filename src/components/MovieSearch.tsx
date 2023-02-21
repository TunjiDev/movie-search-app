import { useState, useEffect, ChangeEvent } from "react";
import { Box, Text, Flex, Input, Select, Image, Heading, Spinner } from "@chakra-ui/react";

import { Movie } from "../utils/types";
import { GENRES } from "../utils/constants";

const imgPath = "https://image.tmdb.org/t/p/w500";

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [httpError, setHttpError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchMovieHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const genreChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const releaseDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReleaseDate(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const fetchMovies = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&year=${releaseDate}&with_genres=${genre}`;
        const response = await fetch(url);
        const result = await response.json();
        setMovies(result.results);
        setIsLoading(false);
      };

      fetchMovies().catch((err) => {
        setIsLoading(false);

        setHttpError(err.message);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, genre, releaseDate]);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  let content = (
    <Flex justify={"center"} align={"center"}>
      Wow such empty. Search for you favorite movies now!!!
    </Flex>
  );

  if (isLoading) {
    content = (
      <Flex justify={"center"} align={"center"}>
        <Spinner />
      </Flex>
    );
  }

  if (httpError) {
    content = (
      <Flex justify={"center"} align={"center"}>
        {httpError}
      </Flex>
    );
  }

  return (
    <Box as="main" minHeight={{ base: "82vh", sm: "85vh", md: "85vh", lg: "85vh" }}>
      <Flex
        w={"90%"}
        m={"0 auto"}
        mt={"1rem"}
        mb={"2rem"}
        flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
        justify={"space-evenly"}
        align={"center"}
      >
        <Input
          mr={{ base: 0, sm: 0, md: "1rem", lg: "1rem" }}
          mb={{ base: "1rem", sm: "1rem", md: 0, lg: 0 }}
          flex={{ base: 1, sm: 1, md: 2, lg: 2 }}
          backgroundColor={"gray.100"}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={searchMovieHandler}
        />
        <Select
          mb={{ base: "1rem", sm: "1rem", md: 0, lg: 0 }}
          mr={{ base: 0, sm: 0, md: "1rem", lg: "1rem" }}
          flex={1}
          backgroundColor={"gray.100"}
          value={genre}
          placeholder="Filter by genre"
          onChange={genreChangeHandler}
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
        </Select>
        <Input
          flex={1}
          backgroundColor={"gray.100"}
          type="date"
          placeholder="Release date"
          value={releaseDate}
          onChange={releaseDateChangeHandler}
        />
      </Flex>

      <Box ml={0} px={"2rem"}>
        {movies &&
          movies.map((movie, index) => (
            <Box key={index} mb={"2rem"} border={"1px solid gray"}>
              <Flex justify={"space-between"} direction={{ base: "column", sm: "column", md: "row", lg: "row" }}>
                <Box flex={1}>
                  <Image
                    boxSize={"300px"}
                    objectFit={"cover"}
                    src={`${imgPath}${movie?.poster_path || movie?.backdrop_path}`}
                    alt={movie?.title || movie?.original_title}
                  />
                </Box>
                <Box flex={1} px={"1rem"}>
                  <Heading as={"h3"}>
                    <Box as={"span"}>Title:</Box> {movie?.title || movie?.original_title}
                  </Heading>
                  <Text as={"p"}>
                    <Box as={"span"} fontWeight={"bold"}>
                      Release Date:
                    </Box>{" "}
                    {movie?.release_date}
                  </Text>
                  <Text as={"p"}>
                    <Box as={"span"} fontWeight={"bold"}>
                      Genre(s):
                    </Box>{" "}
                    {movie?.genre_ids.map((genreId, index) => (
                      <span key={genreId}>
                        {GENRES[genreId]}
                        {index < movie?.genre_ids.length - 1 && ", "}
                      </span>
                    ))}
                  </Text>
                  <Text as={"p"}>
                    <Box as={"span"} fontWeight={"bold"}>
                      Overview:
                    </Box>{" "}
                    {truncate(movie?.overview, 150)}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}

        {(!movies || !Array.isArray(movies) || movies.length === 0) && <Box>{content}</Box>}
      </Box>
    </Box>
  );
};

export default MovieSearch;
