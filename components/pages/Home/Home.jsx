import React from "react";

import Page from "../../templates/Page";

import Languages from "./Languages";
import Technologies from "./Technologies";
import Education from "./Education";
import Experience from "./Experience";
import Publications from "./Publications";

const Home = () => {
  const [exIdx, setExIdx] = React.useState(-1);

  const handleClick = (newIdx) => () => {
    if (newIdx === exIdx) {
      setExIdx(-1);
    } else {
      setExIdx(newIdx);
    }
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
      <div style={{ textAlign: "center" }}>
        <h1>Inderpreet Dhillon</h1>
      </div>
      {sections.map((Component, i) => (
        <Component expanded={exIdx === i} clickHandler={handleClick(i)} />
      ))}
    </Page>
  );
};

export default Home;
