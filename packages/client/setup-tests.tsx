import '@testing-library/jest-dom';

// Инициализируем фейковую React функцию useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => {
    return jest.fn();
  },
}));

// Инициализируем фейковый компонент Paragraph от antd, в котором наблюдается конфликт при импорте модулей во время запуска тестов
jest.mock('antd/es/typography/Paragraph', () => {
  return ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
});

// Отключаем проверку авторизации пользователя
jest.mock('@/helpers/hooks/withAuthRouteHOC', () => ({
  withAuthRouteHOC: jest.fn().mockImplementation(Component => Component),
}));

// Добавляем недостающую функцию matchMedia в объект windows
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
