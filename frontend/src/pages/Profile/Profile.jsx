import { 
  Box,   
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
} from '@chakra-ui/react'


import Pagination from '../../components/Pagination/Pagination'
import BackgroundLayout from '../../components/Layout/BackgroundLayout'


const Tabla = () => {
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

const Profile = () => {

  return (
    <>
      <BackgroundLayout
        component={<Tabla/>}
      />
    </>
  )
}
 
export default Profile