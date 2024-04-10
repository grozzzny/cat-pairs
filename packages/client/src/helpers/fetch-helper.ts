import { YANDEX_API_HOST } from './constants/api';

export interface FetchHelperParams {
  body?: string | FormData;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  signal?: AbortSignal | null | undefined;
}

export const setHeaders = (contetType: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', contetType);
  return requestHeaders;
};

export const getString = (object: object) => {
  return JSON.stringify(object);
};

export const fetchHelper = (url: string, options: FetchHelperParams) => {
  return fetch(`${YANDEX_API_HOST}${url}`, {
    ...options,
    credentials: 'include',
  });
};
