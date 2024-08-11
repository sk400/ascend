import {
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useGlobalState } from "../../../services/context";

import { createBoard } from "../utils/crudFunctions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateKanban = () => {
  const { user, boards, setBoards } = useGlobalState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boardData, setBoardData] = useState({ title: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value?.length < 50) {
      setBoardData({ ...boardData, [e.target.name]: e.target.value });
    }
  };

  const handleClick = () => {
    if (!boardData?.title || !user) {
      alert("Please provide all the required fields");
      return;
    }

    setBoards((prevBoards) => {
      return [
        ...prevBoards,
        {
          id: Date.now().toString(),
          title: boardData?.title,
          archived: false,
          deleted: false,
          tasks: {
            todo: [],
            inprogress: [],
            completed: [],
          },
        },
      ];
    });

    if (user?.email) {
      createBoard({
        data: boardData,
        user,
      });
    }

    setBoardData({ title: "", description: "" });
    navigate("/", { replace: true });
    onClose();
  };

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
          boxShadow: "sm",
        }}
      >
        <Heading size="xl">Dashboard</Heading>
        <IconButton
          sx={{
            bgColor: "white",
            _hover: {
              bg: "white",
            },
          }}
          onClick={onOpen}
        >
          <IoIosAddCircleOutline size="30px" />
        </IconButton>
      </Flex>

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
              value={boardData.title}
              onChange={(e) => {
                handleChange(e);
              }}
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
              onClick={handleClick}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateKanban;
