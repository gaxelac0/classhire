import { React } from "react";
import {
  chakra,
  Stack,
  Box,
  Button,
  Flex,
  FormLabel,
  FormControl,
  GridItem,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";

const FilterForm = () => {
  return (
    <>
      <Flex
      width="full"
      alignItems="center"
      justifyContent="center"
      px={1}
      py={1}
      >
        <chakra.form
          method="POST"
          overflow={{
            sm: "hidden",
          }}
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          maxW="max"
        >
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg="white"
            _dark={{
              bg: "#141517",
            }}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              {/* <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="first_name"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Materia
                </FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                />
              </FormControl> */}

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Country / Region
                </FormLabel>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country"
                  placeholder="Select option"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </Select>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Country / Region
                </FormLabel>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country"
                  placeholder="Select option"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </Select>
              </FormControl>


              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Country / Region
                </FormLabel>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country"
                  placeholder="Select option"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </Select>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Country / Region
                </FormLabel>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country"
                  placeholder="Select option"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </Select>
              </FormControl>


            </SimpleGrid>
          </Stack>
          <Box
            px={{
              base: 4,
              sm: 6,
            }}
            py={3}
            bg="gray.50"
            _dark={{
              bg: "#121212",
            }}
            textAlign="right"
            maxW="max"
          >
            <Button
              type="submit"
              colorScheme="teal"
              _focus={{
                shadow: "",
              }}
              fontWeight="md"
            >
              Save
            </Button>
          </Box>
        </chakra.form>
      </Flex>
    </>
  )
}

  export default FilterForm