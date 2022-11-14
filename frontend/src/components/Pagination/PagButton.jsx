import { chakra } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";

const activeStyle = {
  bg: "brand.600",
  color: "white",
};

const PagButton = (props) => {
  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bgGradient="linear(to-r, teal.500, teal.400)"
      _hover={{
        bgGradient: "linear(to-r, #808080, #A4A4A4)",
      }}
      opacity={props.disabled && 0.6}
      cursor={props.disabled && "not-allowed"}
      {...(props.active && activeStyle)}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default PagButton;
