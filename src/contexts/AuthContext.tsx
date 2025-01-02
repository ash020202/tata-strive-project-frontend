import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { getToken, removeToken } from "../service/authService";
import { jwtDecode } from "jwt-decode"; // Correctly imported as default export
import { CartItem, Order } from "../types";
import { getUserDetails } from "../service/userService";

export interface OrderItem {
  id: string;
  userId: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  foodItemList: CartItem[];
  totalPrice: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
}
// Define the structure of the JWT payload
interface DecodedToken {
  sub: string;
  roles: string[];
  email: string;
  userId: string;
}

// Define the structure of the user data
export interface UserData {
  username: string;
  roles: string[];
  email: string;
  id: string;
  orders: OrderItem[];
}

// Define the AuthContext value type
interface AuthContextValue {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (token: string, orders: OrderItem[]) => void;
  logout: () => void;
  updateUser: (userId: string) => void;
}

// Create the context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Initialize authentication state
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setIsAuthenticated(true);
        setUserData({
          username: decodedToken.sub,
          roles: decodedToken.roles,
          email: decodedToken.email,
          id: decodedToken.userId,
          orders: [],
        });
        updateUser(decodedToken.userId);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  const login = (token: string, orders: OrderItem[]): void => {
    try {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setUserData({
        username: decodedToken.sub,
        roles: decodedToken.roles,
        email: decodedToken.email,
        id: decodedToken.userId,
        orders,
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const updateUser = async (userId: string) => {
    const updatedUserData = await getUserDetails(userId);
    // console.log(updatedUserData);
    setUserData(updatedUserData);
  };
  const logout = (): void => {
    removeToken();
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
