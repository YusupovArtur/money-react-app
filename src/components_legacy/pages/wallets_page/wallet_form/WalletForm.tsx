import { Dispatch, FC, SetStateAction } from 'react';
// Menus imports
// Number input
import { ColorHexInput, IconNameInput, NumberInput, WALLET_ICON_OPTIONS } from 'shared/inputs';
import WalletTypeMenu from '../../../pages/wallets_page/wallet_form/WalletTypeMenu';
import { WalletType } from 'store/slices/walletsSlice';

interface WalletFormProps {
  formData: WalletType;
  setFormData: Dispatch<SetStateAction<WalletType>>;
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
      <WalletTypeMenu walletType={formData.type} setFormData={setFormData} />

      <span className="text-body-tertiary mt-2 mb-0">Иконка и цвет</span>
      <div className="d-flex align-items-center">
        <IconNameInput
          iconName={formData.iconName}
          setIconName={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
          iconOptions={WALLET_ICON_OPTIONS}
          rowLength={6}
          isDivider={false}
        ></IconNameInput>
        <ColorHexInput
          colorHex={formData.color}
          setColorHex={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
        ></ColorHexInput>
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
