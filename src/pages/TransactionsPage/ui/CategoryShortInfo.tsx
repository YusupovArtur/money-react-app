import { FC, HTMLProps } from 'react';
import { IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { CategoryType } from 'store/slices/categoriesSlice';

interface CategoryShortInfoProps extends HTMLProps<HTMLDivElement> {
  category: CategoryType | undefined;
  iconSize?: `${number}rem`;
}

export const CategoryShortInfo: FC<CategoryShortInfoProps> = ({ category, iconSize = '1.5rem', style, ...props }) => {
  const name = category ? category.name : 'Неизвестная категория';
  const iconName = category ? category.iconName : 'Exclamation';
  const color = category ? category.color : '';

  return (
    <IconCaptionContainer style={{ maxWidth: '100%', ...style }} caption={name} {...props}>
      <EntityIcon iconName={iconName} color={color} iconSize={iconSize} />
    </IconCaptionContainer>
  );
};
