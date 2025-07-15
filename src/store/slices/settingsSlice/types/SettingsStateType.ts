import { ResponseStateType } from 'store/types/ResponseStateType.ts';
import { SettingsType } from 'store/slices/settingsSlice/types/SettingsType.ts';

export type SettingsStateType = { settings: SettingsType } & { responseState: ResponseStateType };
