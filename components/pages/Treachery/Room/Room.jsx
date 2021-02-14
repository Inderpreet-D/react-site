import styled, { css } from "styled-components";

import LoadingIcon from "../../../atoms/LoadingIcon";

const defaultStyles = css`
  line-height: 1.235;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.00735em;
`;

const StyledContainer = styled.div`
  flex-direction: column;
  align-items: center;

  display: flex;
`;

const StyledInfoHolder = styled.div`
  margin-bottom: 1rem;
  border: 0.125rem solid ${({ theme }) => theme.foreground};
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 1rem;
  width: max-content;

  background-color: ${({ theme }) => theme.background};
`;

const StyledHeader = styled.div`
  ${defaultStyles};

  margin-bottom: 0.5rem;

  font-size: 2rem;
`;

const StyledSubHeader = styled.div`
  ${defaultStyles};

  font-size: 1.25rem;
`;

const Room = ({ roomState: { roomCode, numPlayers, roomSize } }) => (
  <StyledContainer>
    <StyledInfoHolder>
      <StyledHeader>Room Code: {roomCode}</StyledHeader>

      <StyledSubHeader>
        {numPlayers} / {roomSize} Players Joined
      </StyledSubHeader>
    </StyledInfoHolder>

    <LoadingIcon />
  </StyledContainer>
);

export default Room;
