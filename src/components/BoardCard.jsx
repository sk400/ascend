import {
  Card,
  CardHeader,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { changeBoardState } from "../features/kanban-board/utils/crudFunctions";
import { useGlobalState } from "../services/context";

const BoardCard = ({ board }) => {
  const navigate = useNavigate();
  const { user } = useGlobalState();

  const isArchived = board?.archived;
  const isDeleted = board?.deleted;

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
              onClick={(e) => e.stopPropagation()}
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
                changeBoardState({
                  user,
                  boardId: board?.id,
                  state: {
                    archived: isArchived ? false : true,
                    deleted: false,
                  },
                });
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
                changeBoardState({
                  user,
                  boardId: board?.id,
                  state: {
                    archived: false,
                    deleted: isDeleted ? false : true,
                  },
                });
              }}
            >
              {isDeleted ? "Remove from " : "Add to "}Bin
            </MenuItem>
          </MenuList>
        </Menu>
      </Card>
    </>
  );
};

export default BoardCard;
