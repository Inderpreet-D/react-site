import styled, { css } from 'styled-components'

const noCardStyles = css`
  border-color: red;

  color: red;
`

const greyStyles = css`
  border-color: gray;

  background-color: ${({ theme }) => theme.accent};
  cursor: not-allowed;

  color: gray;

  &:hover {
    transform: scale(1);

    border-color: gray;

    background-color: ${({ theme }) => theme.accent};

    color: gray;
  }
`

const StyledCard = styled.div`
  flex-direction: column;

  display: flex;

  margin: 0.25rem;
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.backgroundLight};
`

type CardCountProps = {
  noCards: boolean
}
const StyledCardCount = styled.div<CardCountProps>`
  position: absolute;
  top: 30%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);

  transition: opacity 1s ease-in-out;

  border: 0.0625rem solid ${({ theme }) => theme.accent};
  border-radius: 50%;
  padding: 0.5rem;

  background-color: ${({ theme }) => theme.backgroundLight};

  font-size: 3rem;
  line-height: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.foreground};

  ${({ noCards }) => noCards && noCardStyles};
`

const StyledImageHolder = styled.div`
  justify-content: center;

  display: flex;
  perspective: 20rem;

  width: 100%;

  &:hover ${StyledCardCount} {
    opacity: 0;
  }

  &:hover {
    z-index: 1;
  }
`

type FlippingCardProps = {
  flipped: boolean
}
const StyledFlippingCard = styled.div<FlippingCardProps>`
  position: relative;

  transform: ${({ flipped }) => flipped && 'rotateY(180deg)'};
  transform-style: preserve-3d;

  transition: transform 1s;

  width: 95%;
  height: 20rem;
`

type CardImageProps = {
  isBack?: boolean
}
const StyledCardImage = styled.img<CardImageProps>`
  position: absolute;
  top: 0;
  left: 0;

  transform: ${({ isBack }) => isBack && 'rotateY(180deg)'};
  backface-visibility: hidden;

  transition: transform 1s;

  margin: 0.3rem auto;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.background};
  border-radius: 0.75rem;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.5)
      ${({ isBack }) => (isBack ? 'rotateY(180deg)' : 'rotateY(0)')};

    cursor: zoom-in;
  }
`

const StyledCardActions = styled.div`
  justify-content: space-around;
  align-items: center;
  display: flex;

  margin: 0.5rem auto;
  width: 100%;
`

type ButtonProps = {
  isGrey?: boolean
}
const StyledButton = styled.div<ButtonProps>`
  justify-content: center;
  align-items: center;

  display: flex;

  transition: all 0.25s;

  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 0.25rem;
  min-width: 2.5rem;
  max-width: 4rem;
  height: 2.5rem;
  padding: 0.25rem;

  background-color: ${({ theme }) => theme.background};
  cursor: pointer;

  color: ${({ theme }) => theme.foreground};

  outline: none;
  user-select: none;

  &:hover {
    transform: scale(1.15);

    border-color: ${({ theme }) => theme.foreground};

    background-color: ${({ theme }) => theme.foregroundDark};

    color: ${({ theme }) => theme.background};
  }

  ${({ isGrey }) => isGrey && greyStyles}
`

export {
  StyledCard,
  StyledImageHolder,
  StyledFlippingCard,
  StyledCardImage,
  StyledCardCount,
  StyledCardActions,
  StyledButton
}
