import { useAuthContext } from "@/contexts/AuthContext";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { OutgoingHttpHeaders } from "http2";

export type Method = "get" | "post" | "put" | "delete" | "patch";
export type Service = "";

export const urlModifier = (url?: Service) => {
  switch (url) {
    default:
      return "";
  }
};

export default function useHttp({
  config,
  headers,
}: {
  config?: AxiosRequestConfig<any>;
  headers?: OutgoingHttpHeaders;
}): AxiosInstance {
  const { token, signout } = useAuthContext();
  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    baseURL: "https://env-0465672.dal.togglebox.site",
    // withCredentials: true,
    timeout: 30 * 1000,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const data = response.data;

      if (
        typeof data === "string" &&
        (data.includes("doctype html") || data.includes("<!"))
      ) {
        throw new Error("Service unavailable, please contact support");
      }

      return response;
    },
    async function (e) {
      const statusCode = e?.response?.status;
      const description = e?.response?.data?.error_description;
      const error = e?.response?.data?.error;

      if (description?.includes("Access token expired")) {
        signout();
      } else if (
        error === "invalid_token" ||
        error === "unauthorized" ||
        statusCode === 401
      ) {
        signout();
      }

      return Promise.reject(e);
    }
  );

  const headersConfig: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...headers,
  };

  for (const i in headersConfig) {
    axiosInstance.defaults.headers.common[i] = headersConfig[i]!;
  }
  return axiosInstance;
}
