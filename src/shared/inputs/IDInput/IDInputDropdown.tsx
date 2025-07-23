import { FC } from 'react';
import { EntityIcon } from 'entities/EntityIcon';
import { DropdownMenuWrapper } from 'shared/ui';
import { IDOptionType } from './IDInput.tsx';

interface IDInputDropdownProps {
  option: IDOptionType | string;
  options: IDOptionType[];
  setID: (id: string) => any;
  setValidate?: () => any;
  topBorderColor?: 'success' | 'danger' | 'primary';
  optionIconSize?: `${number}rem`;
}

export const IDInputDropdown: FC<IDInputDropdownProps> = ({
  option,
  options,
  setID,
  setValidate,
  topBorderColor,
  optionIconSize = '2rem',
}) => {
  const topColor = topBorderColor ? `bg-${topBorderColor}` : undefined;

  return (
    <DropdownMenuWrapper className={`px-0 ${topColor ? 'pt-0' : ''}`} style={{ minWidth: '10rem' }}>
      {topColor && <div className={`rounded-top-2 border-bottom ${topColor}`} style={{ paddingBottom: '0.5rem' }}></div>}

      {options.map((optionListItem) => {
        const active = optionListItem.id === (typeof option === 'object' ? option.id : option);
        return (
          <button
            key={optionListItem.id}
            onClick={() => {
              if (setValidate) setValidate();
              setID(optionListItem.id);
            }}
            className={`dropdown-option-list-item ${active ? 'active' : ''}`}
          >
            <EntityIcon iconName={optionListItem.iconName} color={optionListItem.color} iconSize={optionIconSize} />
            <span className="ms-1">{optionListItem.name}</span>
          </button>
        );
      })}
    </DropdownMenuWrapper>
  );
};
