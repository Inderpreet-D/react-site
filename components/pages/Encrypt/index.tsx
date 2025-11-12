import Container from "../../atoms/Container";
import MessageBlock from "./MessageBlock";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

const Page = () => {
  const [values, setValues] = React.useState<{ [x: string]: string }>({});
  const [secret, setSecret] = React.useState("");

  const handleChange = React.useCallback(
    (prop: string) => (value: string) => {
      setValues((old) => ({ ...old, [prop]: value }));
    },
    []
  );

  const handleAdd = React.useCallback(() => {
    setValues((old) => ({ ...old, [Object.keys(old).length.toString()]: "" }));
  }, []);

  return (
    <Container className="flex flex-col overflow-hidden">
      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto mb-4">
        {Object.entries(values).map(([k, v]) => (
          <MessageBlock
            key={k}
            value={v}
            onChange={handleChange(k)}
            secret={secret}
          />
        ))}
      </div>

      <div className="flex justify-center w-full">
        <TextField
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret phrase"
          className="w-3/5 mr-4"
        />

        <Button onClick={handleAdd} className="">
          Add
        </Button>
      </div>
    </Container>
  );
};

export default Page;
