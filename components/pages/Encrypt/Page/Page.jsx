import {
  StyledContainer,
  StyledHolder,
  StyledControls,
  StyledTextField,
} from "./Page.styles";
import MessageBlock from "./MessageBlock";
import Button from "../../../atoms/Button";

const Page = () => {
  const [values, setValues] = React.useState({});
  const [secret, setSecret] = React.useState("");

  const handleChange = (prop) => (value) =>
    setValues({ ...values, [prop]: value });

  const handleAdd = () =>
    setValues({ ...values, [Object.keys(values).length]: "" });

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
