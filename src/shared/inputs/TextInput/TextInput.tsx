import { FC, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput: FC<TextInputProps> = ({ ...props }) => {
  return <input type="text" style={{ fontSize: '1.08rem' }} className="form-control py-1 px-2" autoComplete="off" {...props} />;
};

export default TextInput;
