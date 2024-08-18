import { Dispatch, FC, SetStateAction, useId } from 'react';
import { WalletType } from 'store/slices/walletsSlice';

interface WalletsFilterProps {
  filter: WalletType['type'] | null;
  setFilter: Dispatch<SetStateAction<WalletType['type'] | null>>;
}

export const WalletsFilter: FC<WalletsFilterProps> = ({ filter, setFilter }) => {
  const optionID1 = useId();
  const optionID2 = useId();
  const optionID3 = useId();
  const optionID4 = useId();

  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        onChange={() => setFilter(null)}
        className="btn-check"
        name="btnradio"
        id={optionID1}
        autoComplete="off"
        checked={filter === null}
      />
      <label className="btn btn-outline-primary" htmlFor={optionID1}>
        Все
      </label>

      <input
        type="radio"
        onChange={() => setFilter('debit')}
        className="btn-check"
        name="btnradio"
        id={optionID2}
        autoComplete="off"
        checked={filter === 'debit'}
      />
      <label className="btn btn-outline-primary" htmlFor={optionID2}>
        Дебет.
      </label>

      <input
        type="radio"
        onChange={() => setFilter('credit')}
        className="btn-check"
        name="btnradio"
        id={optionID3}
        autoComplete="off"
        checked={filter === 'credit'}
      />
      <label className="btn btn-outline-danger" htmlFor={optionID3}>
        Кредит.
      </label>

      <input
        type="radio"
        onChange={() => setFilter('investment')}
        className="btn-check"
        name="btnradio"
        id={optionID4}
        autoComplete="off"
        checked={filter === 'investment'}
      />
      <label className="btn btn-outline-success" htmlFor={optionID4}>
        Инвест.
      </label>
    </div>
  );
};
