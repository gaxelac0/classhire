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
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";

const ClaseCard = (props) => {
  //console.log(props)

  return (
    <>
      <Flex p={5} w="full" alignItems="center" justifyContent="center">
        <Box
          mx="auto"
          rounded="lg"
          shadow="lg"
          borderWidth="1px"
          minW={"272px"}
          minH={"612px"}
          bg="white"
          maxW="sm"
          p={"1em"}
        >
          <Image src={"http://localhost:3000/img/matematicas.jpg"} alt={"props.clase.imageAlt"} roundedTop="lg" />
          <Box justifyContent="space-between" alignItems="center">
            <chakra.span fontSize="sm" color="gray.600">
              {props.clase.date}
            </chakra.span>
            <Link
              ml={"1em"}
              href={"/clase/"+props.clase._id}
              px={3}
              py={1}
              fontWeight="700"
              rounded="md"
              bgGradient="linear(to-r, teal.500, teal.400)"
              _hover={{
                bgGradient: "linear(to-r, teal.600, teal.500)",
              }}
            >
              Entrar
            </Link>
          </Box>
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < props.clase.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {props.clase.reviewCount} reviews
            </Box>
          </Box>

          <Box mt={2}>
            <Text fontSize={30} as="b">
              {props.clase.title}
            </Text>
            <Text mt={2} color="gray.600" noOfLines={[3, 6]}>
              {props.clase.description}
            </Text>
          </Box>

          <Box justifyContent="space-between" alignItems="center" mt={5}>
            <HStack>
              {props.clase.tags.map((t) => (
                <Tag
                  size="sm"
                  key={t}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="teal"
                >
                  <TagLabel>{t}</TagLabel>
                </Tag>
              ))}
            </HStack>

            <Box alignItems="center" mt={"1em"}>
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
                src={props.clase.teacher_photo}
                alt="imag"
              />
              <Text color="gray.700" fontWeight="700" cursor="pointer">
                {props.clase.teacher_name}
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ClaseCard;
