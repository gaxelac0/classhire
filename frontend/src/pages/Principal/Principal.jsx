import { React } from "react";
import {
  Box,
  Button,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import ClaseCard from "../../components/Card/ClaseCard";

import { useState, useEffect } from "react";

import * as claseService from "../../services/claseService";
import { useNavigate } from "react-router-dom";

const Feature = ({ heading, text }) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

const PrincipalComponent = () => {

  let navigate = useNavigate()
  const [clases, setClases] = useState([]);
  const [materia, setMateria] = useState("");

  useEffect(() => {
    const fetchClases = async () => {
      console.log("ejecuta fetchClases at PrincipalComponent");

      let query = {};
      if (materia && materia !== "") {
        query["materia"] = materia;
      }

      const clasesData = await claseService.getClases(query, 1, 4);
      setClases(clasesData.data.docs);

      //console.log("retrieving clases");
      //console.log(clases);
      //console.log(pagination);
    };
    console.log("ejecuta useEffect at PrincipalComponent");

    fetchClases();
  }, [materia]);

  return (
    <>
      <Box display="flex" justifyContent="Center">
        <SimpleGrid columns={{ sm: 1, md: 1 }} spacing="8" textAlign="center">
          <chakra.h1 fontSize="6xl" fontWeight="900" color="#000000">
            Classhire
          </chakra.h1>
          <chakra.h2 fontSize="3xl" fontWeight="700">
            Marketplace de profesores particulares
          </chakra.h2>

          <Select
            id="materia"
            name="materia"
            value={materia}
            onChange={(e) =>
              setMateria(e.target.options[e.target.selectedIndex].id)
            }
            placeholder="Selecciona la materia"
            mt={1}
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
          >
             <option id="quimica" value={"quimica"}>
                      Quimica
                    </option>
            <option id="golang" value={"golang"}>
              Go / Golang
            </option>
            <option id="java" value={"java"}>
              Java
            </option>
            <option id="ruby" value={"ruby"}>
              Ruby
            </option>
            <option id="python" value={"python"}>
              Python
            </option>
            <option id="javascript" value={"javascript"}>
              JavaScript
            </option>
            <option id="cplusplus" value={"cplusplus"}>
              C++
            </option>
            <option id="matematica" value={"matematica"}>
                      Matematica
                    </option>
          </Select>

          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="1em">
            {clases.map((c, id) => (
              <ClaseCard
                key={id}
                clase={c}
              />
            ))}
          </SimpleGrid>

          <Box as={Container} maxW="7xl" p={4}>
            <Divider mt={2} mb={10} />
            <Grid
              justifyContent="Center"
              textAlign="center"
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              }}
              gap={{ base: "8", sm: "12", md: "16" }}
            >
              <Feature
                heading={"Busc??"}
                text={
                  "Amplia variedad de materias, profesores con modalidad de clases individual o grupal"
                }
              />
              <Feature
                heading={"Eleg??"}
                text={
                  "Seleccion?? al profesor y modalidad que se ajuste a tus necesidades"
                }
              />
              <Feature
                heading={"Aprend??"}
                text={"Con clases particulares se aprende m??s r??pido"}
              />
              <Feature
                heading={"Calific??"}
                text={"Tu experiencia sirve a otros"}
              />
            </Grid>
          </Box>
          <Grid
            justifyContent="Center"
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
            }}
            gap={{ base: "8", sm: "12", md: "16" }}
          >
            <Button
            onClick={() => navigate("/search")}
            colorScheme="teal" size="lg" variant="outline">
              Aprender
            </Button>
            <Button 
             onClick={() => navigate("/clase/add")}
            colorScheme="teal" size="lg" variant="outline">
              Dar clases
            </Button>
          </Grid>
        </SimpleGrid>
      </Box>
    </>
  );
};

const Principal = (props) => {
  return <BackgroundLayout component={<PrincipalComponent />} />;
};

export default Principal;
