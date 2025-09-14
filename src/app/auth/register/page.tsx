"use client";
import {
  Box,
  Button,
  Card,
  Center,
  Field,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username,
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
          <Card.Title>Register</Card.Title>
        </Card.Header>

        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Field.Root>
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
              <Input
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Field.Root>

            <Button variant="solid" onClick={handleSubmit}>
              Register
            </Button>

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
          <Link href="/auth/login">Already have an account? Sign in</Link>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
