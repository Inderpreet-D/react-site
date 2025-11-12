import { DivProps } from "react-html-props";
import clsx from "clsx";

const className = "flex items-center overflow-y-auto pb-2";

const HorizontalList: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <div className={clsx(className, extraClass)} {...props} />;

export default HorizontalList;
