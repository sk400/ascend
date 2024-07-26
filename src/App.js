import { Layout } from "./components";
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
import { auth } from "./services/authService";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "./services/context";

function App() {
  const navigate = useNavigate();
  const { setUser } = useGlobalState();
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

        // localStorage.setItem(
        //   "user",
        //   JSON.stringify({
        //     name: user?.displayName,
        //     email: user?.email,
        //     photo: user?.photoURL,
        //     uid: user?.uid,
        //   })
        // );
        navigate("/");
      } else {
        // localStorage.removeItem("user");
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

          {/* Kanban board */}
          <KanbanBoard />
        </Box>
      </Layout>
    </>
  );
}

export default App;
