import { CognitoConfig } from './Services/CognitoTypes'

export const cognitoConfig:CognitoConfig = {
  UserPoolId: 'us-east-1_3Tae1o0SV',
  ClientId: '786q0ubcs8367sqj0igip4002q',
  Region: 'us-east-1', // e.g., 'us-east-1'
  IdentityPoolId: 'your-identity-pool-id', // only needed if using AWS services
  Domain: 'user-pool-domain-686255988152-us-east-1.auth.us-east-1.amazoncognito.com', // e.g., 'your-domain.auth.us-east-1.amazoncognito.com'
  RedirectSignIn: 'http://localhost:3000/social-login-confirm-code',
  RedirectSignOut: 'http://localhost:3000/logout',
  // Add scopes as needed
  Scope: ['email', 'openid', 'phone'],
  ResponseType: 'code' // or 'token' for implicit grant
};