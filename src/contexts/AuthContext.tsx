// auth context
"use client";
import { LoadingScreen } from "@/app/layouts/LoadingScreen";
import { useGetUserWithoutContext } from "@/hooks/api/auth/useGetCurrentUser";
import { useRouterO } from "@/v2/hooks/use-router";
import { UserData } from "@/v2/types/user.types";
import Head from "next/head";
import { usePathname } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHandleError } from "../hooks/api/useHandleError";

export type User = UserData;

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

  const { push } = useRouterO();
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
