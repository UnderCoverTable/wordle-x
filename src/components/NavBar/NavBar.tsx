"use client";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Text,
  Spacer,
  Menu,
  Portal,
} from "@chakra-ui/react";
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from "@/components/ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/select";
import { DIMENSION_OPTIONS } from "@/helpers";
import { useContext, useState } from "react";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { IoReloadCircleSharp } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { HiViewGridAdd } from "react-icons/hi";
import UserInfo from "@/components/NavBar/UserInfo/UserInfo";
import { GAME_STATUS, GameState } from "@/constants";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("black", "white");

  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");
  const [open, setOpen] = useState(false);

  const { dimension, setDimension, dispatch, setGameStatus, setFlippingRow } =
    context;

  return (
    <Box bg={bg} px={4} shadow="md" className="h-16 flex-shrink-0">
      <Flex h={16} alignItems="center">
        {/* Logo / Brand */}
        <Flex align={"center"} gap={2}>
          <HiViewGridAdd size={22} />
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Wordle X
          </Text>
        </Flex>
        <Spacer />

        {/* Links */}
        <HStack gap={6}>
          <Menu.Root onOpenChange={(details) => setOpen(details.open)}>
            <Menu.Trigger asChild>
              <Button variant="outline">
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <IoReloadCircleSharp />
                </motion.div>{" "}
                {dimension}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  style={{
                    minWidth: "70px",
                  }}
                >
                  {DIMENSION_OPTIONS.map((num) => (
                    <Menu.Item
                      key={num}
                      value={num.toString()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          dimension === num ? "#3182CE" : "transparent",
                        color: dimension === num ? "white" : "inherit",
                        borderRadius: "4px",
                      }}
                      onSelect={() => {
                        setDimension(num);
                        setGameStatus((prev) => {
                          return {
                            answerID: null,
                            status: GAME_STATUS.IN_PROGRESS,
                          };
                        });
                        setFlippingRow(null);
                        dispatch({
                          type: "RESET",
                          payload: { dimension: num },
                        });
                      }}
                    >
                      {num}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          {/* Dark/Light Toggle */}
          <ColorModeButton />
          <UserInfo />
        </HStack>
      </Flex>
    </Box>
  );
}
