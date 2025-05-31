import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";
import storage from "../services/LocalStorageService";

const LOCAL_STORAGE_KEY = "user";

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    name: "Viewer User",
    role: "viewer",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuth = !!user;

  useEffect(() => {
    const storedUser = storage.getParsedItem<User>(LOCAL_STORAGE_KEY);
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    storage.setItem(LOCAL_STORAGE_KEY, user);
  };

  const logout = () => {
    setUser(null);
    storage.clearStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const getFakeUsers = () => FAKE_USERS;
