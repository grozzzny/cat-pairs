import { YANDEX_API_HOST } from './constants/api';

export interface FetchHelperParams {
  url: string;
  data?: object;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  signal?: AbortSignal | null | undefined;
}

export const fetchHelper = ({
  url,
  data,
  method,
  signal,
}: FetchHelperParams) => {
  return fetch(`${YANDEX_API_HOST}${url}`, {
    method,
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  });
};
