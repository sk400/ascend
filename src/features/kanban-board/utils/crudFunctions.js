import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
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

// Edit board

export const editBoard = async ({ user, boardId, data }) => {
  try {
    if (!data?.title || !data || !boardId) {
      return;
    }

    await updateDoc(doc(db, "users", user?.email, "boards", boardId), {
      ...data,
    });
    console.log("Board edited successfully");
  } catch (error) {
    console.log(error);
  }
};

// Create a functions to delete all the boards that has "deleted" set to true

export const emptyBin = async ({ user }) => {
  try {
    if (!user) {
      return;
    }

    const batch = writeBatch(db);

    const q = query(
      collection(db, "users", user?.email, "boards"),
      where("deleted", "==", true)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("Bin is emptied successfully");
  } catch (error) {
    console.error("Error deleting boards:", error);
  }
};
