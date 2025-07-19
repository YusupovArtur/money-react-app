export const EMAIL_REGULAR_EXPRESSION =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const USERNAME_REGULAR_EXPRESSION = /^[a-zа-яёA-ZА-ЯЁ0-9 ._-]{3,30}$/;

export const NAME_REGULAR_EXPRESSION = /^[a-zа-яёA-ZА-ЯЁ0-9 ._-]{1,30}$/;

export const PASSWORD_REGULAR_EXPRESSION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}\[\]|\\:;'"<>,./?]{6,}$/;
