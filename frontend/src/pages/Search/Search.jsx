import { React } from "react";
import {
  Box,
  Divider
} from "@chakra-ui/react";

import ClaseCard from "../../components/ClaseCard/ClaseCard";
import FilterForm from "../../components/FilterForm/FilterForm";

import Pagination from "../../components/Pagination/Pagination";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";


const SearchComponent = () => {

  return (
    <>
      <FilterForm />
      <Divider h="5px" />
      <ClaseCard />
      <Divider h="15px" />
      <ClaseCard />
      <Divider h="15px" />
      <ClaseCard />
      <Divider h="15px" />
      <Pagination />
    </>
  );
};

const Search = () => {

  return (
    <>
      <BackgroundLayout
        component={<SearchComponent/>}
      />
    </>
  );
};

export default Search
