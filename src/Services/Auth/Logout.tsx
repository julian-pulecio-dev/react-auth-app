import { CognitoUserPool } from "amazon-cognito-identity-js";
import { cognitoPool } from "../../Config/CognitoPool";

const userPool = new CognitoUserPool(cognitoPool);

export async function logout() {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut(() => {
                localStorage.clear();
                console.log("Logout successful and local storage cleared");
                resolve(true);
            });
        } else {
            console.error("No user to log out");
            reject(new Error("No user to log out"));
        }
    });
}