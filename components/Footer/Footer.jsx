import { Copyright } from "@material-ui/icons";

import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.Footer}>
            Copyright <Copyright fontSize="small" /> Inderpreet Dhillon
        </div>
    );
};

export default Footer;
