import { Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

export const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkingText = () => {
  return (
    // @ts-ignore
    <Text
      fontSize="xl"
      fontWeight="bold"
      color="brown"
      animation={`${blink} 1s linear infinite`}
      textAlign={"center"}
      my={"2rem"}
    >
      TRENDING!!!
    </Text>
  );
};

export default BlinkingText;
