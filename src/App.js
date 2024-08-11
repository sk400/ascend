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

function App() {
  const navigate = useNavigate();
  const { setUser, setBoards } = useGlobalState();

  const toast = useToast();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem("emailForSignIn");
      if (!email) {
        email = prompt("Please provide your email for confirmation");
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          toast({
            title: "Signed in successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("emailForSignIn");
        })
        .catch((error) => {
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

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          uid: user?.uid,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
            uid: user?.uid,
          })
        );

        if (user?.email) {
          const boardQuery = query(
            collection(db, "users", user?.email, "boards"),
            orderBy("createdAt", "asc")
          );

          onSnapshot(boardQuery, (querySnapshot) => {
            const documents = querySnapshot?.docs?.map((doc) => ({
              ...doc?.data(),
              id: doc?.id,
            }));

            if (documents?.length) {
              setBoards(documents);
            } else {
              setBoards([]);
            }
          });
        }

        navigate("/");
      } else {
        localStorage.removeItem("user");
        navigate("/sign-up");
      }
    });
  }, []);

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
