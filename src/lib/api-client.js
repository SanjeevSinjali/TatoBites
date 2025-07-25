import Axios from "axios"

import { paths } from "../config/paths"

const authRequestInterceptor = (config) => {
  if (config.headers) {
    config.headers.Accept = 'Application/json'
  }

  config.withCredentials = true;
  return config;
}
console.log(import.meta.env)

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

let hasRedirectedToLogin = false;

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    console.log(`error occured: ${message}`)

    if (
      error.response?.status === 401 &&
      !hasRedirectedToLogin &&
      !window.location.pathname.startsWith('/login')
    ) {
      hasRedirectedToLogin = true;

      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
