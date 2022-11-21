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
  TagCloseButton,
  Icon,
} from "@chakra-ui/react";

import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "@chakra-ui/icons";

const ReviewCard = (props) => {
  

  return (
    <>
      <Flex p={"1em"} m={"1em"} maxWidth={"15em"}>
        <Box w="md" mx="auto" py={1} px={1} bg="white" shadow="lg" rounded="lg" borderColor={props && props.review && props.review.type === "positive" ? "teal.400" : "red.400"} borderWidth="1px">
          <chakra.h2
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
            fontWeight="bold"
          >
            {props && props.review && props.review.type === "positive" ? (
              <Icon color="green" as={ArrowUpIcon}></Icon>
            ) : (
              <Icon color="red" as={ArrowDownIcon}></Icon>
            )}
          </chakra.h2>

          <chakra.p
            mt={2}
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
          >
            {"« " + props.review.comment +" »"} 
          </chakra.p>

          <Text justifyContent={"end"}>
            {new Date(props.review.createdAt).toDateString()}
          </Text>

  
        </Box>
      </Flex>
    </>
  );
};

export default ReviewCard;
