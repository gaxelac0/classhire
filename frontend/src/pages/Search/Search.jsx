import { React } from "react";
import {
  Box,
  Divider,
  propNames
} from "@chakra-ui/react";

import ClaseCard from "../../components/ClaseCard/ClaseCard";
import FilterForm from "../../components/FilterForm/FilterForm";

import Pagination from "../../components/Pagination/Pagination";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { clases } from "../../mock/mocks";


const SearchComponent = () => {

  return (
    <>

      <FilterForm />
      {clases.map((c) => (
        <>
          <ClaseCard
            title={c.title}
            date={c.date}
            description={c.description}
            tags={c.tags}
            profName={c.profName}
            profImage={c.profImage}
          />
          <Divider h="15px" />
        </>
      ))}
      <Pagination />
    </>
  );
};

const Search = (props) => {

  return (
    <>
      <BackgroundLayout
        component={<SearchComponent/>}
      />
    </>
  );
};

export default Search
