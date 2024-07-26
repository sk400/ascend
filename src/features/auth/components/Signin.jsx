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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Signed in successfully");

        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionCodeSettings = {
    url: "http://localhost:3000",
    handleCodeInApp: true,
  };

  const signInWithEmail = async () => {
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
                  <Link to="/sign-up" style={{ color: "#0BC5EA" }}>
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
