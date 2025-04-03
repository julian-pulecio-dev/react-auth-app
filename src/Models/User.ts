import { jwtDecode, JwtPayload } from "jwt-decode";

export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
};

export interface CustomJwtPayload extends JwtPayload {
  email: string;
}

export type UserProfile = {
  userName: string;
  email: string;
};
