import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalContent,
  Box,
  VStack,
  FormControl,
  Input,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useGlobalState } from "../../../services/context";
import { IoAddSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createListItem } from "../utils/crudFunctions";

const CreateListItem = ({ type, numOfItems }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useGlobalState();
  const { boardId } = useParams();
  const [data, setData] = useState({});
  const itemType =
    type === "Todo"
      ? "todo"
      : type === "In progress"
      ? "inprogress"
      : type === "Completed"
      ? "completed"
      : "";

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleClick = () => {
    if (!data?.title || !data?.description || !data?.priority || !itemType) {
      alert("Please provide all the required fields");
      return;
    }

    createListItem({
      data,
      user,
      boardId,
      type: itemType,
    });
    onClose();
    setData({});
  };

  return (
    <>
      <Flex
        sx={{
          direction: "row",
          slignItems: "center",
          minWidth: "200px",
          justifyContent: "space-between",
          py: 1,
          px: 5,
          borderRadius: "full",
          bg: "blue.900",
        }}
      >
        <HStack>
          <Text
            sx={{
              bg: "white",
              px: 3,

              fontWeight: 400,
              borderRadius: "full",
            }}
          >
            {numOfItems}
          </Text>
          <Text
            sx={{
              color: "white",
              fontWeight: 600,
            }}
            size="sm"
          >
            {type}
          </Text>
        </HStack>
        <IconButton
          sx={{
            bg: "blue.900",
            _hover: {
              bg: "blue.900",
            },
          }}
          onClick={onOpen}
        >
          <Icon as={IoAddSharp} color="white" />
        </IconButton>
      </Flex>

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
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Priority */}

                <FormControl isRequired>
                  <Select
                    variant="filled"
                    placeholder="Priority"
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
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Add button */}

                <Button
                  colorScheme="orange"
                  bg="blue.900"
                  color="white"
                  _hover={{
                    bg: "blue.800",
                  }}
                  width="full"
                  onClick={handleClick}
                >
                  Add
                </Button>
              </VStack>
            </Box>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateListItem;

// Priority
// Title
// Description
