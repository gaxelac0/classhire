import { React } from "react";
import {
  Box,

  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const CompleteOnboardTeacherFrm = ({ user, handleLogout }) => {

  return (
   
    <Box
      as="section"
      bg="gray.700"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >

      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
		<Flex
          width="full"
          height="full"
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
			_dark={{
				bg: "gray.800",
			}}
			maxW="max"
			maxH="max"
			>
				<Box as="main" p="4">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt odit debitis dicta voluptates sunt! Quo, magnam sit. Omnis, enim magnam. Nesciunt aut reprehenderit consequatur quas. Odit ab sit fugiat minima!
				</Box>
			</Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default CompleteOnboardTeacherFrm
