import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/authService";

/**
 * Updates the position of a task in a board.
 *
 * @param {Object} params - The parameters for updating the position.
 * @param {Object} params.user - The user object.
 * @param {string} params.boardId - The ID of the board.
 * @param {string} params.type - The type of the task.
 * @param {Array} params.updatedArray - The updated array of tasks.
 * @return {Promise<void>} A promise that resolves when the position is updated successfully.
 */
export const updatePosition = async ({ user, boardId, type, updatedArray }) => {
  try {
    // Check if the necessary parameters are provided.
    if (!user || !boardId || !type || !updatedArray) {
      return;
    }

    // Get the board document reference.
    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);

    // Get the board document snapshot.
    const boardDocSnap = await getDoc(boardDocRef);

    // Get the board document data.
    const boardDoc = boardDocSnap?.data();

    // Check if the updated array is empty.
    if (updatedArray?.length === 0) {
      return;
    }

    // Update the task position in the board document.
    await updateDoc(boardDocRef, {
      tasks: {
        ...boardDoc.tasks,
        [type]: updatedArray,
      },
    });

    // Log a success message.
    console.log("Position updated successfully");
  } catch (error) {
    // Log any errors that occur.
    console.log(error);
  }
};

/**
 * Moves a task from one position to another within a board.
 *
 * @param {Object} params - The parameters for moving the task.
 * @param {Object} params.user - The user object.
 * @param {string} params.boardId - The ID of the board.
 * @param {string} params.from - The source position.
 * @param {string} params.to - The destination position.
 * @param {Array} params.sourceArray - The array of tasks at the source position.
 * @param {Array} params.finishArray - The array of tasks at the destination position.
 * @return {Promise<void>} A promise that resolves when the task is moved successfully.
 */
export const moveTask = async ({
  user, // The user object.
  boardId, // The ID of the board.
  from, // The source position.
  to, // The destination position.
  sourceArray, // The array of tasks at the source position.
  finishArray, // The array of tasks at the destination position.
}) => {
  try {
    // Check if all the necessary parameters are provided.
    if (!user || !boardId || !from || !to) {
      return;
    }

    // Get the board document reference.
    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);

    // Get the board document snapshot.
    const boardDocSnap = await getDoc(boardDocRef);

    // Get the board document data.
    const boardDoc = boardDocSnap?.data();

    // Update the task position in the board document.
    await updateDoc(boardDocRef, {
      tasks: {
        ...boardDoc.tasks, // Copy the existing tasks object.
        [from]: sourceArray, // Update the source position with the provided array.
        [to]: finishArray, // Update the destination position with the provided array.
      },
    });

    // Log a success message.
    console.log("Task moved successfully");
  } catch (error) {
    // Log any errors that occur.
    console.log(error);
  }
};
