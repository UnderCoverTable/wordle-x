"use client";
import { statusColors } from "@/constants";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { useContext } from "react";
import { BsBackspaceReverseFill } from "react-icons/bs";
import { PiKeyReturnBold } from "react-icons/pi";

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

  const { dispatch, answer, hasGameEnded } = context;

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

  const getOnClick = () => {
    if (hasGameEnded) return;

    switch (letter) {
      case "Enter":
        dispatch({ type: "ENTER", payload: { letter, answer } });
        break;
      case "Backspace":
        dispatch({ type: "BACKSPACE", payload: { letter } });
        break;

      default:
        dispatch({ type: "SET_LETTER", payload: { letter } });
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: statusColors[status] ?? "#818384",
        transition: "background-color 0.4s ease",
        height: "55px",
        width: isSpecialKey ? "60px" : "45px",
      }}
      onClick={getOnClick}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 800 }}>{iconMap()}</h2>
    </div>
  );
}
