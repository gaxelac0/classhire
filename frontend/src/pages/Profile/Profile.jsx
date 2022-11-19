import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
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
  VStack,
  Center,
  Icon,
} from "@chakra-ui/react";

import { PhoneIcon, DeleteIcon } from "@chakra-ui/icons";

import {
  MdChangeCircle,
  MdEmail,
  MdUpdate,
  MdUploadFile,
} from "react-icons/md";

import Pagination from "../../components/Pagination/Pagination";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { FaComment } from "react-icons/fa";

import { useState, useEffect } from "react";
import * as claseService from "../../services/claseService";
import * as profileService from "../../services/profileService";

import { Heading } from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";

const FittedTab = (props) => {
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
          <VStack>
            <Image
              opacity={0.5}
              _hover={{
                opacity: 1,
              }}
              borderRadius="full"
              boxSize={"200px"}
              src={`data:image/jpeg;base64,${props.profile.photo}`}
              alt={props.userState.user.firstName}
              mt="1em"
              mb={"-10"}
            ></Image>
            <Icon
              as={MdUploadFile}
              boxSize="8"
              alignSelf="left"
              color="teal.500"
            />
            <TablaDatos userState={props.userState} profile={props.profile} />
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const TablaMaterias = (props) => {
  return (
    <TableContainer>
      <Table variant="unstyled">
        {/* TODO: remover estos captions eran de prueba nomas */}
        <Thead>
          <Tr>
            {props.userState.role === "student" ? (
              <>
                <Th>Titulo</Th>
                <Th display={{ sm: "none", md: "inline-block" }}>Profesor</Th>
                <Th display={{ sm: "none", md: "inline-block" }}>Fecha</Th>
                <Th>Acciones</Th>
              </>
            ) : (
              <>
                <Th>Titulo</Th>
                <Th display={{ sm: "none", md: "flex" }}>Fecha</Th>
                <Th>Acciones</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {props.clases.map((c, idx) => (
            <Tr key={idx}>
              {props.userState.role === "student" ? (
                <>
                  <Td>
                    <Link to={"/clase/" + c._id}>
                      <HStack>
                        <Text fontWeight="semibold">{c.title}</Text>
                        <Image
                          alt="Ir a la Clase"
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
                      <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="xs"
                        icon={<DeleteIcon />}
                      />
                      <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="xs"
                        icon={<FaComment />}
                      />
                    </HStack>
                  </Td>
                </>
              ) : (
                <>
                  <Td>
                    <Link to={"/clase/" + c._id} altText="Ir a la Clase">
                      <HStack>
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
                      <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="xs"
                        icon={<DeleteIcon />}
                      />
                      <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="xs"
                        icon={<FaComment />}
                      />
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

const TablaDatos = (props) => {
  //console.log(props);

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" size="md">
        <TableCaption>
          <Button colorScheme="teal" size="sm">
            Editar datos
          </Button>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td>
              <Text as="b" color="#797878" textTransform={"uppercase"}>
                Nombre y Apellido:
              </Text>
            </Td>
            <Td>
              {props.userState.user.firstName +
                " " +
                props.userState.user.lastName}
            </Td>
          </Tr>
          {props && props.userState && props.userState.role === "teacher" && (
            <Tr>
              <Td>
                <Text as="b" color="#797878" textTransform={"uppercase"}>
                  Titulo:
                </Text>
              </Td>
              <Td>
                {props.profile && props.profile.titulo && props.profile.titulo}
              </Td>
            </Tr>
          )}
          {props && props.userState && props.userState.role === "student" && (
            <Tr>
              <Td>
                <Text as="b" color="#797878" textTransform={"uppercase"}>
                  Fecha de Nacimiento:
                </Text>
              </Td>
              <Td>
                {props.profile &&
                  props.profile.fecha_nacimiento &&
                  props.profile.fecha_nacimiento}
              </Td>
            </Tr>
          )}
          <Tr>
            <Td>
              <Text as="b" color="#797878" textTransform={"uppercase"}>
                Estudios:
              </Text>
            </Td>

            {props.profile &&
            props.profile.experiencias &&
            props.profile.experiencias.length > 0 ? (
              <>
                <Td>
                  <Center>
                    <VStack>
                      {props.profile.experiencias.map((c, idx) => (
                        <VStack>
                          <Box mt="1em">
                            <Text key={idx} textTransform={"uppercase"}>
                              {"- " +
                                c.nivel +
                                ": " +
                                (c.completed && c.completed === true
                                  ? "completada"
                                  : "no completada")}
                            </Text>
                            <Text key={idx} textTransform={"uppercase"}>
                              {"Descripcion: " + c.descr}
                            </Text>
                          </Box>
                        </VStack>
                      ))}
                    </VStack>
                  </Center>
                </Td>
              </>
            ) : (
              <>
                <Td>No se registraron experiencias.</Td>
              </>
            )}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Profile = (props) => {
  let { page } = useParams();

  const [clases, setClases] = useState([]);
  const [profile, setProfile] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
  });

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

  const fetchProfile = async () => {
    console.log("executing fetchProfile at Profile");
    const result = await profileService.getProfileById(
      props.userState.user.profile
    );
    let profile = result.data.docs[0];
    setProfile(profile);
    //console.log("profilePhoto: " + profile.photo)
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchClases();
  }, [page]);

  return (
    <>
      <BackgroundLayout
        component={
          <FittedTab
            userState={props.userState}
            clases={clases}
            pagination={pagination}
            profile={profile}
          />
        }
      />
    </>
  );
};

export default Profile;
