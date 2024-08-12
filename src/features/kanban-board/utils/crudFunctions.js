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

/**
 * Creates a new board in the user's collection.
 *
 * @param {Object} params - The parameters for creating the board.
 * @param {Object} params.data - The data for the board.
 * @param {string} params.data.title - The title of the board.
 * @param {Object} params.user - The user object.
 * @return {Promise<void>} A promise that resolves when the board is created.
 */
export const createBoard = async ({ data, user }) => {
  try {
    // Create the board information object.
    const info = {
      ...data, // Include the provided data.
      deleted: false, // Set the deleted flag to false.
      archived: false, // Set the archived flag to false.
      tasks: {
        todo: [], // Initialize the todo array.
        inprogress: [], // Initialize the in-progress array.
        completed: [], // Initialize the completed array.
      },
      createdAt: serverTimestamp(), // Set the createdAt field to the server timestamp.
    };

    // Add the board to the user's collection.
    await addDoc(collection(db, "users", user?.email, "boards"), info);
    console.log("Board created successfully");
  } catch (error) {
    // Log any errors that occur.
    console.log(error);
  }
};

/**
 * Changes the state of a board in the user's collection.
 *
 * @param {Object} params - The parameters for changing the board state.
 * @param {Object} params.user - The user object.
 * @param {string} params.boardId - The ID of the board.
 * @param {Object} params.state - The new state of the board.
 * @return {Promise<void>} A promise that resolves when the board state is changed.
 */
export const changeBoardState = async ({ user, boardId, state }) => {
  try {
    // Update the board document in the user's collection with the new state.
    await updateDoc(doc(db, "users", user?.email, "boards", boardId), {
      ...state,
    });

    // Log a success message.
    console.log("Board state changed successfully");
  } catch (error) {
    // Log any errors that occur.
    console.log(error);
  }
};

// Edit board

/**
 * Updates the board with the given ID in the user's collection with the provided data.
 *
 * @param {Object} params - The parameters for editing the board.
 * @param {Object} params.user - The user object.
 * @param {string} params.boardId - The ID of the board to be edited.
 * @param {Object} params.data - The data to update the board with.
 * @return {Promise<void>} A promise that resolves when the board is edited successfully.
 */
export const editBoard = async ({ user, boardId, data }) => {
  try {
    // Check if the data object has a title and if both the data and boardId are provided
    if (!data?.title || !data || !boardId) {
      return;
    }

    // Update the board document in the user's collection with the new data.
    await updateDoc(doc(db, "users", user?.email, "boards", boardId), {
      ...data,
    });

    // Log a success message.
    console.log("Board edited successfully");
  } catch (error) {
    // Log any errors that occur.
    console.log(error);
  }
};

// Create a functions to delete all the boards that has "deleted" set to true

/**
 * Deletes all boards from the user's bin (where "deleted" is set to true).
 *
 * @param {Object} params - The parameters for deleting the boards.
 * @param {Object} params.user - The user object.
 * @return {Promise<void>} A promise that resolves when the boards are deleted successfully.
 */
export const emptyBin = async ({ user }) => {
  try {
    // If no user is provided, return early.
    if (!user) {
      return;
    }

    // Create a write batch to perform multiple Firestore operations.
    const batch = writeBatch(db);

    // Query for all boards where "deleted" is set to true.
    const q = query(
      collection(db, "users", user?.email, "boards"),
      where("deleted", "==", true)
    );

    // Get the documents that match the query.
    const querySnapshot = await getDocs(q);

    // Iterate over the documents and add them to the batch for deletion.
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Commit the batch to perform the deletions.
    await batch.commit();

    // Log a success message.
    console.log("Bin is emptied successfully");
  } catch (error) {
    // Log any errors that occur.
    console.error("Error deleting boards:", error);
  }
};
