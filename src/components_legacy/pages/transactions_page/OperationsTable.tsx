import { FC } from 'react';
import { operationsStateType } from 'store/types';
// import { useAppSelector } from 'store/hook';

export const OperationsTable: FC<{
  operations: operationsStateType;
}> = ({ operations }) => {
  const toStringDate = (date: Date): string => {
    // const seconds = date.getSeconds().toString().padStart(2, '0');
    // const minutes = date.getMinutes().toString().padStart(2, '0');
    // const hours = date.getHours().toString().padStart(2, '0');
    // return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  };

  // const hash_table: {
  //   [key: string]: {
  //     sum: number;
  //     time: number;
  //     fromWallet: string;
  //     toWallet: string;
  //     category: string;
  //     subcategory: string;
  //     description: string;
  //   };
  // } = {};
  // operations.forEach(({ id, ...operation }) => (hash_table[id] = operation));
  // console.log(hash_table);
  // delete hash_table['2d3y7PAGdMCTQ77CCMvx'];
  // console.log(hash_table);
  // // const hash_table_keys = Object.keys(hash_table).sort((a, b) => hash_table[a].time - hash_table[b].time);

  return (
    <table className="table table-bordered m-0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sum</th>
          <th>Date</th>
          <th>From wallet</th>
          <th>To wallet</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(operations)
          .sort((a, b) => operations[a].sum - operations[b].sum)
          .map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{operations[key].sum}</td>
              <td>{toStringDate(new Date(operations[key].time))}</td>
              <td>{operations[key].fromWallet}</td>
              <td>{operations[key].toWallet}</td>
              <td>{operations[key].category}</td>
              <td>{operations[key].subcategory}</td>
              <td>{operations[key].description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
