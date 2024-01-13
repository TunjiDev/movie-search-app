import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import YouTube from "react-youtube";

interface Props {
  trailerUrl: string;
  onClose: React.Dispatch<React.SetStateAction<string>>;
}

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

function TrailerModal({ trailerUrl, onClose }: Props) {
  return (
    <Modal isOpen={!!trailerUrl} onClose={() => onClose("")}>
      <ModalOverlay />
      {/* @ts-ignore */}
      <ModalContent bg={"gray.300"}>
        <ModalHeader>Trailer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <YouTube videoId={trailerUrl} opts={opts} />
        </ModalBody>

        <ModalFooter>
          <Button className="btn btn-danger" onClick={() => onClose("")}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TrailerModal;
