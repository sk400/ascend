import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../services/authService";

export const createBoard = async ({ data, user }) => {
  try {
    const info = {
      ...data,
      deleted: false,
      archived: false,
      tasks: {
        todo: [],
        inprogress: [],
        completed: [],
      },
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "users", user?.email, "boards"), info);
    console.log("Board created successfully");
  } catch (error) {
    console.log(error);
  }
};

// export const deleteBoard = async ({ user, boardId }) => {
//   try {
//     await deleteDoc(doc(db, "users", user?.email, "boards", boardId));
//     console.log("Board deleted successfully");
//   } catch (error) {
//     console.log(error);
//   }
// };

export const changeBoardState = async ({ user, boardId, state }) => {
  try {
    await updateDoc(doc(db, "users", user?.email, "boards", boardId), {
      ...state,
    });
    console.log("Board state changed successfully");
  } catch (error) {
    console.log(error);
  }
};
