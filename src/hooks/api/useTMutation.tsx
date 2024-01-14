import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useHandleError } from "./useHandleError";
import useHttp, { Method, urlModifier } from "./useHttp";
import { generateUrlParamsFromObject } from "@/helpers/common/generateUrlParamsFromObject";

type Args = {
  url: string;
  options?: UseMutationOptions<any, unknown, any, unknown>;
  method?: Method;
  pathParams?: string[];
  appendQueryParams?: boolean;
  config?: AxiosRequestConfig<any>;
};

export function useTMutation<T>({
  url,
  options,
  method = "post",
  pathParams,
  appendQueryParams = false,
  config,
}: Args): UseMutationResult<any, unknown, T, unknown> {
  const api = useHttp({ config });

  const modifier = urlModifier("");
  const { handleError } = useHandleError();

  return useMutation(
    async (requestBody) => {
      if (pathParams) {
        return api[method](
          `${modifier}${url}/${generateUrlParamsFromObject({
            data: requestBody,
            acceptedPathParams: pathParams,
          })}`
        ).then((res) => res.data);
      }

      if (appendQueryParams) {
        return api[method](
          `${modifier}${url}${generateUrlParamsFromObject({
            data: requestBody,
          })}`
        ).then((res) => res.data);
      }

      return api[method](`${modifier}${url}`, requestBody).then(
        (res) => res.data
      );
    },
    {
      onError(e) {
        handleError(e);
      },
      ...options,
    }
  );
}
