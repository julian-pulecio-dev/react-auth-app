import { authenticateUser } from "../Cognito/AuthenticateUser";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { cognitoPool } from "../../Config/CognitoPool";

const api = "https://crj76kuo3b.execute-api.us-east-1.amazonaws.com/test/";

let userPool = new CognitoUserPool(cognitoPool);

export const loginSRP = async (username: string, password: string) => {
    const response = await authenticateUser(
      username=username,
      password=password,
      userPool=userPool
    )
    console.log("LoginSRP response: ", response)
    return response;
};
