import Container, { ContainerTitle } from "../../../atoms/Container";
import Languages from "../Languages";
import Technologies from "../Technologies";
import Education from "../Education";
import Experience from "../Experience";
import Publications from "../Publications";

import data from "../../../../public/aboutMe";

const Page = () => {
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

  console.log(JSON.stringify(data, null, 2));

  return (
    <Container>
      <ContainerTitle>Inderpreet Dhillon</ContainerTitle>

      {sections.map((Component, i) => (
        <Component key={i} expanded={idx === i} clickHandler={handleClick(i)} />
      ))}
    </Container>
  );
};

export default Page;
