import { FC, HTMLProps } from 'react';
import { selectDisplayedWallet } from 'store/slices/walletsSlice';
import { IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { useAppSelector } from 'store/store.ts';

interface WalletShortInfoProps extends HTMLProps<HTMLDivElement> {
  id: string;
  iconSize?: `${number}rem`;
}

export const WalletShortInfo: FC<WalletShortInfoProps> = ({ id, iconSize = '1.5rem', style, ...props }) => {
  const wallet = useAppSelector(selectDisplayedWallet(id));

  return (
    <IconCaptionContainer style={{ maxWidth: '100%', ...style }} caption={wallet.name} {...props}>
      <EntityIcon iconName={wallet.iconName} color={wallet.color} iconSize={iconSize} />
    </IconCaptionContainer>
  );
};
