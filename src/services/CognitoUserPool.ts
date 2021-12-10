import {CognitoUserPool,CognitoUser} from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId: "eu-west-1_Rm56xFq2y",
    ClientId: "4upvt7bl8877i29o2qc7uchnev"
}
export default new CognitoUserPool(poolData);