'use client'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box bg={bg} px={4} shadow="md">
      <Flex h={16} alignItems="center">
        {/* Logo / Brand */}
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          MyApp
        </Text>

        <Spacer />

        {/* Links */}
        <HStack spacing={6}>
          <Button variant="ghost" color={textColor}>
            Home
          </Button>
          <Button variant="ghost" color={textColor}>
            About
          </Button>
          <Button variant="ghost" color={textColor}>
            Contact
          </Button>

          {/* Dark/Light Toggle */}
          <IconButton
            size="md"
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            // icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </HStack>
      </Flex>
    </Box>
  );
}