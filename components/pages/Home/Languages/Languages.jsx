import Section from "../../../components/Section";
import DataSection from "../../../components/Section/DataSection";

const Languages = ({ expanded, clickHandler }) => {
  const experience = {
    Python: "10 Years",
    Java: "8 Years",
    C: "3 Years",
    JavaScript: "2 Years",
    "HTML / CSS": "2 Years",
    "C#": "2 Years",
    PHP: "1 Year",
    SQL: "1 Year",
    Kotlin: "1 Year",
  };

  let data = Object.keys(experience).map((key) => (
    <DataSection key={key} title={key} value={experience[key]} />
  ));

  return (
    <Section
      title="Languages"
      data={data}
      expanded={expanded}
      clickHandler={clickHandler}
    />
  );
};

export default Languages;
