import { FC, HTMLAttributes } from 'react';
import './style/form-validation-feedback.scss';

interface FormValidationFeedbackProps extends HTMLAttributes<HTMLDivElement> {
  feedbackMessage?: string;
}

export const FormValidationFeedback: FC<FormValidationFeedbackProps> = ({ feedbackMessage, className, ...props }) => {
  if (!feedbackMessage) {
    return null;
  }
  return (
    <div className={`form-validation-feedback ${className ? className : ''}`} {...props}>
      <span>{feedbackMessage}</span>
    </div>
  );
};
