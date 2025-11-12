import Spacer from "../../../atoms/Spacer";

type CardActionProps = {
  alignCenter?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  children: React.ReactNode;
};

const CardActions: React.FC<CardActionProps> = ({
  children,
  alignCenter,
  alignLeft,
  alignRight,
}) => (
  <div className="flex items-center justify-center">
    {(alignCenter || alignRight) && <Spacer />}

    {children}

    {(alignCenter || alignLeft) && <Spacer />}
  </div>
);

export default CardActions;
