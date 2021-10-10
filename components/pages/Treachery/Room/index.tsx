import {
  StyledContainer,
  StyledInfoHolder,
  StyledHeader,
  StyledSubHeader
} from './styles'
import LoadingIcon from '../../../atoms/LoadingIcon'

export type RoomState = {
  roomCode: string
  numPlayers: number
  roomSize: number
}

const Room: React.FC<RoomState> = ({ roomCode, numPlayers, roomSize }) => (
  <StyledContainer>
    <StyledInfoHolder>
      <StyledHeader>Room Code: {roomCode}</StyledHeader>

      <StyledSubHeader>
        {numPlayers} / {roomSize} Players Joined
      </StyledSubHeader>
    </StyledInfoHolder>

    <LoadingIcon />
  </StyledContainer>
)

export default Room
