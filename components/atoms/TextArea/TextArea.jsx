import StyledArea from "./TextArea.styles";

const TextArea = ({ className, ...props }) => (
  <div className={className}>
    <StyledArea {...props} />
  </div>
);

export default TextArea;
