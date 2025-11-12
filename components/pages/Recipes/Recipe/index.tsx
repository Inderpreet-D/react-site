import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { PropType as PPT } from "../types";

import ContainerSection from "../../../atoms/ContainerSection";
import ListItem from "../../../atoms/ListItem";

import { selectRecipe, toggleCheck } from "../../../../slices/recipe";

type PropType = PPT & {
  index: number;
};

const Recipe = ({ recipe: { pages }, index }: PropType) => {
  const dispatch = useAppDispatch();
  const { checked } = useAppSelector(selectRecipe);

  return (
    <ContainerSection>
      {pages[index].map((line) => (
        <ListItem
          key={line}
          checked={checked.includes(line)}
          onCheck={() => dispatch(toggleCheck(line))}
          className="mb-4"
        >
          {line}
        </ListItem>
      ))}
    </ContainerSection>
  );
};

export default Recipe;
