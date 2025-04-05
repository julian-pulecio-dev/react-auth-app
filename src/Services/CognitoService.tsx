import { 
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken
} from 'amazon-cognito-identity-js';

// Configuration
const poolData = {
  UserPoolId: 'us-east-1_3Tae1o0SV', // Replace with your user pool ID
  ClientId: '786q0ubcs8367sqj0igip4002q' // Replace with your app client ID
};

// Initialize user pool
const userPool = new CognitoUserPool(poolData);

// Typed response interface
interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

// Main authentication function
export async function authenticateUser(username: string, password: string): Promise<AuthTokens> {
  // Create authentication details
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });
  
  // Create Cognito user
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  });
  
  // Perform authentication
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        const tokens: AuthTokens = {
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken()
        };
        resolve(tokens);
      },
      
      onFailure: (err: Error) => {
        reject(err);
      },
      
      mfaRequired: () => {
        reject(new Error('MFA required'));
      },
      
      newPasswordRequired: () => {
        reject(new Error('New password required'));
      }
    });
  });
}

// Example usage with error handling
export async function login(username: string, password: string): Promise<AuthTokens> {
  try {
    console.log('Starting authentication...');
    const tokens = await authenticateUser(username, password);
    console.log('Authentication successful!');
    console.log(tokens)
    return tokens;
  } catch (error) {
    console.error('Authentication failed:', error);
    
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('Incorrect username or password')) {
        throw new Error('Invalid credentials');
      }
      if (error.message.includes('User is not confirmed')) {
        throw new Error('Please verify your email first');
      }
    }
    
    throw new Error('Login failed. Please try again.');
  }
}

// Helper function to get current authenticated user
export function getCurrentUser(): CognitoUser | null {
  return userPool.getCurrentUser();
}

// Helper function to get session for current user
export async function getCurrentSession(): Promise<CognitoUserSession | null> {
  const user = getCurrentUser();
  if (!user) return null;

  return new Promise((resolve, reject) => {
    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session);
    });
  });
}
