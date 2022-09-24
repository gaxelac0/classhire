import React from "react"

import {
  chakra,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Link,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";

import SidebarContent from "../../components/SideBar/SideBar";



const NavBar = ({ user, handleLogout }) => {

  const bg = useColorModeValue("white", "gray.800");
  const ib = useColorModeValue("gray.800", "inherit");
  const sidebar = useDisclosure();

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
        <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="ghost" onClick={handleLogout}>Log Out</Button>
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
          <Link href="/register">
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
          <IconButton
            alt="Acceso Rapido"
            aria-label="Menu"
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
          />
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
            </HStack>
          </Flex>
        </chakra.header>
        <chakra.body

        >
          <Drawer
            isOpen={sidebar.isOpen}
            onClose={sidebar.onClose}
            placement="left"
          >
            <DrawerOverlay />
            <DrawerContent>
              <SidebarContent w="full" borderRight="none" />
            </DrawerContent>
          </Drawer>
        </chakra.body>
      </React.Fragment> 
    )
  }
  
export default NavBar
