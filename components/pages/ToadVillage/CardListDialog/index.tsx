import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import Dialog from "../../../molecules/Dialog";
import Button from "../../../atoms/Button";
import TextArea from "../../../atoms/TextArea";

import {
  selectToadVillage,
  close,
  cancel,
  startApiWork,
  setCardString,
} from "../../../../slices/toadVillage";

const CardListDialog: React.FC = () => {
  const dispatch = useAppDispatch();

  const { cardListString } = useAppSelector(selectToadVillage);

  return (
    <Dialog
      onClose={() => dispatch(close())}
      title="Enter Decklist"
      actions={
        <div className="flex flex-col justify-center w-full sm:flex-row">
          <Button
            onClick={() => dispatch(cancel())}
            className="mb-4 w-full sm:mb-0 sm:w-auto sm:mr-4"
          >
            Cancel
          </Button>

          <Button onClick={() => dispatch(startApiWork())}>Submit</Button>
        </div>
      }
    >
      <TextArea
        autoFocus
        onChange={(e) => dispatch(setCardString(e.target.value))}
        value={cardListString}
        rows={20}
        placeholder="Enter your cards, one per line, in the format of 'NUMBER NAME'"
        className="w-full h-full"
      />
    </Dialog>
  );
};

export default CardListDialog;
