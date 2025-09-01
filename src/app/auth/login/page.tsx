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
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <Input placeholder="Enter email"/>
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input placeholder="Enter password"/>
            </Field.Root>

            <Button variant="solid">Sign in</Button>
            <Text className="flex items-center justify-center text-sm">
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
    </div>
  );
}
