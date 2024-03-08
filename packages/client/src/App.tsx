import { ConfigProvider } from 'antd';
import './App.css';
import { PageWrapper } from './components';

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
      <PageWrapper>
        <div>Welcome page</div>
      </PageWrapper>
    </ConfigProvider>
  );
}

export default App;
