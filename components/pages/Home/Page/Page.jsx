import Container, { ContainerTitle } from "../../../atoms/Container";

import me from "../../../../public/me.json";

const Page = () => {
  const [idx, setIdx] = React.useState(-1);

  const handleClick = (num) => () => {
    setIdx(num !== idx ? num : -1);
  };

  const sections = [];

  console.log(me);

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
