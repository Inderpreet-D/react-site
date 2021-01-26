import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import PropTypes from "prop-types";

import styles from "./Card.module.css";
import Link from "next/link";

const MyCard = (props) => {
  let target = "_blank";
  if (props.href.startsWith("/")) {
    target = "";
  }

  let width = 4;
  if (props.width) {
    width = props.width;
  }

  return (
    <Grid item xs={width}>
      <Card>
        <CardContent>
          <Typography variant="h4" className={styles.Title} gutterBottom>
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            className={styles.Description}
            component="p"
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium">
            <Link href={props.href}>
              <a target={target} className={styles.Link}>
                {props.hrefTitle}
              </a>
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

MyCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hrefTitle: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default MyCard;
