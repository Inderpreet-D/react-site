import styled from "styled-components";
import axios from "axios";

import Container, {
  ContainerTitle,
  ContainerError,
} from "../../../atoms/Container";
import MTGCard from "../../../molecules/MTGCard";
import LoadingIcon from "../../../atoms/LoadingIcon";
import Dialog from "../../../molecules/Dialog";
import Button from "../../../atoms/Button";
import TextField from "../../../atoms/TextField";
import TextArea from "../../../atoms/TextArea";

import mtgDownload, {
  randomName,
  downloadBlob,
} from "../../../../utilities/toad-helper";

const StyledButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
  & > ${Button} {
    margin: 0 0.5rem;
  }
`;

const StyledTextFieldHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const StyledTextField = styled(TextField)`
  width: 70%;
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

const StyledTextArea = styled(TextArea)`
  width: 100%;
  max-height: 70vh;
`;

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

const Page = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [cardList, setCardList] = React.useState([]);
  const [cardListString, setCardListString] = React.useState([]);
  const [cardObjs, setCardObjs] = React.useState({});
  const [name, setName] = React.useState(randomName());
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const showEdit = process.env.NODE_ENV === "development";

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
        error = `Invalid entry '${card}' on line ${i + 1}`;
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

  const findCard = (name, isCommander) => {
    const check = ({ card }) => card.name === name;
    const list = isCommander ? cardObjs.commanders : cardObjs.others;
    return list.find(check);
  };

  const handleMove = (name, isCommander) => {
    const cardObj = findCard(name, isCommander);

    let others = cardObjs.others.filter((card) => card !== cardObj);
    let commanders = [...cardObjs.commanders, cardObj];
    if (isCommander) {
      commanders = cardObjs.commanders.filter((card) => card !== cardObj);
      others = [...cardObjs.others, cardObj];
    }

    setCardObjs({ commanders, others });
  };

  const handleCountChange = (name, isCommander, increment) => {
    const cardObj = findCard(name, isCommander);
    const list = isCommander ? cardObjs.commanders : cardObjs.others;
    const filtered = list.filter((card) => card !== cardObj);

    const newList = [
      ...filtered,
      { ...cardObj, amount: cardObj.amount + (increment ? 1 : -1) },
    ];

    if (isCommander) {
      setCardObjs({ ...cardObjs, commanders: newList });
    } else {
      setCardObjs({ ...cardObjs, others: newList });
    }
  };

  const parseJSON = (data) => {
    console.dir(data);
    return ["asd", "asdeww"];
  };

  const downloadDecklist = (list, file) => {
    const fullName = file.name.split(".");
    fullName.splice(fullName.length - 1, 1, "LIST", "txt");
    const newName = fullName.join(".");
    const blob = new Blob([list.join("\n")], { type: "text/plain" });
    downloadBlob(blob, newName);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];

      if (file.name.endsWith(".json")) {
        console.log(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target.result);

          const list = parseJSON(data);
          downloadDecklist(list, file);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleAdd = (name, isCommander) =>
    handleCountChange(name, isCommander, true);

  const handleRemove = (name, isCommander) =>
    handleCountChange(name, isCommander, false);

  const reduce = (t, { amount }) => t + amount;
  const commanderCount = cardObjs.commanders?.reduce(reduce, 0);
  const otherCount = cardObjs.others?.reduce(reduce, 0);
  const totalCount = commanderCount + otherCount;

  return (
    <Container>
      <ContainerTitle>Toad Village</ContainerTitle>

      <StyledButtonHolder>
        <Button onClick={() => setShowDialog(true)}>Import Deck List</Button>
        <Button onClick={handleDownload}>Download</Button>
        {showEdit && (
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "0.0625rem solid turquoise",
              borderRadius: "0.75rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            Extract List from JSON
            <input type="file" onChange={handleFileSelect} hidden />
          </label>
        )}
      </StyledButtonHolder>

      {error && <ContainerError>{error}</ContainerError>}

      <StyledTextFieldHolder>
        <StyledTextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your deck name"
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
            {cardObjs.commanders.sort(nameSort).map((card, i) => (
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
            {cardObjs.others.sort(nameSort).map((card, i) => (
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
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleClose}>Submit</Button>
          </StyledButtonHolder>
        }
      >
        <StyledTextArea
          autoFocus
          onChange={handleSetCards}
          value={cardListString}
          rows={20}
          placeholder="Enter your cards, one per line, in the format of 'NUMBER NAME'"
        />
      </Dialog>
    </Container>
  );
};

export default Page;
