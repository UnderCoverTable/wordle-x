import styles from "@/components/GameBoard/index.module.css";
import { statusColors } from "@/constants";

type CardProps = {
  letter: string;
  status: string;
  rowIndex: number;
  colIndex: number;
};

export default function Card({
  letter,
  status,
  rowIndex,
  colIndex,
}: CardProps) {
  return (
    <div
      className={styles.cardStyle}
      style={{ backgroundColor: statusColors[status] }}
    >
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
