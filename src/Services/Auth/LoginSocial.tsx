import { cognitoUserPool } from "../../Config/CognitoUserPool";
import { CognitoSocialProvider } from "../../Types/CognitoSocialProviders";

export async function loginSocial(provider: CognitoSocialProvider) {
    const { Domain, ClientId, RedirectSignIn, ResponseType, Scope } = cognitoUserPool;
    const scope = Scope.join('+');
    
    const url = `https://${Domain}/oauth2/authorize?identity_provider=${provider}&response_type=${ResponseType}&client_id=${ClientId}&redirect_uri=${RedirectSignIn}&scope=${scope}`;
    

    window.location.href = url;
  };
  