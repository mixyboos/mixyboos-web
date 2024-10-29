"use client";
import * as React from "react";
import * as AuthService from "@/lib/services/auth/auth-service";
import ProfileModel from "@/lib/models/profile";
type AuthContextType = {
  user?: ProfileModel | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
};
const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: false,
  login: () => Promise.resolve(false),
});
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = React.useState<ProfileModel | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [initialLoading, setInitialLoading] = React.useState(true);
  React.useEffect(() => {
    AuthService.getProfile()
      .then((profile) => setProfile(profile))
      .catch((_error) => {})
      .finally(() => setInitialLoading(false));
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    const response = await AuthService.login(username, password);
    setProfile(await AuthService.getProfile());
    setLoading(false);
    return response.status === 200;
  };
  const memoedValue = React.useMemo(
    () => ({
      user: profile,
      loading,
      login,
    }),
    [profile, loading, login]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
