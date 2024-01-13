import { useState, useEffect, ChangeEvent } from "react";
import { Box, Flex, Input, Select, Spinner, useMediaQuery } from "@chakra-ui/react";
import toast from "react-hot-toast";
import movieTrailer from "movie-trailer";

import TrailerModal from "./TrailerModal";
import { MovieType } from "../utils/types";
import Movie from "./Movie";
import PageNavigationButton from "./PageNavigationBtn";
import MovieInfoModal from "./MovieInfoModal";
import BlinkingText from "./BlinkingText";

const ITEMS_PER_PAGE = 5;

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [openMovieInfoModal, setOpenMovieInfoModal] = useState(false);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isLowerThan420] = useMediaQuery("(max-width: 420px)");

  const searchMovieHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const genreChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const releaseDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReleaseDate(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(movies!.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovies = movies?.slice(startIndex, endIndex);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const fetchMovies = async () => {
        const url = query
          ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&year=${releaseDate}&with_genres=${genre}`
          : `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

        const response = await fetch(url);
        const result = await response.json();

        if (!result.success && result.status_message) {
          toast.error(result.status_message);
          setIsLoading(false);
          return;
        }

        setMovies(result.results);
        setIsLoading(false);
      };

      fetchMovies().catch((err) => {
        toast.error(err.message);
        setIsLoading(false);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, genre, releaseDate]);

  let content = (
    // @ts-ignore
    <Flex justify={"center"} align={"center"}>
      Wow such empty. Search for you favorite movies now!!!
    </Flex>
  );

  if (isLoading) {
    content = (
      <Flex justify={"center"} align={"center"} h={"90vh"}>
        <Spinner />
      </Flex>
    );
  }

  const handleClick = (movie: MovieType) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(null, { tmdbId: movie.id })
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v") || "");
        })
        .catch((error: any) => {
          setOpenMovieInfoModal(true);
          setMovie(movie);
          return toast.error("No trailer for this video at the moment" || error.message);
        });
    }
  };

  return (
    <Box as="main" minHeight={{ base: "82vh", sm: "85vh", md: "85vh", lg: "85vh" }}>
      <Flex
        w={"90%"}
        m={"0 auto"}
        mt={isLowerThan420 ? "3rem" : "2rem"}
        mb={"2rem"}
        pt={"3rem"}
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

      {currentMovies.length > 0 && !query && <BlinkingText />}

      <Box w={"90%"} m={"0 auto"}>
        {currentMovies &&
          currentMovies.map((movie, index) => <Movie key={index} movie={movie} onClick={() => handleClick(movie)} />)}

        {(!currentMovies || !Array.isArray(currentMovies) || currentMovies.length === 0) && <Box>{content}</Box>}
      </Box>

      <Flex my={"2rem"} justifyContent={"flex-end"} gap={4} alignItems={"center"} w={"90%"} mx={"auto"}>
        <PageNavigationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          text={"<"}
        />
        Page {currentPage} of {totalPages}
        <PageNavigationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          text={">"}
        />
      </Flex>

      {trailerUrl && <TrailerModal trailerUrl={trailerUrl} onClose={() => setTrailerUrl("")} />}
      {openMovieInfoModal && (
        <MovieInfoModal
          movie={movie}
          openMovieModal={openMovieInfoModal}
          setOpenMovieInfoModal={setOpenMovieInfoModal}
        />
      )}
    </Box>
  );
};

export default MovieSearch;
