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
  Divider
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
        color: "white",
      };
      return (
        <chakra.button
          mx={1}
          px={4}
          py={2}
          rounded="md"
          //bg="grey"
          //color="gray.700"
          bgGradient='linear(to-r, teal.500, teal.400)'
          _hover={{
            bgGradient: 'linear(to-r, #808080, #A4A4A4)',
          }}
          
          opacity={props.disabled && 0.6}
          //_hover={!props.disabled && activeStyle}
          cursor={props.disabled && "not-allowed"}
          {...(props.active && activeStyle)}
        >
          {props.children}
        </chakra.button>
      );
    };
  
    return (
      <Flex
        bg="#D4D4D4"
        // _dark={{
        //   bg: "#3e3e3e",
        // }}
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
    //Box que contiene toda la pagina Seach
    <Box
      as="section"
      //bg="gray.200"
      bgGradient='linear(to-b, #FFFFFF, #D4D4D4 )'
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
        {/* <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          //bg="gray.700"
          borderBottomWidth="1px"
          //borderColor="blackAlpha.300"
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
        </Flex> */}

        <FilterForm/>

        <Divider h="5px" />

        <ClaseCard/>

        <Divider h="15px" />

        <ClaseCard/>

        <Divider h="15px" />

        <ClaseCard/>

        <Divider h="15px" />

        <Pagination/>
      </Box>
    </Box>
  );
};

export default Search
