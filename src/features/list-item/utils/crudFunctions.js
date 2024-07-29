import { db } from "../../../services/authService";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// Create list-item

export const createListItem = async ({ data, user, boardId, type }) => {
  try {
    if (
      !data?.title ||
      !data?.description ||
      !data?.priority ||
      !user?.email ||
      !boardId ||
      !type
    )
      return;

    // Get the doc

    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    const newTypeArray = boardDoc?.tasks[type] || [];
    newTypeArray.push({
      ...data,
    });

    await updateDoc(boardDocRef, {
      tasks: {
        ...boardDoc.tasks,
        [type]: newTypeArray,
      },
    });

    console.log("Task created successfully");
  } catch (error) {
    console.log(error);
  }
};

// Update list-item

export const updateListItem = async ({ data, user, boardId, type, taskId }) => {
  try {
    if (
      !data?.title ||
      !data?.description ||
      !data?.priority ||
      !user?.email ||
      !boardId ||
      !type
    )
      return;

    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    const newTypeArray = boardDoc?.tasks[type] || [];

    const updatedArray = newTypeArray.map((task) => {
      if (task.id === taskId) {
        return data;
      }

      return task;
    });

    await updateDoc(boardDocRef, {
      ...boardDoc,
      tasks: {
        ...boardDoc.tasks,
        [type]: updatedArray,
      },
    });
    console.log("Task updated successfully");
  } catch (error) {
    console.log(error);
  }
};

// Delete list-item

export const deleteListItem = async ({ user, boardId, type, taskId }) => {
  try {
    if (!user || !boardId || !type || !taskId) {
      return;
    }

    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    const newTypeArray = boardDoc?.tasks[type] || [];

    const filteredTasks = newTypeArray.filter((task) => task.id !== taskId);

    await updateDoc(boardDocRef, {
      tasks: {
        ...boardDoc.tasks,
        [type]: filteredTasks,
      },
    });

    console.log("Task deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
