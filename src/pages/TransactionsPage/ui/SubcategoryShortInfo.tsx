import { FC, HTMLProps } from 'react';
import { IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { useGetDisplayedSubcategory } from 'store/slices/categoriesSlice';

interface SubcategoryShortInfoProps extends HTMLProps<HTMLDivElement> {
  categoryID: string;
  subcategoryID: string;
  iconSize?: `${number}rem`;
}

export const SubcategoryShortInfo: FC<SubcategoryShortInfoProps> = ({
  categoryID,
  subcategoryID,
  iconSize = '1.5rem',
  style,
  ...props
}) => {
  const { displayedSubcategory: subcategory, subcategoryColor: color } = useGetDisplayedSubcategory({
    categoryID,
    subcategoryID,
  });

  if (!subcategory) {
    return (
      <div style={{ height: iconSize }} className="d-flex align-items-center">
        <span className="text-body-tertiary">Нет подкатегорий</span>
      </div>
    );
  }

  return (
    <IconCaptionContainer style={{ maxWidth: '100%', ...style }} caption={subcategory.name} {...props}>
      <EntityIcon iconName={subcategory.iconName} color={color} iconSize={iconSize} />
    </IconCaptionContainer>
  );
};
