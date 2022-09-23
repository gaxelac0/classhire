import { React } from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import SidebarContent from "../../components/SideBar/SideBar";


const Principal = ({ user, handleLogout }) => {

  const sidebar = useDisclosure();

  return (
    <Box
      as="section"
      bg="gray.700"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="gray.700"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi voluptate autem dolorem dolorum? Debitis, minus. Doloremque blanditiis eius, consequuntur illum hic quasi quo nulla tenetur corporis perferendis sint eveniet. lorem 
            lorem rem Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quidem, et, similique maxime fuga nesciunt porro sint fugiat ipsa voluptatibus molestiae nam expedita iusto impedit eaque, blanditiis sapiente ea delectus. lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, incidunt rem! Minus facere recusandae quaerat odio rerum cumque in iste. Facilis consequatur quam ratione ut corrupti amet quibusdam molestias Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sit placeat odio excepturi! Sequi quidem fugiat itaque laboriosam, adipisci ullam, tempora dolor enim eos facere mollitia aperiam iure non harum?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, voluptate iusto. Iste omnis corrupti adipisci alias placeat rerum quae harum a officia. Doloribus nihil dolore, corrupti tempore nisi aspernatur cumque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae reiciendis quae veniam inventore quidem error explicabo voluptates, eius sit praesentium, eum dignissimos ad deleniti quas consequatur cumque omnis? Molestias, consequatur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ex reiciendis aperiam laborum quisquam? Eius aut deserunt ullam nihil debitis. Obcaecati veniam aut tenetur dignissimos dolores maxime laudantium nobis praesentium.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore dolor tenetur animi officia ducimus! Necessitatibus voluptatem repellendus maiores consequuntur quasi sed tempore perspiciatis! Praesentium illo quos ab minima minus odit!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur in ab sint dignissimos quidem amet aut corrupti eos numquam eaque, dicta rem vel! Possimus aliquid non enim adipisci ipsum ducimus?
            lorem lorem ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, a voluptas! Recusandae debitis laborum voluptates expedita neque modi tempora, nam dolorum dignissimos magni ab pariatur illo alias! Beatae, voluptas corrupti.
          </Box>
         </Box>
      </Box>
    </Box>
  );
};

export default Principal
