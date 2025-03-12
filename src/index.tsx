import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import IntlProviderWrapper from 'utils/intlProviderWrapper';
import { UserProvider } from 'hooks/useUserState';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <IntlProviderWrapper>
    <UserProvider>
      <App />
    </UserProvider>
  </IntlProviderWrapper>
);
