import React from "react";
import styled, { css } from "styled-components";
import { FaSync } from "react-icons/fa";

const noCardStyles = css`
  color: red;
  border-color: red;
`;

const bigTextStyles = css`
  font-size: large;
  font-weight: bold;
`;

const greyStyles = css`
  cursor: default;
  color: grey;
  background-color: lightgray;
  border-color: darkgray;

  &:hover {
    color: grey;
    background-color: lightgray;
    border-color: darkgray;
    transform: scale(1);
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  margin: 0.25rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const StyledCardCount = styled.div`
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: bold;
  transition: opacity 0.5s;
  background-color: ${({ theme }) => theme.foreground};
  border: 0.0625rem solid ${({ theme }) => theme.foregroundDark};
  font-size: 3rem;
  line-height: 3rem;
  padding: 0.5rem;
  border-radius: 50%;

  ${({ noCards }) => noCards && noCardStyles};
`;

const StyledImageHolder = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  &:hover ${StyledCardCount} {
    opacity: 0;
  }
`;

const StyledCardImage = styled.img`
  width: 95%;
  margin: 0.3rem auto;
  border-radius: 0.75rem;
`;

const StyledCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.5rem auto;
  width: 100%;
`;

const StyledButton = styled.div`
  outline: none;
  background-color: transparent;
  border-radius: 0.25rem;
  border: 0.125rem solid;
  border-color: gold; // ${({ theme }) => theme.foregroundDark}
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.25rem;
  min-width: 2.5rem;
  max-width: 4rem;
  height: 2.5rem;
  user-select: none;
  transition: all 1s;

  &:hover {
    border-color: rgb(145, 105, 0);
    background-color: gold;
    transform: scale(1.25);
    color: black;
  }

  ${({ bigText }) => bigText && bigTextStyles};
  ${({ isGrey }) => isGrey && greyStyles}
`;

const MTGCard = ({
  amount,
  isCommander,
  card,
  onClickMove,
  onClickAdd,
  onClickRemove,
}) => {
  const [flipped, setFlipped] = React.useState(false);

  const { image, name, faces } = card;
  const imageLink = flipped ? faces[1].image : image;

  const handleSub = () => {
    if (amount > 0) {
      onClickRemove(name, isCommander);
    }
  };

  const handleMove = () => {
    onClickMove(name, isCommander);
  };

  const handleAdd = () => {
    onClickAdd(name, isCommander);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <StyledCard>
      <StyledImageHolder>
        <StyledCardImage src={imageLink} />
        <StyledCardCount noCards={amount === 0}>{amount}</StyledCardCount>
      </StyledImageHolder>

      <StyledCardActions>
        <StyledButton onClick={handleSub} isGrey={amount === 0} bigText>
          -
        </StyledButton>
        <StyledButton onClick={handleMove}>Move</StyledButton>
        <StyledButton onClick={handleAdd} bigText>
          +
        </StyledButton>
        {faces && (
          <StyledButton onClick={handleFlip} bigText>
            <FaSync />
          </StyledButton>
        )}
      </StyledCardActions>
    </StyledCard>
  );
};

export default MTGCard;
