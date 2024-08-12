import {
  Card,
  CardHeader,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  changeBoardState,
  editBoard,
} from "../features/kanban-board/utils/crudFunctions";
import { useGlobalState } from "../services/context";
import { useState } from "react";

const BoardCard = ({ board }) => {
  const navigate = useNavigate();
  const { user, setBoards } = useGlobalState();
  const [boardTitle, setBoardTitle] = useState(board?.title);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isArchived = board?.archived;
  const isDeleted = board?.deleted;

  /**
   * Handle the edit action for the board.
   * This function updates the board title and calls the editBoard function
   * to update the board title in the database.
   */
  const handleEdit = () => {
    // Check if the user is logged in
    if (user?.email) {
      // Call the editBoard function to update the board title in the database
      editBoard({
        user, // The user object
        boardId: board?.id, // The ID of the board
        data: {
          // The data to be updated
          title: boardTitle, // The new title of the board
        },
      });
    }

    // Update the boards state with the new title
    setBoards((prevBoards) => {
      return prevBoards?.map((item) => {
        if (item?.id === board?.id) {
          board.title = boardTitle; // Update the title of the board
          board.title = boardTitle;
          return item;
        }
        return item;
      });
    });

    // Close the modal and reset the board title state
    onClose();
    setBoardTitle(""); // Reset the board title state
    setBoardTitle("");
  };

  /**
   * Handles the archive state of a board.
   * Updates the 'archived' state of a board in the local state and
   * in the database.
   */
  const handleArchiveState = () => {
    // Update the 'archived' state of the board in the local state
    setBoards((prevBoards) => {
      return prevBoards.map((item) => {
        if (item?.id === board?.id) {
          board.archived = isArchived ? false : true; // Toggle the archived state
          return item;
        }
        return item;
      });
    });

    // If the user is logged in, update the 'archived' state of the board in the database
    if (user?.email) {
      changeBoardState({
        user, // The user object
        boardId: board?.id, // The ID of the board
        state: {
          archived: isArchived ? false : true, // The new archived state
          deleted: false, // The deleted state remains unchanged
        },
      });
    }
  };

  /**
   * Handles the delete state of a board.
   * Updates the 'deleted' state of a board in the local state and
   * in the database.
   */
  const handleDelete = () => {
    // Update the 'deleted' state of the board in the local state
    setBoards((prevBoards) => {
      return prevBoards?.map((item) => {
        if (item?.id === board?.id) {
          board.deleted = isDeleted ? false : true; // Toggle the deleted state
          return item;
        }
        return item;
      });
    });

    // If the user is logged in, update the 'deleted' state of the board in the database
    if (user?.email) {
      changeBoardState({
        user, // The user object
        boardId: board?.id, // The ID of the board
        state: {
          archived: false, // The archived state remains unchanged
          deleted: isDeleted ? false : true, // The new deleted state
        },
      });
    }
  };

  return (
    <>
      <Card
        variant="filed"
        sx={{
          borderRadius: "lg",
          bgColor: "blue.900",
          color: "white",
          w: "300px",
          h: "100px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/board/${board?.id}`)}
      >
        <CardHeader>
          <Heading size="sm" color="gray.50">
            {board?.title.substring(0, 50)}
          </Heading>
        </CardHeader>

        <Menu>
          <MenuButton
            sx={{
              bgColor: "blue.900",
              color: "gray.50",
              position: "absolute",
              bottom: 1,
              right: 1,
              _hover: {
                bgColor: "blue.900",
              },
              borderRadius: "lg",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Icon as={IoMdMore} />
          </MenuButton>
          <MenuList
            sx={{
              bgColor: "blue.900",
            }}
          >
            <MenuItem
              sx={{
                color: "gray.50",
                bgColor: "blue.900",
                _hover: {
                  bgColor: "blue.800",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              sx={{
                color: "gray.50",
                bgColor: "blue.900",
                _hover: {
                  bgColor: "blue.800",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleArchiveState();
              }}
            >
              {isArchived ? "Unarchive" : "Archive"}
            </MenuItem>
            <MenuItem
              sx={{
                color: "gray.50",
                bgColor: "blue.900",
                _hover: {
                  bgColor: "blue.800",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              {isDeleted ? "Remove from " : "Add to "}Bin
            </MenuItem>
          </MenuList>
        </Menu>
      </Card>
      {/* Edit modal */}

      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              pt: 10,
            }}
          >
            <Input
              variant="filled"
              placeholder="Title"
              focusBorderColor="blue.900"
              type="text"
              name="title"
              sx={{
                p: 3,
                bg: "gray.100",
              }}
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
          </ModalBody>
          <ModalFooter gap={5}>
            <Button onClick={onClose}>close</Button>
            <Button
              sx={{
                bgColor: "blue.800",
                color: "white",
                _hover: {
                  bg: "blue.900",
                },
              }}
              mr={3}
              onClick={handleEdit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoardCard;
