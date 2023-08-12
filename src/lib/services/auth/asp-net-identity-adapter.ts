import { type AdapterUser, type Adapter } from "next-auth/adapters";

export default function AspNetIdentityAdapter(baseUrl: string): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const url = `${baseUrl}/account/register`;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user.username,
          password: "password",
          confirmPassword: "password",
          displayName: user.name,
          email: user.email,
        }),
      });

      if (result.status === 200) {
        return result.json();
      } else if (result.status === 400) {
        console.log("authService", "registerUser", result);
      }
      throw Error(`Unable to create user: result ${result.status}`);
    },
    async getUser(id) {
      throw Error(`Not implemented`);
    },
    async getUserByEmail(email) {
      throw Error(`Not implemented`);
    },
    async getUserByAccount({ providerAccountId, provider }) {
      throw Error(`Not implemented`);
    },
    async updateUser(user) {
      throw Error(`Not implemented`);
    },
    async deleteUser(userId) {
      throw Error(`Not implemented`);
    },
    async linkAccount(account) {
      throw Error(`Not implemented`);
    },
    async unlinkAccount({ providerAccountId, provider }) {
      throw Error(`Not implemented`);
    },
    async createSession({ sessionToken, userId, expires }) {
      throw Error(`Not implemented`);
    },
    async getSessionAndUser(sessionToken) {
      throw Error(`Not implemented`);
    },
    async updateSession({ sessionToken }) {
      throw Error(`Not implemented`);
    },
    async deleteSession(sessionToken) {
      throw Error(`Not implemented`);
    },
    async createVerificationToken({ identifier, expires, token }) {
      throw Error(`Not implemented`);
    },
    async useVerificationToken({ identifier, token }) {
      throw Error(`Not implemented`);
    },
  };
}
