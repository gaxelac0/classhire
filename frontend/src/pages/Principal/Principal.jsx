import { React } from "react";
import {
  Box,
  Center,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  SimpleGrid,
  InputGroup, 
  InputLeftElement, 
  Input,
  Image,
} from "@chakra-ui/react";
import BkgHome from "../../images/HomBackground.jpg"
import {SearchIcon} from '@chakra-ui/icons'
import BackgroundLayout from "../../components/Layout/BackgroundLayout"

import MiniClaseCard from "../../components/ClaseCard/MiniClaseCard";

import { clases } from "../../mock/mocks";

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

const PrincipalComponent = () => {
	return (
		<>
		
		
		<Box 
			display="flex"
			justifyContent="Center"
		>
			
			<SimpleGrid
				columns={{ sm: 1, md: 1 }}
				spacing='8'
				textAlign='center'
			>
				
				<chakra.h1 fontSize="6xl" fontWeight="900" color="#000000" >
					Classhire
				</chakra.h1>
				<chakra.h2 fontSize="3xl" fontWeight="700" >
					Marketplace de profesores particulares
				</chakra.h2>

				<Box as={Container} maxW="7xl" p={4}>
				<Divider mt={2} mb={10} />
				<Grid
					justifyContent="Center"
					textAlign="center"
					templateColumns={{
					base: 'repeat(1, 1fr)',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)',
					}}
					gap={{ base: '8', sm: '12', md: '16' }}>
					<Feature
						heading={'Buscá'}
						text={'Amplia variedad de materias, profesores con modalidad de clases individual o grupal'}
					/>
					<Feature
						heading={'Elegí'}
						text={'Seleccioná al profesor y modalidad que se ajuste a tus necesidades'}
					/>
					<Feature
						heading={'Aprendé'}
						text={'Con clases particulares se aprende más rápido'}
					/>
					<Feature
						heading={'Calificá'}
						text={'Tu experiencia sirve a otros'}
					/>
				</Grid>
			</Box>
			<Grid
				justifyContent="Center"
				templateColumns={{
					sm: 'repeat(2, 1fr)',
					md: 'repeat(2, 1fr)',
					}}
				gap={{ base: '8', sm: '12', md: '16' }}
			>
				<Button colorScheme='teal' size='lg' variant='outline' >
					Aprender
				</Button>
				<Button colorScheme='teal' size='lg' variant='outline'>
					Dar clases
				</Button>
			</Grid>

				<Divider mb="20"></Divider>
				<InputGroup>
					<InputLeftElement
						pointerEvents='none'
						children={<SearchIcon color='white' />}
					/>
					<Input focusBorderColor="#6BB495" type="search" placeholder='Buscar Materia' />
				</InputGroup>

				<SimpleGrid columns={[2, null, 4]} spacing="1em">
					{clases.map((c) => (
						<MiniClaseCard
							id={c.id}
							title={c.title} 
							price={c.price} 
							rating={c.rating}
							image={c.image}
							imageAlt={"imageAlt"}
							reviewCount={c.reviewCount} 
						/>
					))}
				</SimpleGrid>

			</SimpleGrid>
		</Box>

	</>
	); 
}

const Principal = ({ user, handleLogout }) => {
  return (
	<BackgroundLayout component={<PrincipalComponent/>}/>
  );
};

export default Principal
