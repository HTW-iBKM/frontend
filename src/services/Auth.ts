import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { getUser, removeUser, setUser } from '../../src/global-data';

export interface User {
    email: string;
    family_name: string;
    name: string;
}

class Auth {
    login(userSession: CognitoUserSession, callback: () => void) {
        const user = userSession.getIdToken().payload as User;
        setUser(user);
        callback();
    }

    logout(callback: () => void) {
        removeUser();
        callback();
    }

    isAuthenticated(): boolean {
        return !!getUser();
    }
}

export default new Auth();
