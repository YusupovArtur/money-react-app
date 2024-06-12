import React from 'react';
import { walletAddType } from 'store/types';
import { getWalletTypeName } from 'components/pages/wallets_page/functions';

const WalletTypeMenu: React.FC<{
  walletType: 'debit' | 'credit' | 'investment';
  setType?: React.Dispatch<React.SetStateAction<'debit' | 'credit' | 'investment'>>;
  setFormData?: React.Dispatch<React.SetStateAction<walletAddType>>;
}> = ({ walletType, setType, setFormData }) => {
  return (
    <div className="dropdown">
      <button
        style={{ fontSize: '1.08rem' }}
        className="btn btn-body dropdown-toggle px-1 py-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {getWalletTypeName(walletType)}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            onClick={() => {
              if (setType) setType('debit');
              if (setFormData) setFormData((state) => ({ ...state, type: 'debit' }));
            }}
            className={`dropdown-item ${walletType === 'debit' && 'active'}`}
          >
            {getWalletTypeName('debit')}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (setType) setType('investment');
              if (setFormData) setFormData((state) => ({ ...state, type: 'investment' }));
            }}
            className={`dropdown-item ${walletType === 'investment' && 'active'}`}
          >
            {getWalletTypeName('investment')}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (setType) setType('credit');
              if (setFormData) setFormData((state) => ({ ...state, type: 'credit' }));
            }}
            className={`dropdown-item ${walletType === 'credit' && 'active'}`}
          >
            {getWalletTypeName('credit')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WalletTypeMenu;
