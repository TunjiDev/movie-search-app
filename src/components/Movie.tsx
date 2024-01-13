import { Flex, Heading, Box, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { GENRES } from "../utils/constants";
import { MovieType } from "../utils/types";

const imgPath = "https://image.tmdb.org/t/p/w500";

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function Movie({ movie, onClick }: { movie: MovieType; onClick: () => void }) {
  const [isLowerThan400] = useMediaQuery("(max-width: 400px)");

  return (
    <Box
      mb={"2rem"}
      border={"1px solid #ddd"}
      boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}
      cursor={"pointer"}
      transition={"transform 0.3s ease"}
      _hover={{ transform: "scale(1.05)" }}
      onClick={onClick}
    >
      {/* @ts-ignore */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
      >
        <Box flex={1}>
          <Image
            boxSize={"300px"}
            objectFit={"cover"}
            src={`${imgPath}${movie?.poster_path || movie?.backdrop_path}`}
            alt={movie?.title || movie?.original_title || movie?.name}
            fallbackSrc="./no-image-available.webp"
          />
        </Box>
        <Box flex={1} px={"1rem"}>
          <Heading as={"h3"} mb={".5rem"} fontSize={isLowerThan400 ? "26px" : "36px"}>
            <Text as={"span"}>Title:</Text> {movie?.title || movie?.original_title || movie?.name}
          </Heading>
          <Text as={"p"} mb={".5rem"}>
            <Text as={"span"} fontWeight={"bold"}>
              {movie?.release_date ? "Release Date:" : "First Air Date:"}
            </Text>{" "}
            {movie?.release_date || movie?.first_air_date}
          </Text>
          <Text as={"p"} mb={".5rem"}>
            <Text as={"span"} fontWeight={"bold"}>
              Genre(s):
            </Text>{" "}
            {movie?.genre_ids.map((genreId, index) => (
              <span key={genreId}>
                {GENRES[genreId]}
                {index < movie?.genre_ids.length - 1 && ", "}
              </span>
            ))}
          </Text>
          <Text as={"p"} mb={".5rem"}>
            <Text as={"span"} fontWeight={"bold"}>
              Rating:
            </Text>{" "}
            {movie?.vote_average}
          </Text>
          <Text as={"p"} mb={".5rem"}>
            <Text as={"span"} fontWeight={"bold"}>
              Overview:
            </Text>{" "}
            {truncate(movie?.overview, 150)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Movie;
