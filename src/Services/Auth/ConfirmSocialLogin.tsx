import axios from "axios";

const api = "https://4jt4352cqc.execute-api.us-east-1.amazonaws.com/test/";

export const confirmSocialLogin = async (code:string, provider:string) => {
    console.log("Confirming social login with code:", code);
    console.log("Provider:", provider);
    const response = await axios.post(api + "confirm_social_sign_in_code", {
      code,
      provider
    });
    const access_token = response.data.accessToken
    const user = response.data.user
  
    console.log(access_token)
    console.log(user)
  };