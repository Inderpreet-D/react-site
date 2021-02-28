import axios from "axios";

const Test = () => {
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    axios.get("/api/test").then(({ data }) => setResponse(data));
  }, []);

  return <div>{JSON.stringify(response)}</div>;
};

export default Test;
