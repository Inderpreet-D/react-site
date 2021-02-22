interface PostData {
  selftext: string;
  selftext_html: string;
  title: string;
  url: string;
}

interface RedditPost {
  data: PostData;
}

interface RedditResponse {
  data: {
    data: {
      children: RedditPost[];
    };
  };
}

interface Poem {
  name: string;
  body: string;
  url: string;
}

const parsePoems = (res: RedditResponse): Poem[] => {
  const allPosts: RedditPost[] = res.data.data.children;

  const textPosts: RedditPost[] = allPosts.filter(
    (listing: RedditPost): boolean => {
      const post: PostData = listing.data;
      const isPoem = post.title.startsWith("[POEM]");
      const hasText = post.selftext.length > 0;
      return isPoem && hasText;
    }
  );

  const poems: Poem[] = textPosts.map(
    (listing: RedditPost): Poem => {
      const poem: PostData = listing.data;
      const title = poem.title.substring(7);
      return {
        name: title.trim(),
        body: unescape(poem.selftext_html),
        url: poem.url,
      };
    }
  );

  return poems;
};

export const pickRandomPoem = (poems: Poem[]): Poem => {
  const idx = Math.floor(Math.random() * poems.length);
  return poems[idx];
};

export default parsePoems;
