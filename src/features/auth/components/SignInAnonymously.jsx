import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Image,
  Icon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/ascend-logo.png";
import { BsIncognito } from "react-icons/bs";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../../services/authService";

const SignInAnonymously = () => {
  const navigate = useNavigate();
  const signInAsAguest = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Signed in as a guest successfully");

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      position={"relative"}
    >
      <Stack spacing={10} mx={"auto"} maxW={"lg"} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          px={8}
          py={12}
        >
          <Stack spacing={10} align={"center"}>
            {/* Logo */}
            <Image objectFit="cover" src={logo} alt="Ascend logo" mt={2} />

            {/* Google sign up button */}
            <Stack spacing={2} pt={2}>
              <Text
                sx={{
                  textAlign: "center",
                  mb: 5,
                }}
              >
                You are signing in as a guest. So your data will not be stored
              </Text>
              <Button
                size="lg"
                bg={"white"}
                boxShadow={"md"}
                onClick={() => navigate("/sign-up")}
                gap="3"
              >
                Register
              </Button>
              <Button
                size="lg"
                bg={"white"}
                boxShadow={"md"}
                onClick={() => signInAsAguest()}
                gap="3"
              >
                <Icon as={BsIncognito} color="blue.900" />
                Sign in Anonymously
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default SignInAnonymously;
