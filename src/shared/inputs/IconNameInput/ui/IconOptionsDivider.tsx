import { FC } from 'react';
import 'shared/inputs/IconNameInput/style/icon-options-divider.scss';

interface IconOptionsDividerProps {}

export const IconOptionsDivider: FC<IconOptionsDividerProps> = ({}) => {
  return <hr className="icon-options-divider" />;
};
