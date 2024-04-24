import { YANDEX_API_HOST, YANDEX_API_HOST_REDIRECT } from './constants/api';

export interface FetchHelperParams {
  body?: string | FormData;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  signal?: AbortSignal | null | undefined;
}

export const setHeaders = (contentType: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', contentType);
  return requestHeaders;
};

export const setHeadersWithCookie = (contetType: string, ctx: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', contetType);
  requestHeaders.set('cookie', ctx);
  return requestHeaders;
};

export const getString = (object: object) => {
  return JSON.stringify(object);
};

export const fetchHelper = (url: string, options: FetchHelperParams) => {
  return fetch(`${YANDEX_API_HOST_REDIRECT}${url}`, {
    ...options,
    credentials: 'include',
  });
};

export const fetchHelperServer = (url: string, options: FetchHelperParams) => {
  return fetch(`${YANDEX_API_HOST}${url}`, {
    ...options,
    credentials: 'include',
  });
};
