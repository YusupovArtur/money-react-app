import { FC } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { getWalletTypeName } from 'pages/WalletsPage/helpers/getWalletTypeName.ts';

export const WalletTypeInput: FC<{
  type: WalletType['type'];
  setType: (type: WalletType['type']) => void;
  id?: string;
}> = ({ type, setType, id }) => {
  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <div className="btn-group" role="group">
        <input
          type="radio"
          onChange={() => setType('debit')}
          className="btn-check"
          name="btnradio"
          id="typeOption1"
          autoComplete="off"
          checked={type === 'debit'}
        />
        <label className="btn btn-outline-primary" htmlFor="typeOption1">
          {getWalletTypeName('debit')}
        </label>

        <input
          type="radio"
          onChange={() => setType('credit')}
          className="btn-check"
          name="btnradio"
          id="typeOption2"
          autoComplete="off"
          checked={type === 'credit'}
        />
        <label className="btn btn-outline-danger" htmlFor="typeOption2">
          {getWalletTypeName('credit')}
        </label>

        <input
          type="radio"
          onChange={() => setType('investment')}
          className="btn-check"
          name="btnradio"
          id="typeOption3"
          autoComplete="off"
          checked={type === 'investment'}
        />
        <label className="btn btn-outline-success" htmlFor="typeOption3">
          {getWalletTypeName('investment')}
        </label>
      </div>
    </>
  );
};
