"use client";

import {
  Box,
  Button,
  Card,
  Center,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openResetPassowrd, setOpenResetPassowrd] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await fetch("/api/signIn", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    if (responseJson?.data?.data?.user?.id) {
      router.push("/game");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card.Root className="w-100">
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
        </Card.Header>

        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Field.Root>

            <Button variant="solid" onClick={handleSubmit}>
              Sign in
            </Button>
            <Text
              className="flex items-center justify-center text-sm cursor-pointer"
              onClick={() => {
                setOpenResetPassowrd(true);
              }}
            >
              Forgot your password?
            </Text>

            <Box position="relative" w="full" my="6">
              <Separator className="w-[45%]" />

              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                px="2"
                fontSize="sm"
                color="gray.500"
              >
                OR
              </Text>
              <Separator className="absolute right-0 top-0 w-[45%]" />
            </Box>

            <Button w={"full"} maxW={"md"} variant={"outline"}>
              <Center className="flex gap-2">
                <FcGoogle />
                <Text>Sign in with Google</Text>
              </Center>
            </Button>
          </Stack>
        </Card.Body>

        <Card.Footer justifyContent="center">
          <Link href="/auth/register">Dont have an account? Sign up</Link>
        </Card.Footer>
      </Card.Root>

      <Dialog.Root
        lazyMount
        placement={"center"}
        open={openResetPassowrd}
        onOpenChange={(e) => setOpenResetPassowrd(e.open)}
      >
        <Dialog.Trigger asChild></Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Reset Password</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Field.Root>
                  <Flex direction="row" gap={6} className="w-full items-center">
                    <Input placeholder="Enter email" size="lg" />
                    <Button size="sm">Send</Button>
                  </Flex>
                </Field.Root>
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
