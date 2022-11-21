import { React, useEffect } from "react";
import {
  chakra,
  Box,
  Divider,
  Stack,
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
  VStack,
  Text,
  Icon
} from "@chakra-ui/react";
import { WarningTwoIcon } from '@chakra-ui/icons'
import ClaseCard from "../../components/Card/ClaseCard";
import Pagination from "../../components/Pagination/Pagination";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as claseService from "../../services/claseService";

const SearchComponent = (props) => {
  let navigate = useNavigate();

  let { page } = useParams();

  const [clases, setClases] = useState([]);

  const [materia, setMateria] = useState("");
  const [tipoClase, setTipoClase] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [rating, setRating] = useState(0);

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchClases = async () => {
      console.log("ejecuta fetchClases at SearchComponent");

      let query = {};
      if (materia && materia !== "") {
        query["materia"] = materia;
      }

      if (tipoClase && tipoClase !== "") {
        query["tipo_clase"] = tipoClase;
      }

      if (frecuencia && frecuencia !== "") {
        query["frecuencia"] = frecuencia;
      }

      if (rating && rating !== "") {
        query["rating_min"] = rating;
      }

      const clasesData = await claseService.getClases(query, page, 5);
      setClases(clasesData.data.docs);

      if (clasesData.data.page > clasesData.data.pages) {
        setPagination({
          page: 1,
          totalPages: clasesData.data.pages,
        });
        navigate("/search/1");
      } else {
        setPagination({
          page: clasesData.data.page,
          totalPages: clasesData.data.pages,
        });
      }
      //console.log("retrieving clases");
      //console.log(clases);
      //console.log(pagination);
    };

    console.log("ejecuta useEffect at SearchComponent");

    if (
      materia !== "" ||
      tipoClase !== "" ||
      frecuencia !== "" ||
      rating !== ""
    ) {
      fetchClases();
    }
  }, [page, materia, tipoClase, frecuencia, rating]);

  // TODO agregar seccion de Ordenamiento al lado de Filtros
  // TODO heading Filtros / Heading Sorting
  return (
    <>
      <Box display="flex" justifyContent="Center">
        <VStack>
          <chakra.form
            method="POST"
            overflow={{
              sm: "hidden",
            }}
            mx="auto"
            rounded="lg"
            shadow="lg"
            bg="white"
            maxW="max"
          >
            <Stack px={4} py={5} p={[null, 6]} bg="white" spacing={6}>
              <SimpleGrid columns={6} spacing={6}>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
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
                    onChange={(e) =>
                      setMateria(e.target.options[e.target.selectedIndex].id)
                    }
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
                  <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
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
                    onChange={(e) =>
                      setTipoClase(e.target.options[e.target.selectedIndex].id)
                    }
                  >
                    <option id="individual">Individual</option>
                    <option id="grupal">Grupal</option>
                  </Select>
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
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
                    onChange={(e) =>
                      setFrecuencia(e.target.options[e.target.selectedIndex].id)
                    }
                  >
                    <option id="once" value={"once"}>
                      Única vez
                    </option>
                    <option id="diaria" value={"diaria"}>
                      Diaria
                    </option>
                    <option id="semanal" value={"once"}>
                      Semanal
                    </option>
                    <option id="mensual" value={"mensual"}>
                      Mensual
                    </option>
                  </Select>
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
                    Calif. min.
                  </FormLabel>
                  <Slider
                    defaultValue={0}
                    min={0}
                    max={100}
                    step={20}
                    onChange={(val) => {
                      setRating(val / 20);
                     // console.log(val / 20);
                    }}
                  >
                    <SliderMark
                      value={rating}
                      textAlign="right"
                      color="teal"
                      mt="-10"
                      ml="20"
                      w="12"
                    >
                      {rating}⭐
                    </SliderMark>
                    <SliderTrack bg="teal.600">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="teal.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={8} />
                  </Slider>
                </FormControl>
              </SimpleGrid>
            </Stack>
          </chakra.form>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="1em">
            {clases && clases.map((c, idx) => (
              <ClaseCard
                key={idx}
                clase={c}
              />
            ))}
          </SimpleGrid>
          { clases && clases.length <= 0 && 
            
            <Text
              fontSize='lg'
              color="GrayText"
              as="b">
              <Icon as={WarningTwoIcon} w={8} h={5} color='red.300' />
              No se encontraron resultados
            </Text>
          }
          <Pagination pagination={pagination} route={"search"} />
        </VStack>
      </Box>
    </>
  );
};

const Search = (props) => {
  return (
    <>
      <BackgroundLayout component={<SearchComponent />} />
    </>
  );
};

export default Search;
