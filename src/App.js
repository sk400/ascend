import { Layout } from "./components";
import "./styles/App.css";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

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
          }}
        >
          {/* Create board */}
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bgColor="white"
            sx={{
              p: { base: 2, md: 3, lg: 4 },
              borderRadius: "xl",
            }}
          >
            <Heading size="lg">Dashboard</Heading>
            <IconButton
              sx={{
                bgColor: "white",
                _hover: {
                  bg: "white",
                },
              }}
            >
              <IoIosAddCircleOutline size="30px" />
            </IconButton>
          </Flex>
        </Box>
      </Layout>
    </>
  );
}

export default App;
