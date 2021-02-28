export interface PostData {
  selftext: string;
  selftext_html: string;
  title: string;
  url: string;
}

export interface RedditPost {
  data: PostData;
}

export interface RedditResponse {
  data: {
    data: {
      children: RedditPost[];
    };
  };
}

export interface RedditRawResponse {
  data: RedditResponse;
}
