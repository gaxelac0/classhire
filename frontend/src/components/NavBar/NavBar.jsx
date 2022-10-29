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
  Image
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ArrowForwardIcon, SearchIcon, PlusSquareIcon } from "@chakra-ui/icons";

import SidebarContent from "../../components/SideBar/SideBar";
import ClasshireLogo from "../Logo/ClasshireLogo";



const NavBar = (props) => {

  const bg = useColorModeValue("white", "gray.800");
  const sidebar = useDisclosure();

  // TODO:En caso de estar loggeado, mostrar la foto del profile (mockear)
  function LoggedMenuItems(props) {

    console.log(props)

    return (
      <>
        <HStack
          spacing={1}
          mr={1}
          color="brand.500"
          display={{ base: "none", md: "inline-flex" }}
        >
          <Link href="/">
            <Button colorScheme="teal" variant="ghost">Inicio</Button>
          </Link>
          <Link href="/profile">
            <Button colorScheme="teal" variant="ghost">Perfil</Button>
          </Link>
          <Link href="/search">
            <Button colorScheme="teal" leftIcon={<SearchIcon />} variant="outline">Clases</Button>
          </Link>
          <Button colorScheme="teal" leftIcon={<PlusSquareIcon />} variant="outline">
            <Link href="/clase/add">
              Publicar Clase
            </Link>
          </Button>

          <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="ghost" onClick={props.handleLogout}>Log Out</Button>
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
              Buscar Clases
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
            <Link href="/signup">
              Registrate
            </Link>
          </Button>
          {/* <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="solid">Registrate</Button> */}


        </HStack>
      </>
    )
  }

  function MenuItems(props) {
    return props.loggedIn ? <LoggedMenuItems handleLogout={props.handleLogout} /> : <NotLoggedMenuItems />
  }

  console.log(props)

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
              <ClasshireLogo w="300px" h="100px" />
              <VisuallyHidden>Classhire</VisuallyHidden>
            </chakra.a>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            {/*   TODO: en el modo mobile solo se ve el logo, agregar botones de sign up y login achicando el logo */}



            <MenuItems
              loggedIn={props.userState}
              handleLogout={props.handleLogout}
            />
          </HStack>
        </Flex>
      </chakra.header>
      <chakra.body>
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
