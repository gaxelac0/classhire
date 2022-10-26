import { React } from "react";
import {
    Flex,
} from "@chakra-ui/react";

import PagButton from "./PagButton";
import { useNavigate } from 'react-router-dom'



const Pagination = (props) => {

    const navigate = useNavigate();

    var handlePaginate = (button) => {
        console.log("clicked")
        navigate('/profile/' + button.currentTarget.attributes.value.value);
    }


    const buttons = [];

    for (var i = 1; i <= props.pagination.totalPages; i++) {

        if (i > props.pagination.totalPages) {
            break;
        }

        if (i === props.pagination.page) {
            console.log("added button " + i)
            buttons.push(
                <PagButton active>{i}</PagButton>
            );
        } else {
            console.log("added button " + i)
            buttons.push(
                <PagButton
                value={i}
                onClick={(button) => handlePaginate(button)}
                >
                    {i}
                </PagButton>
            );
        }
    }
    console.log(buttons)

    return (
        <Flex
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Flex>
                {
                    props.pagination.page === 1
                        ? <PagButton disabled>Previous</PagButton>
                        : <PagButton>Previous</PagButton>
                }
                {buttons}
                {
                    props.pagination.page === props.pagination.totalPages
                        ? <PagButton disabled>Next</PagButton>
                        : <PagButton>Next</PagButton>
                }
            </Flex>
        </Flex>
    );
};

export default Pagination