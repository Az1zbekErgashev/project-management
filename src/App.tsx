/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import axios from 'axios';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { token } from 'config/token';
import { RouterProvider } from 'react-router-dom';
import { notification } from 'antd';
import { routes } from 'config/config';
import { FixedScrollUpButton } from 'ui';
import { router } from 'utils/routes';
import Cookies from 'js-cookie';
import { useUser } from 'hooks/useUserState';
import useJwt from 'utils/useJwt';
import i18n from 'utils/i18n';
import { useLanguage } from 'contexts/LanguageContext';

function App() {
  const jwt = !!Cookies.get('jwt');
  const { setUser } = useUser();
  const { getHeader } = useJwt();
  const getToken = getHeader();
  const { language } = useLanguage();

  useEffect(() => {
    if (jwt) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${routes.api.baseUrl}/api/user/profile`, {
        headers: {
          Authorization: getToken,
        },
      });
      if (res.data.data) {
        setUser(res.data.data);
      }
    } catch (e) {
      return;
    }
  };

  const getLanguages = async () => {
    try {
      const res = await axios.get(`${routes.api.baseUrl}/api/multilingualtext?language=${language}`);
      if (res.data) {
        if (res?.data?.data) {
          i18n.addResourceBundle(language, 'translation', res?.data?.data, true, true);
          await i18n.changeLanguage(language);
        } else {
          console.error('Invalid translation data format:', res.data);
        }
      }
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    getLanguages();
  }, [language]);

  return (
    <ConfigProvider
      theme={{
        token: token,
        components: {
          Notification: {
            zIndexPopup: 10002,
          },
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <ThemeProvider theme={{ antd: token }}>
        <RouterProvider router={router} />
        <FixedScrollUpButton />
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
