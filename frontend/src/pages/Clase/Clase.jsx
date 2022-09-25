import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { MdCall } from 'react-icons/md';

import BackgroundLayout from "../../components/Layout/BackgroundLayout"


let teacher = {
  name:"Mario Hernandez",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti non necessitatibus voluptatem soluta asperiores laboriosam ratione illum, sunt odit fugit quis dolorum dolore nobis recusandae facere, sint doloribus eius obcaecati!"
}

const ClaseComponent = ({teacher, title }) => {
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          
        <Flex>
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Image
              rounded={'md'}
              alt={'product image'}
              src='/img/matematicas.jpg'
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '150%', sm: '200px', lg: '250px' }}
            />
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Sobre el Profe
            </Text>
            <Image
              rounded={'md'}
              alt={'teacher photo'}
              src='/img/teacher-icon.png'
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '50%', sm: '100px', lg: '125px' }}
            />
            <Heading as='h3'>
              {teacher.name}
            </Heading>
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
            <Text
              fontSize={{ base: '12px', lg: '16px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'250'}
              mb={'4'}>
              {teacher.description}
            </Text>
          </VStack>
        </Flex>
        <StackDivider
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              $350.00 USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Niveles
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Inicial</ListItem>
                  <ListItem>Primaria</ListItem>{' '}
                  <ListItem>Secundaria</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Universitario</ListItem>
                  <ListItem>Tesis</ListItem>
                  <ListItem>Proyectos Finales</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Sobre este curso
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Lugar:
                  </Text>{' '}
                  Google Meets
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Cronograma:
                  </Text>{' '}
                  Flexible
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Clases Incluidas:
                  </Text>{' '}
                  6
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Idioma:
                  </Text>{' '}
                  Espanol
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Contratar
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdCall />
            <Text>Contacto garantizado en menos de 48 horas</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

const Clase = () => {
  return (
    <BackgroundLayout
      component={<ClaseComponent title={'Clase Individual de Matematicas'} teacher={teacher} />}
    >
    </BackgroundLayout>
  );
}

export default Clase;