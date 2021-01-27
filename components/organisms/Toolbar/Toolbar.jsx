import styled from "styled-components";

import NavigationItems from "../../molecules/NavigationItems";

const StyledToolbar = styled.div`
  display: flex;
  /* flex: 1 0 auto; */
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const Toolbar = () => (
  <StyledToolbar>
    <NavigationItems />
  </StyledToolbar>
);

export default Toolbar;
