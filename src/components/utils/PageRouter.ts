// hooks/useNavigate.ts
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const useNavigate = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return { handleClick, isPending };
};
