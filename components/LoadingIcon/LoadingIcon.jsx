import styles from "./LoadingIcon.module.css";

const LoadingIcon = () => {
  const colors = [
    "rgb(0, 115, 62)", // Green
    "rgb(211, 32, 42)", // Red
    "rgb(21, 11, 0)", // Black
    "rgb(14, 104, 171)", // Blue
    "rgb(249, 250, 244)", // White
  ];

  return (
    <div className={styles.Wrapper}>
      <div
        className={styles.Loader}
        style={{
          borderColor: colors.slice(0, 4).join(" "),
          backgroundColor: colors[4],
        }}
      />
    </div>
  );
};

export default LoadingIcon;
