import React from "react";
import clsx from "clsx";

import classes from "./MTGCard.module.css";

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
    <div className={classes.MTGCard}>
      <div className={classes.CardImageHolder}>
        <img src={imageLink} className={classes.CardImage} />
        <div
          className={clsx(classes.CardCount, amount === 0 && classes.NoCards)}
        >
          {amount}
        </div>
      </div>
      <div className={classes.CardActions}>
        <div
          className={clsx(
            classes.Button,
            classes.BigText,
            amount === 0 && classes.Grey
          )}
          onClick={handleSub}
        >
          -
        </div>
        <div className={classes.Button} onClick={handleMove}>
          Move
        </div>
        <div
          className={clsx(classes.Button, classes.BigText)}
          onClick={handleAdd}
        >
          +
        </div>
        {faces && (
          <div
            className={clsx(classes.Button, classes.BigText)}
            onClick={handleFlip}
          >
            ⟳
          </div>
        )}
      </div>
    </div>
  );
};

export default MTGCard;
