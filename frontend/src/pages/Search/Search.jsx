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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import ClaseCard from "../../components/ClaseCard/ClaseCard";

import Pagination from "../../components/Pagination/Pagination";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useState } from "react";

import { clases } from "../../mock/mocks";

import { useParams } from "react-router-dom";

import * as claseService from '../../services/claseService'


const SearchComponent = (props) => {

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  let { page } = useParams();

  const [clases, setClases] = useState([])

  const [materia, setMateria] = useState('')
  const [tipoClase, setTipoClase] = useState('')
  const [frecuencia, setFrecuencia] = useState('')
  const [rating, setRating] = useState(0)


  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0
  })

  const fetchClases = async () => {
    console.log("ejecuta fetchClases at SearchComponent")
    const clasesData = await claseService.getClases({ materia: materia, tipo_clase: tipoClase, frecuencia: frecuencia, rating_min: rating }, page, 5);
    setClases(clasesData.data.docs);
    setPagination({
      page: clasesData.data.page,
      totalPages: clasesData.data.totalPages
    });
    //console.log("retrieving clases");
    //console.log(clases);
    //console.log(pagination);
  }

  useEffect(() => {

    if (page === undefined) {
      page = 1;
    }

    console.log("ejecuta useEffect at SearchComponent")

    if (materia !== "" || tipoClase !== "" || frecuencia !== "" || rating !== "") {
      
      fetchClases();
    }
    



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
                  Calif. min.
                </FormLabel>
                <Slider defaultValue={0} min={0} max={100} step={20} onChange={(val) => {setRating(val/20);console.log(val/20);}}>
                  <SliderMark
                    value={rating}
                    textAlign='right'
                    color='teal'
                    mt='-10'
                    ml='20'
                    w='12'
                  >
                    {rating}⭐
                  </SliderMark>
                  <SliderTrack bg='teal.600'>
                    <Box position='relative' right={10} />
                    <SliderFilledTrack bg='teal.500' />
                  </SliderTrack>
                  <SliderThumb boxSize={8} />
                </Slider>
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
