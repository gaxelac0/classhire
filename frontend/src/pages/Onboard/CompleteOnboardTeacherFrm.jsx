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
import { FaUniversity } from "react-icons/fa";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";


import * as profileService from "../../services/profileService"

const CompleteOnboardTeacherFrmComponent = (props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    role: "teacher",
    titulo: "",
    experiencias: [],
  });

  const [experienciasList, setExperienciasList] = useState([
    { nivel: "", descr: "" },
  ]);

  // Agrega para completar una experiencia mas
  const handleExperienciaAdd = () => {
    setExperienciasList([...experienciasList, { nivel: "", descr: "" }]);
  };

  const handleExperienciaSelectChange = (e, index) => {
    const { value } = e.target;
    const list = [...experienciasList];
    list[index]["nivel"] = value;
    setExperienciasList(list);
    setFormData({
      ...formData,
      ["experiencias"]: list,
    });
  };

  const handleExperienciaInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...experienciasList];
    list[index]["descr"] = value;
    console.log(value);
    setExperienciasList(list);
  };

  const handleExperienciaRemove = (index) => {
    const list = [...experienciasList];
    list.splice(index, 1);
    setExperienciasList(list);
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

  const isErrorTitulo = formData.titulo === "";

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
                    <Image src="/img/teacher-icon.png" />
                  </Box>
                  <Heading>Profesores</Heading>
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
                        <FormControl id="titulo" isInvalid={isErrorTitulo} isRequired>
                          <FormLabel>Titulo</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaUniversity color="gray.800" />}
                            />
                            <Input id="titulo" name="titulo"
                             type="text" size="md" placeholder="Titulo"
                             onChange={handleChange} />
                          </InputGroup>
                          {isErrorTitulo && (
                            <FormErrorMessage>
                              El campo de titulo es obligatorio.
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl id="experiencias">
                          <FormLabel>Experiencia</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <VStack>
                              {experienciasList.map(
                                (singleExperiencia, index) => (
                                  <Box key={index}>
                                    <HStack>
                                      <Select
                                        placeholder="Donde tuviste la experiencia?"
                                        onChange={(e) =>
                                          handleExperienciaSelectChange(
                                            e,
                                            index
                                          )
                                        }
                                      >
                                        <option value="catedra">Catedra</option>
                                        <option value="seminario">
                                          Seminario
                                        </option>
                                        <option value="curso">Curso</option>
                                        <option value="primaria">
                                          Primaria
                                        </option>
                                        <option value="secundario">
                                          Secundario
                                        </option>
                                        <option value="terciario">
                                          Terciario
                                        </option>
                                        <option value="universitario">
                                          Universitario
                                        </option>
                                      </Select>

                                      <Input
                                        id={"experienciaDesc_" + index}
                                        type="text"
                                        placeholder="descripcion"
                                        value={singleExperiencia.description}
                                        onChange={(e) =>
                                          handleExperienciaInputChange(e, index)
                                        }
                                      />
                                      <VStack>
                                        {experienciasList.length !== 1 && (
                                          <IconButton
                                            size="xs"
                                            icon={<DeleteIcon />}
                                            onClick={() =>
                                              handleExperienciaRemove(index)
                                            }
                                          />
                                        )}
                                        {experienciasList.length-1 === index 
                                        && experienciasList.length < 4 && (
                                            <IconButton
                                              size="xs"
                                              icon={<AddIcon />}
                                              onClick={handleExperienciaAdd}
                                            />
                                          )}
                                      </VStack>
                                    </HStack>
                                  </Box>
                                )
                              )}
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

const CompleteOnboardTeacherFrm = (props) => {
  return (
    <BackgroundLayout component={<CompleteOnboardTeacherFrmComponent userState={props.userState} />} />
  );
};

export default CompleteOnboardTeacherFrm;
