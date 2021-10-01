import {
  StyledCard,
  StyledContent,
  StyledTitle,
  StyledDescription
} from './styles'
import Spacer from '../../atoms/Spacer'
import CardActions from './Actions'
import LinkButton from '../../atoms/LinkButton'

type MyCardProps = {
  href: string
  hrefTitle: string
  title: string
  description: string
  actionProps?: any
}

const MyCard: React.FC<MyCardProps> = ({
  href,
  hrefTitle,
  title,
  description,
  actionProps = { alignRight: true }
}) => (
  <StyledCard>
    <StyledContent>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </StyledContent>

    <Spacer />

    <CardActions {...actionProps}>
      <LinkButton href={href} title={hrefTitle} />
    </CardActions>
  </StyledCard>
)

export default MyCard
