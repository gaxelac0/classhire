import { React } from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import Clase from "../../components/Clase/Clase";



const Publicacion = ({ user, handleLogout }) => {

  let teacher = {
    name:"Mario Hernandez",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti non necessitatibus voluptatem soluta asperiores laboriosam ratione illum, sunt odit fugit quis dolorum dolore nobis recusandae facere, sint doloribus eius obcaecati!"
  }

  return (
    <Box
      as="section"
      bg="gray.700"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
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
            _dark={{
              bg: "gray.800",
            }}
            maxW="max"
            maxH="max"
          >


            <Clase title={'Clase Individual de Matematicas'} teacher={teacher} />
          </Box>
        </Flex>


      </Box>
    </Box>
  );
};

export default Publicacion
