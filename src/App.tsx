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

function App() {
  const jwt = !!Cookies.get('jwt');
  const { setUser } = useUser();
  const { getHeader } = useJwt();
  const getToken = getHeader();

  useEffect(() => {
    if (jwt) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${routes.api.baseUrl}/api/user/user-profile`, {
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
