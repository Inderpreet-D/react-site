import parse from "html-react-parser";
import styled, { css } from "styled-components";
import axios from "axios";

import Page from "../../templates/Page";
import Container from "../../atoms/Container";
import LoadingIcon from "../../atoms/LoadingIcon";

const titleStyles = css`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.foreground};
  font-size: 2.125rem;
  font-weight: bold;
  line-height: 1.235;
  letter-spacing: 0.00735em;
`;

const StyledLink = styled.a`
  ${titleStyles}
`;

const StyledText = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`;

const StyledError = styled.div`
  ${titleStyles}
`;

const pickRandomPoem = (res) => {
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
  return poems[idx];
};

const Poetry = () => {
  const [poem, setPoem] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("/api/reddit")
      .then((res) => {
        const { name, body, url } = pickRandomPoem(res);
        if (name && body && url) {
          setPoem({ name, body, url });
        } else {
          setError(true);
        }
        setLoaded(true);
      })
      .catch((err) => {
        setError(true);
        setLoaded(true);
      });
  }, []);

  return (
    <Page title="Poetry">
      <Container>
        {!loaded ? (
          <LoadingIcon />
        ) : error ? (
          <StyledError>An error occurred, please try again later.</StyledError>
        ) : (
          <>
            <StyledLink href={poem.url} target="_blank">
              {poem.name}
            </StyledLink>
            <StyledText
              dangerouslySetInnerHTML={{ __html: parse(poem.body) }}
            />
          </>
        )}
      </Container>
    </Page>
  );
};

export default Poetry;
