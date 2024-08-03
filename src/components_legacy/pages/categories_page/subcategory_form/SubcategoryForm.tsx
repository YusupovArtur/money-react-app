import { Dispatch, FC, SetStateAction } from 'react';
import { CATEGORY_ICON_OPTIONS, IconNameInput } from 'shared/inputs';
import { subcategoryAddType } from 'store/types';

export const SubcategoryForm: FC<{
  formData: subcategoryAddType;
  setFormData: Dispatch<SetStateAction<subcategoryAddType>>;
}> = ({ formData, setFormData }) => {
  return (
    <div className="d-flex flex-column">
      <span className="text-body-tertiary mt-2">Имя подкатегории</span>
      <input
        type="text"
        value={formData.name}
        onChange={(event) => setFormData((state) => ({ ...state, name: event.target.value }))}
        style={{ fontSize: '1.08rem' }}
        className="form-control py-1 px-2"
        id="name"
        autoComplete="off"
      />

      <span className="text-body-tertiary mt-2 mb-0">Иконка</span>
      <div className="d-flex align-items-center">
        <IconNameInput
          iconName={formData.iconName}
          setIconName={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
          iconOptions={CATEGORY_ICON_OPTIONS}
          rowLength={7}
          isDivider={true}
        ></IconNameInput>
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
