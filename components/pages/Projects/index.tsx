import Card from "../../molecules/Card";

import Projects from "./Data";

const Page = () => (
  <div className="grid gap-8 content-between p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {Projects.map((data, i) => (
      <Card key={i} {...data} />
    ))}
  </div>
);

export default Page;
