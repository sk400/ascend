import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/authService";

export const updatePosition = async ({ user, boardId, type, updatedArray }) => {
  try {
    if (!user || !boardId || !type || !updatedArray) {
      return;
    }

    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    if (updatedArray?.length === 0) {
      return;
    }

    await updateDoc(boardDocRef, {
      tasks: {
        ...boardDoc.tasks,
        [type]: updatedArray,
      },
    });

    console.log("Position updated successfully");
  } catch (error) {
    console.log(error);
  }
};
