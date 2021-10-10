export type PostData = {
  selftext: string
  selftext_html: string
  title: string
  url: string
}

export type RedditPost = {
  data: PostData
}

export type RedditResponse = {
  data: {
    data: {
      children: RedditPost[]
    }
  }
}

export type RedditRawResponse = {
  data: RedditResponse
}
