import React from "react";
import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const MiniClaseCard = (props) => {



  return (
    <Flex
      p={5}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={props.image}
          alt={props.imageAlt}
          roundedTop="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge rounded="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              new new new &bull; 
            </Box>
          </Box>

          <Text
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {props.title}
          </Text>

          <Box>
            {props.price}
            <Box as="span" color="gray.600" fontSize="sm">
              / h
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < props.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {props.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default MiniClaseCard