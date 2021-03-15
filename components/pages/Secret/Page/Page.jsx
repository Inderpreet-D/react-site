import {
  StyledContainer,
  StyledTitle,
  StyledScrollContainer,
  StyledText,
  StyledSubText,
  StyledForm,
  StyledTextField,
} from "./Page.styles";

import {
  part1,
  midParts,
  part3,
  decode,
} from "../../../../utilities/helpers/secret";

const Page = () => {
  const [userInput, setUserInput] = React.useState("");

  return (
    <StyledContainer>
      <StyledTitle>{decode(userInput, part1)}</StyledTitle>

      <StyledScrollContainer>
        {midParts.map((part, i) => (
          <StyledText key={i}>{decode(userInput, part)}</StyledText>
        ))}
      </StyledScrollContainer>

      <StyledSubText>{decode(userInput, part3)}</StyledSubText>

      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <StyledTextField
          variant="filled"
          color="secondary"
          placeholder="Who are you to me?"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
      </StyledForm>
    </StyledContainer>
  );
};

export default Page;
