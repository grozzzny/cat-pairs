import { API_PARAMS, YANDEX_API_HOST } from '@/helpers/constants/api';
import { DataChangePassword } from '@/helpers/types/user';

export class UserApi {
  static async changePassword(params: DataChangePassword) {
    return await fetch(`${YANDEX_API_HOST}/user/password`, {
      ...API_PARAMS,
      method: 'PUT',
      body: JSON.stringify(params),
    });
  }
}

/*private _baseUrl: string;
constructor(baseUrl: string) {
  this._baseUrl = baseUrl;
}







async changePassword(data: DataChangePassword): Promise<Response> {
  return await fetch(`${this._baseUrl}/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

static async changeAvatar(params: DataChangePassword) {
  return await fetch(`${YANDEX_API_HOST}/user/provile/avatar`, {
    ...API_PARAMS,
    method: 'PUT',
    body: JSON.stringify(params),
  });
}
}

export const userApi = new UserApi(YANDEX_API_HOST);

/* UserApi {
private _baseUrl: string;
constructor(baseUrl: string , token : string) {
  this._baseUrl = baseUrl;
}



async changePassword(data: DataChangePassword): Promise<Response> {
  const response = await fetch(`${this._baseUrl}/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response;
  /*if (!response.ok) {
    throw new Error(
      `Blast! Our letter was not received favorably: ${response.statusText}`
    );
  }
  console.log('запрос выполнен');
  return await response.json();
}

async getUserInfo() {
  const response = await fetch(`${this._baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Blast! Our letter was not received favorably: ${response.statusText}`
    );
  }
  return await response.json();
}
}

export const userApi = new UserApi(baseUrl);*/
