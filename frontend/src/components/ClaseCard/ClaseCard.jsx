import { React } from "react";
import {
  chakra,
  Box,
  Image,
  Link,
  Flex,
  Text,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton
} from "@chakra-ui/react";



  const ClaseCard = () => {
    return (
      <>
      <Flex
      width="full"
      alignItems="center"
      justifyContent="center"
      px={8}
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg="white"
        maxW="max"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color="gray.600"
          >
            Mar 10 de Octubre, 2022
          </chakra.span>
          <Link
            href="/clase"
            px={3}
            py={1}
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            bgGradient='linear(to-r, teal.500, teal.400)'
            _hover={{
              bgGradient: 'linear(to-r, teal.600, teal.500)',
            }}
          >
            Entrar
          </Link>
        </Flex>

        <Box mt={2}>
          <Text fontSize={30} as="b">
            Análisis Matemático
          </Text>
          {/* <Link
            fontSize="2xl"
            color="gray.700"
            fontWeight="700"
            _hover={{
              color: "gray.600",
              textDecor: "underline",
            }}
          >
            Matemática avanzada
          </Link> */}
          <chakra.p
            mt={2}
            color="gray.600"
          >
            Aborda temas como las derivadas, las integrales, los límites, las series y diversos tipos de funciones complejas. 
            El análisis matemático tiene como fin resolver cálculos complejos a través de la abstracción. 
            Para ello, se vale de herramientas como las funciones.
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={5}>

          {/* <Text fontSize={18}>
            Calificación:{" "}
              <Link
              //href="/ver-clase"
              color="brand.600"
              _hover={{
                textDecor: "underline",
              }}
            >
              4
            </Link>
          </Text> */}
          
          <HStack spacing={2}>

              <Tag
                size="sm"
                key="sm"
                borderRadius='full'
                variant='solid'
                colorScheme='teal'
              >
                <TagLabel>Matemática</TagLabel>
                <TagCloseButton />
              </Tag>

              <Tag
                size="sm"
                key="sm"
                borderRadius='full'
                variant='solid'
                colorScheme='teal'
              >
                <TagLabel>Individual</TagLabel>
                <TagCloseButton />
              </Tag>

              <Tag
                size="sm"
                key="sm"
                borderRadius='full'
                variant='solid'
                colorScheme='teal'
              >
                <TagLabel>Semanal</TagLabel>
                <TagCloseButton />
              </Tag>

              <Tag
                size="sm"
                key="sm"
                borderRadius='full'
                variant='solid'
                colorScheme='teal'
              >
                <TagLabel>4</TagLabel>
                <TagCloseButton />
              </Tag>

          </HStack>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{
                base: "none",
                sm: "block",
              }}
              src="https://s03.s3c.es/imag/_v0/770x420/0/d/f/profesor-pizarra-dreamstime.jpg"
              alt="imag"
            />
            <Link
              color="gray.700"
              fontWeight="700"
              cursor="pointer"
            >
              Joe Fatheree
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
    </>
    )
  }

  export default ClaseCard