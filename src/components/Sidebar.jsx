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

const Sidebar = ({ btnRef, isOpen, onClose }) => {
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
          display: { base: "none", lg: "flex" },
        }}
      >
        <Image objectFit="cover" src={logo} alt="Ascend logo" mt={2} />

        {/* Home  */}
        <List spacing={3}>
          <ListItem
            sx={{
              cursor: "pointer",
              bgColor: "white",
              borderRadius: "lg",
              p: 2,
              fontSize: "18px",
              fontWeight: 400,
              _hover: {
                bg: "#F5F7FA",
              },
            }}
          >
            <ListIcon
              sx={{
                width: "25px",
                height: "25px",
              }}
            >
              <Icon as={AiFillHome} />
            </ListIcon>
            Home
          </ListItem>
        </List>
        {/* Recents and boards */}
        <Flex
          direction="column"
          width={"100%"}
          alignItems={"center"}
          gap={5}
          sx={{
            overflowY: "auto",
          }}
        >
          {/* Recents */}
          {/* <Flex direction="column" width={"100%"} alignItems={"center"} gap={2}>
          <Text
            sx={{
              fontWeight: 500,
              alignSelf: "start",
            }}
          >
            Recents
          </Text>
          <List spacing={2}>
            {["Board 1", "Board 3"].map((item) => (
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
              >
                <ListIcon
                  sx={{
                    mt: "-2px",
                    color: "#3546af",
                  }}
                >
                  <MdViewKanban size="24px" />
                </ListIcon>
                {item}
              </ListItem>
            ))}
          </List>
        </Flex> */}
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
              {[
                "React project",
                "Learn english",
                "Learn Supapase",
                "First client",
                "Understand architecture",
                "Understand servers",
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    cursor: "pointer",
                    bgColor: "white",
                    borderRadius: "lg",
                    p: 2,
                    fontSize: "18px",
                    fontWeight: 400,
                    _hover: {
                      bg: "#F5F7FA",
                    },
                  }}
                >
                  <ListIcon
                    sx={{
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Icon as={MdViewKanban} />
                  </ListIcon>
                  {`${item?.length < 15 ? item : `${item?.slice(0, 15)}...`}`}
                </ListItem>
              ))}
            </List>
          </Flex>
        </Flex>
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
            <Avatar
              name="Saumya kanta Panda"
              src="https://bit.ly/dan-abramov"
              size="sm"
            />
            <Text
              sx={{
                fontWeight: 400,
              }}
            >
              Saumya
            </Text>
          </HStack>
          <IconButton
            sx={{
              bgColor: "white",
              _hover: {
                bgColor: "white",
              },
            }}
          >
            <PiSignOutBold />
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
            <List>
              <ListItem
                sx={{
                  cursor: "pointer",
                  bgColor: "white",
                  borderRadius: "lg",
                  p: 2,
                  fontSize: "18px",
                  fontWeight: 400,
                  _hover: {
                    bg: "#F5F7FA",
                  },
                  mb: 5,
                }}
              >
                <ListIcon
                  sx={{
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <Icon as={AiFillHome} />
                </ListIcon>
                Home
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
                  {[
                    "React project",
                    "Learn english",
                    "Learn Supapase",
                    "First client",
                    "Understand architecture",
                    "Understand servers",
                  ].map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        cursor: "pointer",
                        bgColor: "white",
                        borderRadius: "lg",
                        p: 2,
                        fontSize: "18px",
                        fontWeight: 400,
                        _hover: {
                          bg: "#F5F7FA",
                        },
                      }}
                    >
                      <ListIcon
                        sx={{
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        <Icon as={MdViewKanban} />
                      </ListIcon>
                      {item}
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
                <Avatar
                  name="Saumya kanta Panda"
                  src="https://bit.ly/dan-abramov"
                  size="sm"
                />
                <Text
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  Saumya
                </Text>
              </HStack>
              <IconButton
                sx={{
                  bgColor: "white",
                  _hover: {
                    bgColor: "white",
                  },
                }}
              >
                <PiSignOutBold />
              </IconButton>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
