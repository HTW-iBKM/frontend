import {CognitoUserPool,CognitoUser} from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId: "eu-west-1_irgaQRN8O",
    ClientId: "4iub14uhm1o84vov77mh5tfbnf"
}
export default new CognitoUserPool(poolData);