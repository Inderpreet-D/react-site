import { AccordionDetails, Grid } from "@material-ui/core";

import styles from "./ArticleSection.module.css";

const ArticleSection = (props) => (
  <AccordionDetails>
    <Grid container spacing={3}>
      <Grid item xs={12} className={styles.Title}>
        <a href={props.href} target="_blank">
          {props.title}
        </a>
      </Grid>
      <Grid item xs={12} className={styles.Authors}>
        {props.authors.map((author, idx) => (
          <span
            key={idx}
            className={author === props.me ? styles.AuthorMe : ""}
          >
            {idx === props.authors.length - 1 ? " and " : ""}
            {author}
            {idx !== props.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </Grid>
      <Grid item xs={12} className={styles.Description}>
        {props.description}
      </Grid>
    </Grid>
  </AccordionDetails>
);

export default ArticleSection;
