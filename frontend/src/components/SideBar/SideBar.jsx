import { React } from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
} from "@chakra-ui/react";
import { FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";

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
              <NavItem icon={MdHome}>
                <Link href="/"> Home
                </Link>
                </NavItem>
              <NavItem icon={FaRss}>
                <Link href="/profile"> Perfil
                </Link>
              </NavItem>
              <NavItem icon={HiCollection}>
                <Link href="/search"> Clases
                </Link>
              </NavItem>
              <NavItem icon={FaClipboardCheck}>
                <Link href="#"> Profesores
                </Link>
              </NavItem>
            </Flex>
          </Box></>
			)
		};

		export default SidebarContent