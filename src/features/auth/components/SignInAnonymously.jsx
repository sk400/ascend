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
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/ascend-logo.png";
import { BsIncognito } from "react-icons/bs";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../../services/authService";

const SignInAnonymously = () => {
  const navigate = useNavigate();

  /**
   * Sign in as a guest.
   *
   * This function asynchronously signs in the user anonymously using the Firebase
   * Authentication SDK. If the sign-in is successful, the user is redirected
   * to the home page. If an error occurs during the sign-in process, it is logged
   * to the console.
   *
   * @return {Promise<void>} A Promise that resolves when the sign-in is complete.
   */
  const signInAsAguest = async () => {
    try {
      // Sign in the user anonymously
      await signInAnonymously(auth);

      // Log a success message to the console
      console.log("Signed in as a guest successfully");

      // Redirect the user to the home page
      navigate("/", { replace: true });
    } catch (error) {
      // Log any errors that occur during the sign-in process
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
                  maxWidth: "250px",
                  mx: "auto",
                }}
              >
                Dive in and explore! No sign-in required, but your data won't be
                saved.
              </Text>
              <Button
                size="lg"
                bg={"white"}
                boxShadow={"md"}
                onClick={() => navigate("/sign-up")}
                gap="3"
              >
                Sign up
              </Button>
              <Button
                size="lg"
                bg={"white"}
                boxShadow={"md"}
                onClick={() => signInAsAguest()}
                gap="3"
              >
                <Icon as={BsIncognito} color="blue.900" />
                Try anonymously
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default SignInAnonymously;
