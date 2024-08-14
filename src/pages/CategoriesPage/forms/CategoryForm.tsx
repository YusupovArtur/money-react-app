import { Dispatch, FC, SetStateAction } from 'react';
// Import menus
import { CategoryTypeInput } from 'pages/CategoriesPage/forms/ui/CategoryTypeInput.tsx';
import { CATEGORY_ICON_OPTIONS, ColorHexInput, IconNameInput, TextInput } from 'shared/inputs';
import { CategoryAddType, CategoryType } from 'store/slices/categoriesSlice';
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import { FormLabel, FormValidationFeedback } from 'shared/ui';

interface CategoryFormProps {
  formData: CategoryAddType;
  setFormData: Dispatch<SetStateAction<CategoryAddType>>;
  validation: ReturnType<typeof useFormValidation<CategoryAddType>>;
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof CategoryAddType]?: boolean }>>;
}

export const CategoryForm: FC<CategoryFormProps> = ({ formData, setFormData, validation, setIsValidate }) => {
  const { fieldValidities, fieldFeedbacks } = validation;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="d-flex flex-column mb-3"
    >
      {/*Type*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor="type" style={{ display: 'block' }}>
          Тип категории
        </FormLabel>
        <CategoryTypeInput
          id="type"
          type={formData.type}
          setType={(type: CategoryType['type']) => setFormData((state) => ({ ...state, type }))}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.type} className="align-items-start" />
      </div>

      {/*Name*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor="name">Имя категории</FormLabel>
        <TextInput
          id="name"
          value={formData.name}
          onChange={(event) => {
            setFormData((state) => ({ ...state, name: event.target.value }));
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          className={getValidityClassName(fieldValidities.name)}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.name} />
      </div>

      {/*Icon*/}
      <div className="d-flex flex-column position-relative mb-3 align-items-start">
        <FormLabel htmlFor="iconName">Иконка и цвет</FormLabel>
        <div className="d-flex align-items-center">
          <IconNameInput
            id="iconName"
            iconName={formData.iconName}
            setIconName={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
            iconOptions={CATEGORY_ICON_OPTIONS}
            optionsStyle={{ rowLength: 7, isDivider: true }}
          ></IconNameInput>
          <ColorHexInput
            id="colorHex"
            colorHex={formData.color}
            setColorHex={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
          ></ColorHexInput>
        </div>
      </div>

      {/*Description*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor="description">Описаниие</FormLabel>
        <TextInput
          id="description"
          value={formData.description}
          onChange={(event) => setFormData((state) => ({ ...state, description: event.target.value }))}
        />
      </div>
    </form>
  );
};
