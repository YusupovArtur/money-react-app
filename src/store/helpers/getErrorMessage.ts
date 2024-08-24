const getErrorCodesRussianDetalization = (code: any): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Электронная почта уже используется';
    case 'auth/invalid-email':
      return 'Неверный формат электронной почты';
    case 'auth/weak-password':
      return 'Слабый пароль или неверный формат пароля';
    case 'auth/network-request-failed':
      return 'Отсутствует подключение к интернету';
    case 'auth/internal-error':
      return 'Сервер недоступен, проблема с интернет соединением';
    case 'auth/invalid-login-credentials':
      return 'Неверные электронная почта и пароль';
    case 'auth/popup-blocked':
      return 'Всплывающее окно заблокировано';
    case 'auth/popup-closed-by-user':
      return 'Всплывающее окно закрыто';
    case typeof code === 'string':
      return code;
    default:
      return `Неизвестная ошибка ${code.toString()}`;
  }
};

export const getErrorMessage = (error: any): string => {
  switch (error) {
    case typeof error !== 'object':
      return getErrorCodesRussianDetalization(error);
    case error && typeof error === 'object' && 'code' in error:
      return getErrorCodesRussianDetalization(error.code);
    default:
      return getErrorCodesRussianDetalization(undefined);
  }
};
