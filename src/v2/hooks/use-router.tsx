import { useNProgress } from "@/hooks/useNProgress";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

export function useRouterO() {
  const { push, ...rest } = useRouter();
  const { startProgress } = useNProgress();

  const oPush = (url: string, option?: NavigateOptions) => {
    startProgress();
    return push(url, option);
  };

  return {
    push: oPush,
    ...rest,
  };
}
