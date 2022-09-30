import { 
  Box, Center, Button,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
  Tabs,Tab, TabList, TabPanels, TabPanel,
  Image, Text
} from '@chakra-ui/react'


import Pagination from '../../components/Pagination/Pagination'
import BackgroundLayout from '../../components/Layout/BackgroundLayout'


const FittedTab = () => {
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
          <TablaMaterias/>
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

const TablaMaterias = () => {
  return (
  <Center>
    <Box overflowX="auto">
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Ultimas 5 clases contratadas</TableCaption>
          <Thead>
            <Tr>
              <Th>Titulo</Th>
              <Th>Profesor</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Analisis Matematico - Individual</Td>
              <Td>Mario Hernandez</Td>
              <Td>25/09/2022</Td>
            </Tr>
            <Tr>
            <Td>Analisis Matematico - Individual</Td>
              <Td>Mario Hernandez</Td>
              <Td>25/09/2022</Td>
            </Tr>
            <Tr>
            <Td>Analisis Matematico - Individual</Td>
              <Td>Mario Hernandez</Td>
              <Td>25/09/2022</Td>
            </Tr>
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

const Profile = () => {

  return (
    <>
      <BackgroundLayout
        component={<FittedTab/>}
      />
    </>
  )
}
 
export default Profile