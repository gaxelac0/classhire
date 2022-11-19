import { React } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import EditProfileFrm from "../Profile/EditProfileFrm";


const CompleteOnboardTeacherFrmComponent = (props) => {

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="white"
          color="teal"
          borderRadius="lg"

        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Box boxSize="150px">
                    <Image src="/img/teacher-icon.png" />
                  </Box>
                  <Heading>Profesores</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Necesitamos que completes este pequeno formulario antes de
                    proceder
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
              <EditProfileFrm userState={props.userState} usage={"onboard"} roleSelection={"teacher"} />
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

const CompleteOnboardTeacherFrm = (props) => {
  return (
    <BackgroundLayout component={<CompleteOnboardTeacherFrmComponent userState={props.userState} />} />
  );
};

export default CompleteOnboardTeacherFrm;
