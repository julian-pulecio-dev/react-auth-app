
/**
 * Supported social identity providers in Amazon Cognito
 * 
 * Note: These must match exactly what you've configured in your Cognito User Pool
 */
export type CognitoSocialProvider =
  | 'Google'        // For Google
  | 'Facebook'      // For Facebook
  | 'LoginWithAmazon' // For Amazon
  | 'SignInWithApple' // For Apple
  | string;          // Fallback for any other providers

/**
 * Configuration type for Cognito
 */
export interface CognitoConfig {
  UserPoolId: string;
  ClientId: string;
  Region: string;
  IdentityPoolId?: string; // Optional, only needed if using AWS services
  Domain: string;
  RedirectSignIn: string;
  RedirectSignOut: string;
  Scope: string[];
  ResponseType: 'code' | 'token';
}

/**
 * Type for user attributes returned after successful authentication
 */
export interface CognitoUserAttributes {
  sub: string;            // UUID for the user
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;       // URL to profile picture
  [key: string]: any;     // Additional custom attributes
}

/**
 * Type for the authenticated user session
 */
export interface CognitoUserSession {
  idToken: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  userAttributes: CognitoUserAttributes;
}

/**
 * Type for error responses from Cognito
 */
export interface CognitoError {
  code: string;
  name: string;
  message: string;
}

/**
 * Type for the callback URL parameters
 */
export interface CognitoCallbackParams {
  code?: string;        // For authorization code flow
  token?: string;       // For implicit flow
  error?: string;
  error_description?: string;
  state?: string;
}

/**
 * Type for the hosted UI configuration
 */
export interface HostedUIConfig {
  url: string;
  provider: CognitoSocialProvider;
}

// Helper type for Amplify configuration (if using AWS Amplify)
export interface AmplifyConfig {
  Auth: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
    identityPoolId?: string;
    oauth: {
      domain: string;
      scope: string[];
      redirectSignIn: string;
      redirectSignOut: string;
      responseType: 'code' | 'token';
    };
  };
}