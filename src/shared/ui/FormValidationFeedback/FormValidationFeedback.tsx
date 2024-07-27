import { FC } from 'react';
import './style/index.scss';

interface FormValidationFeedbackProps {
  errorMessage?: string;
}

const FormValidationFeedback: FC<FormValidationFeedbackProps> = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div className="invalid-form-feedback" style={{ position: 'absolute' }}>
      {errorMessage}
    </div>
  );
};

export default FormValidationFeedback;
