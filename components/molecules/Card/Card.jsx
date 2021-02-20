import {
  StyledCard,
  StyledContent,
  StyledTitle,
  StyledDescription,
} from "./Card.styles";
import Spacer from "../../atoms/Spacer";
import CardActions from "./CardActions";
import LinkButton from "../../atoms/LinkButton";

const MyCard = ({
  href,
  hrefTitle,
  title,
  description,
  actionProps = { alignRight: true },
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
);

export default MyCard;
