import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  const router = useRouter();

  let activeClass = "";
  if (router.pathname === props.link) {
    activeClass = styles.active;
  }

  return (
    <Link href={props.link}>
      <li className={styles.NavigationItem}>
        <a className={activeClass}>{props.children}</a>
      </li>
    </Link>
  );
};

export default NavigationItem;
