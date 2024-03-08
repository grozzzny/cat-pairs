import { ConfigProvider } from 'antd';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#EFE5CC',
          colorText: '#EFE5CC',
          colorIcon: '#565A5D',
        },
      }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
