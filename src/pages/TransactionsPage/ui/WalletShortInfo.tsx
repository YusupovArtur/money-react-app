import { FC, HTMLProps } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';

interface WalletShortInfoProps extends HTMLProps<HTMLDivElement> {
  wallet: WalletType | undefined;
  iconSize?: `${number}rem`;
}

export const WalletShortInfo: FC<WalletShortInfoProps> = ({ wallet, iconSize = '1.5rem', style, ...props }) => {
  const name = wallet ? wallet.name : 'Неизвестный счет';
  const iconName = wallet ? wallet.iconName : 'Exclamation';
  const color = wallet ? wallet.color : '';

  return (
    <IconCaptionContainer style={{ maxWidth: '100%', ...style }} caption={name} {...props}>
      <EntityIcon iconName={iconName} color={color} iconSize={iconSize} />
    </IconCaptionContainer>
  );
};
