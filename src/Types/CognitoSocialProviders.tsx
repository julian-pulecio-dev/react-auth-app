export type CognitoSocialProvider =
  | 'Google'        // For Google
  | 'Facebook'      // For Facebook
  | 'LoginWithAmazon' // For Amazon
  | 'SignInWithApple' // For Apple
  | string;          // Fallback for any other providers