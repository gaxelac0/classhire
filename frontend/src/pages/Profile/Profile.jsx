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


const FittedTab = (props) => {

  useEffect(() => {
    console.log("received clases in FittedTab")
    console.log(props.clases)
  }, [])

  return(
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
          <TablaMaterias user={props.user} clases={props.clases}/>
        </TabPanel>
        {/* Datos Personales */}
        <TabPanel>
          <Center mb='3em'>
            <Image
              borderRadius='full'
              boxSize='200px'
              src='https://holatelcel.com/wp-content/uploads/2022/08/hombre-estudiante-universitario.jpg'
              alt='Dan Abramov'
            />
          </Center>
          <Center>
            <TablaDatos/>
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

  useEffect(() => {
    console.log("received clases in TablaMaterias")
    console.log(props.clases)
  }, [])

  return (
  <Center>
    <Box overflowX="auto">
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Ultimas 5 clases {props.user.role === "student" ? "contratadas" : "publicadas"}</TableCaption>
          <TableCaption>UserName: {props.user.name}</TableCaption>
          <Thead>
            <Tr>
              <Th>Titulo</Th>
              <Th>Profesor</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>

            {props.clases.map((c) => (
            <Tr>
              <Td>{c.title}</Td>
              <Td>{c.profName}</Td>
              <Td>{c.date}</Td>
              {props.user.role === "student" 
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
      <Pagination/>
    </Box>
  </Center>
  )
}

const TablaDatos = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" size="md">
        <TableCaption>
          <Button colorScheme="teal" size="sm">Editar datos</Button>
        </TableCaption>
        <Tbody>
          <Tr>
            <Td><Text as="b" color="#797878">Nombre y Apellido:</Text></Td>
            <Td>Eric D'angelo</Td>
          </Tr>
          <Tr>
            <Td><Text as="b" color="#797878">Fecha de Nacimiento:</Text></Td>
            <Td>15/10/1998</Td>
          </Tr>
          <Tr>
            <Td><Text as="b" color="#797878">Estudios:</Text></Td>
            <Td>Universitario en curso</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Profile = ({user}) => {


  const [clases, setClases] = useState([])

  useEffect(() => {
    const fetchClases = async () => {
      const clasesData = await claseService.getClasesByUser()
      setClases(clasesData.data.docs)
      console.log("retrieving clases")
      console.log(clasesData.data.docs)
    }
    fetchClases()
  }, [])

  return (
    <>
      <BackgroundLayout
        component={<FittedTab
        user={user}
        clases={clases}/>}
      />
    </>
  )
}
 
export default Profile