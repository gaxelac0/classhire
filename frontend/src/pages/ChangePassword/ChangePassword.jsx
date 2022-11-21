import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  FormControl,
  Box,
  FormLabel,
  Checkbox,
  Stack,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import * as authService from "../../services/authService";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useToast } from "@chakra-ui/react";

import {} from "@chakra-ui/react";

const ChangePasswordComponent = (props) => {

  const {token} = useParams()


  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    new_password: undefined,
    confirmation_new_password: undefined,
  });


  const isErrorNewPassword = formData.new_password === "";
  const isErrorConfirmationNewPassword = formData.confirmation_new_password === "";

  const updateMessage = (msg) => {
    if (msg && (msg !== "" || msg[0] !== "")) {
      toast({
        title: "Error!",
        description: msg,
        status: "error",
        position: "top-right",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    //console.log(e)
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {

      if(formData.new_password !== formData.confirmation_new_password) {
        updateMessage("Las contrasenas no coinciden");
        return;
      }

      await authService.changePassword(formData, token);
      props.handleSignupOrLogin();
      navigate("/profile/1");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Recuperacion de cuenta</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="new_password" isInvalid={isErrorNewPassword} isRequired>
                <FormLabel>Nueva Password</FormLabel>
                <Input
                  type="password"
                  value={formData.new_password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="confirmation_new_password" isInvalid={isErrorConfirmationNewPassword} isRequired>
                <FormLabel>Confirmar Nueva Password</FormLabel>
                <Input
                  type="password"
                  value={formData.confirmation_new_password}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                >
                  Actualizar Contrasena
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

const ChangePassword = (props) => {
  return (
    <BackgroundLayout
      component={
        <ChangePasswordComponent handleSignupOrLogin={props.handleSignupOrLogin} />
      }
    />
  );
};

export default ChangePassword;
