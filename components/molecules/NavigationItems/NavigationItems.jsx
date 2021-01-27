import styled from "styled-components";

import NavigationItem from "../../atoms/NavigationItem";

const StyledItems = styled.div`
  display: flex;
`;

const NavigationItems = () => {
  return (
    <StyledItems>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/projects">Projects</NavigationItem>
      <NavigationItem link="/treachery">MTG Treachery</NavigationItem>
      <NavigationItem link="/poetry">Poetry</NavigationItem>
      <NavigationItem link="/toadvillage">ToadVillage</NavigationItem>
    </StyledItems>
  );
};

export default NavigationItems;
