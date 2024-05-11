import { AuthApi } from '@/api';
import { LoginRequestDto, RegistrationFieldDto, User } from '@/helpers/types';
import { UserService } from '@/services/user';

export class AuthService {
  constructor(
    public readonly api: AuthApi = new AuthApi(),
    private readonly userService: UserService = new UserService()
  ) {}

  async login(props: LoginRequestDto) {
    const res = await this.api.login(props);
    await this.userService.create();
    return res;
  }

  async registration(props: RegistrationFieldDto) {
    const user = await this.api.registration(props);
    await this.userService.create();
    return user;
  }

  async getServiceId(): Promise<string> {
    const { service_id } = await this.api.fetchServiceId();
    return service_id;
  }

  async loginOauth({ code }: { code: string }) {
    const res = await this.api.loginOauth({ code });
    await this.userService.create();
    return res;
  }

  getCurrentUser(): Promise<User> {
    return this.api.fetchUser();
  }

  getCurrentUserWithCookie(ctx: string): Promise<User> {
    return this.api.getUserWithCookie(ctx);
  }

  logout() {
    return this.api.logout();
  }
}
