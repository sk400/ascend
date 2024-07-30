import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import List from "../../list/components/List";
import CreateListItem from "../../list-item/components/CreateListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useGlobalState } from "../../../services/context";
import { useParams } from "react-router-dom";
import { updatePosition } from "../../list/utils/crudFunctions";

const KanbanBoard = () => {
  const { boards, setBoards, user } = useGlobalState();
  const { boardId } = useParams();
  const [updatedArray, setupdatedArray] = useState([]);

  const currentBoard = boards?.find((board) => board.id === boardId);

  const numberOfTodo = currentBoard?.tasks?.todo?.length;
  const numberOfInProgress = currentBoard?.tasks?.inprogress?.length;
  const numberOfCompleted = currentBoard?.tasks?.completed?.length;

  const arrayMove = (array, sourceIndex, destinationIndex) => {
    let newArray = [...array];

    const [removed] = newArray.splice(sourceIndex, 1);
    newArray.splice(destinationIndex, 0, removed);
    setupdatedArray(newArray);
    return newArray;
  };

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

    setBoards((prevBoards) => {
      const boardIndex = prevBoards?.findIndex((board) => board.id === boardId);
      if (boardIndex === -1) {
        return prevBoards;
      }

      let updatedBoards = [...prevBoards];

      const updatedItems = arrayMove(
        updatedBoards[boardIndex].tasks[destination.droppableId],
        source.index,
        destination.index
      );

      updatedBoards[boardIndex] = {
        ...updatedBoards[boardIndex],
        tasks: {
          ...updatedBoards[boardIndex].tasks,
          [destination.droppableId]: updatedItems,
        },
      };

      updatePosition({
        user,
        boardId,
        type: destination.droppableId,
        updatedArray: updatedItems,
      });

      return updatedBoards;
    });
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
                borderBottomRadius: !numberOfTodo ? "xl" : "none",
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
                borderBottomRadius: !numberOfInProgress ? "xl" : "none",
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
                borderBottomRadius: !numberOfCompleted ? "xl" : "none",
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
