import { AccordionDetails, Typography } from "@material-ui/core";

import styles from "./DataSection.module.css";

const SectionData = (props) => {
    return (
        <AccordionDetails className={styles.SectionData}>
            <Typography>{props.title}</Typography>
            <Typography className={styles.SectionDataRight}>
                {props.value}
            </Typography>
        </AccordionDetails>
    );
};

export default SectionData;
