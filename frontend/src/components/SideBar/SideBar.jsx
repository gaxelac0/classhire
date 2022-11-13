import { React } from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text
} from "@chakra-ui/react";
import { FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";

import ClasshireLogo from "../Logo/ClasshireLogo";
import { AddIcon } from "@chakra-ui/icons";

const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="1em"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => {
    // TODO: Agregar opciones de Login, Sign Up
			return (
        <>
        <Box
            as="nav"
            pos="absolute"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="teal.700"
            borderColor="blackAlpha.300"
            borderRightWidth="1px"
            w="60"
            {...props}
          >
            <Flex
              direction="column"
              as="nav"
              fontSize="sm"
              aria-label="Main Navigation"
            >
              <ClasshireLogo>

              </ClasshireLogo>
              <NavItem icon={MdHome}>
                <Link href="/"> Home
                </Link>
                </NavItem>
              <NavItem icon={FaRss}>
                <Link href="/profile"> Perfil
                </Link>
              </NavItem>
              <NavItem icon={HiCollection}>
                <Link href="/search"> Buscar Clases
                </Link>
              </NavItem>
              <NavItem icon={AddIcon}>
                <Link href="/search"> Publicar Clase
                </Link>
              </NavItem>
              <NavItem icon={FaClipboardCheck}>
                <Text fontSize='sm'>Busca Profesores
                <Text color="red.700" as="sup" fontSize='xs'>soon</Text>
                </Text>
              </NavItem>
            </Flex>
            <Text
            
            position={"absolute"}
            bottom={"0"}
            color="white"
            >
              v1.0.0
            </Text>
            
          </Box></>
			)
		};

		export default SidebarContent