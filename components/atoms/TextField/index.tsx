import { InputPropsWithoutRef } from "react-html-props";
import clsx from "clsx";

type TextFieldProps = InputPropsWithoutRef & {
  label?: string;
};

const className =
  "group relative flex justify-center border border-dark-dark rounded box-border pt-4 pb-3 cursor-text text-white hover:border-primary-dark focus-within:border-primary-light";

const TextField: React.FC<TextFieldProps> = ({
  className: extraClass,
  id = "text-field",
  label = "",
  placeholder,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={clsx(className, extraClass)}
      onClick={() => inputRef.current?.focus()}
    >
      <label
        htmlFor={id}
        className="absolute top-2 left-2 origin-top-left transition-all duration-100 text-base select-none group-focus-within:top-1 group-focus-within:scale-75 group-focus-within:text-white group-focus-within:opacity-50"
      >
        {placeholder || label}
      </label>

      <input
        id={id}
        ref={inputRef}
        className="origin-top-left transition-all duration-100 mt-4 border-none box-border w-7/12 p-0 bg-transparent text-base text-center decoration-transparent no-underline text-primary-dark outline-none appearance-none group-focus-within:scale-150 group-focus-within:mt-2 group-focus-within:mb-2 group-focus-within:-ml-[42.75%] group-focus-within:text-primary-light"
        {...props}
      />
    </div>
  );
};

export default TextField;
