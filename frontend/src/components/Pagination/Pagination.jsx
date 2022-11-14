import { React } from "react";
import {
    Flex,
} from "@chakra-ui/react";

import PagButton from "./PagButton";
import { useNavigate } from 'react-router-dom'



const Pagination = (props) => {

    let actualPage = +props.pagination.page

    const navigate = useNavigate();

    var handlePaginate = (value) => {
        ////console.log("clicked")
        navigate('/' + props.route+ '/' + value);
    }


    const buttons = [];

    for (var i = 1; i <= props.pagination.totalPages; i++) {

        if (i > props.pagination.totalPages) {
            break;
        }

        if (i == props.pagination.page) {
            //console.log("added button " + i)
            buttons.push(
                <PagButton key={"pagButtonActive"} active>{i}</PagButton>
            );
        } else {
            //console.log("added button " + i)
            buttons.push(
                <PagButton
                key={"pagButton_"+i} 
                value={i}
                onClick={(button) => handlePaginate(button.target.value)}
                >
                    {i}
                </PagButton>
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
                {
                    props.pagination.page == 1
                        ? <PagButton key={"pagButtonPrevious"}  disabled>Previous</PagButton>
                        : 
                        <PagButton
                        key={"pagButtonPrevious"} 
                        value={i}
                        onClick={(button) => handlePaginate(actualPage-1)}
                        > Previous</PagButton>
                }
                {buttons}
                {
                    props.pagination.page == props.pagination.totalPages
                        ? <PagButton key={"pagButtonNext"}  disabled>Next</PagButton>
                        :
                        <PagButton
                        key={"pagButtonNext"} 
                        value={i}
                        onClick={(button) => handlePaginate(actualPage+1)}
                        > Next</PagButton>
                }
            </Flex>
        </Flex>
    );
};

export default Pagination