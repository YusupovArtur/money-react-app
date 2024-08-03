import { Dispatch, FC, SetStateAction } from 'react';
// Import menus
import CategoryTypeMenu from '../../../pages/categories_page/categories_form/CategoryTypeMenu';
import { CATEGORY_ICON_OPTIONS, ColorHexInput, IconNameInput } from 'shared/inputs';
import { categoryAddType } from 'store/types';

export const CategoryForm: FC<{
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
      <CategoryTypeMenu categoryType={formData.type} setFormData={setFormData} />

      <span className="text-body-tertiary mt-2 mb-0">Иконка и цвет</span>
      <div className="d-flex align-items-center">
        <IconNameInput
          iconName={formData.iconName}
          setIconName={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
          iconOptions={CATEGORY_ICON_OPTIONS}
          rowLength={7}
          isDivider={true}
        ></IconNameInput>
        <ColorHexInput
          colorHex={formData.color}
          setColorHex={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
        ></ColorHexInput>
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
