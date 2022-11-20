import {
  Box,
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
  Icon,
  Tooltip,
} from "@chakra-ui/react";

import { CheckIcon, DeleteIcon, SmallCloseIcon, SpinnerIcon, TimeIcon } from "@chakra-ui/icons";
import { MdUploadFile } from "react-icons/md";

import Pagination from "../../components/Pagination/Pagination";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { FaComment } from "react-icons/fa";

import { useState, useEffect } from "react";
import * as claseService from "../../services/claseService";

import { Heading } from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";
import EditProfileFrm from "./EditProfileFrm";

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
          <EditProfileFrm
            userState={props.userState}
            roleSelection={props.userState.role}
          />
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
                <Th>Clase</Th>
                <Th display={{ sm: "none", md: "inline-block" }}>Profesor</Th>
                <Th display={{ sm: "none", md: "inline-block" }}>Fecha</Th>
                <Th>Acciones</Th>
              </>
            ) : (
              <>
                <Th>Clase</Th>
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
                      <Tooltip label={<Text textTransform={"uppercase"}>{c.contrataciones.docs[0].state}</Text>}>
                        <Icon
                          mr={"1em"}
                          as={iconByStatus(c.contrataciones.docs[0].state)}
                          size="xs"
                          alignSelf="left"
                          color="teal.500"
                        />
                        </Tooltip>
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
                    <Link to={"/clase/" + c._id}>
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
          <FittedTab
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

  switch(state) {
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
    default: {
      return TimeIcon;
    }
  }
}

export default Profile;
