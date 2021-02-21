import {
  StyledContainer,
  StyledTitle,
  StyledAuthorList,
  StyledAuthor,
  StyledDescription,
} from "./Article.styles";

const Article = ({ data, idx }) => {
  const { title, authors, me, description, href } = data[idx];

  return (
    <StyledContainer>
      <StyledTitle href={href} target="_blank">
        {title}
      </StyledTitle>

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
