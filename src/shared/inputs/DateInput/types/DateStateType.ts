import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';

/**
 * A type representing a date with day, month, and year fields, 0 - is special invalid value.
 */
export type DateStateType = Record<DateFieldName, number>;
