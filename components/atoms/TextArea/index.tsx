import { TextAreaProps } from 'react-html-props'

const className =
  'inline-block m-0 border rounded box-border w-full h-[99%] p-4 bg-transparent text-base no-underline decoration-transparent appearance-none outline-none border-dark-dark text-white hover:border-primary-dark placeholder:letter tracking-wide resize-none'

const TextArea: React.FC<TextAreaProps> = ({
  className: outerClass,
  ...props
}) => (
  <div className={outerClass}>
    <textarea className={className} {...props} />
  </div>
)

export default TextArea
