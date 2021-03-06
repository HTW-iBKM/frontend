import { User } from '../src/services/Auth';

class GlobalData {
  setUser(user: User): void {
    if (!user) {
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User|undefined {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      return JSON.parse(localUser) as User;
    }
    return undefined;
  }

  removeUser(): void {
    return localStorage.removeItem('user');
  }
}

export default new GlobalData();
