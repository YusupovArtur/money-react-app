import { FC } from 'react';
import 'shared/inputs/IconNameInput/style/icon_options_diviter_style.scss';

interface IconOptionsDividerProps {}

export const IconOptionsDivider: FC<IconOptionsDividerProps> = ({}) => {
  return <hr className="options-divider" />;
};
