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
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Checkbox,
  Select,
  Link,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaBaby } from "react-icons/fa";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useToast } from "@chakra-ui/react";

import * as profileService from "../../services/profileService";

import { useNavigate } from "react-router-dom";

const CompleteOnboardStudentFrmComponent = (props) => {

  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    role: "student",
    fecha_nacimiento: new Date().toDateString(),
    experiencias: [],
  });

  const [experienciasList, setExperienciasList] = useState([
    { nivel: "", completed: false },
  ]);

  // Agrega para completar un estudio mas
  const handleExperienciaAdd = () => {
    setExperienciasList([...experienciasList, { nivel: "", completed: false }]);
  };

  const handleExperienciaSelectChange = (e, index) => {
    const { value } = e.target;
    const list = [...experienciasList];
    list[index]["nivel"] = value;
    setExperienciasList(list);
    setFormData({
      ...formData,
      ["experiencias"]: list
    });
  };

  const handleEstudioCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const list = [...experienciasList];
    list[index]["completed"] = checked;
    setExperienciasList(list);
    setFormData({
      ...formData,
      ["experiencias"]: list
    });
  };

  const handleEstudioRemove = (index) => {
    const list = [...experienciasList];
    list.splice(index, 1);
    setExperienciasList(list);
    setFormData({
      ...formData,
      ["experiencias"]: list
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const [message, setMessage] = useState([""]);
  const updateMessage = (msg) => {
    setMessage(msg);
    if (msg && (msg !== "" || msg[0] !== "")) {
      toast({
        title: "Error!",
        description: msg,
        status: "error",
        position: "top-right",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await profileService.patchProfile(formData);
      if (result.status === "ok") {
        props.userState.role = result.data.patchedProfile.role;
      }
      navigate("/profile/1");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const isErrorFechaNacimiento = formData.fecha_nacimiento === "";

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="white"
          color="teal"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Box boxSize="150px">
                    <Image src="/img/student-icon.png" />
                  </Box>
                  <Heading>Estudiantes</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Necesitamos que completes este pequeno formulario antes de
                    proceder
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <form onSubmit={handleSubmit}>
                      <VStack spacing={5}>
                        <FormControl id="fecha_nacimiento" isInvalid={isErrorFechaNacimiento} isRequired>
                          <FormLabel>Fecha de Nacimiento</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaBaby color="gray.800" />}
                            />
                            <Input
                              name="fecha_nacimiento"
                              id="fecha_nacimiento"
                              type="date"
                              size="md"
                              onChange={handleChange}
                            />
                          </InputGroup>
                          {isErrorFechaNacimiento && (
                            <FormErrorMessage>
                              La fecha de nacimiento es requerida.
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl id="experiencias">
                          <FormLabel>Estudios Realizados (max. 4)</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <VStack>
                              {experienciasList.map((singleEstudio, index) => (
                                <Box
                                  key={index}
                                  alignItems="center"
                                  borderWidth="1px"
                                  borderRadius="lg"
                                  borderColor={"teal.300"}
                                  p={"1em"}
                                >
                                  <HStack>
                                    <VStack>
                                      <Text fontSize={"xs"}>Nivel</Text>
                                      <Select
                                        mt={"1em"}
                                        placeholder="Ingresa nivel de estudio"
                                        onChange={(e) =>
                                          handleExperienciaSelectChange(e, index)
                                        }
                                      >
                                        <option id="primaria" value="primaria">
                                          Primaria
                                        </option>
                                        <option
                                          id="secundaria"
                                          value="secundaria"
                                        >
                                          Secundaria
                                        </option>
                                        <option value="terciario">
                                          Terciario
                                        </option>
                                        <option value="universitario">
                                          Universitario
                                        </option>
                                      </Select>
                                    </VStack>

                                    <VStack>
                                      <Text fontSize={"xs"}>Completado</Text>
                                      <Checkbox
                                        id={"estudioCheckbox_" + index}
                                        placeholder="Terminado?"
                                        value={singleEstudio.completed}
                                        onChange={(e) =>
                                          handleEstudioCheckboxChange(e, index)
                                        }
                                      />
                                    </VStack>

                                    <VStack>
                                      {experienciasList.length !== 1 && (
                                        <IconButton
                                          mt={"1em"}
                                          size="xs"
                                          icon={<DeleteIcon />}
                                          onClick={() =>
                                            handleEstudioRemove(index)
                                          }
                                        />
                                      )}
                                      {experienciasList.length - 1 === index &&
                                        experienciasList.length < 4 && (
                                          <IconButton
                                            mt={"1em"}
                                            size="xs"
                                            icon={<AddIcon />}
                                            onClick={handleExperienciaAdd}
                                          />
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
                                      {obj && (
                                        <li>
                                          {obj.nivel + ">>" + obj.completed}
                                        </li>
                                      )}
                                    </ul>
                                  ))}
                              </div> */}
                            </VStack>
                          </InputGroup>
                        </FormControl>
                        <FormControl id="student" float="right">
                          <Link href="/profile">
                            <Button
                              type="submit"
                              variant="solid"
                              bg="teal"
                              color="white"
                              _hover={{}}
                            >
                              Enviar
                            </Button>
                          </Link>
                        </FormControl>
                      </VStack>
                    </form>
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

const CompleteOnboardStudentFrm = (props) => {
  return (
    <BackgroundLayout component={<CompleteOnboardStudentFrmComponent userState={props.userState} />} />
  );
};

export default CompleteOnboardStudentFrm;
