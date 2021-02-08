import styled, { css } from "styled-components";
import alpha from "color-alpha";

import Container from "../../../atoms/Container";
import TextField from "../../../atoms/TextField";

import {
  part1,
  midParts,
  part3,
  decode,
} from "../../../../utilities/secret-helper";

const textBlock = css`
  font-family: "Courier New", Courier, monospace;
  margin-top: 0.625rem;
  padding: 0.625rem;
  word-break: break-word;
`;

const StyledContainer = styled(Container)`
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.foreground};
  font-size: 4.6875rem;
  font-weight: bold;
  line-height: 1.235;
  letter-spacing: 0.00735em;
  ${textBlock};
`;

const StyledScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const StyledText = styled.div`
  flex-shrink: 1;
  font-size: 1.25rem;
  border-radius: 1rem;
  transition: background-color 2s;
  ${textBlock};
  &:hover {
    background-color: ${({ theme }) => alpha(theme.background, 0.5)};
  }
`;

const StyledSubText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.foregroundDark};
  ${textBlock};
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 1.25rem;
`;

const StyledTextField = styled(TextField)`
  width: 60%;
`;

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
