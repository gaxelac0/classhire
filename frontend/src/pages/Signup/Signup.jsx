import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Layout/BackgroundLayout";
import * as authService from "../../services/authService";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useToast } from "@chakra-ui/react";

const SignupCard = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  const toast = useToast();

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

  const [formData, setFormData] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });
  
  const isErrorFirstName = formData.firstName === "";
  const isErrorLastName = formData.lastName === "";
  const isErrorEmail = formData.email === "";
  const isErrorPassword = formData.password === "";

  const handleChange = (e) => {
    //console.log(e)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await authService.signup(formData);
      props.handleSignupOrLogin();
      navigate("/onboard");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Registrate
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            para disfrutar de todas las funcionalidades ??????
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isInvalid={isErrorFirstName} isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {isErrorFirstName && (
                    <FormErrorMessage>
                      Ingresa tu nombre
                    </FormErrorMessage>
                  )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isInvalid={isErrorLastName}  isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                                      {isErrorLastName && (
                    <FormErrorMessage>
                      Ingresa tu apellido
                    </FormErrorMessage>
                  )}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isInvalid={isErrorEmail} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                                                      {isErrorEmail && (
                    <FormErrorMessage>
                      Ingresa tu email
                    </FormErrorMessage>
                  )}
              </FormControl>
              <FormControl id="password" isInvalid={isErrorPassword} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {isErrorPassword && (
                    <FormErrorMessage>
                      Ingresa tu password
                    </FormErrorMessage>
                  )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.700",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Ya tienes cuenta?{" "}
                  <Link color={"teal.400"} href="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};

const Signup = (props) => {
  return (
    <BackgroundLayout
      component={<SignupCard handleSignupOrLogin={props.handleSignupOrLogin} />}
    />
  );
};

export default Signup;
