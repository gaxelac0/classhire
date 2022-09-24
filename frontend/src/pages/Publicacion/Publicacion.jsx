import { React } from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  chakra,
  Link,
  Image
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import SidebarContent from "../../components/SideBar/SideBar";
import Clase from "../../components/Clase/Clase";



const Publicacion = ({ user, handleLogout }) => {

  const sidebar = useDisclosure();

  let teacher = {
    name:"Mario Hernandez",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti non necessitatibus voluptatem soluta asperiores laboriosam ratione illum, sunt odit fugit quis dolorum dolore nobis recusandae facere, sint doloribus eius obcaecati!"
  }

  return (
    <Box
      as="section"
      bg="gray.700"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
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
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="gray.700"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
        </Flex>


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


            <Clase title={'Clase Individual de Matematicas'} teacher={teacher} />
          </Box>
        </Flex>


      </Box>
    </Box>
  );
};

export default Publicacion
