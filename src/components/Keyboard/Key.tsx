"use client";
import { useColorMode } from "@/components/ui/color-mode";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { isValidColorHex, validateAnswerApi } from "@/helpers";
import { useLetterInput } from "@/hooks/useLetterInput/useLetterInput";
import { useToken } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { BsBackspaceReverseFill } from "react-icons/bs";
import { PiKeyReturnBold } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";

export default function Key({
  letter = "",
  status = "",
}: {
  letter: string;
  status: string;
}) {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const { hasGameEnded } = context;

  const { colorMode } = useColorMode();
  const [statusColor] = useToken("colors", [`${status}.${colorMode}`]);
  const [clicked, setClicked] = useState("");

  const isSpecialKey = letter === "Enter" || letter === "Backspace";

  const iconMap = () => {
    switch (letter) {
      case "Enter":
        return <PiKeyReturnBold size={26} />;
      case "Backspace":
        return <BsBackspaceReverseFill size={22} />;
      default:
        return letter;
    }
  };

  const getOnClick = async () => {
    if (hasGameEnded) return;
    setClicked(letter);

    const handleKey = useLetterInput(context);
    await handleKey(letter);
  };

  return (
    <motion.div
      animate={
        letter === clicked
          ? {
              scale: [1, 1.1, 1],
              transition: { duration: 0.1, ease: "easeInOut" },
            }
          : {}
      }
      onAnimationComplete={() => setClicked("")}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: isValidColorHex(statusColor) ? statusColor : "#818384",
        transition: "background-color 0.7s ease",
        height: "55px",
        width: isSpecialKey ? "60px" : "45px",
      }}
      onClick={getOnClick}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 800 }}>{iconMap()}</h2>
    </motion.div>
  );
}
