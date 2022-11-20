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
  useColorModeValue,
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


const ClaseComponent = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  let toast = useToast()

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clase, setClase] = useState({});
  const [teacher, setTeacher] = useState({});

  const [formData, setFormData] = useState({
    clase_id: "",
    telefono: "",
    horario: "",
    descr_contratacion: "",
  });

  const handleChange = (e) => {
    //console.log(e)
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await claseService.contratar(formData);
      navigate("/profile/1");
    } catch (err) {
      updateMessage(err.message);
    }
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

  useEffect(() => {
    const fetchClaseInformation = async () => {
      console.log("ejecuta fetchClaseInformation at ClaseComponent");

      let query = {};
      query["ids"] = [id];

      const clasesData = await claseService.getClases(query, 1, 1);
      if (clasesData.data.docs.length != 1) {
        navigate("/404");
        return;
      }
      setClase(clasesData.data.docs[0]);

      const teacherData = await profileService.getProfileById(
        clasesData.data.docs[0].teacher_profile_id
      );
      if (teacherData.data.docs.length != 1) {
        navigate("/404");
        return;
      }
      setTeacher(teacherData.data.docs[0]);

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
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Sobre el profe
              </Text>
              <Image
                rounded={"md"}
                alt={"teacher photo"}
                src={teacher.photo}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "50%", sm: "100px", lg: "125px" }}
              />
              <Heading as="h3">{teacher.firstName}</Heading>
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"250"}
                mb={"4"}
              >
                {teacher && teacher.description}
              </Text>
            </VStack>
          </Flex>
          <StackDivider
            borderColor={useColorModeValue("gray.200", "gray.600")}
          />
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
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              ${clase.price} ARS p/clase
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{clase.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Niveles
              </Text>

              <Text>{clase && clase.nivel && clase.nivel.value}</Text>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Sobre este curso
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Lugar:
                  </Text>{" "}
                  Google Meets
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Cronograma:
                  </Text>{" "}
                  Flexible
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Clases Incluidas:
                  </Text>{" "}
                  6
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Idioma:
                  </Text>{" "}
                  Espanol
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            onClick={onOpen}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Contratar
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdCall />
            <Text>Contacto garantizado en menos de 48 horas</Text>
          </Stack>
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
                  placeholder="Telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} id="horario">
                <FormLabel>Horario</FormLabel>
                <Input
                  placeholder="Horario"
                  value={formData.horario}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} id="descr_contratacion">
                <FormLabel>Descripcion de contratacion</FormLabel>
                <Input
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
  return <BackgroundLayout component={<ClaseComponent />}></BackgroundLayout>;
};

export default Clase;
