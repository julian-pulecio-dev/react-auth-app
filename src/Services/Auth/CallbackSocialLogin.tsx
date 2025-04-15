import axios, { AxiosResponse } from "axios";
import { AuthGoogleTokens } from "../../Types/AuthGoogleTokens";

const api = "https://4jt4352cqc.execute-api.us-east-1.amazonaws.com/test/";

export const callbackSocialLogin = async (code:string, provider:string) => {
    const response: AxiosResponse<AuthGoogleTokens> = await axios.post(api + "confirm_social_sign_in_code", {
      code,
      provider
    });

    return response.data;
    
  };