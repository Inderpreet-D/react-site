import { TextAreaProps } from 'react-html-props'

const className =
  'inline-block m-0 border rounded box-border w-full p-4 bg-transparent text-base no-underline decoration-transparent appearance-none outline-none border-slate-700 text-white hover:border-sky-800 focus:border-sky-400 placeholder:letter tracking-wide resize-none'

const TextArea: React.FC<TextAreaProps> = ({
  className: outerClass,
  ...props
}) => (
  <div className={outerClass}>
    <textarea className={className} {...props} />
  </div>
)

export default TextArea
