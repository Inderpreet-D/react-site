import { ButtonProps } from "react-html-props";
import clsx from "clsx";

import Button from "../Button";

const className =
  "flex items-center justify-center h-full first:mr-4 last:ml-4";

const ControlButton: React.FC<ButtonProps> = ({
  className: extraClass,
  ...props
}) => <Button className={clsx(className, extraClass)} {...props} />;

export default ControlButton;
