"use client";

import AuthLayout from "@/layouts/auth";
import { useForm } from "@tanstack/react-form";
import useLogin from "./hooks/useLogin";
import ConnectOrComponent from "@/components/global/ConnectOrComponent";
import Link from "next/link";
import AuthHeader from "@/components/Auth/AuthHeader";
import useAnonymousLogin from "@/hooks/auth/useAnonymousLogin";
import { Tooltip } from "@/components/misc/tooltip";
import { useNavigate } from "@/components/utils/PageRouter";
import Loader from "@/components/preloader/Loader";

const AnonymousLogin = () => {
  const { login, successAnonMessage, errorMessage } = useAnonymousLogin();
  const form = useForm<"">({
    onSubmit: async () => {
      await login.mutateAsync();
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <button
        className="py-3 border-[.75px] border-slate-300 text-slate-500 hover:border-pody-dark_secondary/90 duration-300 hover:bg-pody-dark_secondary hover:transition-all w-full rounded-lg hover:text-slate-200 text-sm mt-1 hover:bg-pody-dark_secondary/90"
        disabled={login.isPending}
      >
        {login.isPending ? (
          <div className="flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-slate-200 animate-spin dark:text-slate-600 fill-pody-primary me-1.5"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          "Continue as Anonymous"
        )}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2 text-left">
          {errorMessage.message}
        </p>
      )}
      {successAnonMessage && (
        <p className="text-green-500 text-sm mt-2 text-left">
          {successAnonMessage}
        </p>
      )}
    </form>
  );
};

const Login = () => {
  const { login, successMessage, errorMessage } = useLogin();
  const form = useForm<"">({
    onSubmit: async () => {
      await login.mutateAsync();
    },
  });
  const { handleClick, isPending } = useNavigate();

  return (
    <main
      className="relative float-left w-full h-full overflow-hidden"
      aria-label="Login"
    >
      {isPending && <Loader />}
      <AuthLayout>
        <div className="w-full max-w-96 md:px-6">
          <AuthHeader />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <ConnectOrComponent>
              <button
                className="py-3 bg-pody-dark_secondary w-full rounded-lg text-slate-200 text-sm mt-1 hover:bg-pody-dark_secondary/90"
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <div className="flex items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-slate-200 animate-spin dark:text-slate-600 fill-pody-primary me-1.5"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </ConnectOrComponent>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {errorMessage.message}
              </p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2 text-left">
                {successMessage}
              </p>
            )}
          </form>
          <div className="flex items-center my-4">
            <div className="w-full h-[.5px] bg-slate-300"></div>
            <span className="px-4 text-sm text-slate-500 font-semibold">
              OR
            </span>
            <div className="w-full h-[.5px] bg-slate-300"></div>
          </div>
          <AnonymousLogin />
          <div className="text-sm mt-2 text-slate-500">
            <span>Don&apos;t have pody passport yet?</span>{" "}
            <Link className="text-blue-500" href="/signup">
              Mint Passport
            </Link>
          </div>
        </div>
      </AuthLayout>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Tooltip text="Pody Login">
            <button
              aria-label="Get help"
              className="relative p-2.5 rounded-full bg-gradient-to-r from-pody-secondary to-pody-dark_secondary hover:scale-110 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-purple-500/25"
              onClick={() => handleClick("/help/podylogin")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-slate-200"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M479.56-255.39q17.13 0 28.94-11.82 11.81-11.83 11.81-28.97 0-17.13-11.83-28.94-11.83-11.8-28.96-11.8-17.13 0-28.94 11.83-11.81 11.83-11.81 28.96 0 17.13 11.83 28.94 11.83 11.8 28.96 11.8Zm-28.33-143.23h56.31q.77-29.53 8.65-47.19 7.89-17.65 38.27-46.8 26.39-26.39 40.42-48.74 14.04-22.34 14.04-52.77 0-51.65-37.11-80.69-37.12-29.03-87.81-29.03-50.08 0-82.88 26.73-32.81 26.73-46.81 62.96l51.38 20.61q7.31-19.92 25-38.81 17.69-18.88 52.54-18.88 35.46 0 52.42 19.42 16.97 19.43 16.97 42.73 0 20.39-11.62 37.31-11.61 16.92-29.61 32.69-39.39 35.54-49.77 56.7-10.39 21.15-10.39 63.76ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
    </main>
  );
};

export default Login;
