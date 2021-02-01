import React from "react";
import styled from "styled-components";

import Page from "../../templates/Page";
import Languages from "./Languages";
import Technologies from "./Technologies";
import Education from "./Education";
import Experience from "./Experience";
import Publications from "./Publications";

const StyledHeader = styled.div`
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.foreground};
`;

const Home = () => {
  const [idx, setIdx] = React.useState(-1);

  const handleClick = (num) => () => {
    setIdx(num !== idx ? num : -1);
  };

  const sections = [
    Languages,
    Technologies,
    Education,
    Experience,
    Publications,
  ];

  return (
    <Page title="Home">
      <StyledHeader>Inderpreet Dhillon</StyledHeader>

      {sections.map((Component, i) => (
        <Component key={i} expanded={idx === i} clickHandler={handleClick(i)} />
      ))}
    </Page>
  );
};

export default Home;
