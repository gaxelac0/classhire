import { useState, React } from "react";
import {
  Flex,
  chakra,
  HStack,
  Box,
  Image,
  Slide,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";


const Landing = ({ user }) => {

  // opacidad img student
  const [studentImageOpacity, setSIO] = useState(0.4)

  // opacidad img profesor
  const [profesorImageOpacity, setPIO] = useState(0.4)

  // rol seleccionado
  const [role, setRole] = useState({
    "selected": false,
    "type": undefined,
    "footer": undefined
  })


  return (
    <>
      <p>{'role.selected: ' + role.selected}</p>
      <p>{'role.id: ' + role.id}</p>
      <p>{'role.footer_desc: ' + role.footer_desc}</p>
      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          maxH="2xl"
          w="full"
          mx="auto"
          py={{
            base: 15,
            lg: 4,
          }}
          px={{
            base: 16,
            lg: 512,
          }}
          display={{
            lg: "flex",
          }}
          alignItems={{
            lg: "center",
          }}
          justifyContent={{
            lg: "space-between",
          }}
        >
          <chakra.h1
            fontSize={{
              base: "3xl",
              sm: "3xl",
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color="gray.900"
            _dark={{
              color: "gray.100",
            }}
          >
            <chakra.span display="block">Looks like it's your first time</chakra.span>
          </chakra.h1>
          <chakra.h2
            fontSize={{
              base: "2xl",
              sm: "2xl",
            }}
            fontWeight="bold"
            letterSpacing="tight"
            lineHeight="shorter"
            color="gray.900"
            _dark={{
              color: "gray.100",
            }}
          >
            <chakra.span
              display="block"
              color="brand.600"
              _dark={{
                color: "gray.500",
              }}
            >
              Select your role and start today.
            </chakra.span>
          </chakra.h2>
        </Box>
      </Flex>
      <HStack>
        {/* Estudiantes */}
        <Box w='50%' h='20%'>
          <Flex bg="brand.999">
            <Image
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="students"
              fit="cover"
              w="full"
              h={{
                base: 64,
                md: "full",
              }}
              bg="gray.100"
              loading="lazy"
              opacity={studentImageOpacity}
              _hover={{ opacity: 1.0 }}
              onClick={() => {
                console.log(role.selected)
                console.log(role.id)
                 if (!role.selected || role.id !== "student") {
                  console.log("in")
                   
                    setRole({
                      "selected": true,
                      "id": "student",
                      "footer_desc": "Estudiantes."
                    });
                    setSIO(1);
                    setPIO(0.4);
                  } else {
                    console.log("out")
                   
                    setRole({
                      "selected": false,
                      "id": undefined,
                      "footer_desc": undefined
                    });
                    setSIO(0.4);
                  }
                } 
              }
            />
          </Flex>
        </Box>
        {/* Profesores */}
        <Box w='50%' h='20%'>
          <Flex bg="brand.400">
            <Image
              id="profesor"
              src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="teachers"
              fit="cover"
              w="full"
              h={{
                base: 64,
                md: "full",
              }}
              bg="gray.100"
              loading="lazy"
              opacity={profesorImageOpacity}
              _hover={{ opacity: 1.0 }}
              onClick={() => {
                console.log(role.selected)
                console.log(role.id)
                 if (!role.selected || role.id !== "profesor") {
                  console.log("in")
                    
                    setRole({
                      "selected": true,
                      "id": "profesor",
                      "footer_desc": "Profesor."
                    });
                    setSIO(0.4);
                    setPIO(1);
                  } else {
                    console.log("out")
                    
                    setRole({
                      "selected": false,
                      "id": undefined,
                      "footer_desc": undefined
                    });
                    setPIO(0.4);
                  }
                } 
            }
            />
          </Flex>
        </Box>
      </HStack>
      <Slide direction='bottom' in={role.selected} style={{ zIndex: 10 }}>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          <Text>
            {role.footer_desc}{"\n"}
          </Text>
          <Button colorScheme="white" variant="outline">
            <Link href="#">
              Acceder
            </Link>
          </Button>
        </Box>
      </Slide>
    </>
  )
}

export default Landing
