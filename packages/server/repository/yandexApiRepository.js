
const API_ROOT = 'https://ya-praktikum.tech/api/v2';

export class YandexApiRepository {
  constructor(cookie) {
    this._cookie = cookie;
  }
  async getCurrentUser() {
    const user = await fetch(`${API_ROOT}/user/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: this._cookie
      },

    });
    return { ...user };
  }
}


