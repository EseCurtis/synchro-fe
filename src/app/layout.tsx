"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import clsx from "clsx";
import { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { toastClasses } from "./_components/AppToast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="en">
      <body className="font-outfit font-normal">
        <ToastContainer
          position={"top-center"}
          autoClose={3000}
          hideProgressBar={true}
          transition={Slide}
          draggablePercent={60}
          draggableDirection="y"
          icon={false}
          toastClassName={({ type }: any) => {
            const classes = toastClasses[type];

            return clsx(
              classes
                ? classes
                : "bg-white shadow-lg border border-neutral-300",
              "relative toastifier flex p-1 rounded-xl mt-2 z-[1200] w-full justify-between overflow-hidden cursor-pointer"
            );
          }}
          bodyClassName="p-2"
          closeOnClick={false}
          pauseOnHover
          closeButton={false}
        />

        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
