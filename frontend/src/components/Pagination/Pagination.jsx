import { React } from "react";
import {
    Flex,
} from "@chakra-ui/react";

import PagButton from "./PagButton";



const Pagination = (props) => {

    const buttons = [];

    for (var i = 1; i <= props.pagination.totalPages; i++) {

        if (i == props.page) {
            buttons.push(
                <PagButton active>{i}</PagButton>
            );
        } else {
            buttons.push(
                <PagButton>{i}</PagButton>
            );
        }
    }
    
    return (
        <Flex
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        >
        <Flex>
        <PagButton disabled>previous</PagButton>
        {buttons}
        <PagButton>Next</PagButton>
        </Flex>
        </Flex>
        );
    };
    
    export default Pagination