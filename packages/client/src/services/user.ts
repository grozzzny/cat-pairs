import { UserApi } from '@/api';
import {
  DataChangePassword,
  ProfileFieldType,
  User,
  UserServer,
} from '@/helpers/types';
import { ServerUserApi } from '@/api/server-user';

export class UserService {
  constructor(
    public readonly api: UserApi = new UserApi(),
    public readonly serverApi: ServerUserApi = new ServerUserApi()
  ) {}

  changePassword(props: DataChangePassword) {
    return this.api.changePassword(props);
  }

  async changeAvatar(formData: FormData): Promise<{ avatar: string }> {
    const user = await this.api.changeAvatar(formData);
    await this.updateUser();
    return { avatar: user.avatar };
  }

  async changeUser(props: ProfileFieldType): Promise<User> {
    const user = await this.api.changeUser(props);
    await this.updateUser();
    return user;
  }

  createUser(): Promise<User> {
    return this.serverApi.createUser();
  }

  updateUser(): Promise<User> {
    return this.serverApi.updateUser();
  }

  getCurrentUserWithCookie(ctx: string): Promise<UserServer> {
    return this.serverApi.getUserWithCookie(ctx);
  }
}
