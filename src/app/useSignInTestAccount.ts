import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { useEffect, useRef } from 'react';
import { signinUserWithEmailAndPassword } from 'store/slices/userSlice';

export const useSignInTestAccount = () => {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.user.userState.isUserAuthorised);

  const hasAttempted = useRef(false);

  useEffect(() => {
    console.log(isUser);
    if (isUser) hasAttempted.current = true;

    if (!isUser && !hasAttempted.current) {
      dispatch(signinUserWithEmailAndPassword({ email: 'test@mail.ru', password: '123456q' }));
    }
  }, [isUser]);
};
