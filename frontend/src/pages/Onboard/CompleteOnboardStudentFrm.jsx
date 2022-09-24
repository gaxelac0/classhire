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
  Image,
  Checkbox,
  Select,
  Link,
} from "@chakra-ui/react";
import {
  AddIcon, DeleteIcon,
} from '@chakra-ui/icons'
import { FaBaby } from "react-icons/fa";

const CompleteOnboardStudentFrm = ({ user, handleLogout }) => {

  const [estudiosList, setEstudiosList] = useState([{ type: "", description: "", current: ""}])

  // Agrega para completar un estudio mas
  const handleEstudioAdd = () => {
    console.log("Before handleAdd: ", estudiosList);
    setEstudiosList([...estudiosList, {type: "", description: "", current: ""}])
    console.log("After handleAdd: ", estudiosList);
  }

  const handleEstudioInputChange = (e, index) => {
    console.log("***************************************")
    console.log(e.target)
    const { value } = e.target;
    console.log("e.target: ", e.target)
    const list = [...estudiosList];
    list[index]["description"] = value;
    console.log("Before handleEstudioInputChange" + estudiosList[index])
    setEstudiosList(list);
    console.log("After handleEstudioInputChange" + estudiosList[index])
    console.log("***************************************")
  };

  const handleEstudioSelectChange = (e, index) => {
    console.log("***************************************")
    console.log(e.target)
    const { value } = e.target;
    console.log("e.target: ", e.target)
    const list = [...estudiosList];
    list[index]["type"] = value;
    console.log("Before handleEstudioSelectChange" + estudiosList[index])
    setEstudiosList(list);
    console.log("After handleEstudioSelectChange" + estudiosList[index])
    console.log("***************************************")
  };

  const handleEstudioCheckboxChange = (e, index) => {
    console.log("***************************************")
    console.log(e.target)
    const { checked } = e.target;
    console.log("e.target: ", e.target)
    const list = [...estudiosList];
    list[index]["current"] = checked;
    console.log("Before handleEstudioInputChange" + estudiosList[index])
    setEstudiosList(list);
    console.log("After handleEstudioInputChange" + estudiosList[index])
    console.log("***************************************")
  };

  const handleEstudioRemove = (index) => {
    const list = [...estudiosList];
    list.splice(index, 1);
    setEstudiosList(list);
  };

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
                      <FormControl id="student">
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FaBaby color="gray.800" />}
                          />
                          <Input type="date" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="student">

                        <FormLabel>Estudios Realizados (max. 4)</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <VStack>
                            {estudiosList.map((singleEstudio, index) => (
                              <Box key={index}>
    
                                  <HStack>

                                    <Select 
                                    placeholder="Ingresa nivel de estudio"
                                    onChange={(e) => handleEstudioSelectChange(e, index)}
                                    >
                                      <option value="primaria">Primaria</option>
                                      <option value="secundario">Secundario</option>
                                      <option value="terciario">Terciario</option>
                                      <option value="universitario">Universitario</option>
                                    </Select>

                                    <Input
                                      id={"estudioDesc_"+index}
                                      type="text"
                                      placeholder="descripcion"
                                      value={singleEstudio.description}
                                      onChange={(e) => handleEstudioInputChange(e, index)}
                                    />
                                    <Checkbox
                                      id={"estudioCheckbox_"+index}
                                      placeholder="Terminado?"
                                      value={singleEstudio.current}
                                      onChange={(e) => handleEstudioCheckboxChange(e, index)}
                                    />
                                    <VStack>
                                      {estudiosList.length !== 1 && (
                                        <IconButton size="xs" icon={<DeleteIcon/>} onClick={() => handleEstudioRemove(index)}/>
                                      )}
                                      {estudiosList.length - 1 === index && estudiosList.length < 4 && (
                                        <IconButton size="xs" icon={<AddIcon/>} onClick={handleEstudioAdd}/>
                                      )}
                                    </VStack>
                                  </HStack>
                                </Box>
                            ))}
                          {/* <div className="output">
                            <h2>Output</h2>
                            {estudiosList &&
                              estudiosList.map((obj, index) => (
                                <ul key={index}>
                                  {obj && <li>{obj.type+":"+obj.description+":"+obj.current}</li>}
                                </ul>
                              ))}
                          </div> */}
                        </VStack>
                          
                          
                      </InputGroup>
                      </FormControl>
                      <FormControl id="student" float="right">
                      <Link href="/profile">
                        <Button
                            variant="solid"
                            bg="teal"
                            color="white"
                            _hover={{}}>
                              
                          Enviar</Button>
                        </Link>
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
