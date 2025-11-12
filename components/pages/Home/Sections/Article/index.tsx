import clsx from "clsx";

import { SectionProps } from "../..";
import { Paper } from "../../Data/me";

const Article: React.FC<SectionProps> = ({ data, idx }) => {
  const { title, authors, me, description, href } = data[idx] as Paper;

  return (
    <div className="flex flex-col p-4">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="transition-all duration-200 text-2xl text-center text-primary-dark hover:text-primary-light"
      >
        {title}
      </a>

      <div className="flex flex-wrap overflow-x-auto overflow-y-hidden mx-0 my-8">
        {authors.map((author, i) => (
          <div
            key={i}
            className={clsx(
              "mr-2 text-lg italic",
              author === me
                ? "font-bold text-primary-dark"
                : "font-normal text-white"
            )}
          >
            {author}
            {i !== authors.length - 1 && ","}
          </div>
        ))}
      </div>

      <div className="text-base">{description}</div>
    </div>
  );
};

export default Article;
