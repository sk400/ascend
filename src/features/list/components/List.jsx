import { Flex } from "@chakra-ui/react";
import ListItem from "../../list-item/components/ListItem";
import { useParams } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalState } from "../../../services/context";

const List = ({ type }) => {
  const { boardId } = useParams();
  const { boards } = useGlobalState();

  const currentBoard = boards?.find((board) => board.id.toString() === boardId);
  const allTasks = currentBoard?.tasks[type];

  return (
    <>
      <Droppable droppableId={type}>
        {(provided) => (
          <Flex
            ref={provided.innerRef}
            {...provided.droppableProps}
            direction="column"
            gap={3}
            sx={{
              p: { base: 3, lg: 5 },
              bgColor: "white",
              borderBottomRadius: "xl",
              // minHeight: "100px",
            }}
          >
            {allTasks?.map((task, index) => (
              <ListItem
                key={task.id}
                task={task}
                boardId={boardId}
                type={type}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </>
  );
};

export default List;
