import clsx from "clsx";
import Portal from "../Portal";

type TooltipProps = {
  content: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const getClassName = (box: DOMRect | undefined) => {
  if (!box) {
    return "hidden";
  }

  const className =
    "absolute flex flex-wrap break-all ml-2 border-2 border-dark-main rounded-2xl rounded-tl-none box-border p-2 max-w-[25vw] bg-dark-dark";
  return className;
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className: extraClass,
}) => {
  const [hovering, setHovering] = React.useState(false);

  const hostRef = React.useRef<HTMLDivElement>(null);
  const box = hostRef.current?.getBoundingClientRect();

  return (
    <div
      ref={hostRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="w-fit"
    >
      {hovering && (
        <Portal>
          <div
            className={clsx(getClassName(box), extraClass)}
            style={{
              top: box ? `${box.top}px` : "0",
              left: box ? `${box.right}px` : "0",
            }}
          >
            {content}
          </div>
        </Portal>
      )}

      {children}
    </div>
  );
};

export default Tooltip;
