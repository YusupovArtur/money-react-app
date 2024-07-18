import { FC } from 'react';
import ContentIcon from '../../small_components/icons_svg/icon_sets/ContentIconSets';

const getIconsGroupKey = (arr: string[][]): string => {
  let key: string = 'icons_group_id';
  arr.forEach((iconsRow) => {
    iconsRow.forEach((iconName) => {
      key = key + iconName;
    });
  });
  return key;
};

const getIconsRowKey = (arr: string[]): string => {
  let key: string = 'icons_row_id';
  arr.forEach((iconName) => {
    key = key + iconName;
  });
  return key;
};

const IconMenu: FC<{
  iconName: string;
  iconsField: string[][];
  setIcon: (iconName: string) => void;
  rowLength: number;
  isDivider: boolean;
}> = ({ iconName, iconsField, setIcon, rowLength, isDivider }) => {
  const newIconNamesField: string[][][] = [];
  iconsField.forEach((row) => {
    const newRow: string[][] = [];
    for (let i = 0; i <= Math.floor(row.length / rowLength); i++) {
      newRow.push(row.slice(i * rowLength, (i + 1) * rowLength));
    }
    newIconNamesField.push(newRow);
  });

  return (
    <div className="dropdown">
      <button
        className="btn btn-body dropdown-toggle text-body d-flex justify-content-center align-items-center py-1 px-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="d-flex justify-content-center align-items-center rounded-circle">
          <ContentIcon iconName={iconName} iconSize="2.4rem"></ContentIcon>
        </div>
      </button>
      <ul className="dropdown-menu p-2">
        <div
          style={{ maxHeight: '14.65rem', overflowY: 'scroll' }}
          className="d-flex flex-column justify-content-start align-content-start"
        >
          {newIconNamesField.map((iconsGroup, index) => (
            <div key={getIconsGroupKey(iconsGroup)}>
              {iconsGroup.map((iconsRow) => (
                <div key={getIconsRowKey(iconsRow)}>
                  <div className="d-flex flex-nowrap">
                    {iconsRow.map((icon) => (
                      <button
                        onClick={() => setIcon(icon)}
                        key={icon}
                        className={`btn btn-body hover-scale-10 p-1 m-1 ${iconName === icon && 'bordered-emphasis'}`}
                      >
                        <ContentIcon iconName={icon} iconSize="1.7rem"></ContentIcon>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {index < iconsField.length - 1 && isDivider && <hr className="dropdown-divider mx-1"></hr>}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default IconMenu;
