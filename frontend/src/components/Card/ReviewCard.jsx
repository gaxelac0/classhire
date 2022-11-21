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

import {
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  StarIcon,
} from "@chakra-ui/icons";

const ReviewCard = (props) => {

  const handleOnClickAceptarReview = () => {
    props.setFormDataReviewEdit({
      clase_id: props.clase._id,
      comment_id: props.review._id,
      new_state: "aceptada",
      state_reason: "Aceptada por el profe",
    })
  }

  const handleOnClickBlockReview = () => {
    props.onOpenReviewEdit();
    props.setFormDataReviewEdit({
      clase_id: props.clase._id,
      comment_id: props.review._id,
      new_state: "bloqueada",
      state_reason: "",
    })
  }


  return (
    <>
      {props && props.handler && (
        <Box mt={"2em"} justifyContent={"end"}>
          <Icon
            onClick={handleOnClickAceptarReview}
            boxSize={"2em"}
            bg={"teal"}
            borderColor={"black"}
            borderWidth={"1px"}
            color={"white"}
            as={AddIcon}
          />
          <Icon
            onClick={handleOnClickBlockReview}
            ml={"1em"}
            boxSize={"2em"}
            bg={"teal"}
            borderColor={"black"}
            borderWidth={"1px"}
            color={"white"}
            as={DeleteIcon}
          />
        </Box>
      )}

      <Flex py={"0.5em"} maxWidth={"15em"}>
        <Box
          w="md"
          mx="auto"
          py={1}
          px={1}
          bg="white"
          shadow="lg"
          rounded="lg"
          borderColor={
            props && props.review && props.review.type === "positive"
              ? "teal.400"
              : "red.400"
          }
          borderWidth="1px"
        >
          <chakra.h1
            color="gray.800"
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
            fontWeight="bold"
          >
            <HStack>
              {props && props.review && props.review.type === "positive" ? (
                <Icon color="green" as={ArrowUpIcon}></Icon>
              ) : (
                <Icon color="red" as={ArrowDownIcon}></Icon>
              )}
            </HStack>
          </chakra.h1>

          <chakra.p
            mt={2}
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
          >
            {"« " + props.review.comment + " »"}
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
