import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken, CustomJwtPayload } from "../Models/User";
import { jwtDecode } from "jwt-decode";


const api = "https://5g9gr4b646.execute-api.us-east-1.amazonaws.com/test/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post(api + "sign_in", {
      email: username,
      password: password,
    });
    
    const access_token = data.data['AuthenticationResult']['AccessToken']
    const id_token = data.data['AuthenticationResult']['IdToken']
    const decoded_id_token = decodeToken(id_token)

    if (!decoded_id_token?.email) {
      throw new Error("Invalid token structure");
    }

    const user_profile_token:UserProfileToken = {
      userName: decoded_id_token.email,
      email:decoded_id_token.email,
      token:access_token
    }

    console.log(user_profile_token)

    return user_profile_token;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post(api + "sign_up", {
      email: username,
      password: password,
    });
    
    const access_token = data.data['AuthenticationResult']['AccessToken']
    const id_token = data.data['AuthenticationResult']['IdToken']
    const decoded_id_token = decodeToken(id_token)

    if (!decoded_id_token?.email) {
      throw new Error("Invalid token structure");
    }

    const user_profile_token:UserProfileToken = {
      userName: decoded_id_token.email,
      email:decoded_id_token.email,
      token:access_token
    }

    console.log(user_profile_token)

    return user_profile_token;
  } catch (error) {
    handleError(error);
  }
};


function decodeToken(token:string) {
  try {
    return jwtDecode<CustomJwtPayload>(token)
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}