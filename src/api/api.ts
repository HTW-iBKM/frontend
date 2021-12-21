import UserPool from '../services/CognitoUserPool'
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export function singIn(username: string, password: string): Promise<boolean>{
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

export function signUp(email: string, name: string, familyName: string, password: string): Promise<CognitoUser> {
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
            if (result) {
                const cognitoUser = result.user;
                return resolve(cognitoUser);
            }
        })
    })
}
