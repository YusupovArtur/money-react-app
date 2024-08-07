import { Dispatch, SetStateAction } from 'react';

export type ResponseHooksType = {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => void;
};
