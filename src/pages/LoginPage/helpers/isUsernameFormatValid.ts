const isUsernameFormatValid = (email: string) => {
  const USERNAME_REGEXP = /^[a-zа-яA-ZА-Я0-9._-]{3,20}$/;
  return USERNAME_REGEXP.test(email);
};

export default isUsernameFormatValid;
