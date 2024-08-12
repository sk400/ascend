import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import List from "../../list/components/List";
import CreateListItem from "../../list-item/components/CreateListItem";
import { DragDropContext } from "react-beautiful-dnd";
import { useGlobalState } from "../../../services/context";
import { useParams } from "react-router-dom";
import { moveTask, updatePosition } from "../../list/utils/crudFunctions";

const KanbanBoard = () => {
  const { boards, setBoards, user } = useGlobalState();
  const { boardId } = useParams();

  const currentBoard = boards?.find((board) => board.id.toString() === boardId);

  const numberOfTodo = currentBoard?.tasks?.todo?.length;
  const numberOfInProgress = currentBoard?.tasks?.inprogress?.length;
  const numberOfCompleted = currentBoard?.tasks?.completed?.length;

  const arrayMove = (array, sourceIndex, destinationIndex) => {
    let newArray = [...array];
    const [removed] = newArray.splice(sourceIndex, 1);
    newArray.splice(destinationIndex, 0, removed);
    return newArray;
  };

  /**
   * Handle the drag end event.
   * @param {Object} result - The result of the drag end event.
   * @param {Object} result.source - The source of the drag end event.
   * @param {string} result.source.droppableId - The ID of the droppable area where the drag started.
   * @param {number} result.source.index - The index of the dragged item in its droppable area.
   * @param {Object} result.destination - The destination of the drag end event.
   * @param {string} result.destination.droppableId - The ID of the droppable area where the drag ended.
   * @param {number} result.destination.index - The index where the dragged item will be placed in its droppable area.
   */
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If there is no destination, return
    if (!destination) {
      return;
    }

    // If the source and destination are the same, return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get the start and end column of the drag
    const startColumn = source.droppableId;
    const finishColumn = destination.droppableId;

    // If the start and end column are the same, update the task order in the column and return
    if (startColumn === finishColumn) {
      setBoards((prevBoards) => {
        const boardIndex = prevBoards?.findIndex(
          (board) => board.id.toString() === boardId
        );
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

        if (user?.email) {
          // Update the position of the task in the database
          updatePosition({
            user,
            boardId,
            type: destination.droppableId,
            updatedArray: updatedItems,
          });
        }

        return updatedBoards;
      });

      return;
    }

    // Get the start and end index of the drag
    const startIndex = source.index;
    const finishIndex = destination.index;

    // Update the task order in the board and the database
    setBoards((prevBoards) => {
      const boardIndex = prevBoards?.findIndex(
        (board) => board.id.toString() === boardId
      );
      if (boardIndex === -1) {
        return prevBoards;
      }

      let updatedBoards = [...prevBoards];

      const currentBoard = updatedBoards[boardIndex];
      const sourceArray = currentBoard.tasks[startColumn] || [];
      const finishArray = currentBoard.tasks[finishColumn] || [];

      const [removed] = sourceArray?.splice(startIndex, 1);

      finishArray?.splice(finishIndex, 0, removed);

      updatedBoards[boardIndex] = {
        ...updatedBoards[boardIndex],
        tasks: {
          ...updatedBoards[boardIndex].tasks,
          [startColumn]: sourceArray,
          [finishColumn]: finishArray,
        },
      };

      // Update the task order in the database
      // DB update

      if (user?.email) {
        moveTask({
          user,
          boardId,
          from: startColumn,
          to: finishColumn,
          sourceArray,
          finishArray,
        });
      }

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
