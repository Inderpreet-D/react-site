import { DivProps } from "react-html-props";
import clsx from "clsx";

const className = "flex flex-col box-border w-full lg:flex-row lg:h-[50vh]";

const Box: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
);

export default Box;
