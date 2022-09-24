import React from "react"

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Link,
  Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";
import { ArrowForwardIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";


const NavBar = ({ user, handleLogout }) => {

  const bg = useColorModeValue("white", "gray.800");
  const ib = useColorModeValue("gray.800", "inherit");
  const mobileNav = useDisclosure();

  // DEMOFRONTEND
  // name: {type: String, required: true},
  // email: { type: String, required: true, lowercase: true, unique: true },
  // password: {type: String, required: true},
  // profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  // roles: [], type: Stringroles
  // user = {
  //   name:"Pepe Pistolero",
  //   email:"pepe@outlook.com",
  //   password:"123456",
  //   roles: []
  // }


  function LoggedMenuItems(props) {
    return (
      <>
      <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
      >
        <Button colorScheme="teal" variant="ghost">Profesores</Button>
        <Button colorScheme="teal" variant="ghost">Clases</Button>
        <Button colorScheme="teal" variant="ghost">Perfil</Button>
        <Button colorScheme="teal" leftIcon={<SearchIcon />} variant="outline">Search</Button>
        <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="ghost">Log Out</Button>
      </HStack>
    </>
    )
  }

  function NotLoggedMenuItems(props) {
    return (
      <>
      <HStack
        spacing={1}
        mr={1}
        color="brand.500"
        display={{ base: "none", md: "inline-flex" }}
      >
        <Button colorScheme="teal" variant="ghost">
          <Link href="/search">
            Search
          </Link>
        </Button>
        <Button colorScheme="teal" variant="ghost">
          <Link href="/clases">
            Clases
          </Link>
        </Button>
        <Button colorScheme="teal" variant="ghost">
          <Link href="/publicar">
            Publicar
          </Link>
        </Button>

        {/* Entiendo que hay opcion de PERFIL si no inicio sesion */}

        {/* <Button colorScheme="teal" variant="ghost">
          <Link href="/profiles">
            Perfil
          </Link>
        </Button> */}

        {/* <Button colorScheme="teal" variant="outline">Log In</Button> */}

        <Button colorScheme="teal" variant="outline">
          <Link href="/login">
            Log In
          </Link>
        </Button>

        {/* El Registro lo mando a la pagina de landing donde elige que tipo de registro es */}
        <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="solid">
          <Link href="/landing">
            Registrate
          </Link>
        </Button>
        {/* <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="solid">Registrate</Button> */}


      </HStack>
    </>
    )
  }

  function MenuItems(props) {
    const loggedIn = props.loggedIn;
    if (loggedIn) {
      return <LoggedMenuItems/>
    }
    return <NotLoggedMenuItems/>
  }


  function LoggedBurgerMenu(props) {
    return (
      <Box display={{ base: "inline-flex", md: "none" }}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          fontSize="20px"
          color={ib}
          variant="ghost"
          icon={<AiOutlineMenu />}
          onClick={mobileNav.onOpen}
        />
        <VStack
          pos="absolute"
          top={0}
          left={0}
          right={0}
          display={mobileNav.isOpen ? "flex" : "none"}
          flexDirection="column"
          p={2}
          pb={4}
          m={2}
          bg={bg}
          spacing={3}
          rounded="sm"
          shadow="sm"
        >
          <CloseButton
            aria-label="Close menu"
            onClick={mobileNav.onClose}
          />
          <Button w="full" variant="ghost">
            Menu 1 (CloseMenu)
          </Button>
          <Button w="full" variant="ghost">
            Menu 2 (CloseMenu)
          </Button>
          <Button w="full" variant="ghost">
            Menu 3 (CloseMenu)
          </Button>
          <Button
            w="full"
            variant="ghost"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </VStack>
     </Box>      
    )
  }

  function NotLoggedBurgerMenu(props) {
    return (
      <Box display={{ base: "inline-flex", md: "none"}}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          fontSize="20px"
          color={ib}
          variant="ghost"
          icon={<AiOutlineMenu />}
          onClick={mobileNav.onOpen}
        />
        <VStack
          pos="absolute"
          top={0}
          left={0}
          right={0}
          display={mobileNav.isOpen ? "flex" : "none"}
          flexDirection="column"
          p={2}
          pb={4}
          m={2}
          bg={bg}
          spacing={3}
          rounded="sm"
          shadow="sm"
        >
          <CloseButton
            aria-label="Close menu"
            onClick={mobileNav.onClose}
          />
          <Button w="full" variant="ghost">
          <Link href="/search">
            Search
          </Link>
          </Button>

          <Button w="full" variant="ghost">
          <Link href="/clases">
            Clases
          </Link>
        </Button>
        <Button w="full" variant="ghost">
          <Link href="/publicar">
            Publicar
          </Link>
        </Button>

        <Button w="full" variant="ghost">
          <Link href="/login">
            Log In
          </Link>
        </Button>

        <Button w="full" variant="ghost">
          <Link href="/landing">
            Registrate
          </Link>
        </Button>
        </VStack>
     </Box>      
    )
  }


  function BurgerMenu(props) {
    const loggedIn = props.loggedIn;
    if(loggedIn) {
      return <LoggedBurgerMenu />
    }
    return <NotLoggedBurgerMenu />    
  }

  let welcome = user ? "Classhire" : "Bienvenido 🤗"

  return (
      <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        position="sticky"
        display="flex"
        
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a href="/" title="Classhire Home Page" display="flex" alignItems="center">
             {/* <Logo /> */}
              Classhire
              <VisuallyHidden>Classhire</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              {welcome}
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <MenuItems 
              loggedIn={user}
            />
            <BurgerMenu
              loggedIn={user}
            />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment> 
  )
}

export default NavBar
