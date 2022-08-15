import React from "react"
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Logo } from "@choc-ui/logo";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const NavBar = ({ user, handleLogout }) => {

  const bg = useColorModeValue("white", "gray.800");
  const ib = useColorModeValue("gray.800", "inherit");
  const mobileNav = useDisclosure();

  let welcome = user ? "Welcome to Classhire, "+user.name : "Welcome to Classhire!"

  return (
      <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Classhire Home Page"
              display="flex"
              alignItems="center"
            >
              <Logo />
              <VisuallyHidden>Classhire</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              {welcome}
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button colorScheme="teal" variant="ghost">Features</Button>
              <Button colorScheme="teal" variant="ghost">Pricing</Button>
              <Button colorScheme="teal" variant="ghost">Blog</Button>
              <Button colorScheme="teal" variant="outline">Log In</Button>
              <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} variant="solid">Sign Up</Button>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={ib}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Log Out
                  onClick={handleLogout}
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment> 
  )
}

export default NavBar
