import { CognitoUserSession } from 'amazon-cognito-identity-js';
import GlobalData from '../../src/global-data';

export interface User {
    email: string;
    family_name: string;
    name: string;
}

class Auth {
    login(userSession: CognitoUserSession, callback: () => void) {
        const user = userSession.getIdToken().payload as User;
        GlobalData.setUser(user);
        callback();
    }

    logout(callback: () => void) {
        GlobalData.removeUser();
        callback();
    }

    isAuthenticated(): boolean {
        return !!GlobalData.getUser();
    }
}

export default new Auth();
