"use client";
import { motion, useAnimation } from "framer-motion";
import { useColorMode } from "@/components/ui/color-mode";
import { useToken } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (isFlipping && statusColor) {
      const flipSequence = async () => {
        // First half of flip (0 to 90 degrees)
        await controls.start({
          rotateX: 90,
          transition: {
            duration: 0.3,
            delay: delay,
            ease: "easeInOut",
          },
        });

        // Change color and show backface at the midpoint
        setCurrentColor(statusColor);

        // Second half of flip (90 to 0 degrees)
        await controls.start({
          rotateX: 0,
          transition: {
            duration: 0.3,
            ease: "easeInOut",
          },
        });
      };

      flipSequence();
    }
  }, [isFlipping, statusColor, status]);

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
        border: "2px solid #878a8c",
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
