import { useRouter } from "next/router";

import Container from "../../atoms/Container";
import ContainerTitle from "../../atoms/ContainerTitle";
import RecipeBlock from "./RecipeBlock";
import HorizontalList from "../../atoms/HorizontalList";
import HorizontalListButton from "../../atoms/HorizontalListButton";
import ContainerSectionSeparator from "../../atoms/ContainerSectionSeparator";

import recipes from "./Data";
import useRecipeSelect from "./hooks/useRecipeSelect";

const Page = () => {
  const router = useRouter();

  const selected = useRecipeSelect();

  const [hovering, setHovering] = React.useState("");

  return (
    <Container>
      <ContainerTitle>Recipes</ContainerTitle>

      <HorizontalList>
        {Object.entries(recipes).map(([key, recipe]) => (
          <HorizontalListButton
            key={key}
            active={[selected, hovering].includes(key)}
            onClick={() => router.push(`/recipes/${key}`)}
            onMouseEnter={() => setHovering(key)}
            onMouseLeave={() => setHovering("")}
          >
            {recipe.title}
          </HorizontalListButton>
        ))}
      </HorizontalList>

      <ContainerSectionSeparator />

      {selected && <RecipeBlock recipe={recipes[selected]} />}
    </Container>
  );
};

export default Page;
