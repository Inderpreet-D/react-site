import Button from "../Button";

type UploadButtonProps = {
  onFileSelected: (files: FileList | null) => void;
  accept?: string;
  children: React.ReactNode;
};

const UploadButton: React.FC<UploadButtonProps> = ({
  onFileSelected,
  accept,
  children,
  ...props
}) => (
  <Button className="!p-0" {...props}>
    <label className="w-full h-full px-4 py-2">
      {children}

      <input
        type="file"
        onChange={(e) => onFileSelected(e.target.files)}
        accept={accept}
        hidden
      />
    </label>
  </Button>
);

export default UploadButton;
