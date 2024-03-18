import { ConfigProvider } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { AuthProvider, ErrorProvider } from '@/providers';
import React, { ErrorInfo } from 'react';
import { Page500 } from '@/pages';
import { THEME_ANTD } from '@/helpers/constants/global';

function App() {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // eslint-disable-next-line no-console
    console.error('Error handled:', error, errorInfo);
  };

  return (
    <ErrorProvider errorPage={Page500} onError={handleError} theme={THEME_ANTD}>
      <ConfigProvider theme={THEME_ANTD}>
        <BrowserRouter>
          <AuthProvider authRoute='/login' exceptionRoutes={['/registration']}>
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
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorProvider>
  );
}

export default App;
