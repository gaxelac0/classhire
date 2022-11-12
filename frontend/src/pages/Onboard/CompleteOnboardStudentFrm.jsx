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
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import * as profileService from "../../services/profileService"

import { useNavigate } from "react-router-dom";

const CompleteOnboardStudentFrmComponent = (props) => {

  const navigate = useNavigate()

  const [estudiosList, setEstudiosList] = useState([{ type: "", description: "", completed: false }])

  const [formData, setFormData] = useState({
    fecNacimiento: new Date(),
    experiencias: []
  })

  // Agrega para completar un estudio mas
  const handleEstudioAdd = () => {
    setEstudiosList([...estudiosList, { type: "", description: "", completed: false }])
  }

  const handleEstudioInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...estudiosList];
    list[index]["description"] = value;
    setEstudiosList(list);

    const l = [...formData];
    
  };

  const handleEstudioSelectChange = (e, index) => {
    const { value } = e.target;
    const list = [...estudiosList];
    list[index]["type"] = value;
    setEstudiosList(list);
  };

  const handleEstudioCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const list = [...estudiosList];
    list[index]["current"] = checked;
    setEstudiosList(list);
  };

  const handleEstudioRemove = (index) => {
    const list = [...estudiosList];
    list.splice(index, 1);
    setEstudiosList(list);
  };

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeSelect = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: [e.target.name].push({type: "", descr: "", completed: false}), /*  TODO: complete this */
    })
  }


  const handleSubmit = async e => {

    
    e.preventDefault()
    try {
      // TODO: completar onboard
      //await profileService.setRole(formData, 'student')
      navigate('/profile')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
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
                    <Image src="/img/student-icon.png" />
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


                      <form onSubmit={handleSubmit}>




                        <FormControl id="student">
                          <FormLabel>Fecha de Nacimiento</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaBaby color="gray.800" />}
                            />
                            <Input id="fecNacimiento" type="date" size="md" onChange={handleChange} />
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
                                      id={"estudioDesc_" + index}
                                      type="text"
                                      placeholder="descripcion"
                                      value={singleEstudio.description}
                                      onChange={(e) => handleEstudioInputChange(e, index)}
                                    />
                                    <Checkbox
                                      id={"estudioCheckbox_" + index}
                                      placeholder="Terminado?"
                                      value={singleEstudio.current}
                                      onChange={(e) => handleEstudioCheckboxChange(e, index)}
                                    />
                                    <VStack>
                                      {estudiosList.length !== 1 && (
                                        <IconButton size="xs" icon={<DeleteIcon />} onClick={() => handleEstudioRemove(index)} />
                                      )}
                                      {estudiosList.length - 1 === index && estudiosList.length < 4 && (
                                        <IconButton size="xs" icon={<AddIcon />} onClick={handleEstudioAdd} />
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



                      </form>
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


const CompleteOnboardStudentFrm = () => {
  return (
    <BackgroundLayout
      component={<CompleteOnboardStudentFrmComponent />}
    />
  );
}

export default CompleteOnboardStudentFrm
