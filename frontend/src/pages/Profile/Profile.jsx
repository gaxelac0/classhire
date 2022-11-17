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
} from "@chakra-ui/react";

import { PhoneIcon, DeleteIcon } from "@chakra-ui/icons";

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
        <Tab>Materias</Tab>
        <Tab>Datos Personales</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box>
            {props.pagination.totalPages === 0 ? (
              /*  TODO: "Agrega o contrata tu primera clase!!" *con boton de Agregar clase para profesor y el boton de search para estudiantes* */
              <>
                <Text>Todavia no publicaste nada</Text>
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
          <Image
            borderRadius="full"
            boxSize={"200px"}
            src={`data:image/jpeg;base64,${props.photo}`}
            alt={props.userState.user.firstName}
            mb="1em"
          />
          <TablaDatos userState={props.userState.user} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const TablaMaterias = (props) => {
  return (
    <TableContainer>
      <Table variant="unstyled" >
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
                    <Link to={"/clase/" + c._id} >
                      <HStack>
                      <Text
                      fontWeight="semibold"
                      >
                        {c.title}
                      </Text>
                        <Image
                        alt="Ir a la Clase"
                          src={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg=="
                          }
                        ></Image>
                      </HStack>
                    </Link>
                  </Td>
                  <Td display={{ sm: "none", md: "inline-block" }}>{c.teacher_name}</Td>
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
                        <Text
                        fontWeight="semibold"
                        >
                        {c.title}
                      </Text>
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
              <Text as="b" color="#797878">
                Nombre y Apellido:
              </Text>
            </Td>
            <Td>
              {props.userState.firstName + " " + props.userState.lastName}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b" color="#797878">
                Fecha de Nacimiento:
              </Text>
            </Td>
            <Td>
              {props.userState && props.userState.fecNacimiento
                ? props.userState.fecNacimiento
                : "TODO: needs fix"}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b" color="#797878">
                Estudios:
              </Text>
            </Td>

            {props.userState && props.userState.experiencias ? (
              <>
                {props.userState.experiencias.map((c, idx) => (
                  <Td key={idx}>TODO: needs fix</Td>
                ))}
              </>
            ) : (
              <>
                <Td>TODO: needs fix</Td>
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
  const [profileDetails, setProfileDetails] = useState([]);
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

  const fetchProfileDetails = async () => {
    console.log("executing fetchProfileDetails at Profile");
    const result = await profileService.getProfileById(
      props.userState.user.profile
    );
    let profile = result.data.docs[0];
    setProfileDetails({
      name: profile.firstName + " " + profile.lastName,
      fecNacimiento: profile.fecNacimiento,
      role: profile.role,
      // TODO: completar en onboarding
      //estudios: [profile.estudios],
      photo: profile.photo,
    });
    //console.log("profileDetails: " + profileDetails.photo)
  };

  useEffect(() => {
    fetchProfileDetails();
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
            photo={profileDetails.photo}
          />
        }
      />
    </>
  );
};

export default Profile;
