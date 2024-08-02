export const EMAIL_REGULAR_EXPRESSION =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const USERNAME_REGULAR_EXPRESSION = /^[a-zа-яA-ZА-Я0-9._-]{3,20}$/;
export const PASSWORD_REGULAR_EXPRESSION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}\[\]|\\:;'"<>,./?]{6,}$/;
