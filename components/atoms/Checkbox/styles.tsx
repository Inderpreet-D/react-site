import styled from 'styled-components'

export const Check = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.35rem;
  height: 0.35rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.foreground};
  transition: background-color 500ms;
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 30%;
  box-sizing: border-box;
  min-width: 1rem;
  width: 1rem;
  max-width: 1rem;
  min-height: 1rem;
  height: 1rem;
  max-height: 1rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  transition: border-color 750ms;

  &:hover {
    border-color: ${({ theme }) => theme.foreground};

    ${Check} {
      background-color: ${({ theme }) => theme.foregroundDark};
    }
  }
`
