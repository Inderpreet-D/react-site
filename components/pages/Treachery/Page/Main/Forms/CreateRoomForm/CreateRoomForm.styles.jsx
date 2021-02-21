import styled from "styled-components";

import Select from "../../../../../../atoms/Select";

import breakpoints from "../../../../../../../breakpoints";

const StyledSelect = styled(Select)`
  margin: 0.5rem 0;
  min-width: 10rem;
  width: 20%;

  @media ${breakpoints.desktop} {
    margin: 0 0.5rem;
  }
`;

const StyledContainer = styled.div`
  flex-direction: column;

  display: flex;

  @media ${breakpoints.desktop} {
    flex-direction: row;
  }
`;

export { StyledContainer, StyledSelect };
