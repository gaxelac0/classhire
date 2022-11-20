import React from "react";

import {
  chakra,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Link,
  Text,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ArrowForwardIcon, SearchIcon, PlusSquareIcon } from "@chakra-ui/icons";

import SidebarContent from "../../components/SideBar/SideBar";
import ClasshireLogo from "../Logo/ClasshireLogo";

const NavBar = (props) => {
  const bg = useColorModeValue("white", "gray.800");
  const sidebar = useDisclosure();

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 812;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  // TODO:En caso de estar loggeado, mostrar la foto del profile (mockear)
  function LoggedMenuItems(props) {
    ////console.log(props)

    return (
      <>
        <HStack spacing={1} mr={1} color="brand.500">
          <Link href="/" display={{ base: "none", md: "inline-flex" }}>
            <Button colorScheme="teal" variant="ghost">
              Inicio
            </Button>
          </Link>
          <Link
            href="/profile"
            display={{ base: "inline-flex", md: "inline-flex" }}
          >
            <Button colorScheme="teal" variant="ghost">
              Perfil
            </Button>
          </Link>
          <Link href="/search" display={{ base: "none", md: "inline-flex" }}>
            <Button
              colorScheme="teal"
              leftIcon={<SearchIcon />}
              variant="outline"
            >
              Clases
            </Button>
          </Link>
          <Button
            colorScheme="teal"
            leftIcon={<PlusSquareIcon />}
            variant="outline"
            display={{ base: "none", md: "inline-flex" }}
          >
            <Link href="/clase/add">Publicar Clase</Link>
          </Button>

          <Button
            colorScheme="teal"
            rightIcon={<ArrowForwardIcon />}
            variant="ghost"
            onClick={props.handleLogout}
          >
            Log Out
          </Button>
          {props.userState && props.userState.role && <Text color="red">{"Rol: " + props.userState.role}</Text>} 
        </HStack>
      </>
    );
  }

  function NotLoggedMenuItems(props) {
    return (
      <>
        <HStack spacing={1} mr={1} color="brand.500" display={"inline-flex"}>
          <Button
            colorScheme="teal"
            variant="ghost"
            display={{ base: "none", md: "inline-flex" }}
          >
            <Link href="/search">Buscar Clases</Link>
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            display={{ base: "inline-flex", md: "inline-flex" }}
          >
            <Link href="/login">Log In</Link>
          </Button>

          {/* El Registro lo mando a la pagina de landing donde elige que tipo de registro es */}
          <Button
            colorScheme="teal"
            rightIcon={<ArrowForwardIcon />}
            variant="solid"
            display={{ base: "inline-flex", md: "inline-flex" }}
          >
            <Link href="/signup">Registrate</Link>
          </Button>
          {/* <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="solid">Registrate</Button> */}
        </HStack>
      </>
    );
  }

  function MenuItems(props) {
    return props.loggedIn ? (
      <LoggedMenuItems userState={props.userState} handleLogout={props.handleLogout} />
    ) : (
      <NotLoggedMenuItems />
    );
  }

  ////console.log(props)

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
        <Flex justifyContent="space-between" mx="auto">
          <HStack spacing={1}>
            {width > breakpoint ? (
              <chakra.a
                href="/"
                title="Classhire Home Page"
                alignItems={"center"}
              >
                <ClasshireLogo w="300px" h="100px" />
              </chakra.a>
            ) : (
              <chakra.a
                href="/"
                title="Classhire Home Page"
                alignItems={"left"}
              >
                <ClasshireLogo w="150px" h="50px" />
              </chakra.a>
            )}

            <MenuItems
              userState={props.userState}
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
  );
};

export default NavBar;
