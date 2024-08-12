import { db } from "../../../services/authService";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Create list-item

/**
 * Creates a new task in the specified board and type.
 * @param {Object} params - The parameters for creating the task.
 * @param {Object} params.data - The data for the task.
 * @param {string} params.data.title - The title of the task.
 * @param {string} params.data.description - The description of the task.
 * @param {string} params.data.priority - The priority of the task.
 * @param {Object} params.user - The user object.
 * @param {string} params.user.email - The email of the user.
 * @param {string} params.boardId - The ID of the board.
 * @param {string} params.type - The type of the task.
 * @returns {Promise<void>} - A promise that resolves when the task is created successfully.
 * @throws {Error} - If any of the required parameters are missing.
 */
export const createListItem = async ({ data, user, boardId, type }) => {
  try {
    // Check if all the required parameters are provided
    if (
      !data?.title ||
      !data?.description ||
      !data?.priority ||
      !user?.email ||
      !boardId ||
      !type
    ) {
      throw new Error("Missing required parameters to create the item");
    }

    // Get the document reference for the board
    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    // Get the existing tasks of the specified type or create a new array
    const newTypeArray = boardDoc?.tasks[type] || [];

    // Add the new task to the array
    newTypeArray.push({
      ...data,
    });

    // Update the board document with the new tasks array
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

/**
 * Updates a list item in the specified board and type.
 *
 * @param {Object} params - The parameters for updating the list item.
 * @param {Object} params.data - The updated data for the list item.
 * @param {string} params.data.title - The updated title of the list item.
 * @param {string} params.data.description - The updated description of the list item.
 * @param {string} params.data.priority - The updated priority of the list item.
 * @param {Object} params.user - The user object.
 * @param {string} params.user.email - The email of the user.
 * @param {string} params.boardId - The ID of the board.
 * @param {string} params.type - The type of the list item.
 * @param {string} params.taskId - The ID of the list item.
 * @returns {Promise<void>} - A promise that resolves when the list item is updated successfully.
 * @throws {Error} - If any of the required parameters are missing.
 */
export const updateListItem = async ({ data, user, boardId, type, taskId }) => {
  try {
    // Check if all the required parameters are provided
    if (
      !data?.title ||
      !data?.description ||
      !data?.priority ||
      !user?.email ||
      !boardId ||
      !type
    ) {
      throw new Error("Missing required parameters to update the item");
    }

    // Get the document reference for the board
    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    // Get the existing tasks of the specified type or create a new array
    const newTypeArray = boardDoc?.tasks[type] || [];

    // Update the list item in the tasks array
    const updatedArray = newTypeArray.map((task) => {
      // If the task ID matches, update the task with the new data
      if (task.id === taskId) {
        return data;
      }

      return task;
    });

    // Update the board document with the new tasks array
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

/**
 * Deletes a task from a board.
 *
 * @param {Object} params - The parameters for deleting the task.
 * @param {Object} params.user - The user object.
 * @param {string} params.user.email - The email of the user.
 * @param {string} params.boardId - The ID of the board.
 * @param {string} params.type - The type of the task.
 * @param {string} params.taskId - The ID of the task.
 * @return {Promise<void>} A promise that resolves when the task is deleted successfully.
 */
export const deleteListItem = async ({ user, boardId, type, taskId }) => {
  try {
    // Check if all the required parameters are provided
    if (!user || !boardId || !type || !taskId) {
      return;
    }

    // Get the document reference for the board
    const boardDocRef = doc(db, "users", user?.email, "boards", boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardDoc = boardDocSnap?.data();

    // Get the existing tasks of the specified type or create a new array
    const newTypeArray = boardDoc?.tasks[type] || [];

    // Filter out the task with the matching ID
    const filteredTasks = newTypeArray.filter((task) => task.id !== taskId);

    // Update the board document with the new tasks array
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
