import { FC } from 'react';
import { ContentIconSetProps } from 'shared/icons/ContentIcon/ContentIconSets/types/ContentIconSetProps.ts';
import { ArrowLeftRightIcon } from 'shared/icons';

export const SpecialIcons: FC<ContentIconSetProps> = ({ iconName, iconSize }) => {
  switch (iconName) {
    case 'Question':
      return <QuestionIcon iconSize={iconSize} />;
    case 'QuestionSmall':
      return <QuestionSmallIcon iconSize={iconSize} />;
    case 'Exclamation':
      return <ExclamationIcon iconSize={iconSize} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRightIcon iconSize={iconSize} />;
    default:
      return null;
  }
};

const QuestionIcon: FC<{ iconSize: `${number}rem` }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-question-lg"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"
      />
    </svg>
  );
};

const QuestionSmallIcon: FC<{ iconSize: `${number}rem` }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-question"
      viewBox="0 0 16 16"
    >
      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
    </svg>
  );
};

const ExclamationIcon: FC<{ iconSize: `${number}rem` }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-exclamation-lg"
      viewBox="0 0 16 16"
    >
      <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
    </svg>
  );
};
