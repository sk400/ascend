import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import List from "../../list/components/List";
import CreateListItem from "../../list-item/components/CreateListItem";

const KanbanBoard = () => {
  // layout (grid or flex)
  // Create list-item button
  // List item card

  return (
    <Flex direction="column" gap={5}>
      <SimpleGrid minChildWidth="200px" spacing="20px">
        {/* Todo */}

        <Flex direction="column" gap={5}>
          <CreateListItem type="Todo" numOfItems={2} />
          <List />
        </Flex>
        {/* In progress */}
        <Flex direction="column" gap={5}>
          <CreateListItem type="In progress" numOfItems={3} />
          <List />
        </Flex>
        {/* Completed */}
        <Flex direction="column" gap={5}>
          <CreateListItem type="Completed" numOfItems={4} />
          <List />
        </Flex>
        {/* Reviewed */}
        <Flex direction="column" gap={5}>
          <CreateListItem type="Reviewed" numOfItems={1} />
          <List />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default KanbanBoard;
