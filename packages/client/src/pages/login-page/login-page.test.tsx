import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { LoginPage } from '@/pages';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '@/store';

describe('Тестируем страницу LoginPage.', () => {
  test('проверяем рендер полей формы', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const loginInput = getByPlaceholderText('Логин');
    const passwordInput = getByPlaceholderText('Пароль');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('проверяем валидацию ввода пароля', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const loginInput = getByPlaceholderText('Логин');
    const passwordInput = getByPlaceholderText('Пароль');
    const submitButton = getByText('Войти');

    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText(
          'Пароль должен быть от 8 до 40 символов и содержать хотя бы одну заглавную букву и цифру'
        )
      ).toBeInTheDocument();
    });
  });
});
