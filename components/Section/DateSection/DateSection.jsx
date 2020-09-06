import { AccordionDetails, Grid } from "@material-ui/core";

import styles from "./DateSection.module.css";

const DateSection = (props) => (
    <AccordionDetails>
        <Grid container spacing={3}>
            <Grid item xs={6} className={styles.LeftSpan}>
                {props.work}
            </Grid>
            <Grid item xs={6} className={styles.RightSpan}>
                {props.place}
            </Grid>
            <Grid item xs={9} className={styles.LeftSpan}>
                {props.position}
            </Grid>
            <Grid item xs={3} className={styles.RightSpan}>
                {props.date}
            </Grid>
            {props.points.map((point, idx) => (
                <Grid key={idx} item xs={12} className={styles.Points}>
                    &#10148;{"  "}
                    {point}
                </Grid>
            ))}
        </Grid>
    </AccordionDetails>
);

export default DateSection;
