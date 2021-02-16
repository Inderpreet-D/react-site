import styled from "styled-components";

const StyledTitle = styled.a`
  transition: all 0.2s ease-in-out;

  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.foregroundDark};

  &:hover {
    color: ${({ theme }) => theme.foreground};
  }
`;

const StyledAuthor = styled.div`
  margin-right: 0.5rem;

  font-size: 1.1rem;
  font-weight: ${({ isMe }) => (isMe ? "bold" : "normal")};
  font-style: italic;
  color: ${({ theme, isMe }) => (isMe ? theme.foregroundDark : theme.text)};
`;

const StyledAuthorList = styled.div`
  display: flex;

  margin: 2rem 0;
`;

const StyledDescription = styled.div`
  font-size: 1rem;
`;

const StyledContainer = styled.div`
  flex-direction: column;

  display: flex;

  padding: 1rem;
`;

const Article = ({ data, idx }) => {
  const { title, authors, me, description, href } = data[idx];

  return (
    <StyledContainer>
      <StyledTitle href={href}>{title}</StyledTitle>

      <StyledAuthorList>
        {authors.map((author, i) => (
          <StyledAuthor key={i} isMe={author === me}>
            {author}
            {i !== authors.length - 1 && ","}
          </StyledAuthor>
        ))}
      </StyledAuthorList>

      <StyledDescription>{description}</StyledDescription>
    </StyledContainer>
  );
};

export default Article;
