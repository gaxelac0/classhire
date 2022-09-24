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


const Feature = ({ heading, text }) => {
	return (
	  <GridItem>
		<chakra.h3 fontSize="xl" fontWeight="600">
		  {heading}
		</chakra.h3>
		<chakra.p>{text}</chakra.p>
	  </GridItem>
	);
  };


const Principal = ({ user, handleLogout }) => {


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
					<Box as={Container} maxW="7xl" mt={14} p={4}>
						<Grid
							templateColumns={{
							base: 'repeat(1, 1fr)',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(2, 1fr)',
							}}
							gap={4}>
							<GridItem colSpan={1}>
							<VStack alignItems="flex-start" spacing="20px">
								<chakra.h2 fontSize="3xl" fontWeight="700">
								Medium length title
								</chakra.h2>
								<Button colorScheme="green" size="md">
								Call To Action
								</Button>
							</VStack>
							</GridItem>
							<GridItem>
							<Flex>
								<chakra.p>
								Provide your customers a story they would enjoy keeping in mind
								the objectives of your website. Pay special attention to the tone
								of voice.
								</chakra.p>
							</Flex>
							</GridItem>
						</Grid>
						<Divider mt={12} mb={12} />
						<Grid
							templateColumns={{
							base: 'repeat(1, 1fr)',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(4, 1fr)',
							}}
							gap={{ base: '8', sm: '12', md: '16' }}>
							<Feature
							heading={'First Feature'}
							text={'Short text describing one of you features/service'}
							/>
							<Feature
							heading={'Second Feature'}
							text={'Short text describing one of you features/service'}
							/>
							<Feature
							heading={'Third Feature'}
							text={'Short text describing one of you features/service'}
							/>
							<Feature
							heading={'Fourth Feature'}
							text={'Short text describing one of you features/service'}
							/>
						</Grid>
					</Box>
				</Box>
			</Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Principal
