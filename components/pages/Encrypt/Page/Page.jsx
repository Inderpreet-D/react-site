import styled from "styled-components";

import Container from "../../../atoms/Container";
import MessageBlock from "./MessageBlock";
import TextField from "../../../atoms/TextField";
import Button from "../../../atoms/Button";

const StyledContainer = styled(Container)`
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 1rem;
`;

const StyledControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledTextField = styled(TextField)`
  width: 60%;
  margin-right: 1rem;
`;

const Page = () => {
  const [values, setValues] = React.useState({});
  const [secret, setSecret] = React.useState("");

  const handleChange = (prop) => (value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleAdd = () => {
    setValues({ ...values, [Object.keys(values).length]: "" });
  };

  return (
    <StyledContainer>
      <StyledHolder>
        {Object.entries(values).map(([k, v]) => (
          <MessageBlock
            key={k}
            value={v}
            onChange={handleChange(k)}
            secret={secret}
          />
        ))}
      </StyledHolder>

      <StyledControls>
        <StyledTextField
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret phrase"
        />
        <Button onClick={handleAdd}>Add</Button>
      </StyledControls>
    </StyledContainer>
  );
};

export default Page;
