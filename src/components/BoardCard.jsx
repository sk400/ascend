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

  const handleEdit = () => {
    if (user?.email) {
      editBoard({
        user,
        boardId: board?.id,
        data: {
          title: boardTitle,
        },
      });
    }

    setBoards((prevBoards) => {
      return prevBoards?.map((item) => {
        if (item?.id === board?.id) {
          board.title = boardTitle;
          return item;
        }
        return item;
      });
    });

    onClose();
    setBoardTitle("");
  };

  const handleArchiveState = () => {
    setBoards((prevBoards) => {
      return prevBoards.map((item) => {
        if (item?.id === board?.id) {
          board.archived = isArchived ? false : true;
          return item;
        }
        return item;
      });
    });

    if (user?.email) {
      changeBoardState({
        user,
        boardId: board?.id,
        state: {
          archived: isArchived ? false : true,
          deleted: false,
        },
      });
    }
  };

  const handleDelete = () => {
    setBoards((prevBoards) => {
      return prevBoards?.map((item) => {
        if (item?.id === board?.id) {
          board.deleted = isDeleted ? false : true;
          return item;
        }
        return item;
      });
    });

    if (user?.email) {
      changeBoardState({
        user,
        boardId: board?.id,
        state: {
          archived: false,
          deleted: isDeleted ? false : true,
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
