import { Flex, Icon, IconButton, Image, Spacer } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import logo from "../assets/ascend-logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        direction="row"
        alignItems="center"
        shadow="md"
        sx={{
          display: { base: "flex", xl: "none" },
          p: 3,
          bgColor: "white",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <Image
          objectFit="cover"
          src={logo}
          alt="Ascend logo"
          onClick={() => {
            navigate("/");
          }}
          cursor="pointer"
        />
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
