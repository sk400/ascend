import { Flex } from "@chakra-ui/react";
import React from "react";

import ListItem from "../../list-item/components/ListItem";

const List = () => {
  return (
    <Flex
      sx={{
        direction: "column",
        gap: 3,
      }}
    >
      <ListItem />
    </Flex>
  );
};

export default List;
