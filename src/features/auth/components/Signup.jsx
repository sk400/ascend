import React, { useState } from "react";
import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Image,
  Icon,
  Input,
  useToast,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/ascend-logo.png";
import { MdEmail } from "react-icons/md";
import { auth, provider } from "../../../services/authService";
import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const toast = useToast();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Signed up successfully");

        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionCodeSettings = {
    url: "https://ascend-eta.vercel.app",
    handleCodeInApp: true,
  };

  const signUpWithEmail = async () => {
    try {
      if (!email) {
        toast({
          title: "Please provide your email address.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast({
        title: "Email link sent",
        description:
          "A link is sent to your given email address. Please check your inbox and click the link to sign up.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setEmail("");
    } catch (error) {
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
      setEmail("");
    }
  };

  // saumyakantapanda7855@gmail.com
  // skdeveloper101@gmail.com

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
                // leftIcon={}
                boxShadow={"md"}
                onClick={() => signUpWithEmail()}
                gap="3"
              >
                <Icon as={MdEmail} color="blue.900" />
                Sign up with Email
              </Button>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"white"}
                leftIcon={<FcGoogle />}
                boxShadow={"md"}
                onClick={() => signInWithGoogle()}
              >
                Sign up with Google
              </Button>

              <Stack>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to="/sign-in" style={{ color: "#1A365D" }}>
                    Sign in
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
