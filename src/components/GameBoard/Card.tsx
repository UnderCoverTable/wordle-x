import styles from "@/components/GameBoard/index.module.css";

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
    <div className={styles.cardStyle}>
      <h2 style={{ fontSize: "32px", fontWeight: 600 }}>{letter}</h2>
    </div>
  );
}
