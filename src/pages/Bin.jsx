import { Center, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BoardCard } from "../components";

import { useGlobalState } from "../services/context";

const Bin = () => {
  const { boards } = useGlobalState();

  const filteredBoards = boards?.filter(
    (board) => board?.archived === false && board?.deleted === true
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
      {" "}
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

export default Bin;
