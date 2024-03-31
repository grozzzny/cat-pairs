import '@testing-library/jest-dom';
import React from 'react';
import { Button } from '@/components';

import { fireEvent, render } from '@testing-library/react';

describe('Тестируем компонент Button.', () => {
  test('проверяем стандартный рендеринг кнопки', () => {
    const { getByText } = render(<Button label='Кнопка' />);
    const button = getByText('Кнопка');
    expect(button).toBeInTheDocument();
  });

  test('проверяем события onClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label='Кнопка' onClick={handleClick} />
    );
    const button = getByText('Кнопка');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
