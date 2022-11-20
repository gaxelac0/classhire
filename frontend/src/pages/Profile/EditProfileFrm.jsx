import { useState, React, useEffect } from "react";
import {
  Container,
  Flex,
  Box,
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
  Icon,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaUniversity, FaBaby, FaIdCard } from "react-icons/fa";

import { useFileUpload } from "use-file-upload";

import { useToast } from "@chakra-ui/react";

import * as profileService from "../../services/profileService";

import { useNavigate } from "react-router-dom";

import { MdUploadFile } from "react-icons/md";

const EditProfileFrm = (props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [profile, setProfile] = useState([]);

  const [file, selectFile] = useFileUpload();

  const [experienciasList, setExperienciasList] = useState([
    { firstName: "", lastName: "", nivel: "", descr: "", completed: false },
  ]);

  const [formData, setFormData] = useState({
    role: props.roleSelection,
    fecha_nacimiento: new Date().toDateString(),
    titulo: undefined,
    experiencias: [],
    description: "",
  });

  // Agrega para completar un estudio mas
  const handleExperienciaAdd = () => {
    setExperienciasList([
      ...experienciasList,
      { nivel: "", descr: "", completed: false },
    ]);
  };

  const handleExperienciaSelectChange = (e, index) => {
    const { value } = e.target;
    let list = [...experienciasList];
    list[index]["nivel"] = value;
    setExperienciasList(list);
    setFormData({
      ...formData,
      experiencias: list,
    });
  };

  const handleExperienciaInputChange = (e, index) => {
    const { value } = e.target;
    let list = [...experienciasList];
    list[index]["descr"] = value;
    //console.log(value);
    setExperienciasList(list);
  };

  const handleExperienciaRemove = (index) => {
    let list = [...experienciasList];
    list.splice(index, 1);
    setExperienciasList(list);
  };

  const handleEstudioCheckboxChange = (e, index) => {
    const { checked } = e.target;
    let list = [...experienciasList];
    list[index]["completed"] = checked;
    setExperienciasList(list);
    setFormData({
      ...formData,
      experiencias: list,
    });
  };

  const handleEstudioRemove = (index) => {
    let list = [...experienciasList];
    list.splice(index, 1);
    setExperienciasList(list);
    setFormData({
      ...formData,
      experiencias: list,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //console.log(JSON.stringify(formData));
  };

  const updateMessage = (msg, status) => {
    if (msg && (msg !== "" || msg[0] !== "")) {
      toast({
        title: status === "error" ? "Error!" : "Success!",
        description: msg,
        status: status,
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
        updateMessage("Perfil actualizado", "success");
      }
      navigate("/profile/1");
    } catch (err) {
      updateMessage(err.message, "error");
    }
  };

  const isErrorFechaNacimiento = formData.fecha_nacimiento === "";
  const isErrorTitulo = formData.titulo === "";
  const isErrorFirstName = formData.firstName === "";
  const isErrorLastName = formData.lastName === "";
  const isErrorDescription = formData.description === "";

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("executing fetchProfile at Profile");
      const result = await profileService.getProfileById(
        props.userState.user.profile
      );
      let profile = result.data.docs[0];
      setProfile(profile);

      let list = [...profile.experiencias];
      if (list.length <= 0) {
        list = [{ nivel: "", descr: "", completed: false }];
      }
      setExperienciasList(list);
      setFormData({
        ...formData,
        firstName: profile.firstName,
        lastName: profile.lastName,
        experiencias: list,
        description: profile.description,
        titulo: profile.titulo,
        fecha_nacimiento: profile.fecha_nacimiento
          .split("/")
          .reverse()
          .join("-"),
      });

      //console.log("formData: " + JSON.stringify(formData));
      //console.log("profilePhoto: " + profile.photo)
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        console.log("executing uploadImage at Profile");
        const result = await profileService.addPhoto(file, profile._id);
        if (result.status === "ok") {
          let profileNew = profile;
          profileNew["photo"] = result.image_url;
          setProfile(profileNew);
          updateMessage("Foto actualizada", "success");
        }
        //console.log("profilePhoto: " + JSON.stringify(result))
      };
      uploadImage();
    }
  }, [file]);

  return (
    <VStack>
      {profile && profile.photo && props.usage !== "onboard" && (
        <>
          <Image
            onClick={() => {
              // Single File Upload
              selectFile();
            }}
            opacity={0.5}
            _hover={{
              opacity: 1,
            }}
            borderRadius="full"
            boxSize={"200px"}
            src={profile.photo}
            alt={props.userState.user.firstName}
            mt="1em"
            mb={"-10"}
          />
          <Icon
            onClick={() => {
              // Single File Upload
              selectFile();
            }}
            as={MdUploadFile}
            boxSize="8"
            alignSelf="left"
            color="teal.500"
          />
        </>
      )}
      <Container maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <form onSubmit={handleSubmit}>
                      <VStack spacing={5}>
                        
                        {props.usage !== "onboard" && (
                          <>
                            <FormControl
                              id="firstName"
                              isInvalid={isErrorFirstName}
                              isRequired
                            >
                              <FormLabel>Nombre</FormLabel>
                              <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaIdCard color="gray.800" />}
                                />
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  size="md"
                                  placeholder="Nombre"
                                  value={formData && formData["firstName"]}
                                  onChange={handleChange}
                                />
                              </InputGroup>
                              {isErrorFirstName && (
                                <FormErrorMessage>
                                  El campo de nombre es obligatorio.
                                </FormErrorMessage>
                              )}
                            </FormControl>
                            <FormControl
                              id="lastName"
                              isInvalid={isErrorLastName}
                              isRequired
                            >
                              <FormLabel>Apellido</FormLabel>
                              <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaIdCard color="gray.800" />}
                                />
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  size="md"
                                  placeholder="Nombre"
                                  value={formData && formData["lastName"]}
                                  onChange={handleChange}
                                />
                              </InputGroup>
                              {isErrorLastName && (
                                <FormErrorMessage>
                                  El campo de apellido es obligatorio.
                                </FormErrorMessage>
                              )}
                            </FormControl>
                          </>
                        )}

                        {props.roleSelection &&
                        props.roleSelection === "teacher" ? (
                          <FormControl
                            id="titulo"
                            isInvalid={isErrorTitulo}
                            isRequired
                          >
                            <FormLabel>Titulo</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement
                                pointerEvents="none"
                                children={<FaUniversity color="gray.800" />}
                              />
                              <Input
                                id="titulo"
                                name="titulo"
                                type="text"
                                size="md"
                                placeholder="Titulo"
                                value={formData && formData["titulo"]}
                                onChange={handleChange}
                              />
                            </InputGroup>
                            {isErrorTitulo && (
                              <FormErrorMessage>
                                El campo de titulo es obligatorio.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        ) : (
                          <FormControl
                            id="fecha_nacimiento"
                            isInvalid={isErrorFechaNacimiento}
                            isRequired
                          >
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
                                value={formData && formData["fecha_nacimiento"]}
                                onChange={handleChange}
                              />
                            </InputGroup>
                            {isErrorFechaNacimiento && (
                              <FormErrorMessage>
                                La fecha de nacimiento es requerida.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}

                        {props.roleSelection &&
                        props.roleSelection === "teacher" ? (
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
                                          value={singleExperiencia.nivel}
                                          onChange={(e) =>
                                            handleExperienciaSelectChange(
                                              e,
                                              index
                                            )
                                          }
                                        >
                                          <option value="catedra">
                                            Catedra
                                          </option>
                                          <option value="seminario">
                                            Seminario
                                          </option>
                                          <option value="curso">Curso</option>
                                          <option value="primaria">
                                            Primaria
                                          </option>
                                          <option value="secundaria">
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
                                          value={singleExperiencia.descr}
                                          onChange={(e) =>
                                            handleExperienciaInputChange(
                                              e,
                                              index
                                            )
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
                                          {experienciasList.length - 1 ===
                                            index &&
                                            experienciasList.length < 4 && (
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
                        ) : (
                          <FormControl id="experiencias">
                            <FormLabel>Estudios Realizados (max. 4)</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <VStack>
                                {experienciasList.map(
                                  (singleEstudio, index) => (
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
                                            value={singleEstudio.nivel}
                                            mt={"1em"}
                                            placeholder="Ingresa nivel de estudio"
                                            onChange={(e) =>
                                              handleExperienciaSelectChange(
                                                e,
                                                index
                                              )
                                            }
                                          >
                                            <option
                                              id="primaria"
                                              value="primaria"
                                            >
                                              Primaria
                                            </option>
                                            <option
                                              id="secundaria"
                                              value="secundaria"
                                            >
                                              Secundaria
                                            </option>
                                            <option
                                              id="terciario"
                                              value="terciario"
                                            >
                                              Terciario
                                            </option>
                                            <option
                                              id="universitario"
                                              value="universitario"
                                            >
                                              Universitario
                                            </option>
                                          </Select>
                                        </VStack>

                                        <VStack>
                                          <Text fontSize={"xs"}>
                                            Completado
                                          </Text>
                                          <Checkbox
                                            id={"estudioCheckbox_" + index}
                                            placeholder="Terminado?"
                                            isChecked={singleEstudio.completed}
                                            onChange={(e) =>
                                              handleEstudioCheckboxChange(
                                                e,
                                                index
                                              )
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
                                          {experienciasList.length - 1 ===
                                            index &&
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
                                  )
                                )}
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
                        )}

{
                          props.roleSelection &&
                          props.roleSelection === "teacher" && (
                            <>
                              <FormControl
                                id="description"
                                isInvalid={isErrorDescription}
                                isRequired
                              >
                                <FormLabel>Descripcion profesional</FormLabel>
                                <Textarea
                                  id="description"
                                  name="description"
                                  placeholder="Describete a ti mismo"
                                  value={formData && formData["description"]}
                                  onChange={handleChange}
                                  resize={"vertical"}
                                  mt={1}
                                  rows={3}
                                  minLength={60}
                                  shadow="sm"
                                  focusBorderColor="brand.400"
                                  fontSize={{
                                    sm: "sm",
                                  }}
                                />
                                <FormHelperText>
                                  Detalla una descripcion sobre tu experiencia personal, tu metodologia de ensenanza, etc
                                </FormHelperText>
                                {isErrorDescription && (
                                  <FormErrorMessage>
                                    El campo de descripcion es obligatorio
                                  </FormErrorMessage>
                                )}
                              </FormControl>
                            </>
                          )}

                        <FormControl id="submitPatchProfile" float="right">
                          <Button
                            type="submit"
                            variant="solid"
                            bg="teal"
                            color="white"
                            _hover={{}}
                          >
                            {props.usage === "onboard" ? "Enviar" : "Editar"}
                          </Button>
                        </FormControl>
                      </VStack>
                    </form>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>
      </Container>
    </VStack>
  );
};

export default EditProfileFrm;
