import { FC } from 'react';
import { ContentIconSetProps } from 'shared/icons/ContentIcon/ContentIconSets/types/ContentIconSetProps.ts';
import { ArrowLeftRightIcon, ExclamationIcon, EyeSlashFillIcon, QuestionIcon, QuestionSmallIcon } from 'shared/icons';

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
    case 'EyeSlashFill':
      return <EyeSlashFillIcon iconSize={iconSize} />;
    default:
      return null;
  }
};
