import { useState, React } from "react";
import {
  Flex,
  chakra,
  HStack,
  Box,
  Image,
  Lorem,
  Slide,
  useDisclosure
} from "@chakra-ui/react";


const Landing = ({ user }) => {

  // const [message, setMessage] = useState([''])
  // const updateMessage = msg => {
  //   setMessage(msg)
  // }

  // const handleSubmit = (selection) => {
   
  // }

 const [footer, setFooter] = useState([''])
  const updateFooter = msg => {
    setFooter(msg)
  }

  
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
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
              opacity={0.4}
              _hover={{ opacity: 1.0 }}
              onClick={onToggle} 
            />
          </Flex>
        </Box>
        <Box w='50%' h='20%'>
          <Flex bg="brand.400">
            <Image
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
              opacity={0.4}
              _hover={{ opacity: 1.0 }}
              onClick={onToggle} 
            />
          </Flex>
        </Box>
      </HStack>
      <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          {footer}
        </Box>
      </Slide>
    </>
  )
}

export default Landing
