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
  const { user, setBoards } = useGlobalState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boardData, setBoardData] = useState({ title: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value?.length < 50) {
      setBoardData({ ...boardData, [e.target.name]: e.target.value });
    }
  };

  /**
   * Handles the click event when the user clicks on the submit button of the modal.
   * It creates a new board object and adds it to the boards array in the global state.
   * It also calls the createBoard function to save the board data to the database.
   * Finally, it closes the modal and navigates to the home page.
   */
  const handleClick = () => {
    // Check if the board title is provided and if the user is authenticated
    if (!boardData?.title || !user) {
      // Display an alert to the user if any of the required fields are missing
      alert("Please provide all the required fields");
      return;
    }

    // Create a new board object with the provided data
    const newBoard = {
      id: Date.now(), // Generate a unique ID for the board
      title: boardData?.title, // Set the title of the board
      archived: false, // Set the archived status to false
      deleted: false, // Set the deleted status to false

      tasks: {
        todo: [], // Initialize the todo tasks array
        inprogress: [], // Initialize the in-progress tasks array
        completed: [], // Initialize the completed tasks array
      },
    };

    // Update the boards array in the global state by adding the new board
    setBoards((prevBoards) => {
      return [...prevBoards, { ...newBoard }];
    });

    // Call the createBoard function to save the board data to the database
    if (user?.email) {
      createBoard({
        data: boardData,
        user,
      });
    }

    // Reset the board data state to empty values
    setBoardData({ title: "", description: "" });

    // Navigate to the home page and replace the current URL in the browser history
    navigate("/", { replace: true });

    // Close the modal
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
