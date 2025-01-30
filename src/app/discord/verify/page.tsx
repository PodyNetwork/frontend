"use client";
import { HeaderNavEmain } from "@/components/email/HeaderNav";
import useGetDiscordVerification from "@/hooks/discord/useGetVerificationCode";
import { useRef, useState } from "react";

const Page = () => {
  const { verification } = useGetDiscordVerification();
  const [copyStatus, setCopyStatus] = useState<string>("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(verification?.code || "");
      setCopyStatus("Code copied!");
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
        timeoutRef.current = setTimeout(() => setCopyStatus(""), 2000); 
    } catch {
      setCopyStatus("Failed to copy code");
    }
  };
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <main className="w-full relative" aria-label="verify otp">
      <div className="flex flex-col relative min-h-screen">
        <HeaderNavEmain />
        <section className="relative w-full flex-1 h-full flex items-center flex-col justify-center z-50">
          <div className="w-full px-4 md:px-12">
            <div className="w-full xs:max-w-md border border-slate-500 p-9 flex-1 flex flex-col gap-y-2.5 __shadowpody mx-auto relative">
              <div className="absolute inset-0 [background:radial-gradient(circle_at_center,_rgba(88,101,242,0.1)_0%,_transparent_70%)] mix-blend-overlay"></div>
              <div>
                <svg
                  id="fi_5968759"
                  enableBackground="new 0 0 512.6 512.6"
                  className="size-9 shadow-xl"
                  viewBox="0 0 512.6 512.6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="m227.6 270.06c0 20.56-14.73 37.29-33.25 37.29-18.23 0-33.25-16.73-33.25-37.29 0-20.55 14.73-37.29 33.25-37.29 18.66 0 33.54 16.89 33.25 37.29z"></path>
                    <path d="m350.53 270.06c0 20.56-14.58 37.29-33.25 37.29-18.23 0-33.25-16.73-33.25-37.29 0-20.55 14.73-37.29 33.25-37.29 18.67 0 33.54 16.89 33.25 37.29z"></path>
                    <path d="m457.21 0h-401.82c-30.59 0-55.39 24.8-55.39 55.39v401.82c0 30.59 24.8 55.39 55.39 55.39h401.82c30.59 0 55.39-24.8 55.39-55.39v-401.82c0-30.59-24.8-55.39-55.39-55.39zm-18.12 349.4c-.02.34-.2.64-.48.85-31.64 23.24-62.3 37.35-92.53 46.7-.48.15-1-.03-1.29-.44-6.99-9.72-13.33-19.97-18.89-30.73-.32-.63-.03-1.39.63-1.64 10.07-3.8 19.66-8.36 28.87-13.74.73-.43.78-1.47.1-1.97-1.95-1.45-3.89-2.98-5.74-4.51-.35-.28-.82-.34-1.21-.14-59.84 27.64-125.39 27.64-185.93 0-.4-.18-.87-.12-1.2.16-1.85 1.52-3.79 3.04-5.73 4.49-.67.5-.61 1.54.11 1.97 9.22 5.28 18.8 9.94 28.86 13.75.66.25.97 1 .65 1.63-5.44 10.78-11.79 21.03-18.9 30.74-.31.4-.82.58-1.3.43-30.09-9.35-60.74-23.46-92.38-46.7-.27-.21-.46-.53-.49-.87-6.44-69.03 6.7-138.92 54.66-210.58.12-.19.29-.34.5-.42 23.59-10.84 48.88-18.81 75.3-23.36.49-.07.97.15 1.21.57 3.27 5.79 7 13.2 9.53 19.26 27.85-4.25 56.14-4.25 84.58 0 2.52-5.93 6.12-13.47 9.38-19.26.24-.44.72-.66 1.21-.57 26.43 4.57 51.72 12.54 75.3 23.36.21.08.38.23.48.44 41.78 61.45 62.42 130.77 54.7 210.58z"></path>
                  </g>
                </svg>
              </div>
              <h2 className="font-medium text-slate-700 text-xl">
                Connect Discord
              </h2>
              <p className="text-sm text-slate-500">
                Copy the Code below to your discord to claim OP Testnet or OP Mainnet role
              </p>
              <div className="mt-2">
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-slate-600"
                >
                  Code <sup className="text-red-500 font-bold">*</sup>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    id="otp"
                    className="bg-slate-50 border border-slate-500 text-slate-800 text-base h-11 outline-none block w-full p-2.5"
                    placeholder="**** **** **** ****"
                    value={verification?.code}
                    readOnly
                  />
                  <button
                    onClick={handleCopy}
                    className="bg-pody-dark border-l-0 border border-slate-500 relative px-3 h-11 text-sm text-white hover:opacity-80 hover:transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-slate-100"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                    >
                      <path d="M364.62-280q-27.62 0-46.12-18.5Q300-317 300-344.62v-430.76q0-27.62 18.5-46.12Q337-840 364.62-840h310.76q27.62 0 46.12 18.5Q740-803 740-775.38v430.76q0 27.62-18.5 46.12Q703-280 675.38-280H364.62Zm0-40h310.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-430.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H364.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v430.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69Zm-120 160q-27.62 0-46.12-18.5Q180-197 180-224.61v-470.77h40v470.77q0 9.23 7.69 16.92 7.69 7.69 16.93 7.69h350.76v40H244.62ZM340-320v-480 480Z" />
                    </svg>
                  </button>
                </div>
              </div>
              {copyStatus && (
                <p className="text-xs text-green-500">{copyStatus}</p>
              )}
              <p className="text-xs mt-2 text-slate-700">
                Connecting your Discord account to our platform, you do not need
                to log in to Discord. Instead, you will receive a unique code
                that you simply need to copy and paste into our bot&apos;s
                channel. For your security, please never share this code with
                anyone. Our team will never ask for your Discord login
                information, including your password or two-factor
                authentication (2FA) codes. If you have any concerns, please
                contact our support team.
              </p>
            </div>
          </div>
        </section>
        <div className="bg-red-100">
          <svg
            enableBackground="new 0 0 100 100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            id="fi_15047513"
            className="size-52 fixed bottom-0 right-0 -rotate-45 text-[#5865F2]/5 z-10"
            fill="currentColor"
          >
            <g id="Layer_1"></g>
            <g id="Layer_2">
              <g>
                <path d="m64.193 47.63c2.334 0 4.465 1.302 5.698 3.484.256.452.726.706 1.21.706 1.029.026 1.747-1.183 1.208-2.074-1.708-3.019-4.818-4.894-8.117-4.894-12.607.418-12.524 19.726 0 20.216 5.312 0 9.473-4.44 9.473-10.108-.033-1.828-2.747-1.825-2.779 0 0 4.11-2.94 7.329-6.695 7.329-8.833-.313-8.892-14.399.002-14.659z"></path>
                <path d="m44.737 54.982c.211-5.297-4.149-10.216-9.474-10.131-12.608.419-12.523 19.727 0 20.215 5.313.001 9.474-4.439 9.474-10.084zm-16.168-.023c-.157-6.239 7.012-9.771 11.312-5.363 4.305 4.223 1.52 12.82-4.618 12.693-3.69-.001-6.694-3.288-6.694-7.33z"></path>
                <path d="m86.094 24.562c-10.864-8.869-24.123-9.672-24.451-8.483 0 0-1.11 1.268-1.11 1.268-.669.722-.299 1.989.647 2.245.674.202 1.328.409 1.965.62-9.388-1.933-19.11-1.551-28.487.298 1.233-.426 2.539-.838 3.918-1.229.946-.234 1.333-1.5.688-2.227-.411-.44-1.054-1.537-1.83-1.45-.02-.083-12.775.089-23.438 8.957-.078.141-1.943 3.515-4.18 9.224-.626 1.723 1.884 2.697 2.587 1.014 1.821-4.647 3.413-7.747 3.883-8.63 4.241-3.105 8.396-4.973 11.883-6.096-7.792 3.468-11.499 6.977-11.703 7.174-1.146 1.104.232 2.987 1.629 2.22 18.938-10.094 43.589-10.543 62.559.004 1.369.775 2.794-1.151 1.615-2.231-.222-.211-4.747-4.436-14.232-8.206 4.014.839 9.827 2.756 15.764 7.133 1.277 2.416 10.979 21.53 11.101 44.45-1.563 2.222-8.137 10.217-22.156 10.904-.682-.818-2.069-2.485-3.488-4.216 9.308-3.242 12.995-9.069 13.157-9.332.773-1.24-.729-2.707-1.947-1.889-17.856 11.744-42.397 11.426-60.261.021-1.166-.879-2.784.641-1.983 1.861.156.257 3.703 5.949 12.729 9.243-1.455 1.805-2.906 3.551-3.608 4.393-8.549-.112-18.133-4.802-22.157-10.959.048-9.99 1.869-20.379 5.411-30.886.569-1.73-2.029-2.612-2.632-.888-3.59 11.159-5.989 22.27-5.37 32.881.288.493 7.253 12.084 25.33 12.656.424.014.834-.168 1.107-.494.03-.035 2.975-3.538 5.339-6.532.612-.734.225-1.943-.693-2.192 4.547 1.498 20.09 4.356 32.365.304-.616.444-.728 1.402-.237 1.981 2.357 2.907 5.217 6.324 5.245 6.358.275.327.651.51 1.11.497 16.405-.52 23.844-10.359 25.241-12.444 1.303-24.353-11.194-47.014-11.31-47.322z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </main>
  );
};

export default Page;
