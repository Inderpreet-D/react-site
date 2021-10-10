import StyledArea from './styles'

type TextAreaProps = React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>>

const TextArea: TextAreaProps = ({ className, ...props }) => (
  <div className={className}>
    <StyledArea {...props} />
  </div>
)

export default TextArea
