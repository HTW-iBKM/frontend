import { User } from '../src/services/Auth';

export function setUser(user: User): void {
  if (!user) {
    return;
  }
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): User|undefined {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    return JSON.parse(localUser) as User;
  }
  return undefined;
}

export function removeUser(): void {
  return localStorage.removeItem('user');
}
