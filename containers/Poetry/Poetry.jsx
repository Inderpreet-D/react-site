import { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import parse from "html-react-parser";

import classes from "./Poetry.module.css";

const Poetry = () => {
  const [poemName, setPoemName] = useState("");
  const [poemBody, setPoemBody] = useState("");
  const [poemLink, setPoemLink] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/poetry/hot.json"
      )
      .then((res) => {
        const allPosts = res.data.data.children;
        const textPosts = allPosts.filter((listing) => {
          const post = listing.data;
          const isPoem = post.title.startsWith("[POEM]");
          const hasText = post.selftext.length > 0;
          return isPoem && hasText;
        });
        const poems = textPosts.map((listing) => {
          const poem = listing.data;
          const title = poem.title.substring(7);
          return {
            name: title.trim(),
            body: unescape(poem.selftext_html),
            url: poem.url,
          };
        });
        const idx = Math.floor(Math.random() * poems.length);
        const poem = poems[idx];
        setPoemName(poem.name);
        setPoemBody(poem.body);
        setPoemLink(poem.url);
      });
  }, []);

  return (
    <Paper variant="outlined" className={classes.Paper}>
      <Typography variant="h4" className={classes.Title}>
        <a href={poemLink} target="_blank">
          {poemName}
        </a>
      </Typography>
      <Typography
        variant="h6"
        dangerouslySetInnerHTML={{ __html: parse(poemBody) }}
      ></Typography>
    </Paper>
  );
};

export default Poetry;
