import {
  Box,
  Center,
  Icon,
  IconButton,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { BoardCard } from "../components";

import { useGlobalState } from "../services/context";
import { MdDelete } from "react-icons/md";
import { emptyBin } from "../features/kanban-board/utils/crudFunctions";

const Bin = () => {
  const { boards, user, setBoards } = useGlobalState();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleEmptyBin = () => {
    // ui update

    setBoards((prevBoards) => {
      return prevBoards.filter((board) => !board.deleted);
    });

    if (user?.email) {
      emptyBin({ user, boardId: null });
    }
    onClose();
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Wrap spacing={"20px"}>
          {filteredBoards?.map((board) => (
            <WrapItem key={board?.id}>
              <BoardCard board={board} />
            </WrapItem>
          ))}
        </Wrap>
        <Tooltip
          label="Empty bin"
          aria-label="A tooltip"
          hasArrow
          placement="left"
        >
          <IconButton
            sx={{
              bgColor: "blue.900",
              color: "gray.50",
              _hover: {
                bgColor: "blue.800",
              },
              position: "absolute",
              bottom: { base: "10px", sm: "40px", lg: "60px" },
              right: { base: "10px", sm: "40px", lg: "60px" },
              zIndex: 20,
            }}
            onClick={onOpen}
          >
            <Icon>
              <MdDelete size="26px" />
            </Icon>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Delete confirmation modal */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to clear bin?</ModalBody>

          <ModalFooter>
            <Button
              sx={{
                bgColor: "blue.900",
                color: "gray.50",
                _hover: {
                  bgColor: "blue.800",
                },
              }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button onClick={handleEmptyBin}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Bin;
