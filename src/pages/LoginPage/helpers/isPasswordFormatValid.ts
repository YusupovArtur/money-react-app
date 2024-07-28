const isPasswordFormatValid = (password: string) => {
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}\[\]|\\:;'"<>,./?]{6,}$/;
  return PASSWORD_REGEX.test(password);
};

export default isPasswordFormatValid;
