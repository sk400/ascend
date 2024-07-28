import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
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

import { PiSignOutBold } from "react-icons/pi";
import logo from "../assets/ascend-logo.png";
import { AiFillHome } from "react-icons/ai";
import { MdViewKanban } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../services/authService";
import { useGlobalState } from "../services/context";
import { useNavigate } from "react-router-dom";
import { IoMdArchive } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Sidebar = ({ btnRef, isOpen, onClose }) => {
  const { user, boards } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const filteredBoards = boards?.filter(
    (board) => board?.archived === false && board?.deleted === false
  );

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
          {/* Home  */}
          <ListItem
            sx={{
              cursor: "pointer",
              bgColor: pathname === "/" ? "blue.900" : "white",
              color: pathname === "/" ? "gray.50" : "black",
              borderRadius: "lg",
              p: 2,
              fontSize: "18px",
              fontWeight: 400,
              _hover: {
                bg: pathname === "/" ? "blue.800" : "#F5F7FA",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ListIcon
              sx={{
                width: "25px",
                height: "25px",
              }}
            >
              <Icon
                as={AiFillHome}
                sx={{
                  color: pathname === "/" ? "gray.50" : "blue.900",
                }}
              />
            </ListIcon>
            Home
          </ListItem>
          {/* Archive */}
          <ListItem
            sx={{
              cursor: "pointer",
              bgColor: pathname === "/archive" ? "blue.900" : "white",
              color: pathname === "/archive" ? "gray.50" : "black",
              borderRadius: "lg",
              p: 2,
              fontSize: "18px",
              fontWeight: 400,
              _hover: {
                bg: pathname === "/archive" ? "blue.800" : "#F5F7FA",
              },
            }}
            onClick={() => {
              navigate("/archive");
            }}
          >
            <ListIcon
              sx={{
                width: "25px",
                height: "25px",
              }}
            >
              <Icon
                as={IoMdArchive}
                sx={{
                  color: pathname === "/archive" ? "gray.50" : "blue.900",
                }}
              />
            </ListIcon>
            Archive
          </ListItem>
          {/* Bin */}
          <ListItem
            sx={{
              cursor: "pointer",
              bgColor: pathname === "/bin" ? "blue.900" : "white",
              color: pathname === "/bin" ? "gray.50" : "black",
              borderRadius: "lg",
              p: 2,
              fontSize: "18px",
              fontWeight: 400,
              _hover: {
                bg: pathname === "/bin" ? "blue.800" : "#F5F7FA",
              },
            }}
            onClick={() => {
              navigate("/bin");
            }}
          >
            <ListIcon
              sx={{
                width: "25px",
                height: "25px",
              }}
            >
              <Icon
                as={MdDelete}
                sx={{
                  color: pathname === "/bin" ? "gray.50" : "blue.900",
                }}
              />
            </ListIcon>
            Bin
          </ListItem>
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
        <Flex
          sx={{
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "60px",
            px: 3,
            borderTop: "solid 1px",
            borderTopColor: "#E2E8F0",
          }}
        >
          <HStack spacing={2} alignItems="center">
            <Avatar name={user?.name} src={user?.photo} size="sm" />
            <Text
              sx={{
                fontWeight: 400,
              }}
            >
              {user?.name}
            </Text>
          </HStack>
          <IconButton
            sx={{
              bgColor: "white",
              _hover: {
                bgColor: "white",
              },
            }}
            onClick={() => signOut(auth)}
          >
            <Icon as={PiSignOutBold} color="blue.900" />
          </IconButton>
        </Flex>
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
              {/* Home */}
              <ListItem
                sx={{
                  cursor: "pointer",
                  bgColor: pathname === "/" ? "blue.900" : "white",
                  color: pathname === "/" ? "gray.50" : "black",
                  borderRadius: "lg",
                  p: 2,
                  fontSize: "18px",
                  fontWeight: 400,
                  _hover: {
                    bg: pathname === "/" ? "blue.800" : "#F5F7FA",
                  },
                }}
                onClick={() => {
                  navigate("/");
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
                    as={AiFillHome}
                    sx={{
                      color: pathname === "/" ? "gray.50" : "blue.900",
                    }}
                  />
                </ListIcon>
                Home
              </ListItem>
              {/* Archive */}
              <ListItem
                sx={{
                  cursor: "pointer",
                  bgColor: pathname === "/archive" ? "blue.900" : "white",
                  color: pathname === "/archive" ? "gray.50" : "black",
                  borderRadius: "lg",
                  p: 2,
                  fontSize: "18px",
                  fontWeight: 400,
                  _hover: {
                    bg: pathname === "/archive" ? "blue.800" : "#F5F7FA",
                  },
                }}
                onClick={() => {
                  navigate("/archive");
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
                    as={IoMdArchive}
                    sx={{
                      color: pathname === "/archive" ? "gray.50" : "blue.900",
                    }}
                  />
                </ListIcon>
                Archive
              </ListItem>
              {/* Bin */}
              <ListItem
                sx={{
                  cursor: "pointer",
                  bgColor: pathname === "/bin" ? "blue.900" : "white",
                  color: pathname === "/bin" ? "gray.50" : "black",
                  borderRadius: "lg",
                  p: 2,
                  fontSize: "18px",
                  fontWeight: 400,
                  _hover: {
                    bg: pathname === "/bin" ? "blue.800" : "#F5F7FA",
                  },
                }}
                onClick={() => {
                  navigate("/bin");
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
                    as={MdDelete}
                    sx={{
                      color: pathname === "/bin" ? "gray.50" : "blue.900",
                    }}
                  />
                </ListIcon>
                Bin
              </ListItem>
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
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex
              sx={{
                direction: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "60px",
                px: 3,
                borderTop: "solid 1px",
                borderTopColor: "#E2E8F0",
              }}
            >
              <HStack spacing={2} alignItems="center">
                <Avatar name={user?.name} src={user?.photo} size="sm" />
                <Text
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  {user?.name}
                </Text>
              </HStack>
              <IconButton
                sx={{
                  bgColor: "white",
                  _hover: {
                    bgColor: "white",
                  },
                }}
                onClick={() => signOut(auth)}
              >
                <Icon as={PiSignOutBold} color="blue.900" />
              </IconButton>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
