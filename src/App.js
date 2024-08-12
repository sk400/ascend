import { Layout } from "./components";
import { Home, Archive, Bin } from "./pages";
import "./styles/App.css";
import { Box, useToast } from "@chakra-ui/react";

import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
} from "firebase/auth";

import CreateKanban from "./features/kanban-board/components/CreateKanban";
import KanbanBoard from "./features/kanban-board/components/KanbanBoard";
import { useEffect } from "react";
import { auth, db } from "./services/authService";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useGlobalState } from "./services/context";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

/**
 * The main App component.
 *
 * This component handles the authentication and navigation of the application.
 * It also handles the retrieval of boards from
 * the Firestore database.
 */
function App() {
  // Get the navigation object
  const navigate = useNavigate();
  // Get the user and boards state from the global state
  const { setUser, setBoards } = useGlobalState();
  // Get the toast object
  const toast = useToast();

  /**
   * UseEffect hook to handle the authentication and navigation of the application.
   * It checks if the current URL contains a sign-in email link. If it does, it
   * retrieves the user's email from local storage, signs the user in with the
   * email link, and updates the user and boards state.
   */
  useEffect(() => {
    // Check if there is a sign-in email link in the current URL
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Retrieve the user's email from local storage or prompt the user to enter it
      let email = localStorage.getItem("emailForSignIn");
      if (!email) {
        email = prompt("Please provide your email for confirmation");
      }

      // Sign the user in with the email link
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Display a success toast notification
          toast({
            title: "Signed in successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          // Remove the email from local storage
          localStorage.removeItem("emailForSignIn");
        })
        .catch((error) => {
          // Display an error toast notification and log the error to the console
          toast({
            title: "Error signing in",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          console.log(error);
        });
    }

    /**
     * Listen for changes in the authentication state.
     * If the user is authenticated, update the user and boards state.
     * If the user is not authenticated, navigate to the guest-mode page.
     */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Update the user state with the user's display name, email, photo URL, and UID
        setUser({
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          uid: user?.uid,
        });

        // Store the user state in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
            uid: user?.uid,
          })
        );

        // Retrieve the user's boards from the Firestore database
        if (user?.email) {
          const boardQuery = query(
            collection(db, "users", user?.email, "boards"),
            orderBy("createdAt", "asc")
          );

          // Listen for changes in the boards query snapshot
          onSnapshot(boardQuery, (querySnapshot) => {
            // Map the query snapshot documents to an array of objects
            const documents = querySnapshot?.docs?.map((doc) => ({
              ...doc?.data(),
              id: doc?.id,
            }));

            // Update the boards state with the retrieved boards
            if (documents?.length) {
              setBoards(documents);
            } else {
              setBoards([]);
            }
          });
        }

        // Navigate to the home page
        navigate("/");
      } else {
        // Remove the user state from local storage and navigate to the guest-mode page
        localStorage.removeItem("user");
        navigate("/guest-mode");
      }
    });
  }, []);

  /**
   * Render the App component.
   * It displays the layout component, which contains the create board component
   * and the routing component.
   */
  return (
    <>
      <Layout>
        <Box
          sx={{
            px: { base: 3, lg: 5 },
            maxWidth: "1200px",
            mx: "auto",
            py: { base: 5, lg: 7 },
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Create board */}
          <CreateKanban />

          {/* Routing component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/bin" element={<Bin />} />
            <Route path="/board/:boardId" element={<KanbanBoard />} />
          </Routes>
        </Box>
      </Layout>
    </>
  );
}

export default App;
