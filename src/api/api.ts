

import UserPool from '../services/CognitoUserPool'
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import auth from "../services/Auth";

export function signIn(username: string, password: string) {
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    const userData = {
        Username: username,
        Pool: UserPool
    }
    const coginitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        coginitoUser.authenticateUser(authDetails, {
            onSuccess: (data) => {
                auth.login(data, () => {
                    resolve(data);
                })
            },
            onFailure: (err) => {
                reject(err);
            }
        })
    })
}

export function signUp(email: string, name: string, familyName: string, password: string) {
    console.log("AJ")
    const attributeList: CognitoUserAttribute[] = [];
    attributeList.push(new CognitoUserAttribute({
        Name: 'email',
        Value: email
    }))
    attributeList.push(new CognitoUserAttribute({
        Name: 'family_name',
        Value: familyName
    }))
    attributeList.push(new CognitoUserAttribute({
        Name: 'name',
        Value: name
    }))

    return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        UserPool.signUp(email, password, attributeList, null, function (err, result) {
            if (err) {
                return reject(err);
            }
            const cognitoUser = result!.user;
            return resolve(cognitoUser);
        })
    })


}
