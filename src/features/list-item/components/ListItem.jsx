import {
  Card,
  CardBody,
  Heading,
  Text,
  Tag,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalContent,
  Button,
  Box,
  VStack,
  FormControl,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { deleteListItem, updateListItem } from "../utils/crudFunctions";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useGlobalState } from "../../../services/context";

const ListItem = ({ task, boardId, type, index }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [newData, setNewData] = useState(task);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setBoards } = useGlobalState();

  const handleDelete = () => {
    // UI update

    setBoards((prevBoards) => {
      const boardIndex = prevBoards?.findIndex(
        (board) => board.id.toString() === boardId
      );
      if (boardIndex === -1) {
        return prevBoards;
      }

      let updatedBoards = [...prevBoards];

      updatedBoards[boardIndex] = {
        ...updatedBoards[boardIndex],
        tasks: {
          ...updatedBoards[boardIndex].tasks,
          [type]: updatedBoards[boardIndex].tasks[type].filter(
            (item) => item.id !== task?.id
          ),
        },
      };

      return updatedBoards;
    });

    if (user?.email) {
      deleteListItem({
        user: user,
        boardId: boardId,
        type: type,
        taskId: task?.id,
      });
    }
  };

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    if (!newData?.title || !newData?.description || !newData?.priority) {
      alert("Please provide all the required fields");
      return;
    }

    // ui update

    setBoards((prevBoards) => {
      const boardIndex = prevBoards?.findIndex(
        (board) => board.id.toString() === boardId
      );
      if (boardIndex === -1) {
        return prevBoards;
      }

      let updatedBoards = [...prevBoards];

      updatedBoards[boardIndex] = {
        ...updatedBoards[boardIndex],
        tasks: {
          ...updatedBoards[boardIndex].tasks,
          [type]: updatedBoards[boardIndex].tasks[type].map((item) => {
            if (item.id === task?.id) {
              return newData;
            }
            return item;
          }),
        },
      };

      return updatedBoards;
    });

    if (user?.email) {
      updateListItem({
        data: newData,
        user: user,
        boardId: boardId,
        type: type,
        taskId: task?.id,
      });
    }
    onClose();
  };

  return (
    <>
      <Draggable draggableId={task?.id.toString()} index={index}>
        {(provided) => (
          <Card
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            sx={{
              borderRadius: "3xl",
              width: "100%",
            }}
          >
            <CardBody
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 3,
              }}
            >
              <Flex
                direction="row"
                justifyContent={"space-between"}
                width="100%"
              >
                <Tag size={"sm"} variant="solid" colorScheme="yellow">
                  {task?.priority}
                </Tag>
                <Menu>
                  <MenuButton
                    sx={{
                      bgColor: "white",
                      color: "blue.900",

                      _hover: {
                        bgColor: "white",
                      },
                      borderRadius: "lg",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Icon as={IoMdMore} />
                  </MenuButton>
                  <MenuList sx={{}}>
                    <MenuItem
                      sx={{}}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      sx={{}}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Heading size="md">{task?.title}</Heading>
              <Text>{task?.description}</Text>
            </CardBody>
          </Card>
        )}
      </Draggable>

      {/* Edit modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody sx={{ px: 5, py: 10 }}>
            <Box>
              <VStack spacing={5}>
                {/* Task name */}
                <FormControl isRequired>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    autoComplete="off"
                    variant="filled"
                    focusBorderColor="blue.900"
                    value={newData?.title}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Priority */}

                <FormControl isRequired>
                  <Select
                    variant="filled"
                    placeholder="Priority"
                    value={newData?.priority}
                    onChange={handleChange}
                    focusBorderColor="blue.900"
                    name="priority"
                  >
                    <option value="high">High priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="low">Low priority</option>
                  </Select>
                </FormControl>

                {/* Task description */}

                <FormControl isRequired>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    rows={6}
                    resize="none"
                    autoComplete="off"
                    variant="filled"
                    focusBorderColor="blue.900"
                    value={newData?.description}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Add button */}

                <Button
                  bg="blue.900"
                  color="white"
                  _hover={{
                    bg: "blue.800",
                  }}
                  width="full"
                  onClick={handleEdit}
                >
                  Save
                </Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListItem;
