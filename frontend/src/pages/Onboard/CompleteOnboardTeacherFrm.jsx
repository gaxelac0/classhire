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
import { FaUniversity } from "react-icons/fa";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";

const CompleteOnboardTeacherFrmComponent = () => {

  const [experienciasList, setExperienciasList] = useState([{ type: "", description: "", current: ""}])

  // Agrega para completar una experiencia mas
  const handleExperienciaAdd = () => {
    console.log("Before handleAdd: ", experienciasList);
    setExperienciasList([...experienciasList, {type: "", description: "", current: ""}])
    console.log("After handleAdd: ", experienciasList);
  }

  const handleExperienciaInputChange = (e, index) => {
    console.log("***************************************")
    console.log(e.target)
    const { value } = e.target;
    console.log("e.target: ", e.target)
    const list = [...experienciasList];
    list[index]["description"] = value;
    console.log("Before handleExperienciaInputChange" + experienciasList[index])
    setExperienciasList(list);
    console.log("After handleExperienciaInputChange" + experienciasList[index])
    console.log("***************************************")
  };

  const handleExperienciaSelectChange = (e, index) => {
    console.log("***************************************")
    console.log(e.target)
    const { value } = e.target;
    console.log("e.target: ", e.target)
    const list = [...experienciasList];
    list[index]["type"] = value;
    console.log("Before handleExperienciaSelectChange" + experienciasList[index])
    setExperienciasList(list);
    console.log("After handleExperienciaSelectChange" + experienciasList[index])
    console.log("***************************************")
  };

  const handleExperienciaCheckboxChange = (e, index) => {
    console.log("***************************************")
    console.log(e.target)
    const { checked } = e.target;
    console.log("e.target: ", e.target)
    const list = [...experienciasList];
    list[index]["current"] = checked;
    console.log("Before handleExperienciaCheckboxChange" + experienciasList[index])
    setExperienciasList(list);
    console.log("After handleExperienciaCheckboxChange" + experienciasList[index])
    console.log("***************************************")
  };

  const handleExperienciaRemove = (index) => {
    const list = [...experienciasList];
    list.splice(index, 1);
    setExperienciasList(list);
  };


  return (
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
                    <Image src="/img/teacher-icon.png"/>
                  </Box>
                  <Heading>Profesores</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Necesitamos que completes este pequeno formulario antes de proceder
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="teacher">
                        <FormLabel>Titulo</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FaUniversity color="gray.800" />}
                            
                          />
                          <Input type="text" size="md" value="Ingenierito de Nacimiento" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="teacher">

                        <FormLabel>Experiencia</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <VStack>
                            {experienciasList.map((singleExperiencia, index) => (
                              <Box key={index}>
    
                                  <HStack>

                                    <Select 
                                    placeholder="Donde tuviste la experiencia?"
                                    onChange={(e) => handleExperienciaSelectChange(e, index)}
                                    >
                                      <option value="catedra">Catedra</option>
                                      <option value="seminario">Seminario</option>
                                      <option value="curso">Curso</option>
                                      <option value="primaria">Primaria</option>
                                      <option value="secundario">Secundario</option>
                                      <option value="terciario">Terciario</option>
                                      <option value="universitario">Universitario</option>
                                    </Select>

                                    <Input
                                      id={"experienciaDesc_"+index}
                                      type="text"
                                      placeholder="descripcion"
                                      value={singleExperiencia.description}
                                      onChange={(e) => handleExperienciaInputChange(e, index)}
                                    />
                                    <Checkbox
                                      id={"experienciaCheckbox_"+index}
                                      placeholder="Terminado?"
                                      value={singleExperiencia.current}
                                      onChange={(e) => handleExperienciaCheckboxChange(e, index)}
                                    />
                                    <VStack>
                                      {experienciasList.length !== 1 && (
                                        <IconButton size="xs" icon={<DeleteIcon/>} onClick={() => handleExperienciaRemove(index)}/>
                                      )}
                                      {experienciasList.length - 1 === index && experienciasList.length < 4 && (
                                        <IconButton size="xs" icon={<AddIcon/>} onClick={handleExperienciaAdd}/>
                                      )}
                                    </VStack>
                                  </HStack>
                                </Box>
                            ))}
                          {/* <div className="output">
                            <h2>Output</h2>
                            {experienciaList &&
                              experienciaList.map((obj, index) => (
                                <ul key={index}>
                                  {obj && <li>{obj.type+":"+obj.description+":"+obj.current}</li>}
                                </ul>
                              ))}
                          </div> */}
                        </VStack>
                          
                          
                      </InputGroup>
                      </FormControl>
                      <FormControl id="teacher" float="right">
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
  );
};

const CompleteOnboardTeacherFrm = () => {
  return (
    <BackgroundLayout
      component={<CompleteOnboardTeacherFrmComponent/>}
    />
  );
}

export default CompleteOnboardTeacherFrm
