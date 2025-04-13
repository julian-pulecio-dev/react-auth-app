export const cognitoUserPool = {
  UserPoolId: 'us-east-1_GLXx8chOj',
  ClientId: '7dn43p2okqqlgkc46c3kpdn3hd',
  Region: 'us-east-1', // e.g., 'us-east-1'
  IdentityPoolId: 'your-identity-pool-id', // only needed if using AWS services
  Domain: 'https://user-pool-domain-686255988152-us-east-1.auth.us-east-1.amazoncognito.com', // e.g., 'your-domain.auth.us-east-1.amazoncognito.com'
  RedirectSignIn: 'http://localhost:5173',
  RedirectSignOut: 'http://localhost:5173',
  // Add scopes as needed
  Scope: ['email', 'openid', 'phone'],
  ResponseType: 'code' // or 'token' for implicit grant
};
