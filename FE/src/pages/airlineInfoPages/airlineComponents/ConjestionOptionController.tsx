// ConjestionOptionController.tsx
import React from "react";
import styles from "../../../styles/airlineInfo/ConjestionPage.module.css";

interface ConjestionOptionControllerProps {
  terminal: string;
  setTerminal: (terminal: string) => void;
  into: string;
  setInto: (into: string) => void;
  day: string;
  setDay: (day: string) => void;
  setIsToggled: (isToggled: boolean) => void;
}

const ConjestionOptionController: React.FC<ConjestionOptionControllerProps> = ({
  terminal,
  setTerminal,
  into,
  setInto,
  day,
  setDay,
  setIsToggled,
}) => {
  return (
    <div className={styles["option-controller"]}>
      <div className={styles["option-list"]}>
        <button
          className={`${styles["option-btn"]} ${
            terminal === "T1" ? styles["btn-active"] : ""
          }`}
          onClick={() => setTerminal("T1")}
        >
          터미널 1
        </button>
        <button
          className={`${styles["option-btn"]} ${
            terminal === "T2" ? styles["btn-active"] : ""
          }`}
          onClick={() => setTerminal("T2")}
        >
          터미널 2
        </button>
      </div>
      <div className={styles["option-list"]}>
        <button
          className={`${styles["option-btn"]} ${
            into === "out" ? styles["btn-active"] : ""
          }`}
          onClick={() => setInto("out")}
        >
          출국장
        </button>
        <button
          className={`${styles["option-btn"]} ${
            into === "in" ? styles["btn-active"] : ""
          }`}
          onClick={() => setInto("in")}
        >
          입국장
        </button>
      </div>
      <div className={styles["option-list"]}>
        <button
          className={`${styles["option-btn"]} ${
            day === "오늘" ? styles["btn-active"] : ""
          }`}
          onClick={() => setDay("오늘")}
        >
          오늘
        </button>
        <button
          className={`${styles["option-btn"]} ${
            day === "내일" ? styles["btn-active"] : ""
          }`}
          onClick={() => setDay("내일")}
        >
          내일
        </button>
      </div>
      <button
        className={styles["select-btn"]}
        onClick={() => setIsToggled(false)}
      >
        확인
      </button>
    </div>
  );
};

export default ConjestionOptionController;
