import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { getAuth } from 'firebase/auth';
import DateInputLegacy from 'components_legacy/big_components/date_input_legacy/DateInput.tsx';
import DateInput from 'components_legacy/small_components/date_input/DateInput.tsx';
import { dateStateType } from 'components_legacy/small_components/date_input/types.ts';
import { DropdownContainer } from 'shared/containers';
import { ColorHexInput, NumberInput } from 'shared/inputs';
import { PageContentWrapper } from 'shared/wrappers';
import { ButtonWithIconAndSpinner } from 'shared/ui';
import { CheckIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';
import { OpenableContainer } from 'shared/containers/DraggableContainer/OpenableContainer/OpenableContainer.tsx';

export const MainPage: FC = () => {
  const [dateInputValue, setDateInputValue] = useState<string>('');
  const [dateState, setDateState] = useState<dateStateType>({ day: 1, month: 7, year: 2024 });
  const [value, setValue] = useState(0);
  const [color, setColor] = useState<string>('#000000');
  const [isLoading, setIsLoading] = useState(false);

  const userState = useAppSelector((state) => state.user.userState);
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories.list);

  const handleTestButton = async () => {
    setIsOpened((state) => !state);
    // dispatch(deleteOperation({ id: 'VmMbG8FaTkM4lLKQC8cg' }));
    // dispatch(
    //   addOperation({
    //     operation: {
    //       type: 'expense',
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
    //     id: 'lNSEuTQ2LuReGTqA2fMx',
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
    // if (auth.currentUser && auth.currentUser.uid) {
    //   const docRef = doc(db, 'users_data', auth.currentUser.uid, 'transactions', 'list');
    //   try {
    //     await runTransaction(db, async (transaction) => {
    //       const sfDoc = await transaction.get(docRef);
    //       transaction.set(docRef, {});
    //       // if (!sfDoc.exists()) {
    //       //   throw 'Document does not exist!';
    //       // }
    //       // const newPopulation = sfDoc.data().population + 1;
    //       // transaction.update(docRef, { population: newPopulation });
    //     });
    //     console.log('Transaction successfully committed!');
    //   } catch (e) {
    //     console.log('Transaction failed: ', e);
    //   }
    // }
  };

  const [isOpened, setIsOpened] = useState<boolean>(false);

  // return <PagePlaceholder />;

  return (
    <PageContentWrapper style={{ margin: '0 auto', maxWidth: '30rem' }}>
      <button className="btn btn-primary" onClick={handleTestButton}>
        Test button
      </button>
      <div className="container">
        <DateInputLegacy dateInputValue={dateInputValue} setDateInputValue={setDateInputValue} isPeriod={true} />
        <DateInput dateState={dateState} setDateState={setDateState} />
        <DropdownContainer
          DropdownToggle={<button className="btn btn-primary">Open</button>}
          DropdownMenu={
            <ul style={{ backgroundColor: 'red' }} className="m-0">
              <li>
                <a className="dropdown-item" href="#">
                  Action big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action big big big big big
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here big big big big big
                </a>
              </li>
            </ul>
          }
        ></DropdownContainer>
      </div>
      <NumberInput number={value} setNumber={(number: number) => setValue(number)}></NumberInput>
      <ColorHexInput colorHex={color} setColorHex={setColor} />
      <ButtonWithIconAndSpinner
        caption="Submit"
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        }}
        className="btn-primary align-self-start"
        isLoading={isLoading}
      >
        <CheckIconSVG iconSize="1.5rem" />
      </ButtonWithIconAndSpinner>
      <OpenableContainer
        isOpened={isOpened}
        style1={{ height: 0 }}
        style2={{ height: 300 }}
        style={{ backgroundColor: 'red' }}
        duration={4000}
      >
        {/*<div style={{ backgroundColor: 'red' }}></div>*/}
      </OpenableContainer>

      {/*<ModalWindowContainer isOpened={isOpened} onClose={() => setIsOpened(false)} style={{ margin: 'auto' }}>*/}
      {/*  <ul style={{ backgroundColor: 'red' }} className="m-0">*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Action big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Another action big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Something else here big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Action big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Another action big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Something else here big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Action big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Another action big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a className="dropdown-item" href="#">*/}
      {/*        Something else here big big big big big*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</ModalWindowContainer>*/}
    </PageContentWrapper>
  );
};
