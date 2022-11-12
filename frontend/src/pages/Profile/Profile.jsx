import {
  Box,
  Center,
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
} from '@chakra-ui/react'

import { PhoneIcon, DeleteIcon } from '@chakra-ui/icons'


import Pagination from '../../components/Pagination/Pagination'
import BackgroundLayout from '../../components/Layout/BackgroundLayout'

import { clases } from '../../mock/mocks'


import { FaComment } from 'react-icons/fa'


import { useState, useEffect } from 'react'
import * as claseService from '../../services/claseService'
import * as profileService from '../../services/profileService'

import { useSearchParams } from 'react-router-dom'

import { useFocusEffect } from '@chakra-ui/react'

import { useParams } from 'react-router-dom'

import { VStack } from '@chakra-ui/react'


const FittedTab = (props) => {

  return (
    <Tabs variant='soft-rounded' colorScheme="teal">
      {/* Elemmentos del perfil */}
      <TabList mb='1em'>
        <Tab>Materias</Tab>
        <Tab>Datos Personales</Tab>
        {/* <Tab>Otra Cosa</Tab> */}
      </TabList>
      {/* Contenido de los elementos */}
      <TabPanels>
        {/* Materias */}
        <TabPanel>
          <TablaMaterias userState={props.userState} clases={props.clases} pagination={props.pagination} />
        </TabPanel>
        {/* Datos Personales */}
        <TabPanel>
          <Center mb='3em'>

            <HStack>
              <Image
                borderRadius='full'
                boxSize='200px'
                src={`data:image/jpeg;base64,${props.photo}`}
                alt={props.userState.user.firstName}
              />
              <TablaDatos userState={props.userState.user} />
            </HStack>


          </Center>
        </TabPanel>
        {/* Otra Cosa */}
        {/* <TabPanel>
          <p>No me acuerdo que contenido iba acá</p>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  )
}

const TablaMaterias = (props) => {

  return (
    <Center>


      <VStack>
        <Box overflowX="auto">
          {props.pagination.totalPages === 0
            /*  TODO: "Agrega o contrata tu primera clase!!" *con boton de Agregar clase para profesor y el boton de search para estudiantes* */
            ? <><Text>Todavia no publicaste nada</Text></>

            :
            <>
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption>Ultimas {props.clases.length} clases {props.userState.role === "student" ? "contratadas" : "publicadas"}</TableCaption>
                  {/* TODO: remover estos captions eran de prueba nomas */}
                  <Thead>
                    <Tr>
                      {props.userState.role === "student"
                        ?

                        <>
                          <Th>Titulo</Th>
                          <Th>Profesor</Th>
                          <Th>Fecha</Th>
                          <Th>Acciones</Th>
                        </>

                        :

                        <>
                          <Th>Titulo</Th>
                          <Th>Fecha</Th>
                          <Th>Acciones</Th>
                        </>

                      }
                    </Tr>
                  </Thead>
                  <Tbody>

                    {props.clases.map((c) => (
                      <Tr>

                        {props.userState.role === "student"
                          ?
                          <>
                            <Td>{c.title}</Td>
                            <Td>{c.profName}</Td>
                            <Td>{c.date}</Td>
                          </>

                          :

                          <>
                            <Td>{c.title}</Td>
                            <Td>{c.date}</Td>
                          </>


                        }
                        {props.userState.role === "student"
                          ?
                          <>
                            <Td>
                              <HStack>
                                <IconButton
                                  colorScheme='teal'
                                  aria-label='Call Segun'
                                  size='lg'
                                  icon={<DeleteIcon />}
                                />
                                <IconButton
                                  colorScheme='teal'
                                  aria-label='Call Segun'
                                  size='lg'
                                  icon={<FaComment />}
                                />
                              </HStack>
                            </Td>
                          </>
                          :
                          <>
                            <Td>
                              <HStack>
                                {c.date}
                                {c.date}
                              </HStack>
                            </Td>
                          </>
                        }
                      </Tr>
                    ))}




                  </Tbody>
                </Table>
              </TableContainer>
              <Pagination pagination={props.pagination} />
            </>
          }




        </Box>
        <Text color="red">Name: {props.userState.user.firstName + ' ' + props.userState.user.lastName}</Text>
        <Text color="red">page: {props.pagination.page}</Text>
        <Text color="red">totalPages: {props.pagination.totalPages}</Text>
      </VStack>


    </Center>
  )
}

const TablaDatos = (props) => {

  //console.log(props);

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" size="md">
        <TableCaption>
          <Button colorScheme="teal" size="sm">Editar datos</Button>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td><Text as="b" color="#797878">Nombre y Apellido:</Text></Td>
            <Td>{props.userState.firstName + ' ' + props.userState.lastName}</Td>
          </Tr>
          <Tr>
            <Td><Text as="b" color="#797878">Fecha de Nacimiento:</Text></Td>
            <Td>{props.userState && props.userState.fecNacimiento ? props.userState.fecNacimiento : "TODO: needs fix"}</Td>
          </Tr>
          <Tr>
            <Td><Text as="b" color="#797878">Estudios:</Text></Td>


            {props.userState && props.userState.experiencias
              ?
              <>
                {props.userState.experiencias.map((c) => (
                 <Td>TODO: needs fix</Td>
                ))}
                
              </>
              :
              <>
                <Td>TODO: needs fix</Td>
              </>
            }



          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Profile = (props) => {

  let { page } = useParams();

  const [clases, setClases] = useState([])
  const [profileDetails, setProfileDetails] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0
  })



  useEffect(() => {
    const fetchClases = async () => {
      const clasesData = await claseService.getClasesByUser(props.userState.user.profile, page, 5);
      setClases(clasesData.data.docs);
      setPagination({
        page: clasesData.data.page,
        totalPages: clasesData.data.totalPages
      });
      //console.log("retrieving clases");
      //console.log(clases);
      //console.log(pagination);
    }
    fetchClases();




    const fetchProfileDetails = async () => {
      const result = await profileService.getProfileDetails(props.userState.user.profile);
      let profile = result.data.docs[0];
      setProfileDetails({
        name: profile.firstName + ' ' + profile.lastName,
        fecNacimiento: profile.fecNacimiento,
        role: profile.role,
        // TODO: completar en onboarding
        //estudios: [profile.estudios],
        photo: profile.photo
      });
      //console.log("profileDetails: " + profileDetails.photo)
    }
    fetchProfileDetails();





  }, [page])

  return (
    <>
      <BackgroundLayout
        component={<FittedTab
          userState={props.userState}
          clases={clases}
          pagination={pagination}
          photo={profileDetails.photo}
        />}
      />
    </>
  )
}

export default Profile