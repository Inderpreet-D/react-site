import Portal from "../../atoms/Portal";
import Container from "../../atoms/Container";

type DialogProps = {
  onClose: () => void;
  title: string;
  actions: React.ReactNode;
  children: React.ReactNode;
};

type MEH = React.MouseEventHandler<HTMLDivElement>;

const Dialog: React.FC<DialogProps> = ({
  onClose,
  title,
  actions,
  children,
}) => {
  const bgRef = React.useRef<HTMLDivElement>(null);

  const handleBGClick: MEH = React.useCallback(
    (e) => {
      e.stopPropagation();
      if (e.target === bgRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Portal>
      <Container className="!absolute z-20  left-1/2 -translate-x-1/2 flex flex-col top-0 bottom-0 w-full !sm:w-[50%] sm:top-[10%] sm:bottom-[10%] !lg:w-8/12 !md:w-10/12">
        <div className="text-2xl font-medium text-primary-light tracking-[0.0075em]">
          {title}
        </div>

        <div className="overflow-x-hidden overflow-y-auto mx-0 my-6 flex-1">
          {children}
        </div>

        <div className="flex items-center justify-end flex-shrink-0 flex-grow-0 basis-auto">
          {actions}
        </div>
      </Container>

      <div
        ref={bgRef}
        onClick={handleBGClick}
        className="absolute top-0 left-0 z-10 w-screen h-[100svh] opacity-50 bg-black"
      />
    </Portal>
  );
};

export default Dialog;
