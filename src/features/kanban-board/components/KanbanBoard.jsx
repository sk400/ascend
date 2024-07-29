import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import List from "../../list/components/List";
import CreateListItem from "../../list-item/components/CreateListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useGlobalState } from "../../../services/context";
import { useParams } from "react-router-dom";

const KanbanBoard = () => {
  const { boards } = useGlobalState();
  const { boardId } = useParams();

  const currentBoard = boards?.find((board) => board.id === boardId);

  const numberOfTodo = currentBoard?.tasks?.todo?.length;
  const numberOfInProgress = currentBoard?.tasks?.inProgress?.length;
  const numberOfCompleted = currentBoard?.tasks?.completed?.length;

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // newArray.splice(0, 1)
    // newArray.splice(4, 0, 'May');
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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

            <List type="todo" />
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
            <List type="inprogress" />
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

            <List type="completed" />
          </Flex>
        </SimpleGrid>
      </Flex>
    </DragDropContext>
  );
};

export default KanbanBoard;
