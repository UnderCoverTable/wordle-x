"use client";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Text,
  Spacer,
} from "@chakra-ui/react";
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from "@/components/ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/select";
import { DIMENSION_OPTIONS } from "@/helpers";
import { useContext } from "react";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { IoReloadCircleSharp } from "react-icons/io5";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("black", "white");

  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const { dimension, setDimension, dispatch, setHasGameEnded, setFlippingRow } =
    context;

  return (
    <Box bg={bg} px={4} shadow="md">
      <Flex h={16} alignItems="center">
        {/* Logo / Brand */}
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          MyApp
        </Text>

        <Spacer />

        {/* Links */}
        <HStack gap={6}>
          <Button variant="ghost" color={textColor}>
            Home
          </Button>
          <Button variant="ghost" color={textColor}>
            About
          </Button>

          <Button
            onClick={() => {
              dispatch({ type: "RESET", payload: { dimension: dimension } });
              setHasGameEnded(false);
              setFlippingRow(null);
            }}
          >
            <IoReloadCircleSharp />
          </Button>

          <Select
            placeholder="Select number"
            size="lg"
            variant="filled"
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            _focus={{ borderColor: "blue.700" }}
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setDimension(num);
              setHasGameEnded(false);
              setFlippingRow(null);
              dispatch({ type: "RESET", payload: { dimension: num } });
            }}
          >
            {DIMENSION_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>

          {/* Dark/Light Toggle */}
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}
