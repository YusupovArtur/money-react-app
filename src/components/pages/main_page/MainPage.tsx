import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook.ts';
import { getAuth } from 'firebase/auth';
import DateInputLegacy from 'components/big_components/date_input_legacy/DateInput.tsx';
import DateInput from 'components/small_components/date_input/DateInput.tsx';

import { doc, addDoc, getDocs, deleteDoc, collection, updateDoc, setDoc, getDoc, deleteField } from 'firebase/firestore';
import { downloadOperations, addOperation, deleteOperation, updateOperation } from 'store/slices/operationsSlice.ts';
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  downloadCategories,
  shiftCategory,
  shiftSubCategory,
  updateCategory,
  updateSubCategory,
} from 'store/slices/categoriesSlice.ts';
import { db } from '../../../firebase.ts';
import { categoryType } from 'store/types.ts';
import { addWallet, deleteWallet, shiftWallet, updateWallet } from 'store/slices/walletsSlice.ts';
import { signInUserWithGoogle } from 'store/slices/userSlice.ts';
import { dateStateType } from 'components/small_components/date_input/types.ts';
import DropdownMenu from 'components/small_components/DropdownMenu.tsx';

function MainPage(): React.ReactElement {
  const [dateInputValue, setDateInputValue] = useState<string>('');
  const [dateState, setDateState] = useState<dateStateType>({ day: 1, month: 7, year: 2024 });

  const userState = useAppSelector((state) => state.user.userState);
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories.list);

  const handleTestButton = async () => {
    // dispatch(deleteOperation({ id: 'uhcgoscoPUL8fBWNoFbf' }));
    // dispatch(
    //   addOperation({
    //     operation: {
    //       sum: 10,
    //       time: new Date().getTime(),
    //       fromWallet: 'test',
    //       toWallet: 'test',
    //       category: 'test',
    //       subcategory: 'test',
    //       description: 'test',
    //     },
    //   }),
    // );
    // dispatch(
    //   updateOperation({
    //     id: 'uhcgoscoPUL8fBWNoFbf',
    //     operation: {
    //       fromWallet: 'alfapay',
    //       sum: 1488,
    //       subcategory: 'birsday',
    //       description: 'сауна',
    //     },
    //   }),
    // );
    // updateDoc(doc(db, 'users_data', 'bxUiOY3f0ocNrc5CZiWpDOFyulR2', 'categories', 'tests'), {
    //   'subcategories.bbbbb': {
    //     name: 'test',
    //     iconName: 'testIcon',
    //   },
    // });
    // dispatch(
    //   addCategory({
    //     category: {
    //       name: 'Зарплата',
    //       iconName: 'Роснефть',
    //       description: 'Заработная плата, премии',
    //       type: 'income',
    //     },
    //   }),
    // );
    // dispatch(
    //   addSubCategory({
    //     categoryID: '2vaXasssIBzKZZTOatZS',
    //     subcategory: {
    //       name: 'Патент',
    //       iconName: 'Роснефть',
    //       description: 'Выплата за инновации',
    //     },
    //   }),
    // );
    // dispatch(
    //   deleteCategory({
    //     categoryID: 'S7JyxwHt6GCSQj2rSJ41',
    //   }),
    // );
    // dispatch(
    //   deleteSubCategory({
    //     categoryID: 'PfyBSn43gn9evMPhOSX8',
    //     subcategoryID: 'wxv8typELIjO9pczBPjl',
    //   }),
    // );
    // dispatch(
    //   shiftCategory({
    //     categoryID: 'PfyBSn43gn9evMPhOSX8',
    //     newIndex: 2,
    //   }),
    // );
    // dispatch(
    //   shiftSubCategory({
    //     categoryID: 'PfyBSn43gn9evMPhOSX8',
    //     subcategoryID: 'PTC8l94TGjaEPpTQEAWX',
    //     newIndex: 1,
    //   }),
    // );
    // dispatch(
    //   updateCategory({
    //     categoryID: 'PfyBSn43gn9evMPhOSX8',
    //     newCategoryProps: {
    //       name: 'Salary',
    //       iconName: 'Rusoil Icon',
    //       description: 'new descr',
    //     },
    //   }),
    // );
    // dispatch(
    //   updateSubCategory({
    //     categoryID: 'PfyBSn43gn9evMPhOSX8',
    //     subcategoryID: '3SatNCViTJo4vOkmyW65',
    //     newSubcategoryProps: {
    //       name: 'Premy',
    //       description: 'premy descr',
    //     },
    //   }),
    // );
    // dispatch(
    //   addWallet({
    //     wallet: {
    //       name: 'test',
    //       balance: 100,
    //       iconName: 'test',
    //       description: 'test',
    //       type: 'debit',
    //     },
    //   }),
    // );
    // dispatch(
    //   shiftWallet({
    //     walletID: 'zUh0lOL8fW9Tpi9kXh2P',
    //     newIndex: 1,
    //   }),
    // );
    // dispatch(
    //   deleteWallet({
    //     walletID: 'gQsffZmm0R4jMKIXWDgV',
    //   }),
    // );
    // dispatch(
    //   updateWallet({
    //     walletID: 'xqNRh8uiikntgjozqz8b',
    //     newWalletProps: {
    //       name: 'основная карта',
    //       balance: 80000,
    //     },
    //   }),
    // );
    console.log(auth.currentUser?.photoURL);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-content-center">
      <p>Main</p>
      <p>{`Username state: ${userState.userName}`}</p>
      <p>{`Username firebase: ${user?.email}`}</p>
      <button className="btn btn-primary" onClick={handleTestButton}>
        Test button
      </button>
      <div className="container">
        <DateInputLegacy dateInputValue={dateInputValue} setDateInputValue={setDateInputValue} isPeriod={true}></DateInputLegacy>
        <DateInput dateState={dateState} setDateState={setDateState}></DateInput>
        <DropdownMenu
          DropdownButton={<button className="btn btn-primary">Open</button>}
          DropdownItem={
            <ul>
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          }
        ></DropdownMenu>
      </div>
    </div>
  );
}

export default MainPage;
