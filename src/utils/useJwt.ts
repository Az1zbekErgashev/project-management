import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

function useJwt() {
  const set = (token: string, expires: number) => {
    const expirationDate = new Date(new Date().getTime() + expires * 1000);
    Cookies.set('jwt', token, { expires: expirationDate });
  };

  const get = () => {
    return Cookies.get('jwt');
  };

  const isTokenActive = () => {
    return !!get();
  };

  const getDecoded = () => {
    const token = get();
    return !!token ? (decodeToken(token) as any) : 0;
  };

  const getHeader = () => {
    return 'Bearer ' + get();
  };

  const remove = () => {
    Cookies.remove('jwt');
    localStorage.clear();
    window.location.replace('/');
  };

  const sessionTime = () => {
    const decodedToken = getDecoded();
    if (decodedToken && decodedToken?.iat > 0) {
      return decodedToken?.exp - decodedToken?.iat;
    }
    return decodedToken.exp;
  };

  return { set, get, getDecoded, getHeader, remove, sessionTime, isTokenActive };
}

export default useJwt;
