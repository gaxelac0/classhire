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
  VStack
} from "@chakra-ui/react";

import ClaseCard from "../../components/ClaseCard/ClaseCard";
import Pagination from "../../components/Pagination/Pagination";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as claseService from '../../services/claseService'


const SearchComponent = (props) => {

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

    let query = {}
    if (materia && materia !== '') {
      query["materia"] = materia;
    }

    if (tipoClase && tipoClase !== '') {
      query["tipo_clase"] = tipoClase;
    }

    if (frecuencia && frecuencia !== '') {
      query["frecuencia"] = frecuencia;
    }

    if (rating && rating !== '') {
      query["rating_min"] = rating;
    }



    const clasesData = await claseService.getClases(query, page, 5);
    setClases(clasesData.data.docs);
    setPagination({
      page: clasesData.data.page,
      totalPages: clasesData.data.pages
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

    if (materia !== "" || tipoClase !== "" ||
      frecuencia !== "" ||  rating !== "") {
      fetchClases();
    }
  }, [page, materia, tipoClase, frecuencia, rating])

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
                  onChange={(e) => setMateria(e.target.options[e.target.selectedIndex].id)}
                >
                  <option id="ruby">Ruby</option>
                  <option id="java">Java</option>
                  <option id="golang">Go / Golang</option>
                  <option id="javascript">JavaScript</option>
                  <option id="cplusplus">C++</option>
                  <option id="python">Python</option>
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
                  onChange={(e) => setTipoClase(e.target.options[e.target.selectedIndex].id)}
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
                  onChange={(e) => setFrecuencia(e.target.options[e.target.selectedIndex].id)}
                >
                  <option id="once" value={'once'}>Única vez</option>
                  <option id="diaria" value={'diaria'}>Diaria</option>
                  <option id="semanal" value={'once'}>Semanal</option>
                  <option id="mensual" value={'mensual'}>Mensual</option>
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
        </chakra.form>
      </Flex>
      <VStack>
      {clases.map((c) => (
        <>
          <ClaseCard
            title={c.title}
            date={c.date}
            description={c.description}
            tags={c.tags}
            rating={c.rating}
            reviewCount={c.reviewCount}
            teacher_name={c.teacher_name}
            teacher_photo={c.teacher_photo}
          />
          <Divider h="15px" />
        </>
      ))}
      <Pagination pagination={pagination} route={"search"} />
      </VStack>
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
