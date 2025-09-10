"use client";
import { motion, useAnimation } from "framer-motion";
import { useColorMode } from "@/components/ui/color-mode";
import { useToken } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isValidColorHex } from "@/helpers";

type CardProps = {
  letter: string;
  status: string;
  isFlipping?: boolean;
  delay?: number;
};

export default function Card({
  letter,
  status,
  isFlipping = false,
  delay = 0,
}: CardProps) {
  const { colorMode } = useColorMode();
  const controls = useAnimation();

  const [statusColor] = useToken("colors", [`${status}.${colorMode}`]);
  const [currentColor, setCurrentColor] = useState("");

  // Flip animation
  useEffect(() => {
    if (isFlipping && statusColor) {
      const flipSequence = async () => {
        await controls.start({
          rotateX: 90,
          transition: { duration: 0.35, delay, ease: "easeInOut" },
        });
        setCurrentColor(statusColor);
        await controls.start({
          rotateX: 0,
          transition: { duration: 0.35, ease: "easeInOut" },
        });
      };

      flipSequence();
    }
  }, [isFlipping, statusColor, status]);

  useEffect(() => {
    if (letter) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.1, ease: "easeInOut" },
      });
    }
  }, [letter]);

  return (
    <motion.div
      animate={controls}
      style={{
        width: "62px",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
        border: "2px solid",
        borderColor:
          currentColor && isValidColorHex(statusColor) || !isFlipping && letter && isValidColorHex(statusColor) 
            ? "transparent"
            : letter
            ? "#515253"
            : "#333335",
        backgroundColor: isFlipping ? currentColor : statusColor,
      }}
    >
      <motion.h2
        style={{
          margin: 0,
          fontSize: "32px",
          fontWeight: 600,
          backfaceVisibility: "hidden",
        }}
      >
        {letter.toUpperCase()}
      </motion.h2>
    </motion.div>
  );
}
