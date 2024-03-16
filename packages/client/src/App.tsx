import { ConfigProvider } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { ErrorProvider } from '@/providers';
import React, { ErrorInfo } from 'react';
import { Page500 } from '@/pages';

function App() {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // eslint-disable-next-line no-console
    console.error('Error handled:', error, errorInfo);
  };

  return (
    <ErrorProvider errorPage={Page500} onError={handleError}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#EFE5CC',
            colorText: '#EFE5CC',
            colorIcon: '#565A5D',
          },
        }}>
        <BrowserRouter>
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                index={route.index}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorProvider>
  );
}

export default App;
