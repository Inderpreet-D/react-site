import { useState } from "react";

import styles from "../styles/Secret.module.css";
import Page from "../components/Page";
import { part1, part2, part3, decode } from "../secret-helper";

const Secret = () => {
  const [userInput, setUserInput] = useState("");
  const nextClasses = [styles.BorderedBox, styles.BorderedNext].join(" ");

  return (
    <Page title="Secret">
      <div className={styles.BorderedBox}>
        <p className={styles.TopText}>{decode(userInput, part1)}</p>
      </div>
      <div className={nextClasses}>
        <p className={styles.MidText}>{decode(userInput, part2)}</p>
      </div>
      <div className={nextClasses}>
        <p className={styles.BotText}>{decode(userInput, part3)}</p>
      </div>
      <div className={nextClasses}>
        <form
          className={styles.Input}
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className={styles.InputElement}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            placeholder="Who are you to me?"
          />
        </form>
      </div>
    </Page>
  );
};

export default Secret;
