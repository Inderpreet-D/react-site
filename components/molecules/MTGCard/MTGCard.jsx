import styled, { css } from "styled-components";
import { FaSync, FaPlus, FaMinus } from "react-icons/fa";

const noCardStyles = css`
  color: red;
  border-color: red;
`;

const greyStyles = css`
  cursor: not-allowed;
  color: gray;
  border-color: gray;
  background-color: ${({ theme }) => theme.accent};

  &:hover {
    color: gray;
    border-color: gray;
    background-color: ${({ theme }) => theme.accent};
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
  color: ${({ theme }) => theme.foreground};
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: bold;
  transition: opacity 1s ease-in-out;
  background-color: ${({ theme }) => theme.backgroundLight};
  border: 0.0625rem solid ${({ theme }) => theme.accent};
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
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.background};
  transition: transform 1s;

  &:hover {
    transform: scale(1.5);
    z-index: 1;
  }
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
  color: ${({ theme }) => theme.foreground};
  background-color: ${({ theme }) => theme.background};
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.25rem;
  min-width: 2.5rem;
  max-width: 4rem;
  height: 2.5rem;
  user-select: none;
  transition: all 0.25s;

  &:hover {
    transform: scale(1.15);
    color: ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.foregroundDark};
    border-color: ${({ theme }) => theme.foreground};
  }

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
        <StyledButton onClick={handleSub} isGrey={amount === 0}>
          <FaMinus />
        </StyledButton>

        <StyledButton onClick={handleMove} style={{ fontWeight: "bold" }}>
          Move
        </StyledButton>

        <StyledButton onClick={handleAdd}>
          <FaPlus />
        </StyledButton>

        {faces && (
          <StyledButton onClick={handleFlip}>
            <FaSync />
          </StyledButton>
        )}
      </StyledCardActions>
    </StyledCard>
  );
};

export default MTGCard;
