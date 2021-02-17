import axios from 'axios';
import Cookies from 'js-cookie';
import store from './store';
import { logoutAction } from './store/actions/authentication';

const instance = axios.create({
  baseURL: 'http://localhost/api/v1/',
});

const setupInterceptors = history => {
  instance.interceptors.request.use((config) => {
    const csrftoken = Cookies.get('csrftoken');
    if (csrftoken) {
      Object.assign(config.headers, { 'X-CSRFToken': csrftoken });
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    switch (error.response.status) {
      case 403:
        store.dispatch(logoutAction());
        history.push('/login');
    }
    return Promise.reject(error);
  });
}

export { setupInterceptors };
export default instance;
