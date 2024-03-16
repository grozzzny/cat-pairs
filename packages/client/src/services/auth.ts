import { AuthApi } from '@/api';
import { LoginRequestDto } from '@/helpers/types';

export class AuthService {
  static async login(props: LoginRequestDto) {
    const response = await AuthApi.login(props);
    console.log(response.status);
    // далее тут обработка результата запроса и другая логика с данными
  }
}
