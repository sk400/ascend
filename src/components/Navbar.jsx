import { Flex, Icon, IconButton, Image, Spacer } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import logo from "../assets/ascend-logo.png";

const Navbar = ({ onOpen }) => {
  return (
    <>
      <Flex
        direction="row"
        alignItems="center"
        shadow="md"
        sx={{
          display: { base: "flex", lg: "none" },
          p: 3,
          bgColor: "white",
        }}
      >
        <Image objectFit="cover" src={logo} alt="Ascend logo" />
        <Spacer />
        <IconButton
          sx={{
            bgColor: "white",
            _hover: {
              bg: "White",
            },
          }}
          onClick={onOpen}
        >
          <Icon as={MdMenu} w={7} h={7} />
        </IconButton>
      </Flex>
    </>
  );
};

export default Navbar;
