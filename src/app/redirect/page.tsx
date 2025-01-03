"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOCAuth } from "@opencampus/ocid-connect-js";

const RedirectPage = () => {
  const router = useRouter();
  const { authState, ocAuth } = useOCAuth();
  const [link, setLink] = useState("/signup");

  useEffect(() => {
    const OCVisitedPage = localStorage.getItem("OCVisitedPage");
    setLink(OCVisitedPage || "/signup");
  }, []);

  const loginSuccess = () => {
    router.push(link);
  };

  const loginError = () => {
    router.push("/");
  };

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await ocAuth.handleLoginRedirect();
        loginSuccess();
      } catch (error) {
        console.error("Error:", error);
        loginError();
      }
    };

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ocAuth]);

  if (authState.error) {
    return <div>Error Logging in: {authState.error.message}</div>;
  }

  return <div>Loading...</div>;
};

export default RedirectPage;
