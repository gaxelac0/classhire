import { React } from "react";
import {
  chakra,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  List, 
  ListItem,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import SidebarContent from "../../components/SideBar/SideBar";
import ClaseCard from "../../components/ClaseCard/ClaseCard";
import FilterForm from "../../components/FilterForm/FilterForm";


const Search = ({ user, handleLogout }) => {

  const sidebar = useDisclosure();

  const Pagination = () => {
    const PagButton = (props) => {
      const activeStyle = {
        bg: "brand.600",
        _dark: {
          bg: "brand.500",
        },
        color: "white",
      };
      return (
        <chakra.button
          mx={1}
          px={4}
          py={2}
          rounded="md"
          bg="white"
          color="gray.700"
          _dark={{
            color: "white",
            bg: "gray.800",
          }}
          opacity={props.disabled && 0.6}
          _hover={!props.disabled && activeStyle}
          cursor={props.disabled && "not-allowed"}
          {...(props.active && activeStyle)}
        >
          {props.children}
        </chakra.button>
      );
    };
  
    return (
      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex>
          <PagButton disabled>previous</PagButton>
          <PagButton active>1</PagButton>
          <PagButton>2</PagButton>
          <PagButton>3</PagButton>
          <PagButton>4</PagButton>
          <PagButton>5</PagButton>
          <PagButton>Next</PagButton>
        </Flex>
      </Flex>
    );
  };

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
        <FilterForm/>
        <List>
          <ListItem>
            <ClaseCard/>
          </ListItem>
          <ListItem>
            <ClaseCard/>
          </ListItem>
          <ListItem>
            <ClaseCard/>
          </ListItem>
          {/* You can also use custom icons from react-icons */}
          <ListItem>
            <ClaseCard/>
          </ListItem>
        </List>
        <Pagination/>
      </Box>
    </Box>
  );
};

export default Search
