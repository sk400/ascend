import React, { useState } from "react";
import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Image,
  useToast,
  Input,
  Icon,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/ascend-logo.png";
import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../services/authService";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const toast = useToast();

  /**
   * Sign in the user with Google.
   *
   * This function attempts to sign in the user with Google. If the sign-in is
   * successful, the user is redirected to the home page. If an error occurs
   * during the sign-in process, it is logged to the console.
   *
   * @return {void} This function does not return anything.
   */
  const signInWithGoogle = () => {
    // Attempt to sign in the user with Google
    signInWithPopup(auth, provider)
      .then(() => {
        // Log a success message to the console
        console.log("Signed in successfully");

        // Redirect the user to the home page
        navigate("/", { replace: true });
      })
      .catch((error) => {
        // Log any errors that occur during the sign-in process
        console.log(error);
      });
  };

  const actionCodeSettings = {
    url: "https://ascend-eta.vercel.app",
    handleCodeInApp: true,
  };

  /**
   * Sign in the user with their email address.
   *
   * This function sends a sign-in link to the user's email address. If the email
   * is provided, it first checks if the email is empty. If the email is not
   * empty, it sends the sign-in link using `sendSignInLinkToEmail` from the
   * Firebase Auth library. It then stores the email in the browser's local
   * storage. After sending the email link, it displays a success toast
   * notification. If an error occurs during the process, it displays an error
   * toast notification and logs the error to the console.
   *
   * @return {Promise<void>} A promise that resolves when the sign-in process is
   * complete.
   */
  const signInWithEmail = async () => {
    try {
      // Check if the email is provided
      if (!email) {
        // Display an error toast notification if the email is empty
        toast({
          title: "Please provide your email address.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      // Send the sign-in link to the user's email address
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Store the email in the browser's local storage
      window.localStorage.setItem("emailForSignIn", email);

      // Display a success toast notification
      toast({
        title: "Email link sent",
        description:
          "A link is sent to your given email address. Please check your inbox and click the link to sign in.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });

      // Clear the email input field
      setEmail("");
    } catch (error) {
      // Display an error toast notification and log the error to the console
      toast({
        title: "Error sending email link",
        description:
          "An error occurred while sending the email link. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      console.error("Error sending email:", error);
    } finally {
      // Clear the email input field
      setEmail("");
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
          p={8}
        >
          <Stack spacing={10} align={"center"}>
            {/* Logo */}
            <Image objectFit="cover" src={logo} alt="Ascend logo" mt={2} />
            {/* Google sign up button */}
            <Stack spacing={4} pt={2}>
              <Input
                variant="filled"
                placeholder="Email"
                type="email"
                focusBorderColor="blue.900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"white"}
                boxShadow={"md"}
                onClick={() => signInWithEmail()}
                gap="3"
              >
                <Icon as={MdEmail} color="blue.900" />
                Sign in with Email
              </Button>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"white"}
                leftIcon={<FcGoogle />}
                boxShadow={"md"}
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
              <Stack>
                <Text align={"center"}>
                  Create account{" "}
                  <Link to="/sign-up" style={{ color: "#1A365D" }}>
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
