import { DivProps } from "react-html-props";
import clsx from "clsx";

const className =
  "mr-2 last:mr-2 flex items-center justify-center border border-dark-main rounded-lg box-border w-12 h-12 text-whiite text-4xl font-bold";

const Cell: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
);

export default Cell;
