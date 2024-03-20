export interface IprofileFormErrors {
  required: string;
  length: string;
  regEmail: RegExp;
  errorEmail: string;
  regPhone: RegExp;
  errorPhone: string;
  regPassword: RegExp;
  errorPassword: string;
}

export const profileFormErrors: IprofileFormErrors = {
  required: 'Это обязательное поле',
  length: 'Поле должно содержать от 2 до 50 символов',
  regEmail: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+/,
  errorEmail: 'Email не соответствует формату',
  regPhone: /^((\+7|7|8)+([0-9]){10})$/,
  errorPhone: 'Телефон не соответствует формату',
  regPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
  errorPassword: 'Пароль не соответствует формату',
};
