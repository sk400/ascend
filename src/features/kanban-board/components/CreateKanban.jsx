import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

const CreateKanban = () => {
  return (
    <>
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
    </>
  );
};

export default CreateKanban;
