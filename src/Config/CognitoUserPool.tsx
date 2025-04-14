export const cognitoUserPool = {
  UserPoolId: 'us-east-1_P3DDUyDM6',
  ClientId: '4i6p8852lq79df87m9549bfd4l',
  Region: 'us-east-1', // e.g., 'us-east-1'
  IdentityPoolId: 'your-identity-pool-id', // only needed if using AWS services
  Domain: 'user-pool-domain-686255988152-us-east-1.auth.us-east-1.amazoncognito.com',
  RedirectSignIn: 'http://localhost:5173/social-login-confirm-code',
  RedirectSignOut: 'http://localhost:5173',
  Scope: ['email', 'openid', 'phone'],
  ResponseType: 'code' // or 'token' for implicit grant
};
