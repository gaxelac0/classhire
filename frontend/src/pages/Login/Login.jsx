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
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";

import { useToast } from "@chakra-ui/react";

import {} from "@chakra-ui/react";

const LoginComponent = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState([""]);
  const updateMessage = (msg) => {
    setMessage(msg);
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
      await authService.login(formData);
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"teal.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

const Login = (props) => {
  return (
    <BackgroundLayout
      component={
        <LoginComponent handleSignupOrLogin={props.handleSignupOrLogin} />
      }
    />
  );
};

export default Login;
