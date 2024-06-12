import React from 'react';
// Menus imports
import IconMenu from 'components/small_components/dropdowns/IconMenu';
import { WALLET_ICONS_FIELD } from 'components/small_components/icons_svg/icon_sets/ContentIconSets';
import ColorMenu from 'components/small_components/dropdowns/ColorMenu';
import WalletTypeMenu from 'components/pages/wallets_page/wallet_form/WalletTypeMenu';
import { walletAddType } from 'store/types';
// Number input
import NumberInput from 'components/small_components/NumberInput';

const WalletForm: React.FC<{
  formData: walletAddType;
  setFormData: React.Dispatch<React.SetStateAction<walletAddType>>;
}> = ({ formData, setFormData }) => {
  // const balanceInputRef = useRef<HTMLInputElement | null>(null);

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
          setIcon={(iconName: string) => setFormData((state) => ({ ...state, iconName: iconName }))}
          iconsField={WALLET_ICONS_FIELD}
          rowLength={6}
          isDivider={false}
        ></IconMenu>
        <ColorMenu
          color={formData.color}
          setColor={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
        ></ColorMenu>
      </div>

      <span className="text-body-tertiary mt-2 mb-0">Сумма на счете</span>
      <NumberInput
        number={formData.balance}
        setNumber={(number: number) => setFormData((state) => ({ ...state, balance: number }))}
        id="balance"
      ></NumberInput>
      {/* <input
        type="number"
        value={formData.balance}
        onChange={(event) => {
          setFormData((state) => ({ ...state, balance: parseFloat(event.target.value) }));
        }}
        style={{ fontSize: '1.08rem' }}
        className="form-control py-1 px-2"
        id="balance"
        autoComplete="off"
      /> */}

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
