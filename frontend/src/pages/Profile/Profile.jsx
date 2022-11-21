import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Image,
  Text,
  HStack,
  IconButton,
  ModalFooter,
  Icon,
  Tooltip,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  Center,
  Select,
} from "@chakra-ui/react";

import Pagination from "../../components/Pagination/Pagination";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { BsFillPersonFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { useState, React, useEffect } from "react";
import * as claseService from "../../services/claseService";

import { Heading } from "@chakra-ui/react";

import { Link, useParams, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import EditProfileFrm from "./EditProfileFrm";

import {
  CheckIcon,
  DeleteIcon,
  LockIcon,
  SmallCloseIcon,
  SpinnerIcon,
  TimeIcon,
} from "@chakra-ui/icons";

{
  /* Componente que almacena las dos tabs de materias y datos personales */
}
const FittedTab = (props) => {
  //console.log(props);
  return (
    <Tabs variant="soft-rounded" colorScheme="teal">
      <TabList mb="1em">
        <Tab>MATERIAS</Tab>
        <Tab>DATOS PERSONALES</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box>
            {props.pagination.totalPages === 0 ? (
              /*  TODO: "Agrega o contrata tu primera clase!!" *con boton de Agregar clase para profesor y el boton de search para estudiantes* */
              <>
                {props.userState && props.userState.role === "student" ? (
                  <Text>Todavia no contrataste ninguna clase</Text>
                ) : (
                  <Text>Todavia no publicaste ninguna clase</Text>
                )}
              </>
            ) : (
              <>
                <Heading as="h2" mb={"1em"}>
                  Clases{" "}
                  {props.userState.role === "student"
                    ? "Contratadas"
                    : "Publicadas"}
                </Heading>
                <TablaMaterias
                  userState={props.userState}
                  clases={props.clases}
                  pagination={props.pagination}
                  handleOnOpenCancelar={props.handleOnOpenCancelar}
                  handleOnOpenFinalizar={props.handleOnOpenFinalizar}
                  handleOnOpenAceptar={props.handleOnOpenAceptar}
                  handleOnOpenAddReview={props.handleOnOpenAddReview}
                  handleOnOpenAlumnos={props.handleOnOpenAlumnos}
                />
                <Pagination pagination={props.pagination} route={"profile"} />
              </>
            )}
          </Box>
          <Text color="red">
            Name:{" "}
            {props.userState.user.firstName +
              " " +
              props.userState.user.lastName}
          </Text>
          <Text color="red">page: {props.pagination.page}</Text>
          <Text color="red">totalPages: {props.pagination.totalPages}</Text>
        </TabPanel>
        <TabPanel>
          <EditProfileFrm
            userState={props.userState}
            roleSelection={props.userState.role}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

{
  /* Componente que almacena la tabla de materias */
}
const TablaMaterias = (props) => {
  return (
    <TableContainer>
      <Table variant="unstyled">
        {/* TODO: remover estos captions eran de prueba nomas */}
        <Thead>
          {/* Encabezados */}
          <Tr>
            {/* Encabezado ALUMNO */}
            {props.userState.role === "student" ? (
              <>
                <Th>Titulo</Th>
                <Th display={{ sm: "none", md: "inline-block" }}>Profesor</Th>
                <Th display={{ sm: "none", md: "inline-block" }}>Fecha</Th>
                <Th>Acciones</Th>
              </>
            ) : (
              // Encabezado PROFESOR
              <>
                <Th>Titulo</Th>
                <Th display={{ sm: "none", md: "flex" }}>Fecha</Th>
                <Th>Acciones</Th>
              </>
            )}
          </Tr>
        </Thead>
        {/* Cuerpos */}
        <Tbody>
          {/* Cuerpo ALUMNO */}
          {props.clases.map((c, idx) => (
            <Tr key={idx}>
              {props.userState.role === "student" ? (
                <>
                  <Td>
                    <Link to={"/clase/" + c._id}>
                      <HStack>
                        <Tooltip
                          label={
                            <Box>
                              <Text textTransform={"uppercase"}>
                                {
                                  c.contrataciones.docs[0].state_in_order[
                                    c.contrataciones.docs[0].state_in_order
                                      .length - 1
                                  ]
                                }
                              </Text>
                              <Text>
                                {c.contrataciones.docs[0].state_in_order[
                                  c.contrataciones.docs[0].state_in_order
                                    .length - 1
                                ] === "solicitada" &&
                                  "Quedan " +
                                    (-Math.floor(
                                      (new Date() -
                                        new Date(
                                          c.contrataciones.docs[0].createdAt
                                        )) /
                                        3600000
                                    ) +
                                      48) +
                                    " horas"}
                              </Text>
                              <Text>
                                  {"Razon: " +
                                    c.contrataciones.docs[0].reasons_in_order[
                                      c.contrataciones.docs[0].reasons_in_order.length - 1
                                    ]}
                                </Text>
                            </Box>
                          }
                        >
                          <Icon
                            mr={"1em"}
                            as={iconByStatus(
                              c.contrataciones.docs[0].state_in_order[
                                c.contrataciones.docs[0].state_in_order.length -
                                  1
                              ]
                            )}
                            size="xs"
                            alignSelf="left"
                            color="teal.500"
                          />
                        </Tooltip>
                        <Text fontWeight="semibold">{c.title}</Text>
                        <Image
                          src={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg=="
                          }
                        ></Image>
                      </HStack>
                    </Link>
                  </Td>
                  <Td display={{ sm: "none", md: "inline-block" }}>
                    {c.teacher_name}
                  </Td>
                  <Td display={{ sm: "none", md: "inline-block" }}>{c.date}</Td>
                  <Td>
                    <HStack>
                      {c.contrataciones.docs[0].state_in_order[
                        c.contrataciones.docs[0].state_in_order.length - 1
                      ] === "aceptada" && (
                        <Tooltip label={"Finalizar Contratacion"}>
                          <IconButton
                            colorScheme="teal"
                            aria-label="Call Segun"
                            size="xs"
                            icon={<LockIcon />}
                          />
                        </Tooltip>
                      )}
                      {c.contrataciones.docs[0].state_in_order[
                        c.contrataciones.docs[0].state_in_order.length - 1
                      ] === "solicitada" && (
                        <Tooltip label={"Cancelar"}>
                          <IconButton
                            onClick={() => {
                              props.handleOnOpenCancelar({
                                clase_id: c._id,
                                profile_id: props.userState.user.profile,
                              });
                            }}
                            new_state="cancelada"
                            colorScheme="teal"
                            aria-label="Call Segun"
                            size="xs"
                            icon={<DeleteIcon />}
                          />
                        </Tooltip>
                      )}

                      {c.contrataciones.docs[0].state_in_order[
                        c.contrataciones.docs[0].state_in_order.length - 1
                      ] === "finalizada" && (
                        <Tooltip label={"Agregar Review"}>
                          <IconButton
                            onClick={() => {
                              props.handleOnOpenAddReview({
                                clase_id: c._id,
                              });
                            }}
                            colorScheme="teal"
                            aria-label="Call Segun"
                            size="xs"
                            icon={<FaComment />}
                          />
                        </Tooltip>
                      )}
                    </HStack>
                  </Td>
                </>
              ) : (
                <>
                  {/* Cuerpo PROFESOR */}
                  <Td>
                    <Link to={"/clase/" + c._id}>
                      <HStack>
                      <Tooltip
                          label={
                            <Box>
                              <Text textTransform={"uppercase"}>
                                {
                                  c.state
                                }
                              </Text>
                            </Box>
                          }
                        >
                          <Icon
                            mr={"1em"}
                            as={iconByStatus(c.state)}
                            size="xs"
                            alignSelf="left"
                            color="teal.500"
                          />
                        </Tooltip>
                        <Text fontWeight="semibold">{c.title}</Text>
                        <Image
                          boxSize={"10px"}
                          src={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg=="
                          }
                        />
                      </HStack>
                    </Link>
                  </Td>
                  <Td display={{ sm: "none", md: "flex" }}>{c.date}</Td>
                  <Td>
                    <HStack>
                      {/* Boton Eliminar clase*/}
                      <Tooltip label={"Despublicar"}>
                         <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="xs"
                        icon={<DeleteIcon />}
                      />
                      </Tooltip>
                     
                      {/* Boton listado de alumnos */}
                      <Tooltip label={"Listado Alumnos"}>
                          <IconButton
                        onClick={() => {
                          props.handleOnOpenAlumnos({ clase: c });
                        }}
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="xs"
                        icon={<BsFillPersonFill />}
                      />
                        </Tooltip>

                      
                    </HStack>
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

{
  /* Componente que principal del perfil */
}
const ProfileComponent = (props) => {
  let navigate = useNavigate();
  let toast = useToast();

  let [selectedClase, setSelectedClase] = useState({});

  const {
    isOpen: isOpenCancelar,
    onOpen: onOpenCancelar,
    onClose: onCloseCancelar,
  } = useDisclosure();

  const {
    isOpen: isOpenAceptar,
    onOpen: onOpenAceptar,
    onClose: onCloseAceptar,
  } = useDisclosure();

  const {
    isOpen: isOpenFinalizar,
    onOpen: onOpenFinalizar,
    onClose: onCloseFinalizar,
  } = useDisclosure();

  const {
    isOpen: isOpenAddReview,
    onOpen: onOpenAddReview,
    onClose: onCloseAddReview,
  } = useDisclosure();

  const {
    isOpen: isOpenAlumnos,
    onOpen: onOpenAlumnos,
    onClose: onCloseAlumnos,
  } = useDisclosure();

  const [formData, setFormData] = useState({
    clase_id: "",
    profile_id: undefined,
    new_state: undefined,
    new_reason: undefined,
  });

  const isErrorReason = formData.new_reason === "";

  const [formDataReview, setFormDataReview] = useState({
    clase_id: "",
    type: "positive",
    comment: undefined,
  });

  const isErrorTypeReview = formDataReview.type === "";

  const isErrorComment = formDataReview.comment === "";

  const handleChange = (e) => {
    //console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeReview = (e) => {
    //console.log(e.target.value);
    setFormDataReview({ ...formDataReview, [e.target.name]: e.target.value });
    //console.log(formDataReview);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await claseService.patchContratacion(formData);
      if (result.status === "ok") {
        updateMessage(
          "Clase " +
            result.data.patchedContratacion.state_in_order[
              result.data.patchedContratacion.state_in_order.length - 1
            ] +
            " con exito",
          "success"
        );
        navigate("/profile");
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  };

  const handleSubmitAddReview = async (evt) => {
    evt.preventDefault();
    try {
      let result = await claseService.addReview(formDataReview);
      if (result.status === "ok") {
        updateMessage(result.msg, "success");
        navigate("/profile");
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  };

  const handleSubmitAlumnos = async (evt) => {
    evt.preventDefault();
    try {
      /* let result = await claseService.addReview(formDataReview);
      if (result.status === "ok") {
        updateMessage(result.msg, "success");
        navigate("/profile");
      } else {
        throw new Error(result.msg);
      } */
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

  const handleOnOpenCancelar = ({ clase_id, profile_id }) => {
    onOpenCancelar();
    setFormData({
      ...formData,
      clase_id: clase_id,
      profile_id: profile_id,
      new_state: "cancelada",
    });
  };

  const handleOnOpenFinalizar = ({ clase_id, profile_id }) => {
    onOpenFinalizar();
    setFormData({
      ...formData,
      clase_id: clase_id,
      profile_id: profile_id,
      new_state: "finalizada",
    });
  };

  const handleOnOpenAceptar = ({ clase_id, profile_id }) => {
    onOpenAceptar();
    setFormData({
      ...formData,
      clase_id: clase_id,
      profile_id: profile_id,
      new_state: "aceptada",
    });
  };

  const handleOnOpenAddReview = ({ clase_id }) => {
    onOpenAddReview();
    setFormDataReview({
      ...formDataReview,
      clase_id: clase_id,
    });
  };

  const handleOnOpenAlumnos = ({ clase }) => {
    setSelectedClase(clase);
    onOpenAlumnos();
  };

  return (
    <Container maxW={"7xl"}>
      <FittedTab
        userState={props.userState}
        clases={props.clases}
        pagination={props.pagination}
        handleOnOpenCancelar={handleOnOpenCancelar}
        handleOnOpenFinalizar={handleOnOpenFinalizar}
        handleOnOpenAceptar={handleOnOpenAceptar}
        handleOnOpenAddReview={handleOnOpenAddReview}
        handleOnOpenAlumnos={handleOnOpenAlumnos}
      />

      {/* Modal de Cancelar Contratacion - profesor y estudiante*/}
      <Modal isOpen={isOpenCancelar} onClose={onCloseCancelar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancelando la clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl
                mt={4}
                id="new_reason"
                isInvalid={isErrorReason}
                isRequired
              >
                <FormLabel>Razon de cancelamiento</FormLabel>
                <Textarea
                  id="new_reason"
                  placeholder="Razon del cambio de estado"
                  value={formData.new_reason}
                  onChange={handleChange}
                  resize={"vertical"}
                  mt={1}
                  rows={3}
                  minLength={10}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: "sm",
                  }}
                />
                <FormHelperText>
                  Ingresa la razon por la cual cancelas la clase
                </FormHelperText>
                {isErrorReason && (
                  <FormErrorMessage>
                    La razon de actualizacion requerida.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Center>
                <HStack>
                  <Button type="submit" colorScheme="teal" m={"1em"}>
                    Cancelar Clase
                  </Button>
                  <Button onClick={onCloseCancelar} m={"1em"}>
                    Regresar
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de Finalizacion Contratacion - profesor y estudiante*/}
      <Modal isOpen={isOpenFinalizar} onClose={onCloseFinalizar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Finalizando la Clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl
                mt={4}
                id="new_reason"
                isInvalid={isErrorReason}
                isRequired
              >
                <FormLabel>Razon de finalizacion</FormLabel>
                <Textarea
                  id="new_reason"
                  placeholder="Razon del cambio de estado"
                  value={formData.new_reason}
                  onChange={handleChange}
                  resize={"vertical"}
                  mt={1}
                  rows={3}
                  minLength={10}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: "sm",
                  }}
                />
                <FormHelperText>
                  Ingresa la razon por la cual finalizas la clase
                </FormHelperText>
                {isErrorReason && (
                  <FormErrorMessage>
                    La razon de actualizacion requerida.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Center>
                <HStack>
                  <Button type="submit" colorScheme="teal" m={"1em"}>
                    Finalizar
                  </Button>
                  <Button onClick={onCloseFinalizar} m={"1em"}>
                    Regresar
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de Aceptar Contratacion  - solo profesor*/}
      <Modal isOpen={isOpenAceptar} onClose={onCloseAceptar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Aceptando la contratacion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl
                mt={4}
                id="new_reason"
                isInvalid={isErrorReason}
                isRequired
              >
                <FormLabel>Mensaje de bienvenida</FormLabel>
                <Textarea
                  id="new_reason"
                  placeholder="Mensaje de bienvenida o aceptacion de clase"
                  value={formData.new_reason}
                  onChange={handleChange}
                  resize={"vertical"}
                  mt={1}
                  rows={3}
                  minLength={10}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: "sm",
                  }}
                />
                <FormHelperText>
                  Ingresa la razon por la cual aceptas la clase
                </FormHelperText>
                {isErrorReason && (
                  <FormErrorMessage>
                    La razon de actualizacion requerida.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Center>
                <HStack>
                  <Button type="submit" colorScheme="teal" m={"1em"}>
                    Aceptar
                  </Button>
                  <Button onClick={onCloseAceptar} m={"1em"}>
                    Regresar
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de Agregar Review */}
      <Modal isOpen={isOpenAddReview} onClose={onCloseAddReview}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregando review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmitAddReview}>
              <FormControl
                colSpan={[6, 3]}
                isInvalid={isErrorTypeReview}
                isRequired
              >
                <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
                  Tipo de Review
                </FormLabel>
                <Select
                  id="type"
                  name="type"
                  mt={1}
                  focusBorderColor="brand.400"
                  value={formDataReview.type}
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={handleChangeReview}
                >
                  <option value="positive">Positiva</option>
                  <option value="negative">Negativa</option>
                </Select>
                {isErrorTypeReview && (
                  <FormErrorMessage>
                    El tipo de review es requerido
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={isErrorComment} isRequired>
                <FormLabel>Comentario / Review</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  placeholder="Escribe aqui tu comentario o feedback sobre la clase"
                  value={formDataReview.comment}
                  onChange={handleChangeReview}
                  resize={"vertical"}
                  mt={1}
                  rows={3}
                  minLength={10}
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
                {isErrorComment && (
                  <FormErrorMessage>
                    La descripcion de contratacion es requerida.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Center>
                <HStack>
                  <Button type="submit" colorScheme="teal" m={"1em"}>
                    Agregar Review
                  </Button>
                  <Button onClick={onCloseAddReview} m={"1em"}>
                    Regresar
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal del listado de alumnos */}
      <Modal size={"xl"} isOpen={isOpenAlumnos} onClose={onCloseAlumnos}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Listado de Alumnos</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={1}>
            <TableContainer>
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th>Contratacion</Th>
                    <Th>Fecha</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedClase &&
                    selectedClase.contrataciones &&
                    selectedClase.contrataciones.docs &&
                    selectedClase.contrataciones.docs.map((ct, index) => (
                      <Tr key={index}>
                        <Td>
                          <Tooltip
                            label={
                              <Box>
                                <Text textTransform={"uppercase"}>
                                  {
                                    ct.state_in_order[
                                      ct.state_in_order.length - 1
                                    ]
                                  }
                                </Text>
                                <Text>
                                  {ct.state_in_order[
                                    ct.state_in_order.length - 1
                                  ] === "solicitada" &&
                                    "Quedan " +
                                      (-Math.floor(
                                        (new Date() - new Date(ct.createdAt)) /
                                          3600000
                                      ) +
                                        48) +
                                      " horas"}
                                </Text>
                                <Text>
                                  {"Razon: " +
                                    ct.reasons_in_order[
                                      ct.reasons_in_order.length - 1
                                    ]}
                                </Text>
                              </Box>
                            }
                          >
                            <HStack>
                              <Icon
                                as={iconByStatus(
                                  ct.state_in_order[
                                    ct.state_in_order.length - 1
                                  ]
                                )}
                                size="xs"
                                alignSelf="left"
                                color="teal.500"
                              />
                              <Text fontSize={{ base: "xs", md: "md" }}>
                                {ct.name}
                              </Text>
                            </HStack>
                          </Tooltip>
                        </Td>
                        <Td>
                          <Text fontSize={{ base: "xs", md: "md" }}>
                            {new Date(ct.createdAt).toDateString()}
                          </Text>
                        </Td>
                        <Td>
                          <HStack>
                            {ct.state_in_order[ct.state_in_order.length - 1] ===
                              "solicitada" && (
                              <>
                                <Tooltip
                                  label={
                                    <Text textTransform={"uppercase"}>
                                      Cancelar Contratacion
                                    </Text>
                                  }
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOnOpenCancelar({
                                        clase_id: ct.clase_id,
                                        profile_id: ct.profile_id,
                                      });
                                    }}
                                    colorScheme="teal"
                                    aria-label="Call Segun"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </Tooltip>

                                <Tooltip
                                  label={
                                    <Text textTransform={"uppercase"}>
                                      Aceptar Contratacion
                                    </Text>
                                  }
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOnOpenAceptar({
                                        clase_id: ct.clase_id,
                                        profile_id: ct.profile_id,
                                      });
                                    }}
                                    colorScheme="teal"
                                    aria-label="Call Segun"
                                    size="xs"
                                    icon={<CheckIcon />}
                                  />
                                </Tooltip>
                              </>
                            )}

                            {ct.state_in_order[ct.state_in_order.length - 1] ===
                              "aceptada" && (
                              <Tooltip
                                label={
                                  <Text textTransform={"uppercase"}>
                                    Finalizar Contratacion
                                  </Text>
                                }
                              >
                                <IconButton
                                  onClick={() => {
                                    handleOnOpenFinalizar({
                                      clase_id: ct.clase_id,
                                      profile_id: ct.profile_id,
                                    });
                                  }}
                                  colorScheme="teal"
                                  aria-label="Call Segun"
                                  size="xs"
                                  icon={<SmallCloseIcon />}
                                />
                              </Tooltip>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseAlumnos}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Profile = (props) => {
  let { page } = useParams();

  const [clases, setClases] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchClases = async () => {
      console.log("executing fetchClases at Profile");
      const clasesData = await claseService.getClasesByUser(
        props.userState.user.profile,
        page,
        5
      );
      setClases(clasesData.data.docs);
      setPagination({
        page: clasesData.data.page,
        totalPages: clasesData.data.totalPages,
      });
      //console.log("retrieving clases");
      //console.log(clases);
      //console.log(pagination);
    };
    fetchClases();
  }, [page]);

  return (
    <>
      <BackgroundLayout
        component={
          <ProfileComponent
            userState={props.userState}
            clases={clases}
            pagination={pagination}
          />
        }
      />
    </>
  );
};

const iconByStatus = (state) => {
  //console.log(state);
  switch (state) {
    case "solicitada": {
      return TimeIcon;
    }
    case "cancelada": {
      return SmallCloseIcon;
    }
    case "aceptada": {
      return SpinnerIcon;
    }
    case "finalizada": {
      return CheckIcon;
    }
    case "publicada": {
      return CheckIcon;
    }
    case "despublicada": {
      return SmallCloseIcon;
    }
    default: {
      return TimeIcon;
    }
  }
};

export default Profile;
