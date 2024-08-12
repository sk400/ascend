import {
  Box,
  Flex,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import logo from "../assets/ascend-logo.png";
import { AiFillHome } from "react-icons/ai";
import { MdViewKanban } from "react-icons/md";
import { useGlobalState } from "../services/context";
import { IoMdArchive } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import UserButton from "./UserButton";

const Sidebar = ({ btnRef, isOpen, onClose }) => {
  const { user, boards } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const filteredBoards = boards?.filter(
    (board) => board?.archived === false && board?.deleted === false
  );

  const listItemsData = [
    {
      name: "Home",
      icon: AiFillHome,
      path: "/",
    },
    {
      name: "Archived",
      icon: IoMdArchive,
      path: "/archive",
    },
    {
      name: "Bin",
      icon: MdDelete,
      path: "/bin",
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "300px",
          p: 3,
          flexDirection: "column",
          position: "relative",
          gap: 5,
          pb: "60px",
          borderRight: "solid 1px",
          borderRightColor: "#E2E8F0",
          display: { base: "none", xl: "flex" },
        }}
      >
        <Image
          objectFit="fill"
          src={logo}
          alt="Ascend logo"
          mt={2}
          sx={{
            width: "150px",
            height: "auto",
          }}
        />

        <List>
          {listItemsData?.map((item) => (
            <ListItem
              sx={{
                cursor: "pointer",
                bgColor: pathname === item.path ? "blue.900" : "white",
                color: pathname === item.path ? "gray.50" : "black",
                borderRadius: "lg",
                p: 2,
                fontSize: "18px",
                fontWeight: 400,
                _hover: {
                  bg: pathname === item.path ? "blue.800" : "#F5F7FA",
                },
              }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListIcon
                sx={{
                  width: "25px",
                  height: "25px",
                }}
              >
                <Icon
                  as={item.icon}
                  sx={{
                    color: pathname === item.path ? "gray.50" : "blue.900",
                  }}
                />
              </ListIcon>

              {item.name}
            </ListItem>
          ))}
        </List>
        {/*  boards */}
        {filteredBoards?.length !== 0 && (
          <Flex
            direction="column"
            width={"100%"}
            alignItems={"center"}
            gap={5}
            sx={{
              overflowY: "auto",
            }}
          >
            {/* Your boards */}
            <Flex
              direction="column"
              width={"100%"}
              alignItems={"start"}
              gap={2}
              pb={5}
            >
              <Text
                sx={{
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Your boards
              </Text>
              <List
                sx={{
                  width: "100%",
                }}
              >
                {filteredBoards?.map((board) => (
                  <ListItem
                    key={board?.id}
                    sx={{
                      cursor: "pointer",
                      bgColor:
                        pathname === `/board/${board?.id}`
                          ? "blue.900"
                          : "white",
                      color:
                        pathname === `/board/${board?.id}`
                          ? "gray.50"
                          : "black",
                      borderRadius: "lg",
                      p: 2,
                      fontSize: "18px",
                      fontWeight: 400,
                      _hover: {
                        bg:
                          pathname === `/board/${board?.id}`
                            ? "blue.800"
                            : "#F5F7FA",
                      },
                    }}
                    onClick={() => {
                      navigate(`/board/${board?.id}`);
                    }}
                  >
                    <ListIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    >
                      <Icon
                        as={MdViewKanban}
                        sx={{
                          color:
                            pathname === `/board/${board?.id}`
                              ? "gray.50"
                              : "blue.900",
                        }}
                      />
                    </ListIcon>
                    {`${
                      board?.title?.length < 15
                        ? board?.title
                        : `${board?.title?.slice(0, 15)}...`
                    }`}
                  </ListItem>
                ))}
              </List>
            </Flex>
          </Flex>
        )}
        {/* User profile */}
        <UserButton user={user} />
      </Box>
      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image objectFit="cover" src={logo} alt="Ascend logo" />
          </DrawerHeader>

          <DrawerBody>
            <List
              sx={{
                mb: 5,
              }}
            >
              {listItemsData?.map((item) => (
                <ListItem
                  sx={{
                    cursor: "pointer",
                    bgColor: pathname === item.path ? "blue.900" : "white",
                    color: pathname === item.path ? "gray.50" : "black",
                    borderRadius: "lg",
                    p: 2,
                    fontSize: "18px",
                    fontWeight: 400,
                    _hover: {
                      bg: pathname === item.path ? "blue.800" : "#F5F7FA",
                    },
                  }}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                >
                  <ListIcon
                    sx={{
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Icon
                      as={item.icon}
                      sx={{
                        color: pathname === item.path ? "gray.50" : "blue.900",
                      }}
                    />
                  </ListIcon>

                  {item.name}
                </ListItem>
              ))}
            </List>
            <Flex
              direction="column"
              width={"100%"}
              alignItems={"center"}
              gap={5}
              sx={{
                overflowY: "auto",
              }}
            >
              {/* Your boards */}
              {filteredBoards?.length > 0 && (
                <Flex
                  direction="column"
                  width={"100%"}
                  alignItems={"start"}
                  gap={2}
                >
                  <Text
                    sx={{
                      fontWeight: 500,
                      fontSize: "18px",
                    }}
                  >
                    Your boards
                  </Text>
                  <List
                    sx={{
                      width: "100%",
                    }}
                  >
                    {filteredBoards?.map((board) => (
                      <ListItem
                        key={board?.id}
                        sx={{
                          cursor: "pointer",
                          bgColor:
                            pathname === `/board/${board?.id}`
                              ? "blue.900"
                              : "white",
                          color:
                            pathname === `/board/${board?.id}`
                              ? "gray.50"
                              : "black",
                          borderRadius: "lg",
                          p: 2,
                          fontSize: "18px",
                          fontWeight: 400,
                          _hover: {
                            bg:
                              pathname === `/board/${board?.id}`
                                ? "blue.800"
                                : "#F5F7FA",
                          },
                        }}
                        onClick={() => {
                          navigate(`/board/${board?.id}`);
                          onClose();
                        }}
                      >
                        <ListIcon
                          sx={{
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <Icon
                            as={MdViewKanban}
                            sx={{
                              color:
                                pathname === `/board/${board?.id}`
                                  ? "gray.50"
                                  : "blue.900",
                            }}
                          />
                        </ListIcon>
                        {board?.title}
                      </ListItem>
                    ))}
                  </List>
                </Flex>
              )}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <UserButton user={user} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
