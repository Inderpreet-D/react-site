import {
  StyledContainer,
  StyledInfoHolder,
  StyledHeader,
  StyledSubHeader,
} from "./Room.styles";
import LoadingIcon from "../../../../atoms/LoadingIcon";

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
