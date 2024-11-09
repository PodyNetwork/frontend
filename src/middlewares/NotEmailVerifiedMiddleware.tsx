'use client'
import { ReactNode, useEffect, useState } from "react";
import axios from "@/network/axios";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import Loader from "@/components/preloader/Loader";
import NetworkError from "@/components/Error/NetworkError";
import type { ProfileResponse } from "@/types/profile";

/* eslint-disable react-hooks/exhaustive-deps */
const NotEmailVerifiedMiddleware = ({ children }: { children: ReactNode }) => {
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const { startLoading, stopLoading } = useLoading(true);
  const router = useRouter();

  useEffect(() => {
    if (emailNotVerified) return;
    startLoading();

    const fetchProfile = async () => {
      try {
        const response = await axios.get<ProfileResponse>("/user/profile");
         
        if(!response.data){
          throw new Error("Profile not found");
        }

        if(response.data.data.isEmailVerified) {
          router.push("/dashboard");
          return
        }
        
        if (!response.data.data.isEmailVerified) {
          setEmailNotVerified(true)
        }
      
      } catch (error) {
        console.error("Error fetching profile:", error);
        sessionStorage.setItem('redirect_after_login',window.location.href)
        router.push("/login");
      } finally {
        stopLoading();
      }
    };

    fetchProfile();
  }, [emailNotVerified]);

  if (emailNotVerified) return children;

  if (typeof window !== 'undefined' && !window?.navigator.onLine) return <NetworkError />;

  return <Loader />;
};

export default NotEmailVerifiedMiddleware;
