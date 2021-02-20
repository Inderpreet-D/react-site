const parsePoems = (res) => {
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

  return poems;
};

export const pickRandomPoem = (poems) => {
  const idx = Math.floor(Math.random() * poems.length);
  return poems[idx];
};

export default parsePoems;
