import { createPortal } from "react-dom";

import { PORTAL_ID } from "../../../pages/_document";
import useMounted from "../../../hooks/useMounted";

type Props = {
  children: React.ReactNode;
};

const Portal: React.FC<Props> = ({ children }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  const portal = document.querySelector(`#${PORTAL_ID}`)!;
  return createPortal(<>{children}</>, portal);
};

export default Portal;
