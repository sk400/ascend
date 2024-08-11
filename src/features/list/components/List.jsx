import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ListItem from "../../list-item/components/ListItem";

import { useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../services/authService";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalState } from "../../../services/context";

const List = ({ type }) => {
  const { boardId } = useParams();
  const { boards } = useGlobalState();

  // useEffect(() => {
  //   // Make it a custom hook

  //   const unsubscribe = onSnapshot(
  //     collection(db, "users", user?.email, "boards"),
  //     (snapshot) => {
  //       const documents = snapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));

  //       // if (!documents?.length) {
  //       //   setTasks([]);
  //       //   setterFunction(0);
  //       // } else {
  //       //   setTasks(documents);
  //       //   setterFunction(documents?.length);
  //       // }
  //       if (!documents?.length) {
  //         setDocs([]);
  //       } else {
  //         setDocs(documents);
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, [type, user?.email, boardId]);

  const currentBoard = boards?.find((board) => board.id.toString() === boardId);
  const allTasks = currentBoard?.tasks[type];

  // if (!allTasks?.length) return;

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
