import { React } from "react";
import {
  Box,
  Divider
} from "@chakra-ui/react";

import ClaseCard from "../../components/ClaseCard/ClaseCard";
import FilterForm from "../../components/FilterForm/FilterForm";

import Pagination from "../../components/Pagination/Pagination";


const Search = ({ user, handleLogout }) => {

  return (
    //Box que contiene toda la pagina Seach
    <Box
      as="section"
      //bg="gray.200"
      bgGradient='linear(to-b, #FFFFFF, #D4D4D4 )'
      minH="100vh"
    >
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

  );
};

export default Search
