import {
  Box,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  GridItem,
  chakra,
  FormControl,
  Image,
  InputGroup, Input, FormLabel, Textarea, FormHelperText, Icon, InputLeftAddon, Avatar, VisuallyHidden, Divider, Select, Checkbox, RadioGroup, Radio
} from '@chakra-ui/react';

import { FaUser } from 'react-icons/fa';

import BackgroundLayout from "../../components/Layout/BackgroundLayout"

const CrearClaseComponent = () => {
  return (
    <Box

    p={10}
  >
    <Box>
      <SimpleGrid
        display={{
          base: "initial",
          md: "grid",
        }}
        columns={{
          md: 3,
        }}
        spacing={{
          md: 6,
        }}
      >
        <GridItem
          colSpan={{
            md: 1,
          }}
        >
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="md" lineHeight="6">
              Alta de una nueva clase
            </Heading>
            <Text
              mt={1}
              fontSize="sm"
              color="gray.600"
            >
              La informacion provista en estos formularios estara disponible a traves de nuestra plataforma para que estudiantes de todo el globo puedan contactarse contigo y acceder a tus clases.
            </Text>
          </Box>
          <Box display="flex"  boxShadow='inner' px={[4, 0]} marginTop="1em">
            <Image
            
            borderRadius='5'
            src="/img/class-company.jpg"
            />
          </Box>
        </GridItem>
        <GridItem
          mt={[5, null, 0]}
          colSpan={{
            md: 2,
          }}
        >
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, "md"]}
            overflow={{
              sm: "hidden",
            }}
          >
            <Stack
              px={4}
              py={5}
              bg="gray.50"
              spacing={6}
              p={{
                sm: 6,
              }}
            >


              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="titulo"
                  fontSize="sm"
                  fontWeight="md"
                  color="teal.700"
                >
                  Titulo de la clase
                </FormLabel>
                <Input
                  type="text"
                  name="titulo"
                  id="titulo"
                  autoComplete="titulo"
                  placeholder="Clase de Matematicas"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                />
              </FormControl>

              <div>
                <FormControl id="descr" mt={1}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                  >
                    Descripcion
                  </FormLabel>
                  <Textarea
                    placeholder="Clases individuales de matematica"
                    mt={1}
                    rows={3}
                    shadow="sm"
                    focusBorderColor="brand.400"
                    fontSize={{
                      sm: "sm",
                    }}
                  />
                  <FormHelperText>
                    Detalla una descripcion acerca de la clase, contenidos minimos, etc.
                  </FormHelperText>
                </FormControl>
              </div>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="precio"
                  fontSize="sm"
                  fontWeight="md"
                  color="teal.700"
                >
                  Precio
                </FormLabel>



                <InputGroup>
                <InputLeftAddon
                      bg="gray.100"
                      color="gray.500"
                      rounded="md"
                    >
                      AR$
                </InputLeftAddon>
                <Input
                  type="number"
                  name="precio"
                  id="precio"
                  autoComplete="precio"
                  placeholder="Precio"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                />
                </InputGroup>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="precio"
                  fontSize="sm"
                  fontWeight="md"
                  color="teal.700"
                >
                  Duracion (horas incl.)
                </FormLabel>

                <InputGroup>
                <InputLeftAddon
                      bg="gray.100"
                      color="gray.500"
                      rounded="md"
                    >
                      Horas
                </InputLeftAddon>
                <Input
                  type="number"
                  name="duracion"
                  id="duracion"
                  autoComplete="duracion"
                  placeholder="Cantidad de horas incluidas en el precio"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                />
                </InputGroup>


              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="nivel"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                  >
                    Nivel
                  </FormLabel>
                  <Select
                    id="nivel"
                    name="nivel"
                    autoComplete="nivel"
                    placeholder="Selecciona el nivel"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  >
                    <option>Primaria</option>
                    <option>Secundaria</option>
                    <option>Terciario</option>
                    <option>Universitario</option>
                    <option>Seminario</option>
                  </Select>
                </FormControl>

                <SimpleGrid columns={3} spacing={6}>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                  >
                    Sitio web
                  </FormLabel>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      bg="gray.100"
                      color="gray.500"
                      rounded="md"
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type="tel"
                      placeholder="www.ejemplo.com"
                      focusBorderColor="brand.400"
                      rounded="md"
                    />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                >
                  Foto
                </FormLabel>
                <Flex alignItems="center" mt={1}>
                  <Avatar
                    boxSize={12}
                    bg="gray.100"
                    icon={
                      <Icon
                        as={FaUser}
                        boxSize={9}
                        mt={3}
                        rounded="full"
                        color="gray.300"
                      />
                    }
                  />
                  <Button
                    type="button"
                    ml={5}
                    variant="outline"
                    size="sm"
                    fontWeight="medium"
                    _focus={{
                      shadow: "none",
                    }}
                  >
                    Cambiar
                  </Button>
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                >
                  Fotografia de portada
                </FormLabel>
                <Flex
                  mt={1}
                  justify="center"
                  px={6}
                  pt={5}
                  pb={6}
                  borderWidth={2}
                  borderStyle="dashed"
                  rounded="md"
                >
                  <Stack spacing={1} textAlign="center">
                    <Icon
                      mx="auto"
                      boxSize={12}
                      color="gray.400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Icon>
                    <Flex
                      fontSize="sm"
                      color="gray.600"
                      alignItems="baseline"
                    >
                      <chakra.label
                        htmlFor="file-upload"
                        cursor="pointer"
                        rounded="md"
                        fontSize="md"
                        color="brand.600"
                        pos="relative"
                        _hover={{
                          color: "brand.400",
                        }}
                      >
                        <span>Upload a file</span>
                        <VisuallyHidden>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                          />
                        </VisuallyHidden>
                      </chakra.label>
                      <Text pl={1}>or drag and drop</Text>
                    </Flex>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                    >
                      PNG, JPG, GIF up to 10MB
                    </Text>
                  </Stack>
                </Flex>
              </FormControl>
            </Stack>
            <Box
              px={{
                base: 4,
                sm: 6,
              }}
              py={3}
              bg="gray.100"
              textAlign="right"
            >
              <Button
                type="submit"
                colorScheme="teal"
                _focus={{
                  shadow: "",
                }}
                fontWeight="md"
              >
                Save
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>
    </Box>
  </Box>

  );
}

const CrearClase = () => {
  return (
    <BackgroundLayout
      component={<CrearClaseComponent/>}
    >
    </BackgroundLayout>
  );
}

export default CrearClase;