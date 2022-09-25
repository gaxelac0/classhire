import { React } from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";

// Componente para normalizar los estilos de la aplicacion en todas sus paginas
// Recibe el componente a mostrar como props.component
const BackgroundLayout = (props) => {

  return (
    <>
      <Flex>
      <Box
        as="body"
        bg="teal"
      >
        <Box
          transition=".3s ease"
        >
          <Flex
            width="full"
            height="full"
            alignItems="center"
            justifyContent="center"
            px={8}
          >
            <Box
              mx="auto"
              px={8}
              py={4}
              rounded="lg"
              shadow="lg"
              bg="white"
              w={"100%"}
              marginTop={"1em"}
              marginBottom={"1em"}
            >
              {props.component}
            </Box>
          </Flex>
        </Box>
      </Box>
      </Flex>
      
    </>
  );
};

export default BackgroundLayout
