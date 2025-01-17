'use client'
import { ReactNode, useEffect, useState } from "react";
import axios from "@/network/axios";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import Loader from "@/components/preloader/Loader";
import NetworkError from "@/components/Error/NetworkError";

/* eslint-disable react-hooks/exhaustive-deps */
const AuthMiddleware = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { startLoading, stopLoading } = useLoading(true);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    startLoading();


    const fetchProfile = async () => {
      try {
        const response = await axios.get<unknown>("/user/profile");
        if (response.data) {
          setIsLoggedIn(true);
        } else {
          throw new Error("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if(!window.location.href.includes('/login') && !window.location.href.includes('/signup')) {
          sessionStorage.setItem('redirect_after_login',window.location.href)
        }   
        router.push("/login");
      } finally {
        stopLoading();
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  if (isLoggedIn) return children;

  if (typeof window !== 'undefined' && !window?.navigator.onLine) return <NetworkError />;

  return <Loader />;
};

export default AuthMiddleware;
