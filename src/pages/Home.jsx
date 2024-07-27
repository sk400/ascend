import { Center, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BoardCard } from "../components";

import { useGlobalState } from "../services/context";

const Home = () => {
  const { boards } = useGlobalState();

  const filteredBoards = boards?.filter(
    (board) => board?.archived === false && board?.deleted === false
  );

  if (!filteredBoards?.length) {
    return (
      <Center>
        <Text>No boards found</Text>
      </Center>
    );
  }

  return (
    <>
      {/* <SimpleGrid minChildWidth={"200px"} spacing={"20px"}>
        {boards?.map((board) => (
          <Link to={`/board/${board?.id}`} key={board?.id}>
            <BoardCard title={board.title} description={board.description} />
          </Link>
        ))}
      </SimpleGrid> */}
      <Wrap spacing={"20px"}>
        {filteredBoards?.map((board) => (
          <WrapItem key={board?.id}>
            <BoardCard board={board} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default Home;
