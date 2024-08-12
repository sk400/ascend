import { Avatar, Flex, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { auth } from "../services/authService";

const UserButton = ({ user }) => {
  return (
    <>
      <Flex
        sx={{
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "60px",
          px: 3,
          borderTop: "solid 1px",
          borderTopColor: "#E2E8F0",
        }}
      >
        <HStack spacing={2} alignItems="center">
          <Avatar name={user?.name} src={user?.photo} size="sm" />
          <Text
            sx={{
              fontWeight: 400,
            }}
          >
            {user?.name}
          </Text>
        </HStack>
        <IconButton
          sx={{
            bgColor: "white",
            _hover: {
              bgColor: "white",
            },
          }}
          onClick={() => signOut(auth)}
        >
          <Icon as={PiSignOutBold} color="blue.900" />
        </IconButton>
      </Flex>
    </>
  );
};

export default UserButton;
