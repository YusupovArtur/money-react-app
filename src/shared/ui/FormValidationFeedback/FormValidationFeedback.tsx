import { FC, HTMLAttributes } from 'react';
import './style/form_validation_feedback_style.scss';

interface FormValidationFeedbackProps extends HTMLAttributes<HTMLDivElement> {
  feedbackMessage?: string;
}

const FormValidationFeedback: FC<FormValidationFeedbackProps> = ({ feedbackMessage, className, ...props }) => {
  if (!feedbackMessage) {
    return null;
  }
  return (
    <div className={`invalid-form-feedback ${className && className}`} {...props}>
      <span>{feedbackMessage}</span>
    </div>
  );
};

export default FormValidationFeedback;
