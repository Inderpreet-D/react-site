import styled from "styled-components";
import { Button, TextField, TextareaAutosize } from "@material-ui/core";
import axios from "axios";

import Container from "../../atoms/Container";
import MTGCard from "../../molecules/MTGCard";
import LoadingIcon from "../../atoms/LoadingIcon";
import Dialog from "../../molecules/Dialog";

import mtgDownload, { randomName } from "../../../utilities/toad-helper";

const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 1.235;
  letter-spacing: 0.00735em;
`;

const StyledButton = styled(Button)``;

const StyledButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
  & > ${StyledButton} {
    margin: 0 0.5rem;
  }
`;

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: lightcoral;
  margin-bottom: 1.25rem;
`;

const StyledTextFieldHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const StyledTextField = styled(TextField)`
  width: 70%;
  & > input {
    text-align: center;
  }
`;

const StyledHeader = styled.div`
  font-size: 1.75rem;
  font-weight: 300;
  text-decoration: underline;
  margin: 1.25rem 0;
`;

const StyledCardBlock = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 0;
  width: 100%;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  max-height: 70vh;
`;

const ToadVillage = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [cardList, setCardList] = React.useState([]);
  const [cardListString, setCardListString] = React.useState([]);
  const [cardObjs, setCardObjs] = React.useState({});
  const [name, setName] = React.useState(randomName());
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (cardList.length > 0 && !showDialog) {
      setLoading(true);
      setError("");
      axios.post("/api/toadvillage", { cards: cardList }).then((res) => {
        const data = {
          commanders: res.data.commanders,
          others: res.data.others,
          tokens: res.data.tokens,
        };
        const unmatched = res.data.unmatched;
        if (unmatched.length > 0) {
          const msg = `Could not find the following card${
            unmatched.length === 1 ? "" : "s"
          }: ${unmatched.join(", ")}`;
          setError(msg);
        }
        setCardObjs(data);
        setLoading(false);
      });
    } else if (cardList.length === 0) {
      setCardObjs({});
    }
  }, [cardList, showDialog]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDownload = () => {
    setError("");
    const errorMsg = mtgDownload(cardObjs, name);
    if (errorMsg) {
      setError(errorMsg);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleCancel = () => {
    setCardList({});
    setCardListString("");
    handleClose();
  };

  const handleSetCards = (e) => {
    setError("");
    const cards = e.target.value.trim().split("\n");
    let error = "";
    const newCardList = cards.map((card, i) => {
      const split = card.split(" ");
      const amount = +split[0];
      if (isNaN(amount)) {
        error = `Invalid Entry ${card} on line ${i + 1}`;
      }
      const name = split.slice(1).join(" ");
      return { amount, name };
    });
    if (error) {
      setError(error);
    } else {
      setCardList(newCardList);
    }
    setCardListString(e.target.value);
  };

  const nameSort = (c1, c2) => {
    const textA = c1.card.name;
    const textB = c2.card.name;
    if (textA < textB) {
      return -1;
    } else if (textA > textB) {
      return 1;
    } else {
      return c1.amount - c2.amount;
    }
  };

  const findCard = (name, isCommander) => {
    const check = ({ card }) => card.name === name;

    if (isCommander) {
      return cardObjs.commanders.find(check);
    } else {
      return cardObjs.others.find(check);
    }
  };

  const handleMove = (name, isCommander) => {
    const cardObj = findCard(name, isCommander);

    if (isCommander) {
      const commanders = cardObjs.commanders.filter((card) => card !== cardObj);
      const others = [...cardObjs.others, cardObj].sort(nameSort);
      setCardObjs({ commanders, others });
    } else {
      const others = cardObjs.others.filter((card) => card !== cardObj);
      const commanders = [...cardObjs.commanders, cardObj].sort(nameSort);
      setCardObjs({ commanders, others });
    }
  };

  const handleCountChange = (name, isCommander, increment) => {
    const cardObj = findCard(name, isCommander);

    let list = cardObjs.others;
    if (isCommander) {
      list = cardObjs.commanders;
    }

    const filtered = list.filter((card) => card !== cardObj);
    const newList = [
      ...filtered,
      { ...cardObj, amount: cardObj.amount + (increment ? 1 : -1) },
    ].sort(nameSort);

    if (isCommander) {
      setCardObjs({ ...cardObjs, commanders: newList });
    } else {
      setCardObjs({ ...cardObjs, others: newList });
    }
  };

  const handleAdd = (name, isCommander) => {
    handleCountChange(name, isCommander, true);
  };

  const handleRemove = (name, isCommander) => {
    handleCountChange(name, isCommander, false);
  };

  let commanderCount = 0;
  let otherCount = 0;
  let totalCount = 0;

  cardObjs.commanders?.forEach(({ amount }) => {
    commanderCount += amount;
    totalCount += amount;
  });
  cardObjs.others?.forEach(({ amount }) => {
    otherCount += amount;
    totalCount += amount;
  });

  return (
    <Container>
      <StyledTitle>Toad Village</StyledTitle>

      <StyledButtonHolder>
        <StyledButton variant="outlined" onClick={() => setShowDialog(true)}>
          Import Deck List
        </StyledButton>
        <StyledButton variant="outlined" onClick={handleDownload}>
          Download
        </StyledButton>
      </StyledButtonHolder>

      {error && <StyledError>{error}</StyledError>}

      <StyledTextFieldHolder>
        <StyledTextField
          value={name}
          onChange={handleNameChange}
          variant="outlined"
        />
      </StyledTextFieldHolder>

      {loading && <LoadingIcon />}

      {!loading && cardObjs.commanders && cardObjs.others && (
        <>
          <StyledHeader>Total Cards ({totalCount})</StyledHeader>
          <StyledHeader>
            Commander Options / Sideboard ({commanderCount})
          </StyledHeader>

          <StyledCardBlock>
            {cardObjs.commanders.map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                isCommander={true}
                {...card}
              />
            ))}
          </StyledCardBlock>

          <StyledHeader>Deck ({otherCount})</StyledHeader>

          <StyledCardBlock>
            {cardObjs.others.map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                isCommander={false}
                {...card}
              />
            ))}
          </StyledCardBlock>
        </>
      )}

      <Dialog
        open={showDialog}
        onClose={handleClose}
        title="Enter Decklist"
        actions={
          <StyledButtonHolder style={{ marginBottom: 0 }}>
            <StyledButton variant="outlined" onClick={handleCancel}>
              Cancel
            </StyledButton>
            <StyledButton variant="outlined" onClick={handleClose}>
              Submit
            </StyledButton>
          </StyledButtonHolder>
        }
      >
        <StyledTextArea
          autoFocus
          onChange={handleSetCards}
          rowsMin={20}
          rowsMax={50}
          value={cardListString}
        />
      </Dialog>
    </Container>
  );
};

export default ToadVillage;
