import styles from "@/components/GameBoard/index.module.css";
import { useColorMode } from "@/components/ui/color-mode";
import { useToken } from "@chakra-ui/react";

type CardProps = {
  letter: string;
  status: string;
};

export default function Card({ letter, status }: CardProps) {
  const { colorMode } = useColorMode();

  const [statusColor] = useToken("colors", [`${status}.${colorMode}`]);

  return (
    <div className={styles.cardStyle} style={{ backgroundColor: statusColor }}>
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 600,
        }}
      >
        {letter.toUpperCase()}
      </h2>
    </div>
  );
}
