import { Dispatch, FC, SetStateAction, useId } from 'react';
// Inputs
import { CATEGORY_ICON_OPTIONS, IconNameInput, TextInput } from 'shared/inputs';
import { getValidityClassName, useFormValidation } from 'shared/hooks';
// Store
import { SubcategoryType } from 'store/slices/categoriesSlice';
// UI
import { FormLabel, FormValidationFeedback } from 'shared/ui';

interface SubcategoryFormProps {
  formData: SubcategoryType;
  setFormData: Dispatch<SetStateAction<SubcategoryType>>;
  validation: ReturnType<typeof useFormValidation<SubcategoryType>>;
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof SubcategoryType]?: boolean }>>;
}

export const SubcategoryForm: FC<SubcategoryFormProps> = ({ formData, setFormData, validation, setIsValidate }) => {
  const { fieldValidities, fieldFeedbacks } = validation;

  const nameInputID = useId();
  const iconNameInputID = useId();
  const descriptionInputID = useId();

  return (
    <form onSubmit={(event) => event.preventDefault()} className="d-flex flex-column mb-3">
      {/*Name*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor={nameInputID}>Имя подкатегории</FormLabel>
        <TextInput
          id={nameInputID}
          value={formData.name}
          onChange={(event) => {
            setFormData((state) => ({ ...state, name: event.target.value }));
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          onBlur={() => {
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          className={getValidityClassName(fieldValidities.name)}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.name} />
      </div>

      {/*Icon*/}
      <div className="position-relative d-flex flex-column mb-3">
        <FormLabel htmlFor={iconNameInputID}>Иконка</FormLabel>
        <IconNameInput
          id={iconNameInputID}
          iconName={formData.iconName}
          setIconName={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
          iconOptions={CATEGORY_ICON_OPTIONS}
          optionsStyle={{ rowLength: 7, isDivider: true }}
        ></IconNameInput>
      </div>

      {/*Description*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor={descriptionInputID}>Описаниие</FormLabel>
        <TextInput
          id={descriptionInputID}
          value={formData.description}
          onChange={(event) => setFormData((state) => ({ ...state, description: event.target.value }))}
        />
      </div>
    </form>
  );
};
