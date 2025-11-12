import { DivProps } from "react-html-props";
import clsx from "clsx";

const className =
  "relative mx-auto my-4 border-2 border-primary-light rounded-xl box-border p-5 bg-dark-dark w-full lg:w-8/12 md:w-10/12";

const Container: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
);

export default Container;
