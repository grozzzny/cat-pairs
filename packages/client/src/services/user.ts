import { UserApi } from '@/api';
import { DataChangePassword, ProfileFieldType, User } from '@/helpers/types';
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
    await this.update();
    return { avatar: user.avatar };
  }

  async changeUser(props: ProfileFieldType): Promise<User> {
    const user = await this.api.changeUser(props);
    await this.update();
    return user;
  }

  async create(): Promise<User> {
    return this.serverApi.create();
  }

  async update(): Promise<User> {
    return this.serverApi.update();
  }
}
