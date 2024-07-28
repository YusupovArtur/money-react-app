import { FC } from 'react';
import './style/form_validation_feedback_style.scss';

interface FormValidationFeedbackProps {
  errorMessage?: string;
}

const FormValidationFeedback: FC<FormValidationFeedbackProps> = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div className="invalid-form-feedback" style={{ position: 'absolute' }}>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormValidationFeedback;
