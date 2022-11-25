import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  Modal,
  ModalOverlay,
  useDisclosure,
  Icon,
  Center,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";

import { useState, React, useEffect } from "react";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";
import { useParams, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import * as claseService from "../../services/claseService";

import * as profileService from "../../services/profileService";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";

import ReviewCard from "../../components/Card/ReviewCard";

const ClaseComponent = (props) => {
  let { id } = useParams();

  let navigate = useNavigate();

  let toast = useToast();

  const [formDataContratacion, setFormDataContratacion] = useState({
    clase_id: "",
    telefono: undefined,
    horario: undefined,
    descr_contratacion: undefined,
  });

  const isErrorTelefono = formDataContratacion.telefono === "";
  const isErrorHorario = formDataContratacion.horario === "";
  const isErrorDescrContratacion =
    formDataContratacion.descr_contratacion === "";

  const [formDataReviewEdit, setFormDataReviewEdit] = useState({
    clase_id: "",
    comment_id: "",
    new_state: undefined,
    state_reason: undefined,
  });

  const isErrorStateReason = formDataReviewEdit.state_reason === "";

  const {
    isOpen: isOpenContratacion,
    onOpen: onOpenContratacion,
    onClose: onCloseContratacion,
  } = useDisclosure();

  const {
    isOpen: isOpenReviewEdit,
    onOpen: onOpenReviewEdit,
    onClose: onCloseReviewEdit,
  } = useDisclosure();

  const [clase, setClase] = useState({});
  const [teacher, setTeacher] = useState({});
  const [profile, setProfile] = useState({});

  const handleChangeContratacion = (e) => {
    //console.log(e.target.value);
    setFormDataContratacion({
      ...formDataContratacion,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeReviewEdit = (e) => {
    //console.log(e.target.value);
    setFormDataReviewEdit({
      ...formDataReviewEdit,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitContratacion = async (evt) => {
    evt.preventDefault();
    try {
      let result = await claseService.contratar(formDataContratacion);
      if (result.status === "ok") {
        updateMessage(result.msg, "success");
        navigate("/profile/1");
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  };

  const handleSubmitReviewEdit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await claseService.patchReview(formDataReviewEdit);
      if (result.status === "ok") {
        if(isOpenReviewEdit) {
          onCloseReviewEdit();
        }
        updateMessage("Review " + formDataReviewEdit.new_state + " exitosamente", "success");
        navigate("/profile/");
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  };

  const updateMessage = (msg, status) => {
    if (msg && (msg !== "" || msg[0] !== "")) {
      toast({
        title: status === "success" ? "Success!" : "Error!",
        description: msg,
        status: status,
        position: "top-right",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const getStringFrecuencia = (key) => {
    switch (key) {
      case "once": {
        return "Unica vez";
      }
      case "diaria": {
        return "Una clase diaria";
      }
      case "semanal": {
        return "Una clase semanal";
      }
      case "mensual": {
        return "Una clase mensual";
      }
      default: {
        return "frecuencia a definir con el profesor".toUpperCase();
      }
    }
  };

  useEffect(() => {
    setFormDataContratacion({
      ...formDataContratacion,
      clase_id: id,
    });
    //console.log("id " + id);

    const fetchClaseInformation = async () => {
      console.log("ejecuta fetchClaseInformation at ClaseComponent");

      let query = {};
      query["ids"] = [id];
      query["state"] = ["publicada", "despublicada"]

      const clasesData = await claseService.getClases(query, 1, 1);
      if (clasesData.data.docs.length !== 1) {
        navigate("/404");
        return;
      }
      setClase(clasesData.data.docs[0]);

      const teacherData = await profileService.getProfileById(
        clasesData.data.docs[0].teacher_profile_id
      );
      if (teacherData.data.docs.length !== 1) {
        navigate("/404");
        return;
      }
      setTeacher(teacherData.data.docs[0]);

      const profileData = await profileService.getProfileById(
        props.userState.user.profile
      );
      if (profileData.data.docs.length !== 1) {
        navigate("/404");
        return;
      }
      setProfile(profileData.data.docs[0]);

      //console.log("retrieving clases");
      //console.log(clases);
      //console.log(pagination);
    };
    console.log("ejecuta useEffect at ClaseComponent");

    fetchClaseInformation();
  }, [id]);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {clase.title}
            </Heading>
            <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
              ${clase.price} ARS p/clase
            </Text>
          </Box>

          <Box display="flex" mt="2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  boxSize={"30px"}
                  color={i < clase.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box
              as="span"
              ml="2"
              mt={"5px"}
              color="gray.600"
              fontSize="md"
              fontWeight={"bold"}
            >
              <HStack>
                <Text ml={"5px"}>{clase.reviewCount}</Text>
                <Text>reviews</Text>
              </HStack>
            </Box>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.200"} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{clase.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.500"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Sobre este curso
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text
                    as={"span"}
                    fontWeight={"black"}
                    textTransform={"uppercase"}
                  >
                    materia:
                  </Text>{" "}
                  <Text textTransform={"uppercase"}>
                    {clase && clase.materia && clase.materia.value}
                  </Text>
                </ListItem>

                <ListItem>
                  <Text
                    as={"span"}
                    fontWeight={"black"}
                    textTransform={"uppercase"}
                  >
                    Tipo de Clase:
                  </Text>{" "}
                  <Text textTransform={"uppercase"}>
                    {clase && clase.tipo_clase && clase.tipo_clase.value}
                  </Text>
                  <Text textTransform={"uppercase"}>
                    {clase && clase.nivel && clase.nivel.value}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text
                    as={"span"}
                    fontWeight={"black"}
                    textTransform={"uppercase"}
                  >
                    FRECUENCIA Y DURACION:
                  </Text>{" "}
                  <Text fontWeight={"thin"}>
                    {clase &&
                      clase.frecuencia &&
                      clase.duration &&
                      getStringFrecuencia(clase.frecuencia.value) +
                        " de " +
                        clase.duration +
                        " hora(s)"}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text
                    as={"span"}
                    fontWeight={"black"}
                    textTransform={"uppercase"}
                  >
                    Idioma:
                  </Text>{" "}
                  Espanol
                </ListItem>
              </List>
            </Box>

            {clase &&
              clase.comments &&
              clase.comments.filter((c) => c.state === "aceptada").length >
                0 && (
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.500"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                  >
                    Reviews
                  </Text>
                </Box>
              )}
            {clase && clase.comments && clase.comments.length > 0 && (
              <Box>
                <SimpleGrid columns={{ base: 1, md: 2 }}>
                  {clase.comments.map((review, index) => (
                    <Box key={"box" + index}>
                      {/* // Si es estudiante, solo ver los comentarios aceptados. Si es profesor ver ambos */}
                      {review.state === "aceptada" ? (
                        <ReviewCard
                          review={review}
                        />
                      ) : (review.state !== "bloqueada") && (
                        props.userState &&
                        clase.teacher_profile_id ===
                          props.userState.user.profile && (
                          <ReviewCard
                            clase={clase}
                            review={review}
                            handler={"true"}
                            userState={props.userState}
                            setFormDataReviewEdit={setFormDataReviewEdit}
                            onOpenReviewEdit={onOpenReviewEdit}
                          />
                        )
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </Stack>
        </Stack>
        <Flex>
          <Flex>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.500"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Sobre el profe
              </Text>

              <Image
                borderRadius="full"
                boxSize={"200px"}
                src={teacher.photo}
              />

              <Heading as="h3">
                {teacher.firstName} {teacher.lastName}
              </Heading>
              <StackDivider borderColor={"gray.200"} />
              <Box mx={"5em"}>
                <Text
                  fontWeight={"bold"}
                  fontSize={{ base: "12px", lg: "16px" }}
                  mb={"4"}
                >
                  {teacher && teacher.description}
                </Text>
              </Box>

              {/* "completed": true,
                        "nivel": "primaria",
                        "descr": "Profesor de primaria",
                        "createdAt": "2022-11-21T16:59:48.500Z",
                        "updatedAt": "2022-11-21T16:59:48.500Z" */}

              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.500"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                experiencias
              </Text>
              {teacher &&
                teacher.experiencias &&
                teacher.experiencias.map((e, i) => (
                  <Text key={"textExperiencies_" + i}>
                    {e.descr + " de nivel " + e.nivel}
                  </Text>
                ))}

              {/* Se oculta el boton de Contratar si no es estudiante o si ya la tiene contratada */}
              {props.userState &&
                props.userState.role === "student" &&
                (profile &&
                profile.clases &&
                clase &&
                !profile.clases.includes(clase._id) ? (
                  <Box>
                    <Button
                      rounded={"none"}
                      w={"full"}
                      mt={8}
                      size={"lg"}
                      py={"7"}
                      onClick={onOpenContratacion}
                      bg={"gray.900"}
                      color={"white"}
                      textTransform={"uppercase"}
                      _hover={{
                        transform: "translateY(2px)",
                        boxShadow: "lg",
                      }}
                    >
                      Contratar
                    </Button>

                    <Stack direction="row">
                      <MdCall />
                      <Text>Contacto garantizado en menos de 48 horas</Text>
                    </Stack>
                  </Box>
                ) : (
                  <>
                    <Center>
                      <VStack mt="1em">
                        <Icon as={CheckIcon} color="green" boxSize="100"></Icon>
                        <Text>Ya contrataste esta clase</Text>
                      </VStack>
                    </Center>
                  </>
                ))}
            </VStack>
          </Flex>
          <StackDivider borderColor={"gray.200"} />
        </Flex>
      </SimpleGrid>

      {/* Modal de Contratacion - solo estudiantes*/}
      <Modal isOpen={isOpenContratacion} onClose={onCloseContratacion}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contratando la clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmitContratacion}>
              <FormControl id="telefono" isInvalid={isErrorTelefono} isRequired>
                <FormLabel>Telefono</FormLabel>
                <Input
                type={"number"}
                  name="telefono"
                  placeholder="Telefono"
                  value={formDataContratacion.telefono}
                  onChange={handleChangeContratacion}
                />
                {isErrorTelefono && (
                  <FormErrorMessage>
                    El campo de telefono es obligatorio
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mt={4}
                id="horario"
                isInvalid={isErrorHorario}
                isRequired
              >
                <FormLabel>Horario</FormLabel>
                <Input
                  placeholder="Horario"
                  name="horario"
                  value={formDataContratacion.horario}
                  onChange={handleChangeContratacion}
                />
                {isErrorHorario && (
                  <FormErrorMessage>
                    El campo de horario es obligatorio
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mt={4}
                id="descr_contratacion"
                isInvalid={isErrorDescrContratacion}
                isRequired
              >
                <FormLabel>Descripcion de contratacion</FormLabel>
                <Textarea
                  id="descr_contratacion"
                  placeholder="Descripcion de la contratacion"
                  value={formDataContratacion.descr_contratacion}
                  onChange={handleChangeContratacion}
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
                  Razon por la que quieres tomar la clase, preguntas sobre
                  contenido, etc
                </FormHelperText>
                {isErrorDescrContratacion && (
                  <FormErrorMessage>
                    La descripcion de contratacion es requerida.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Center>
                <HStack>
                  <Button type="submit" colorScheme="teal" m={"1em"}>
                    Contratar
                  </Button>
                  <Button onClick={onCloseContratacion} m={"1em"}>
                    Cancelar
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de bloqueo de review - solo profesores */}
      <Modal isOpen={isOpenReviewEdit} onClose={onCloseReviewEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gestionando review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmitReviewEdit}>
              <FormControl id="state_reason" isInvalid={isErrorStateReason} isRequired>
                <FormLabel>Descargo</FormLabel>
                <Input
                  name="state_reason"
                  placeholder="Lo bloqueo/acepto porque...."
                  value={formDataReviewEdit.state_reason}
                  onChange={handleChangeReviewEdit}
                />
                {isErrorStateReason && (
                  <FormErrorMessage>
                    El campo de descargo es obligatorio.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Center>
                <HStack>
                  <Button type="submit" colorScheme="teal" m={"1em"}>
                    Procesar
                  </Button>
                  <Button onClick={onCloseReviewEdit} m={"1em"}>
                    Cancelar
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Container>
  );
};

const Clase = (props) => {
  return (
    <BackgroundLayout
      component={<ClaseComponent userState={props.userState} />}
    ></BackgroundLayout>
  );
};

export default Clase;
