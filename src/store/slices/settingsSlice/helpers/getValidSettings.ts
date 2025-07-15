import { QuerySnapshot } from 'firebase/firestore';
import { isArrayOfStrings } from 'shared/helpers';
import { SettingsType } from 'store/slices/settingsSlice';

const defaultWidgetSettings: SettingsType['widgetsSettings'] = {
  walletsWidget: {
    order: [],
  },
};

const isWidgetSettings = (obj: any): obj is SettingsType['widgetsSettings'] => {
  return obj && typeof obj === 'object' && typeof obj.walletsWidget === 'object' && isArrayOfStrings(obj.walletsWidget.order);
};

export const getValidWidgetsSettings = (obj: unknown) => {
  if (isWidgetSettings(obj)) {
    return obj;
  }
  return defaultWidgetSettings;
};

export const getValidSettings = (querySnapshot: QuerySnapshot): SettingsType => {
  let widgetsSettings = defaultWidgetSettings;

  querySnapshot.forEach((doc) => {
    if (doc.id === 'widgetsSettings') {
      widgetsSettings = getValidWidgetsSettings(doc.data());
    }
  });

  return { widgetsSettings: widgetsSettings };
};
