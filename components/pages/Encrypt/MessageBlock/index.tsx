import TextField from "../../../atoms/TextField";

import { encode } from "../../../../utilities/helpers/secret";

type MessageBlockProps = {
  value: string;
  onChange: (s: string) => void;
  secret: string;
};

const MessageBlock: React.FC<MessageBlockProps> = ({
  value,
  onChange,
  secret,
}) => (
  <div className="flex flex-col items-center justify-center mr-4 my-2 rounded-2xl box-border w-full p-4 transition-all duration-1000 hover:bg-dark-dark focus-within:bg-dark-dark">
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter text to encrypt"
      className="w-full"
    />

    <div className="mt-4 text-base break-all">
      &quot;{encode(secret, value)}&quot;
    </div>
  </div>
);

export default MessageBlock;
