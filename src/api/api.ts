

import UserPool from '../services/CognitoUserPool'
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';



export function singIn(username: string, password: string) {
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    const userData = {
        Username: username,
        Pool: UserPool
    }
    const coginitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        coginitoUser.authenticateUser(authDetails, {
            onSuccess: () => {
                resolve(true);
            },
            onFailure: (err) => {
                reject(err);
            }
        })
    })
}
