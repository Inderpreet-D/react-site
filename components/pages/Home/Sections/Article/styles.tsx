import styled from 'styled-components'

const StyledTitle = styled.a`
  transition: all 0.2s ease-in-out;

  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.foregroundDark};

  &:hover {
    color: ${({ theme }) => theme.foreground};
  }
`

type AuthorProps = {
  isMe: boolean
}

const StyledAuthor = styled.div<AuthorProps>`
  margin-right: 0.5rem;

  font-size: 1.1rem;
  font-weight: ${({ isMe }) => (isMe ? 'bold' : 'normal')};
  font-style: italic;
  color: ${({ theme, isMe }) => (isMe ? theme.foregroundDark : theme.text)};
`

const StyledAuthorList = styled.div`
  flex-wrap: wrap;

  display: flex;

  overflow: auto hidden;

  margin: 2rem 0;
`

const StyledDescription = styled.div`
  font-size: 1rem;
`

const StyledContainer = styled.div`
  flex-direction: column;

  display: flex;

  padding: 1rem;
`

export {
  StyledContainer,
  StyledTitle,
  StyledAuthorList,
  StyledAuthor,
  StyledDescription
}
