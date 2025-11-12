import { DivProps } from "react-html-props";
import clsx from "clsx";

import ContainerTitle from "../ContainerTitle";

const className = "mb-0 text-3xl";

const ContainerSubTitle: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <ContainerTitle className={clsx(className, extraClass)} {...props} />;

export default ContainerSubTitle;
