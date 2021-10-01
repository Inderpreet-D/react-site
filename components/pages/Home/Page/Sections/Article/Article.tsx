import { SectionProps } from '../..'
import { Paper } from '../../Data/me'

import {
  StyledContainer,
  StyledTitle,
  StyledAuthorList,
  StyledAuthor,
  StyledDescription
} from './Article.styles'

const Article: React.FC<SectionProps> = ({ data, idx }) => {
  const { title, authors, me, description, href } = data[idx] as Paper

  return (
    <StyledContainer>
      <StyledTitle href={href} target='_blank'>
        {title}
      </StyledTitle>

      <StyledAuthorList>
        {authors.map((author, i) => (
          <StyledAuthor key={i} isMe={author === me}>
            {author}
            {i !== authors.length - 1 && ','}
          </StyledAuthor>
        ))}
      </StyledAuthorList>

      <StyledDescription>{description}</StyledDescription>
    </StyledContainer>
  )
}

export default Article
