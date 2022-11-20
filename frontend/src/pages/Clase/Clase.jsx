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
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";

import { useState, useRef, React, useEffect } from "react";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";
import { useParams, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import * as claseService from "../../services/claseService";

import * as profileService from "../../services/profileService";

const ClaseComponent = (props) => {
  let { id } = useParams();

  let navigate = useNavigate();

  let toast = useToast();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clase, setClase] = useState({});
  const [teacher, setTeacher] = useState({});
  const [profile, setProfile] = useState({});

  const [formData, setFormData] = useState({
    clase_id: "",
    telefono: "",
    horario: "",
    descr_contratacion: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await claseService.contratar(formData);
      if (result.status === "ok") {
        updateMessage(result.msg, "success");
        navigate("/profile/1");
      } else {
        throw new Error(result.msg)
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


    setFormData({
      ...formData,
      clase_id: id,
    })
    console.log("id " + id)

    const fetchClaseInformation = async () => {
      console.log("ejecuta fetchClaseInformation at ClaseComponent");

      let query = {};
      query["ids"] = [id];

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
        <Flex>
          <Flex>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Image
                rounded={"md"}
                alt={"product image"}
                src="/img/matematicas.jpg"
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "150%", sm: "200px", lg: "250px" }}
              />
              <StackDivider borderColor={"gray.200"} />
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
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color={"yellow.500"}
                fontWeight={"250"}
                mb={"4"}
              >
                {teacher && teacher.description}
              </Text>
            </VStack>
          </Flex>
          <StackDivider borderColor={"gray.200"} />
        </Flex>
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
                    FRECUENCIA:
                  </Text>{" "}
                  <Text fontWeight={"thin"}>
                    {clase &&
                      clase.frecuencia &&
                      getStringFrecuencia(clase.frecuencia.value)}
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
          </Stack>
          {/* Se oculta el boton de Contratar si no es estudiante o si ya la tiene contratada */}
          {props.userState && props.userState.role === "student" && profile && profile.clases && clase && !(profile.clases.includes(clase._id)) && (
            <Box>
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                onClick={onOpen}
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

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdCall />
                <Text>Contacto garantizado en menos de 48 horas</Text>
              </Stack>
            </Box>
          )}
        </Stack>
      </SimpleGrid>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contratando la clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl id="telefono">
                <FormLabel>Telefono</FormLabel>
                <Input
                  ref={initialRef}
                  name="telefono"
                  placeholder="Telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} id="horario">
                <FormLabel>Horario</FormLabel>
                <Input
                  placeholder="Horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} id="descr_contratacion">
                <FormLabel>Descripcion de contratacion</FormLabel>
                <Input
                  name="descr_contratacion"
                  placeholder="Descripcion al profesor del interes por la clase"
                  value={formData.descr_contratacion}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" mr={3}>
                Contratar
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
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
