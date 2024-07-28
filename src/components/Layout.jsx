import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import React from "react";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Flex
      sx={{
        direction: "row",
        height: "100vh",
        overflowY: "none",
      }}
    >
      {/* Sidebar */}
      <Sidebar btnRef={btnRef} isOpen={isOpen} onClose={onClose} />

      {/* Main */}

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          bgColor: "gray.50",
        }}
      >
        <Navbar onOpen={onOpen} />
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
