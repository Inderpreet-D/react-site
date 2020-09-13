import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

const Poetry = () => {
  const [poemName, setPoemName] = useState("");
  const [poemBody, setPoemBody] = useState("");

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
          console.log(listing);
          const poem = listing.data;
          const title = poem.title.substring(7);
          return { name: title.trim(), body: unescape(poem.selftext_html) };
        });
        const idx = Math.floor(Math.random() * poems.length);
        const poem = poems[idx];
        setPoemName(poem.name);
        setPoemBody(poem.body);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{poemName}</h1>
      <div dangerouslySetInnerHTML={{ __html: parse(poemBody) }}></div>
    </div>
  );
};

export default Poetry;
