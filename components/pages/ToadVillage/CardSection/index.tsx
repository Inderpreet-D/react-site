import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import {
  TreacheryResponse,
  FormattedCard,
} from "../../../../shared/toadvillage";

import MTGCard from "../../../molecules/MTGCard";

import {
  selectToadVillage,
  moveCard,
  addCard,
  removeCard,
} from "../../../../slices/toadVillage";
import { titleClassName, useCardState } from "../providers/CardStateProvider";

type CardSectionProps = {
  cardKey: keyof TreacheryResponse;
  disableControls?: boolean;
  isCommander?: boolean;
  children: React.ReactNode;
};

const iconClassName = "mr-2";
const cardBlockClassName =
  "grid grid-cols-1 w-full p-0 sm:grid-cols-2 md:grid-cols-3";

const CardSection: React.FC<CardSectionProps> = ({
  cardKey,
  disableControls,
  isCommander = false,
  children,
}) => {
  const dispatch = useAppDispatch();

  const { cardObjs } = useAppSelector(selectToadVillage);

  const { selectedSort, counts } = useCardState();

  const [showingCards, setShowingCards] = React.useState(true);

  return (
    <>
      <div
        onClick={() => setShowingCards((old) => !old)}
        className={titleClassName}
      >
        {showingCards ? (
          <FaAngleDown className={iconClassName} />
        ) : (
          <FaAngleRight className={iconClassName} />
        )}
        {children} ({counts[cardKey]})
      </div>

      {showingCards && (
        <div className={cardBlockClassName}>
          {([...cardObjs[cardKey]] as FormattedCard[])
            .sort(selectedSort.sort)
            .map((card, i) => (
              <MTGCard
                key={i}
                disableControls={disableControls}
                {...(disableControls
                  ? {}
                  : {
                      onClickMove: (name, isCommander) =>
                        dispatch(moveCard({ name, isCommander })),
                      onClickAdd: (name, isCommander) =>
                        dispatch(addCard({ name, isCommander })),
                      onClickRemove: (name, isCommander) =>
                        dispatch(removeCard({ name, isCommander })),
                    })}
                isCommander={isCommander}
                {...card}
                hideCount={disableControls}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CardSection;
