import { React, useEffect } from "react";
import {
  chakra,
  Box,
  Divider,
  Stack,
  Button,
  Flex,
  FormLabel,
  FormControl,
  GridItem,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";

import ClaseCard from "../../components/ClaseCard/ClaseCard";

import Pagination from "../../components/Pagination/Pagination";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useState } from "react";

import { clases } from "../../mock/mocks";


const SearchComponent = (props) => {

  const [materia, setMateria] = useState('')
  const [tipoClase, setTipoClase] = useState('')
  const [frecuencia, setFrecuencia] = useState('')
  const [rating, setRating] = useState('')

 
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0
  })

  useEffect(() => {
    console.log("ejecuta useEffect at SearchComponent")

    

    setPagination({ page: 0, totalPages: 0 }) // TODO hardcoded

  }, [materia, tipoClase, frecuencia, rating])

  return (
    <>
      <Flex
        width="full"
        alignItems="center"
        justifyContent="center"
        px={2}
        py={2}
      >
        <chakra.form
          method="POST"
          overflow={{
            sm: "hidden",
          }}
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg="white"
          maxW="max"
        >
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg="white"
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                >
                  Materia
                </FormLabel>

                <Select
                  id="Materia"
                  name="materia"
                  autoComplete="materia"
                  placeholder="Materia"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={(e) => setMateria(e.target.value)} // TODO continue here
                >
                  <option id="matematica">Matemática</option>
                  <option id="quimica">Química</option>
                  <option id="fisica">Física</option>
                </Select>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                >
                  Tipo de clase
                </FormLabel>
                <Select
                  id="tipoClase"
                  name="tipoClase"
                  placeholder="Tipo de Clase"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={(e) => setTipoClase(e.target.value)}
                >
                  <option id="individual">Individual</option>
                  <option id="grupal">Grupal</option>
                </Select>
              </FormControl>
              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                >
                  Frecuencia
                </FormLabel>
                <Select
                  id="frecuencia"
                  name="frecuencia"
                  placeholder="Frecuencia"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={(e) => setFrecuencia(e.target.value)}
                >
                  <option id="unica">Única</option>
                  <option id="semanal">Semanal</option>
                  <option id="mensual">Mensual</option>
                </Select>
              </FormControl>
              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                >
                  Calificación
                </FormLabel>
                <Select
                  id="rating"
                  name="rating"
                  placeholder="Rating (1-5)"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option id="1">1</option>
                  <option id="2">2</option>
                  <option id="3">3</option>
                  <option id="4">4</option>
                  <option id="5">5</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </Stack>
          <Box
            px={{
              base: 4,
              sm: 6,
            }}
            py={3}
            bg="gray.50"

            textAlign="right"
            maxW="max"
          >
            <Button
              _focus={{
                shadow: "",
              }}
              fontWeight="md"
              bgGradient='linear(to-r, teal.500, teal.400)'
              _hover={{
                bgGradient: 'linear(to-r, teal.600, teal.500)',
              }}
            >
              Save
            </Button>
          </Box>
        </chakra.form>
      </Flex>
      {clases.map((c) => (
        <>
          <ClaseCard
            title={c.title}
            date={c.date}
            description={c.description}
            tags={c.tags}
            profName={c.profName}
            profImage={c.profImage}
          />
          <Divider h="15px" />
        </>
      ))}
      <Pagination pagination={pagination} />
    </>
  );
};

const Search = (props) => {

  return (
    <>
      <BackgroundLayout
        component={<SearchComponent />}
      />
    </>
  );
};

export default Search
