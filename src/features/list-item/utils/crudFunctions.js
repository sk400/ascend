import { db } from "../../../services/authService";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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

    await addDoc(
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
      {
        ...data,
        createdAt: serverTimestamp(),
      }
    );
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

    const document = doc(
      db,
      "users",
      user?.email,
      "boards",
      boardId,
      "type",
      type,
      "tasks",
      taskId
    );

    await updateDoc(document, {
      ...data,
    });
    console.log("Task updated successfully");
  } catch (error) {
    console.log(error);
  }
};

// Delete list-item

export const deleteListItem = async ({ taskId, user, boardId, type }) => {
  try {
    if (!taskId || !user || !boardId || !type) {
      return;
    }

    const document = doc(
      db,
      "users",
      user?.email,
      "boards",
      boardId,
      "type",
      type,
      "tasks",
      taskId
    );

    await deleteDoc(document);
    console.log("Task deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
