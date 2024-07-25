import { Layout } from "./components";
import "./styles/App.css";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

import CreateKanban from "./features/kanban-board/components/CreateKanban";
import KanbanBoard from "./features/kanban-board/components/KanbanBoard";

function App() {
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
