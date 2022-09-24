import { React } from "react";
import {
  chakra,
  Stack,
  Box,
  Button,
  Flex,
  FormLabel,
  FormControl,
  GridItem,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";

const FilterForm = () => {
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
          _dark={{
            bg: "gray.800",
          }}
          maxW="max"
        >
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg="white"
            _dark={{
              bg: "#141517",
            }}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              {/* <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="first_name"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Materia
                </FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                />
              </FormControl> */}

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  //htmlFor="Materia"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Materia
                </FormLabel>

                <Select
                  id="Materia"
                  name="country"
                  autoComplete="country"
                  placeholder="Seleccionar Opción"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>Matemática</option>
                  <option>Química</option>
                  <option>Física</option>
                </Select>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  //htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Tipo de clase
                </FormLabel>
                <Select
                  id="TipoClase"
                  //name="country"
                  //autoComplete="country"
                  placeholder="Seleccionar Opción"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>Individual</option>
                  <option>Grupal</option>
                </Select>
              </FormControl>


              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  //htmlFor="Frecuencia"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Frecuencia
                </FormLabel>
                <Select
                  id="Frecuencia"
                  //name="country"
                  //autoComplete="country"
                  placeholder="Seleccionar Opción"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>Única</option>
                  <option>Semanal</option>
                  <option>Mensual</option>
                </Select>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  //htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Calificación
                </FormLabel>
                <Select
                  id="country"
                  //name="country"
                  //autoComplete="country"
                  placeholder="Seleccionar Opción"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
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
              //Por ahora que no haga nada
              //type="submit"
              //colorScheme="teal"
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
    </>
  )
}

export default FilterForm