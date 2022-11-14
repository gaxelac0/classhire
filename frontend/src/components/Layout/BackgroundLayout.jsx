import { React } from "react";
import {
  Box,
  Flex,
  Button,
  Center,
  SimpleGrid
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons'

// Componente para normalizar los estilos de la aplicacion en todas sus paginas
// Recibe el componente a mostrar como props.component
const BackgroundLayout = (props) => {

  const navigate = useNavigate()

  return (
    <>

      <Flex
        as="body"
        bg="teal"
        justifyContent={"center"}
        width="full"
        height="full"
        alignItems="center"
        px={8}
      >
        <SimpleGrid
          columns={{ sm: 1, md: 1 }}
          spacing='8'
        >
          <Box
            transition=".3s ease"
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
              {/*history bar*/}
              <Button mb="3"
                onClick={() => navigate(-1)}><ArrowBackIcon />
              </Button>
              {/*Componente a mostrar*/}
              {props.component}
            </Box>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default BackgroundLayout
