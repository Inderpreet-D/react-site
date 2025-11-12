import { DivProps } from "react-html-props";
import clsx from "clsx";

const className = "flex flex-col flex-grow box-border p-2";

const Card: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
);

export default Card;
