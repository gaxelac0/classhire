import { useState, React } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Image
} from "@chakra-ui/react";
import {
  AddIcon, DeleteIcon,
} from '@chakra-ui/icons'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { FaBaby } from "react-icons/fa";

const CompleteOnboardStudentFrm = ({ user, handleLogout }) => {

  var Estudio = function(description, current) {
    const desc = description;
    const curr = current;
    return { desc, curr}
  }

  const [estudios, setEstudios] = useState([])

  const handleAddEstudio = () => {
    setEstudios(old => [...old, {}])
    console.log(estudios);
  }

  const handleRemoveEstudio = (e) => {
    this.setState({
      estudios: this.state.estudios.filter(function(estudio) { 
        return estudio !== e.target.value 
      })});
  }

  return (
  
		<Flex
          width="full"
          height="full"
          alignItems="center"
          justifyContent="center"
          px={8}
          bg="teal"
        >
        <Container  maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="white"
          color="teal"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Box boxSize="150px">
                    <Image src="/img/student-icon.png"/>
                  </Box>

                  
                  <Heading>Estudiantes</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Necesitamos que completes este pequeno formulario antes de proceder
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FaBaby color="gray.800" />}
                          />
                          <Input type="date" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <HStack>
                        <FormLabel>Estudios Cursados</FormLabel>
                        <IconButton size="xs" icon={<AddIcon/>} onClick={handleAddEstudio}/>
                        </HStack>
                        
                        <InputGroup borderColor="#E0E1E7">
                        

                          <VStack>
                          {Array.from(estudios).map((c, index) => {
                            return (
                              <>
                              <HStack>
                                <Input id={"description_"+index} type="text" size="md" />
                                <IconButton size="xs" icon={<DeleteIcon/>} onClick={handleRemoveEstudio}/>
                                </HStack>
                              </>
                            )
                          })}
                          </VStack>

                          
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}>
                          Enviar
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
        </Flex>
  );
};

export default CompleteOnboardStudentFrm
