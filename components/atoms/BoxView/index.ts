// TODO: Fix this

import styled from 'styled-components'

import breakpoints from '../../../utilities/breakpoints'

export const ButtonHolder = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  display: flex;

  margin-bottom: 0.5rem;
  border-right: none;
  border-bottom: 0.125rem solid ${({ theme }) => theme.background};
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 1rem 0.5rem;

  @media ${breakpoints.desktop} {
    margin: 0.5rem 0.5rem 0.5rem 0;
    border-right: 0.125rem solid ${({ theme }) => theme.background};
    border-bottom: none;
    padding: 0.5rem 1rem 0.5rem 0;
  }
`
/* ${Button}:not (:last-child) {
    margin-bottom: 0.5rem;
  } */
/* ${Button} {
    margin: 0;
  } */

export const Box = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;

  @media ${breakpoints.desktop} {
    flex-direction: row;

    height: 50vh;
  }
`
