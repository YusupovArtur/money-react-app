import { Dispatch, FC, SetStateAction } from 'react';
// Menus imports
import IconMenu from '../../../small_components/dropdowns/IconMenu';
import { WALLET_ICONS_FIELD } from '../../../small_components/icons_svg/icon_sets/ContentIconSets';
import ColorInput from 'shared/inputs/ColorInput/ColorInput.tsx';
import WalletTypeMenu from '../../../pages/wallets_page/wallet_form/WalletTypeMenu';
import { walletAddType } from 'store/types';
// Number input
import NumberInput from 'shared/inputs/NumberInput';

interface WalletFormProps {
  formData: walletAddType;
  setFormData: Dispatch<SetStateAction<walletAddType>>;
}

const WalletForm: FC<WalletFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="d-flex flex-column">
      <span className="text-body-tertiary mt-2">Имя счета</span>
      <input
        type="text"
        value={formData.name}
        onChange={(event) => setFormData((state) => ({ ...state, name: event.target.value }))}
        style={{ fontSize: '1.08rem' }}
        className="form-control py-1 px-2"
        id="name"
        autoComplete="off"
      />

      <span className="text-body-tertiary mt-2 mb-0">Тип счета</span>
      <WalletTypeMenu walletType={formData.type} setFormData={setFormData}></WalletTypeMenu>

      <span className="text-body-tertiary mt-2 mb-0">Иконка и цвет</span>
      <div className="d-flex align-items-center">
        <IconMenu
          iconName={formData.iconName}
          setIcon={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
          iconsField={WALLET_ICONS_FIELD}
          rowLength={6}
          isDivider={false}
        ></IconMenu>
        <ColorInput
          color={formData.color}
          setColor={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
        ></ColorInput>
      </div>

      <span className="text-body-tertiary mt-2 mb-0">Сумма на счете</span>
      <NumberInput
        number={formData.balance}
        setNumber={(number: number) => setFormData((state) => ({ ...state, balance: number }))}
      ></NumberInput>

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

export default WalletForm;
