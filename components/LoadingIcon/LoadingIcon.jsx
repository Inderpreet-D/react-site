import { useEffect, useState } from "react";

import styles from "./LoadingIcon.module.css";

const LoadingIcon = () => {
    const [colors, setColors] = useState([
        "rgb(0, 115, 62)",
        "rgb(14, 104, 171)",
        "rgb(211, 32, 42)",
        "rgb(249, 250, 244)",
        "rgb(166, 159, 157)",
    ]);

    setTimeout(() => {
        const last = colors[colors.length - 1];
        setColors([last, ...colors.slice(0, 4)]);
    }, 2000);

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
