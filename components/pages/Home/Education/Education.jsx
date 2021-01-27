import Section from "../../../components/Section";
import DateSection from "../../../components/Section/DateSection";

const Education = ({ expanded, clickHandler }) => {
  const data = (
    <DateSection
      work="University of Calgary"
      place="Calgary, AB, Canada"
      position="Bachelor of Science, Computer Science, Concentration in Software Engineering"
      date="Sep '15 - Apr '20"
      points={[
        "Dean's honour list 3 years with a 92% average (3.69 GPA)",
        "Relevant Courses: Distributed Systems, Computer Networks, Database Management Systems, Web-based Systems",
      ]}
    />
  );

  return (
    <Section
      title="Education"
      data={data}
      expanded={expanded}
      clickHandler={clickHandler}
    />
  );
};

export default Education;
