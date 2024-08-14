import { Dispatch, FC, SetStateAction } from 'react';
import { WalletType } from 'store/slices/walletsSlice';

interface WalletsFilterProps {
  filter: WalletType['type'] | null;
  setFilter: Dispatch<SetStateAction<WalletType['type'] | null>>;
}

export const WalletsFilter: FC<WalletsFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        onChange={() => setFilter(null)}
        className="btn-check"
        name="btnradio"
        id="typeOption1"
        autoComplete="off"
        checked={filter === null}
      />
      <label className="btn btn-outline-primary" htmlFor="typeOption1">
        Все
      </label>

      <input
        type="radio"
        onChange={() => setFilter('debit')}
        className="btn-check"
        name="btnradio"
        id="typeOption2"
        autoComplete="off"
        checked={filter === 'debit'}
      />
      <label className="btn btn-outline-primary" htmlFor="typeOption2">
        Дебет.
      </label>

      <input
        type="radio"
        onChange={() => setFilter('credit')}
        className="btn-check"
        name="btnradio"
        id="typeOption3"
        autoComplete="off"
        checked={filter === 'credit'}
      />
      <label className="btn btn-outline-danger" htmlFor="typeOption3">
        Кредит.
      </label>

      <input
        type="radio"
        onChange={() => setFilter('investment')}
        className="btn-check"
        name="btnradio"
        id="typeOption4"
        autoComplete="off"
        checked={filter === 'investment'}
      />
      <label className="btn btn-outline-success" htmlFor="typeOption4">
        Инвест.
      </label>
    </div>
  );
};
