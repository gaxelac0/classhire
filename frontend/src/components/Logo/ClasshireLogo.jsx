import { Box, Image } from "@chakra-ui/react"

const ClasshireLogo = (props) => {
    return(
        <Box>
            <Image src="/img/classhire-logo.png"
            w={props.w}
            h={props.h}
            />
        </Box>
    );

}

export default ClasshireLogo