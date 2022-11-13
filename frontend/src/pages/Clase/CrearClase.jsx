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
  InputGroup, Input, FormLabel, Textarea, FormHelperText, Icon, InputLeftAddon, Avatar, VisuallyHidden, Select, useToast, FormErrorMessage
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
    title: undefined,
    materia: undefined,
    description: undefined,
    price: undefined,
    duration: undefined,
    nivel: undefined,
    tags: undefined,
    frecuencia: undefined,
    tipo_clase: undefined,
    portada: undefined,
  })


  const isErrorTitle = formData.title === ''
  const isErrorMateria = formData.materia === ''
  const isErrorDescription = formData.description === ''
  const isErrorPrice= formData.price === ''
  const isErrorDuration = formData.duration === ''
  const isErrorNivel = formData.nivel === ''
  const isErrorTags = formData.tags === ''
  const isErrorFrecuencia = formData.frecuencia === ''
  const isErrorTipoClase = formData.tipo_clase === ''


  const handleChange = e => {
    //console.log(e)

    let value = (e.target.value === undefined || e.target.value === '') ? '' : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      console.log("formData: " + formData)
      let res = await claseService.addClase(formData)
      console.log("addClase res:" + res)
      navigate('/clase/' + res.data._id)
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
                <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={isErrorTitle} isRequired>
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
                  {isErrorTitle &&
                    <FormErrorMessage>El titulo es requirido.</FormErrorMessage> 
                  }
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={isErrorMateria} isRequired>
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
                  {isErrorMateria &&
                    <FormErrorMessage>La materia es requerida.</FormErrorMessage> 
                  }
                </FormControl>

                <div>
                  <FormControl mt={1} isInvalid={isErrorDescription} isRequired>
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
                    {isErrorDescription &&
                    <FormErrorMessage>La descripcion de la clase es requerida.</FormErrorMessage> 
                    }
                  </FormControl>
                </div>

                <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={isErrorPrice} isRequired>
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
                  {isErrorPrice &&
                    <FormErrorMessage>El precio de la clase es requerido.</FormErrorMessage> 
                  }
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={isErrorDuration} isRequired>
                  <FormLabel
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
                  {isErrorDuration &&
                    <FormErrorMessage>El ingreso de la duracion de la clase es obligatorio</FormErrorMessage> 
                  }
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={isErrorNivel} isRequired>
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
                  {isErrorDuration &&
                    <FormErrorMessage>El nivel de la clase es requerido</FormErrorMessage> 
                  }
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 2]}  isInvalid={isErrorFrecuencia} isRequired>
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
                  {isErrorFrecuencia &&
                    <FormErrorMessage>la frecuencia de la clase es requerida</FormErrorMessage> 
                  }
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={isErrorTipoClase} isRequired>
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
                  {isErrorTipoClase &&
                    <FormErrorMessage>El tipo de clase es requerido</FormErrorMessage> 
                  }
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