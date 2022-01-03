import styled, { css } from 'styled-components'

export const Host = styled.div`
  width: fit-content;
`

type TipProps = {
  box: DOMRect | undefined
}

export const Tip = styled.div<TipProps>`
  display: none;

  ${({ box }) =>
    box &&
    css`
      position: absolute;
      top: ${box.top}px;
      left: ${box.right}px;
      display: flex;
      margin-left: 0.5rem;
      border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
      border-radius: 1rem;
      border-top-left-radius: 0;
      box-sizing: border-box;
      padding: 0.5rem;
      max-width: 15rem;
      background-color: ${({ theme }) => theme.background};
    `}
`

export const Arrow = styled.div``
