const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
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
    default:
      return errorCode;
  }
};

export default getErrorMessage;