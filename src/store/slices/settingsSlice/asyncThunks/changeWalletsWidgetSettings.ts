import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'app/firebase.ts';
import { doc, runTransaction } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { getValidWidgetsSettings } from 'store/slices/settingsSlice/helpers/getValidSettings.ts';
import { ResponseHooksType } from 'store';
import { SettingsStateType } from 'store/slices/settingsSlice/types/SettingsStateType.ts';
import { shiftIndexes } from 'store/helpers/shiftIndexes.ts';

type ChangeActionType =
  | { type: 'add'; payload?: string }
  | { type: 'delete'; payload: number }
  | { type: 'change'; payload: { index: number; id: string } }
  | { type: 'shift'; payload: { index1: number; index2: number } };

const walletsWidgetOrderReducer = (state: string[], action: ChangeActionType): string[] => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload === undefined ? '' : action.payload];
    case 'delete':
      return state.filter((_, index) => index !== action.payload);
    case 'change':
      return state.map((value, index) => (index === action.payload.index ? action.payload.id : value));
    case 'shift':
      return shiftIndexes({ order: state, index1: action.payload.index1, index2: action.payload.index2, isOldBehaviour: false });

    default:
      return state;
  }
};

export const changeWalletsWidgetSettings = createAsyncThunk<
  { order: string[] },
  ResponseHooksType & { action: ChangeActionType },
  {
    rejectValue: string;
  }
>('settings/changeWalletsWidgetSettings', async (props, { rejectWithValue }) => {
  const { action } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docRef = doc(db, 'users_data', user.uid, 'settings', 'widgetsSettings');
    window.pending.settings.widgetsSettings.walletsWidget = { flags: 2 };

    return await runTransaction(db, async (transaction) => {
      const widgetsSettingsSnapshot = await transaction.get(docRef);
      const widgetsSettings = getValidWidgetsSettings(widgetsSettingsSnapshot.data());
      const order = walletsWidgetOrderReducer(widgetsSettings.walletsWidget.order, action);

      transaction.update(docRef, {
        'walletsWidget.order': order,
      });

      return { order: order };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addChangeWalletsWidgetSettingsExtraReducers = (builder: ActionReducerMapBuilder<SettingsStateType>) => {
  builder
    .addCase(changeWalletsWidgetSettings.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(changeWalletsWidgetSettings.fulfilled, (state, action) => {
      state.settings.widgetsSettings.walletsWidget.order = action.payload.order;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(changeWalletsWidgetSettings.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка изменения виджета счетов:', action.payload);
    });
};
