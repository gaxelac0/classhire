import { React } from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import Clase from "../../components/Clase/Clase";

import BackgroundLayout from "../../components/Layout/BackgroundLayout";



const Publicacion = ({ user, handleLogout }) => {

  let teacher = {
    name:"Mario Hernandez",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti non necessitatibus voluptatem soluta asperiores laboriosam ratione illum, sunt odit fugit quis dolorum dolore nobis recusandae facere, sint doloribus eius obcaecati!"
  }

  return (
    <BackgroundLayout
      component={<Clase title={'Clase Individual de Matematicas'} teacher={teacher} />}
    >
    </BackgroundLayout>
  );
};

export default Publicacion
