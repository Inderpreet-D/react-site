import styled from "styled-components";

import CardContent from "./CardContent";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import CardActions from "./CardActions";
import LinkButton from "../../atoms/LinkButton";
import Spacer from "../../atoms/Spacer";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.25rem;
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const MyCard = ({
  href,
  hrefTitle,
  title,
  description,
  actionProps = { alignRight: true },
}) => {
  return (
    <StyledCard>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      <Spacer />

      <CardActions {...actionProps}>
        <LinkButton href={href} title={hrefTitle} />
      </CardActions>
    </StyledCard>
  );
};

export default MyCard;
