import { FC, HTMLProps } from 'react';
import { IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { CategoryType, useGetDisplayedCategory } from 'store/slices/categoriesSlice';

interface CategoryShortInfoProps extends HTMLProps<HTMLDivElement> {
  id: string;
  type?: CategoryType['type'];
  iconSize?: `${number}rem`;
  isDefaultIconForTransferTypeCategory?: boolean;
}

export const CategoryShortInfo: FC<CategoryShortInfoProps> = ({
  id,
  type,
  iconSize = '1.5rem',
  style,
  isDefaultIconForTransferTypeCategory,
  ...props
}) => {
  const { displayedCategory: category } = useGetDisplayedCategory({ id, type, isDefaultIconForTransferTypeCategory });

  return (
    <IconCaptionContainer style={{ maxWidth: '100%', ...style }} caption={category.name} {...props}>
      <EntityIcon iconName={category.iconName} color={category.color} iconSize={iconSize} />
    </IconCaptionContainer>
  );
};
