import Section from "../../../molecules/Section";
import DateSection from "../../../molecules/Section/DateSection";

const Experience = ({ expanded, clickHandler }) => {
  const jobs = [
    <DateSection
      key={0}
      work="NeuroLab"
      place="Calgary, AB, Canada"
      position="Lead Task Developer"
      date="May '18 - Present"
      points={[
        "Used C# and C++ along with the Unity and Unreal game engines to develop tasks used for research and training",
        ,
        "Able to quickly comprehend and extend large code bases, such as websites and pre-existing Unreal and Unity projects",
        "Improved existing websites with added security and features based on knowledge acquired in classes",
        "Created games and training tasks that made use of Virtual Reality (VR) systems, like the Oculus Rift",
      ]}
    />,
    <DateSection
      key={1}
      work="Software Engineering Decision Support Lab (SEDS)"
      place="Calgary, AB, Canada"
      position="Research Intern"
      date="May '19 - Apr '20"
      points={[
        "Used Python to mine and analyze data from app markets with the goal of testing research hypotheses",
        "Was able to effectively manage and utilize large data sets",
        "Efficiently reported research status and direction through presentations",
        "Effectively presented research outcomes through a final research paper",
      ]}
    />,
    <DateSection
      key={2}
      work="Local Sikh Temple"
      place="Calgary, AB, Canada"
      position="Volunteer"
      date="Feb '08 - Present"
      points={[
        "Troubleshot and repaired computers",
        "Learned the value of hard work and its impact on the community",
        "Had to work as a member of a group with a singular purpose",
      ]}
    />,
  ];

  const output = [];
  let key = 0;
  for (const date of jobs) {
    output.push(date);
    if (key !== jobs.length - 1) {
      output.push(<hr key={key + jobs.length} />);
    }
    key++;
  }

  return (
    <Section
      title="Experience"
      data={output}
      expanded={expanded}
      clickHandler={clickHandler}
    />
  );
};

export default Experience;
