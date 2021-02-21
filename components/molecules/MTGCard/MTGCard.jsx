import { FaSync, FaPlus, FaMinus } from "react-icons/fa";

import {
  StyledCard,
  StyledImageHolder,
  StyledFlippingCard,
  StyledCardImage,
  StyledCardCount,
  StyledCardActions,
  StyledButton,
} from "./MTGCard.styles";

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

  const handleSub = () => amount > 0 && onClickRemove(name, isCommander);
  const handleMove = () => onClickMove(name, isCommander);
  const handleAdd = () => onClickAdd(name, isCommander);
  const handleFlip = () => setFlipped(!flipped);

  return (
    <StyledCard>
      <StyledImageHolder>
        <StyledFlippingCard flipped={flipped}>
          <StyledCardImage src={image} />
          {faces && <StyledCardImage src={faces[1].image} isBack />}
        </StyledFlippingCard>

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
