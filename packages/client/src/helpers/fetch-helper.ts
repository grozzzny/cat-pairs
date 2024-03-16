export interface FetchHelperProps {
  url: string;
  data: object;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export const fetchHelper = ({ url, data, method }: FetchHelperProps) => {
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
