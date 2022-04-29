// TODO: Fix

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
    border-color: gray;
    background-color: ${({ theme }) => theme.accent};
    transform: scale(1);
    color: gray;
  }
`

type CardCountProps = {
  noCards: boolean
}
const StyledCardCount = styled.div<CardCountProps>`
  position: absolute;
  top: 30%;
  left: 50%;
  border: 0.0625rem solid ${({ theme }) => theme.accent};
  border-radius: 100rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  transform: translateX(-50%) translateY(-50%);
  transition: opacity 400ms ease-in-out;
  font-size: 3rem;
  line-height: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.foreground};
  pointer-events: none;

  ${({ noCards }) => noCards && noCardStyles};
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.5rem auto;
  width: 100%;
`

type ButtonProps = {
  isGrey?: boolean
}
const StyledButton = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 1rem;
  min-width: 2.5rem;
  max-width: 4rem;
  height: 2.5rem;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.background};
  cursor: pointer;
  transition: all 0.25s;
  color: ${({ theme }) => theme.foreground};
  outline: none;
  user-select: none;

  &:hover {
    border-color: ${({ theme }) => theme.foreground};
    background-color: ${({ theme }) => theme.foregroundDark};
    transform: scale(1.15);
    color: ${({ theme }) => theme.background};
  }

  ${({ isGrey }) => isGrey && greyStyles}
`

export { StyledCardCount, StyledCardActions, StyledButton }
