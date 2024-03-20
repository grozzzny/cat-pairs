import { RuleObject } from 'antd/es/form';

export const validateFirstName = (ob: RuleObject, value: string) => {
  return validateName(value);
};

export const validateSecondName = (ob: RuleObject, value: string) => {
  return validateName(value);
};

const validateName = (value: string) => {
  const regex = /^[A-ZА-Я][a-zA-ZА-Яа-я]*(-[A-ZА-Яa-zа-я]*)*$/;
  if (!value || regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(
    'Первая буква должна быть заглавной; Должно содержать только латиницу или кириллицу, без пробелов, цифр и спецсимволов (кроме дефиса)'
  );
};

export const validateLogin = (ob: RuleObject, value: string) => {
  const regex = /^[a-zA-Z0-9_-]{3,20}$/;
  if (!value || regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(
    'Логин должен быть от 3 до 20 символов, состоять из латиницы, цифр, дефиса и подчёркивания'
  );
};

export const validateEmail = (ob: RuleObject, value: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!value || regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Введите корректный email адрес');
};

export const validatePassword = (ob: RuleObject, value: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  if (!value || regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(
    'Пароль должен быть от 8 до 40 символов и содержать хотя бы одну заглавную букву и цифру'
  );
};

export const validatePhone = (ob: RuleObject, value: string) => {
  const regex = /^\+?\d{10,15}$/;
  if (!value || regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(
    'Телефон должен содержать от 10 до 15 цифр и начинаться с плюса (если есть)'
  );
};

export const validateRequired = (ob: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject('Поле обязательно для заполнения');
  }
  return Promise.resolve();
};

export const validateConfirmPassword = (
  newPassword: string,
  newPassword2: string
) => {
  if (!newPassword || newPassword === newPassword2) {
    return Promise.resolve();
  }
  return Promise.reject('Пароли не совпадают');
};
