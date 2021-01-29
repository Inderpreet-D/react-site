import axios from "axios";
import parse from "html-react-parser";
import styled from "styled-components";

import Page from "../../templates/Page";
import LoadingIcon from "../../atoms/LoadingIcon";

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContainer = styled.div`
  width: 55%;
  padding: 1.25rem;
  margin: 1rem 0;
  border: ${({ theme }) => `0.125rem solid ${theme.foregroundDark}`};
`;

const StyledLink = styled.a`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  color: ${({ theme }) => theme.foreground};
`;

const StyledText = styled.div`
  font-size: 1.2rem;
`;

const corsProxy = "https://cors-anywhere.herokuapp.com";
const poetryURL = "https://www.reddit.com/r/poetry/hot.json";

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

  React.useEffect(() => {
    axios({ method: "GET", url: `${corsProxy}/${poetryURL}` }).then((res) => {
      const { name, body, url } = pickRandomPoem(res);
      setPoem({ name, body, url });
      setLoaded(true);
    });
  }, []);

  return (
    <Page title="Poetry">
      <StyledBox>
        <StyledContainer>
          {!loaded ? (
            <LoadingIcon />
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
        </StyledContainer>
      </StyledBox>
    </Page>
  );
};

export default Poetry;
