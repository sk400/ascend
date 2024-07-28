import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ListItem from "../../list-item/components/ListItem";

import { useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../services/authService";

const List = ({ type, setterFunction }) => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { boardId } = useParams();

  useEffect(() => {
    // Make it a custom hook

    const unsubscribe = onSnapshot(
      collection(
        db,
        "users",
        user?.email,
        "boards",
        boardId,
        "type",
        type,
        "tasks"
      ),
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (!documents?.length) {
          setTasks([]);
          setterFunction(0);
        } else {
          setTasks(documents);
          setterFunction(documents?.length);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [type, user?.email, boardId]);

  if (!tasks?.length) return;

  return (
    <Flex
      direction="column"
      gap={3}
      sx={{
        p: { base: 3, lg: 5 },
        bgColor: "white",
        borderBottomRadius: "xl",
      }}
    >
      {tasks?.map((task) => (
        <ListItem key={task.id} task={task} boardId={boardId} type={type} />
      ))}
    </Flex>
  );
};

export default List;
