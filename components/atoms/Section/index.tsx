import { DivProps } from "react-html-props";
import clsx from "clsx";

const className = "overflow-x-hidden overflow-y-auto";

const Section: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
);

export default Section;
