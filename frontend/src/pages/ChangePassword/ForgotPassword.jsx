import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  FormControl,
  Box,
  FormLabel,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import * as authService from "../../services/authService";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useToast } from "@chakra-ui/react";

import {} from "@chakra-ui/react";

const ForgotPasswordComponent = () => {

  const toast = useToast();
  const [formData, setFormData] = useState({
    email: undefined,
  });


  const isErrorEmail = formData.email === "";

  const updateMessage = (msg, status) => {
    if (msg && (msg !== "" || msg[0] !== "")) {
      toast({
        title: status ==="error" ? "Error!" : "Success!",
        description: msg,
        status: status,
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


      // generate email with token
      await authService.forgotPassword(formData);
      
      updateMessage("Correo enviado, revisa tu casilla por un link de cambio de contrasena", "success")
      //navigate("/profile/1");
    } catch (err) {
      updateMessage(err.message, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Recuperacion de cuenta</Heading>
          <Text>
            Si existe una cuenta, te enviaremos un correo para actualizar tu contrasena 
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={isErrorEmail} isRequired>
                <FormLabel>Tu email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
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
                  Enviar Mail
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

const ForgotPassword = (props) => {
  return (
    <BackgroundLayout
      component={
        <ForgotPasswordComponent />
      }
    />
  );
};

export default ForgotPassword;
