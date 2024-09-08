import { FC, HTMLProps } from 'react';
import { IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { CategoryType, SubcategoryType } from 'store/slices/categoriesSlice';

interface SubcategoryShortInfoProps extends HTMLProps<HTMLDivElement> {
  category: CategoryType | undefined;
  subcategory: SubcategoryType | undefined;
  iconSize?: `${number}rem`;
}

export const SubcategoryShortInfo: FC<SubcategoryShortInfoProps> = ({
  category,
  subcategory,
  iconSize = '1.5rem',
  style,
  ...props
}) => {
  const name = subcategory ? subcategory.name : 'Неизвестная категория';
  const iconName = subcategory ? subcategory.iconName : 'Exclamation';
  const color = category ? category.color : '';

  if (!category || !subcategory) {
    return (
      <div style={{ height: iconSize }} className="d-flex align-items-center">
        <span className="text-body-tertiary">Нет подкатегорий</span>
      </div>
    );
  }

  return (
    <IconCaptionContainer style={{ maxWidth: '100%', ...style }} caption={name} {...props}>
      <EntityIcon iconName={iconName} color={color} iconSize={iconSize} />
    </IconCaptionContainer>
  );
};
