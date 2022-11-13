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
  InputGroup, Input, FormLabel, Textarea, FormHelperText, Icon, InputLeftAddon, Avatar, VisuallyHidden, Select, useToast
} from '@chakra-ui/react';

import { FaUser } from 'react-icons/fa';

import BackgroundLayout from "../../components/Layout/BackgroundLayout"

import { useState } from 'react';

import { useNavigate } from 'react-router-dom'

import * as claseService from '../../services/claseService'

const CrearClaseComponent = (props) => {

  const toast = useToast()
  const navigate = useNavigate()
  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    title: '',
    materia: '',
    description: '',
    price: 0,
    duration: 0,
    nivel: '',
    tags: '',
    frecuencia: '',
    tipo_clase: '',
    portada: '',
  })

  const handleChange = e => {
    console.log(e)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      let clase = await claseService.addClase(formData)
      navigate('/clase/' + clase._id)
    } catch (err) {
      updateMessage(err.message)
    }
  }

  const updateMessage = msg => {
    setMessage(msg)
    if (msg && (msg !== '' || msg[0] !== '')) {
      toast({
        title: 'Error!',
        description: msg,
        status: 'error',
        position: 'top-right',
        duration: 6000,
        isClosable: true,
      })
    }
  }

  return (
    <Box p={10}>
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
            <Box display="flex" boxShadow='inner' px={[4, 0]} marginTop="1em">
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
            <form
              onSubmit={handleSubmit}
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
                    htmlFor="title"
                    fontSize="sm"
                    fontWeight="md"
                    color="teal.700"
                  >
                    Titulo de la clase
                  </FormLabel>
                  <Input
                    type="input"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Java para principiantes - Parte 2"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="teal.700"
                  >
                    Materia
                  </FormLabel>
                  <Select
                    id="materia"
                    name="materia"
                    value={formData.materia}
                    onChange={handleChange}
                    placeholder="Selecciona la materia"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  >
                    <option id='golang' value={'golang'}>Go / Golang</option>
                    <option id='java' value={'java'}>Java</option>
                    <option id='ruby' value={'ruby'}>Ruby</option>
                    <option id='python' value={'python'}>Python</option>
                    <option id='javascript' value={'javascript'}>JavaScript</option>
                    <option id='cplusplus' value={'cplusplus'}>C++</option>
                  </Select>
                </FormControl>

                <div>
                  <FormControl mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                    >
                      Descripcion
                    </FormLabel>
                    <Textarea
                      id="description"
                      placeholder="Clases individuales de matematica"
                      value={formData.description}
                      onChange={handleChange}
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
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
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
                      id="duration"
                      value={formData.duration}
                      onChange={handleChange}
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
                    value={formData.nivel}
                    onChange={handleChange}
                    placeholder="Selecciona el nivel"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  >
                    <option id='primaria' value={'primaria'}>Primaria</option>
                    <option id='secundaria' value={'secundaria'}>Secundaria</option>
                    <option id='terciaria' value={'terciaria'}>Terciario</option>
                    <option id='universitario' value={'universitario'} >Universitario</option>
                    <option id='seminario' value={'seminario'}>Seminario</option>
                  </Select>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 2]}>
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
                    value={formData.frecuencia}
                    onChange={handleChange}
                    placeholder="Frecuencia de dictado de clases"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md" s
                  >
                    <option id='once' value={'once'}>Unica vez</option>
                    <option id='diaria' value={'diaria'}>Diaria</option>
                    <option id='semanal' value={'semanal'}>Semanal</option>
                    <option id='mensual' value={'mensual'}>Mensual</option>
                  </Select>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                  >
                    Tipo de clase
                  </FormLabel>
                  <Select
                    id="tipo_clase"
                    value={formData.tipo_clase}
                    onChange={handleChange}
                    placeholder="Ingrese tipo de clase"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md" s
                  >
                    <option id='individual' value={'individual'}>Individual</option>
                    <option id='grupal' value={'grupal'}>Grupal</option>
                    <option id='consulta' value={'consulta'}>Consulta</option>
                  </Select>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.500"
                  >
                    Etiquetas 
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      bg="gray.100"
                      color="gray.500"
                      rounded="md"
                    >
                      Tags
                    </InputLeftAddon>
                    <Input
                      type="input"
                      id="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Etiquetas"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </InputGroup>
                  <FormHelperText>Etiquetas que identifican tu clase. Pon todas las que quieras separadas con coma!</FormHelperText>
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
            </form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>

  );
}

const CrearClase = (props) => {
  return (
    <BackgroundLayout
      component={<CrearClaseComponent />}
    >
    </BackgroundLayout>
  );
}

export default CrearClase;