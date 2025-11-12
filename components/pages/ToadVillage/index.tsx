import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import Container from "../../atoms/Container";
import ContainerBackButton from "../../atoms/ContainerBackButton";
import ContainerTitle from "../../atoms/ContainerTitle";
import HeaderButtons from "./HeaderButtons";
import ContainerError from "../../atoms/ContainerError";
import TextField from "../../atoms/TextField";
import LoadingIcon from "../../atoms/LoadingIcon";
import CardSections from "./CardSections";
import CardListDialog from "./CardListDialog";

import { selectToadVillage, setName } from "../../../slices/toadVillage";

const Page = () => {
  const dispatch = useAppDispatch();
  const { cardObjs, error, name, loading, showDialog } =
    useAppSelector(selectToadVillage);

  return (
    <Container>
      <ContainerBackButton to="mtg" />

      <ContainerTitle>Toad Village</ContainerTitle>

      <HeaderButtons />

      {error && <ContainerError>{error}</ContainerError>}

      <div className="flex justify-center mb-5">
        <TextField
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          placeholder="Enter your deck name"
          aria-label="Deck name"
          className="w-full sm:w-9/12"
        />
      </div>

      {loading && <LoadingIcon />}

      {!loading && cardObjs.commanders && cardObjs.others && <CardSections />}

      {showDialog && <CardListDialog />}
    </Container>
  );
};

export default Page;
