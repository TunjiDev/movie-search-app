import {
  Heading,
  Box,
  Text,
  Image,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { GENRES } from "../utils/constants";
import { MovieType } from "../utils/types";

const imgPath = "https://image.tmdb.org/t/p/w500";

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

interface Props {
  movie: MovieType | null;
  openMovieModal: boolean;
  setOpenMovieInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function MovieInfoModal({ movie, openMovieModal, setOpenMovieInfoModal }: Props) {
  const [isLowerThan400] = useMediaQuery("(max-width: 400px)");

  return (
    <Modal isOpen={openMovieModal} onClose={() => setOpenMovieInfoModal(false)}>
      <ModalOverlay />
      {/* @ts-ignore */}
      <ModalContent bg={"gray.300"}>
        <ModalHeader>Movie Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {/* @ts-ignore */}
            <Image
              objectFit={"cover"}
              src={`${imgPath}${movie?.poster_path || movie?.backdrop_path}`}
              alt={movie?.title || movie?.original_title || movie?.name}
              fallbackSrc="./no-image-available.webp"
            />
          </Box>
          <Box px={"1rem"}>
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
              {truncate(movie!.overview, 150)}
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button className="btn btn-danger" onClick={() => setOpenMovieInfoModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MovieInfoModal;
