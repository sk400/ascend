import { Flex, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { IoAddSharp } from "react-icons/io5";

const CreateListItem = ({ type, numOfItems }) => {
  return (
    <Flex
      sx={{
        direction: "row",
        slignItems: "center",
        minWidth: "200px",
        justifyContent: "space-between",
        py: 1,
        px: 5,
        borderRadius: "full",
        // boxShadow: "lg",
        // bg: "#4F46E5",
        bg: "blue.900",
      }}
    >
      <HStack>
        <Text
          sx={{
            bg: "white",
            px: 3,

            fontWeight: 400,
            borderRadius: "full",
          }}
        >
          {numOfItems}
        </Text>
        <Text
          sx={{
            color: "white",
            fontWeight: 600,
          }}
          size="sm"
        >
          {type}
        </Text>
      </HStack>
      <IconButton
        sx={{
          bg: "blue.900",
          _hover: {
            bg: "blue.900",
          },
        }}
      >
        <Icon as={IoAddSharp} color="white" />
      </IconButton>
    </Flex>
  );
};

export default CreateListItem;
