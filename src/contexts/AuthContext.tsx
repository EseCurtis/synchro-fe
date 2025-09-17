// auth context
"use client";
import { LoadingScreen } from "@/app/layouts/LoadingScreen";
import { useGetUserWithoutContext } from "@/hooks/api/auth/useGetCurrentUser";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHandleError } from "../hooks/api/useHandleError";

export type User = {
  id: string;
  email: string;
  phoneNumber?: string;
  phoneVerified: boolean;
  authProvider: string;
  providerId: string;
  dateOfBirth?: Date;
  gender?: string;
  pushToken?: string;
  ipAddress?: string;
  timezone?: string;
  countryCode?: string;
  defaultCurrency: string;
  status: string;
  isSuspended: boolean;
  suspensionReason?: string;
  suspensionDuration?: number;
  suspendedAt?: Date;
  lastLoginAt?: Date;
  role: string;
  isAdmin: boolean;
  adminPermissions?: string[];
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  // Legacy fields for backward compatibility
  address?: string;
  avatar?: string;
  bio?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  recieveGeneralEmail?: boolean;
  recieveNewPropertyEmail?: boolean;
  ref?: string;
  referralCode?: string;
  state?: string;
  username?: string;
  zip?: string;
  totalEarning?: number;
  totalWithdrawal?: number;
  city?: string;
  name?: string;
  profileImage?: string;
  userRole?: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  signout: () => void;
  signin: (token: string) => void;
  loading: boolean;
  getCurrentUser: (token: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  signout: () => {},
  signin: () => {},
  loading: true,
  getCurrentUser: () => {},
  isMenuOpen: true,
  setIsMenuOpen: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { push } = useRouter();
  const pathname = usePathname();
  const { handleError } = useHandleError();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(true);
  }, [isMobile]);

  const { mutate: getCurrentUser } = useGetUserWithoutContext({
    onSuccess(res) {
      setUser(res?.data);
      setLoading(false);
      if (pathname === "/") {
        push("/dashboard");
      }
    },
    onError(er) {
      localStorage.removeItem("token");
      setToken("");
      setLoading(false);
      handleError(er);
    },
  });

  const signout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    push("/");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    setToken(accessToken);
    getCurrentUser(accessToken);
  }, []);

  const signin = (accessToken: string) => {
    setLoading(true);
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
    getCurrentUser(accessToken);
    push("/dashboard");
  };

  if (loading) {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#4338CA" />
          <link rel="icon" href="/favicon.png" />
          <title>Synchro</title>
        </Head>
        <LoadingScreen />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signout,
        loading,
        signin,
        getCurrentUser,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4338CA" />
        <link rel="icon" href="/favicon.png" />
        <title>Synchro</title>
      </Head>
      {children}
    </AuthContext.Provider>
  );
}
