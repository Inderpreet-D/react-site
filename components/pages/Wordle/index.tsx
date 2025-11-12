import Container from "../../atoms/Container";
import ContainerTitle from "../../atoms/ContainerTitle";
import LoadingIcon from "../../atoms/LoadingIcon";
import Select from "../../atoms/Select";
import WordleBoard from "../../molecules/WordleBoard";

import useSWR from "../../../hooks/useSWR";
import useWordleSetup from "./hooks/useWordleSetup";

const Page = () => {
  const { data: options, isLoading: isLoadingOptions } =
    useSWR<number[]>("words");
  const { reload, length, setLength } = useWordleSetup(isLoadingOptions);

  return (
    <Container>
      <ContainerTitle>Wordle</ContainerTitle>

      <div className="flex flex-col items-center">
        {isLoadingOptions ? (
          <LoadingIcon />
        ) : (
          <Select
            label="Word Length"
            options={options.map((opt) => `${opt}`)}
            value={length.toString()}
            onChange={(val) => {
              setLength(+val);
            }}
            className="mt-2 mb-4 mx-0"
          />
        )}

        <WordleBoard reset={() => reload()} />
      </div>
    </Container>
  );
};

export default Page;
