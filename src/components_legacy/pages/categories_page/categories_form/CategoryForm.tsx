import { Dispatch, FC, SetStateAction } from 'react';
// Import menus
import CategoryTypeMenu from '../../../pages/categories_page/categories_form/CategoryTypeMenu';
import IconMenu from '../../../small_components/dropdowns/IconMenu';
import { CATEGOTY_ICONS_FIELD } from '../../../small_components/icons_svg/icon_sets/ContentIconSets';
import ColorInput from 'shared/inputs/ColorInput/ColorInput.tsx';
import { categoryAddType } from 'store/types';

const CategoryForm: FC<{
  formData: categoryAddType;
  setFormData: Dispatch<SetStateAction<categoryAddType>>;
}> = ({ formData, setFormData }) => {
  return (
    <div className="d-flex flex-column">
      <span className="text-body-tertiary mt-2">Имя категории</span>
      <input
        type="text"
        value={formData.name}
        onChange={(event) => setFormData((state) => ({ ...state, name: event.target.value }))}
        style={{ fontSize: '1.08rem' }}
        className="form-control py-1 px-2"
        id="name"
        autoComplete="off"
      />

      <span className="text-body-tertiary mt-2 mb-0">Тип категории</span>
      <CategoryTypeMenu categoryType={formData.type} setFormData={setFormData}></CategoryTypeMenu>

      <span className="text-body-tertiary mt-2 mb-0">Иконка и цвет</span>
      <div className="d-flex align-items-center">
        <IconMenu
          iconName={formData.iconName}
          setIcon={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
          iconsField={CATEGOTY_ICONS_FIELD}
          rowLength={7}
          isDivider={true}
        ></IconMenu>
        <ColorInput
          color={formData.color}
          setColor={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
        ></ColorInput>
      </div>

      <span className="text-body-tertiary mt-2 mb-0">Описание</span>
      <input
        type="text"
        value={formData.description}
        onChange={(event) => setFormData((state) => ({ ...state, description: event.target.value }))}
        style={{ fontSize: '1.08rem' }}
        className="form-control py-1 px-2"
        id="description"
        autoComplete="off"
      />
    </div>
  );
};

export default CategoryForm;
