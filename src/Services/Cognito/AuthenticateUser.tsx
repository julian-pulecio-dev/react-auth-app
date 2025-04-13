import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from "amazon-cognito-identity-js";

import { AuthTokens } from "../../Models/AuthTokens";

export async function authenticateUser(
  username: string,
  password: string,
  userPool: CognitoUserPool
): Promise<AuthTokens> {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        const tokens: AuthTokens = {
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        };
        resolve(tokens);
      },

      onFailure: (err: Error) => {
        console.error("Authentication error: ", err);
        reject(err);
      },

      mfaRequired: () => {
        reject(new Error("MFA required"));
      },

      newPasswordRequired: () => {
        reject(new Error("New password required"));
      },
    });
  });
}
