import { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      style={{ fontSize: '1.08rem' }}
      className={`form-control py-1 px-2 ${className}`}
      autoComplete="off"
      {...props}
    />
  );
});

export default TextInput;

// const TextInput: FC<TextInputProps> = ({ className, ...props }) => {
//   return (
//     <input
//       type="text"
//       style={{ fontSize: '1.08rem' }}
//       className={`form-control py-1 px-2 ${className}`}
//       autoComplete="off"
//       {...props}
//     />
//   );
// };
