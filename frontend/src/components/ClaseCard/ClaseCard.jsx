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



const ClaseCard = (props) => {
  //console.log(props)

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
          <Box justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="sm"
              color="gray.600"
            >
              {props.date}
            </chakra.span>
            <Link
              ml={"1em"}
              href="/clase"
              px={3}
              py={1}
              fontWeight="700"
              rounded="md"
              bgGradient='linear(to-r, teal.500, teal.400)'
              _hover={{
                bgGradient: 'linear(to-r, teal.600, teal.500)',
              }}
            >
              Entrar
            </Link>
          </Box>

          <Box mt={2}>
            <Text fontSize={30} as="b">
              {props.title}
            </Text>
            <chakra.p
              mt={2}
              color="gray.600"
            >
              {props.description}
            </chakra.p>
          </Box>

          <Box justifyContent="space-between" alignItems="center" mt={5}>
            <HStack spacing={2}>
              {props.tags.map((t) => (
                <Tag
                  size="sm"
                  key={t}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='teal'
                >
                  <TagLabel>{t}</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
            </HStack>

            <Box alignItems="center">
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
                src={`data:image/jpeg;base64,${props.teacher_photo}`}
                alt="imag"
              />
              <Link
                color="gray.700"
                fontWeight="700"
                cursor="pointer"
              >
                {props.teacher_name}
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ClaseCard