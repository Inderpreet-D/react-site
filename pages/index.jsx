import { useState } from "react";

import Page from "../components/Page";
import LanguagesSection from "../containers/Home/Languages";
import TechnologiesSection from "../containers/Home/Technologies";
import EducationSection from "../containers/Home/Education";
import ExperienceSection from "../containers/Home/Experience";
import PublicationSection from "../containers/Home/Publications";

const Home = () => {
  const [exIdx, setExIdx] = useState(-1);

  const clickHandler = (newIdx) => {
    if (newIdx === exIdx) {
      setExIdx(-1);
    } else {
      setExIdx(newIdx);
    }
  };

  return (
    <Page title="Home">
      <div style={{ textAlign: "center" }}>
        <h1>Inderpreet Dhillon</h1>
      </div>
      <LanguagesSection
        expanded={exIdx === 0}
        clickHandler={() => clickHandler(0)}
      />
      <TechnologiesSection
        expanded={exIdx === 1}
        clickHandler={() => clickHandler(1)}
      />
      <EducationSection
        expanded={exIdx === 2}
        clickHandler={() => clickHandler(2)}
      />
      <ExperienceSection
        expanded={exIdx === 3}
        clickHandler={() => clickHandler(3)}
      />
      <PublicationSection
        expanded={exIdx === 4}
        clickHandler={() => clickHandler(4)}
      />
    </Page>
  );
};

export default Home;
