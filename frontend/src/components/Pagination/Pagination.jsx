import { React } from "react";
import {
    Flex,
} from "@chakra-ui/react";

import PagButton from "./PagButton";



const Pagination = () => {
    
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
    
    export default Pagination