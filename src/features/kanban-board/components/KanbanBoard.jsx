import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import List from "../../list/components/List";
import CreateListItem from "../../list-item/components/CreateListItem";

const KanbanBoard = () => {
  const [numberOfTodo, setNumberOfTodo] = useState(0);
  const [numberOfInProgress, setNumberOfInProgress] = useState(0);
  const [numberOfCompleted, setNumberOfCompleted] = useState(0);

  return (
    <Flex direction="column">
      <SimpleGrid minChildWidth="250px" spacing={["10px", "10px", "40px"]}>
        {/* Todo */}

        <Flex
          direction="column"
          sx={{
            borderRadius: "3xl",
          }}
        >
          <Box
            sx={{
              p: { base: 3, lg: 5 },
              bgColor: "white",
              borderTopRadius: "xl",
              borderBottomRadius: numberOfTodo === 0 ? "xl" : "none",
            }}
          >
            <CreateListItem type="Todo" numOfItems={numberOfTodo} />
          </Box>
          <List type="todo" setterFunction={setNumberOfTodo} />
        </Flex>
        {/* In progress */}
        <Flex
          direction="column"
          sx={{
            borderRadius: "3xl",
            height: "auto",
          }}
        >
          <Box
            sx={{
              p: { base: 3, lg: 5 },
              bgColor: "white",
              borderTopRadius: "xl",
              borderBottomRadius: numberOfInProgress === 0 ? "xl" : "none",
            }}
          >
            <CreateListItem
              type="In progress"
              numOfItems={numberOfInProgress}
            />
          </Box>

          <List type="inprogress" setterFunction={setNumberOfInProgress} />
        </Flex>
        {/* Completed */}
        <Flex
          direction="column"
          sx={{
            borderRadius: "3xl",
          }}
        >
          <Box
            sx={{
              p: { base: 3, lg: 5 },
              bgColor: "white",
              borderTopRadius: "xl",
              borderBottomRadius: numberOfCompleted === 0 ? "xl" : "none",
            }}
          >
            <CreateListItem type="Completed" numOfItems={numberOfCompleted} />
          </Box>

          <List type="completed" setterFunction={setNumberOfCompleted} />
        </Flex>
        {/* Reviewed */}
        {/* <Flex direction="column" gap={5}>
          <CreateListItem type="Reviewed" numOfItems={1} />
          <List />
        </Flex> */}
      </SimpleGrid>
    </Flex>
  );
};

export default KanbanBoard;
