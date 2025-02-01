"use client";
import { useState, useEffect } from "react";
import dashlink from "../data/links.json";
import Link from "next/link";
import logo from "/public/logo/pody logo dark.png";
import Image from "next/image";
import useProfile from "@/hooks/user/useProfile";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import Loader from "@/components/preloader/Loader";
import { useNavigate } from "@/components/utils/PageRouter";
import useLogout from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";

type FloatingElement = {
  id: number;
  left: string;
  top: string;
};

const AsideNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );
  const { profile, isLoading, isError } = useProfile();
  useEffect(() => {
    const elements = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setFloatingElements(elements);
  }, []);

  const randomPosition = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  });

  const { logout } = useLogout();

  const { handleClick, isPending } = useNavigate();

  const ConnectEmail = () => {
    return (
      <>
        {!isLoading && !profile?.isEmailVerified && profile?.walletAddress && (
          <li className="cursor-pointer" onClick={() => handleClick("/email")}>
            Add Email{" "}
            <sup className="web3-gradient-text font-medium">+10,000</sup>
          </li>
        )}
      </>
    );
  };

  const ClaimRole = () => {
    return (
      <>
        {!isLoading && profile?.isEmailVerified && profile?.walletAddress && (
          <li className="cursor-pointer" onClick={() => handleClick("/discord/verify")}>
            Claim Role
          </li>
        )}
      </>
    );
  };

  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard/call');
    router.prefetch('/dashboard/explore');
    router.prefetch('/dashboard/nft');
    router.prefetch('/dashboard/leaderboard');
    router.prefetch('/dashboard/referral');
    router.prefetch('/dashboard/reward');
    router.prefetch('/call');
    router.prefetch('/classroom');
  }, [router]);

  return (
    <>
      {isPending && <Loader />}
      {/* Desktop menu */}
      <aside className="__nav_lg_dash flex-col items-center w-full bg-pody-mintgreen">
        <div className="md:flex w-full items-center justify-between py-6 px-12 gap-x-4 xl:max-w-[1300px] font-medium select-none">
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
            <button onClick={() => handleClick("/")}>
              <Image
                src={logo}
                className="w-14 object-contain mb-4 md:mb-0 sm:me-4"
                alt="Pody"
              />
            </button>
            <ul className="text-sm flex flex-wrap justify-center sm:flex-row gap-3 sm:gap-x-6">
              {dashlink.map((data, index) => (
                <li
                  key={index}
                  className="py-2 hover:text-slate-600 hover:transition-all rounded-full text-slate-800"
                >
                  <button
                    onClick={() => {
                      handleClick(data.url);
                    }}
                    style={{ opacity: isPending ? 0.5 : 1 }}
                  >
                    {data.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <header className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-4 sm:mt-0">
            <div className="flex flex-row items-center gap-x-2">
              <div className="w-6 h-6 rounded-full bg-black/20">
                <AvatarParticipant name={profile?.username || "unknown user"} />
              </div>
              {isLoading || isError ? (
                <div className="w-24 h-6 bg-slate-300 animate-pulse rounded"></div>
              ) : (
                <h3 className="text-sm select-none text-slate-800 flex items-center">
                  Hello, {profile?.username}
                  {profile?.isEmailVerified && (
                    <Image
                      src="/milestone/verified.svg"
                      alt="badge"
                      className="ml-1 w-3.5 h-3.5 object-cover"
                      width={100}
                      height={100}
                    />
                  )}
                </h3>
              )}
            </div>
            <ul className="flex flex-row items-center text-sm text-slate-700 __dashheader_icon_info">
              <ConnectEmail />
              <ClaimRole />
              <li className="cursor-pointer" onClick={logout}>
                Logout
              </li>
            </ul>
          </header>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="__nav_lg_dash_ctrl bg-pody-mintgreen w-full py-6 px-5 gap-x-4 relative">
        <div className="flex flex-row items-center justify-between w-full sm:w-auto relative">
          <Link href="/">
            <Image
              src={logo}
              className="w-20 object-contain sm:mb-0 sm:me-6"
              alt="Pody"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${mobileMenuOpen && "fixed z-[60] right-8"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-9 h-9 ${
                mobileMenuOpen ? "text-slate-300 " : "text-slate-700"
              }`}
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
              ) : (
                <path d="M160-269.23v-40h640v40H160ZM160-460v-40h640v40H160Zm0-190.77v-40h640v40H160Z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Pody Mobile menu */}
      <div
        className={`fixed h-full right-0 top-0 w-full __shadow_pody bg-pody-secondary __nav_mobile_dash z-50 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full relative overflow-hidden text-3xl font-extrabold">
          <div className="absolute inset-0 opacity-20">
            {floatingElements.map(({ id, left, top }) => (
              <motion.div
                key={id}
                className="absolute bg-pody-dark w-1 h-1 rounded-full"
                style={{ left, top }}
                animate={randomPosition()}
                transition={{
                  duration: Math.random() * 30 + 2, // Random duration between 2 and 7 seconds
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <button onClick={() => handleClick("/")}>
            <Image src={logo} className="w-20 object-contain mb-6" alt="Pody" />
          </button>
          <ul className="text-lg flex flex-col items-center gap-y-4 relative z-50 text-slate-400">
            {dashlink.map((data, index) => (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleClick(data.url);
                }}
                key={index}
              >
                <li className="py-2 hover:text-pody-primary transition-all rounded-full">
                  {data.title}
                </li>
              </button>
            ))}
            <ConnectEmail />
            <ClaimRole />
            <li className="cursor-pointer" onClick={logout}>
              Logout
            </li>
          </ul>
          <div className="mt-6 flex flex-col items-center gap-y-4">
            <div className="flex items-center gap-x-1.5 bg-slate-500/50 p-1.5 rounded-full">
              <div className="w-8 h-8 rounded-full bg-pody-secondary overflow-hidden">
                <AvatarParticipant name={profile?.username || "unknown user"} />
              </div>
              {isLoading || isError ? (
                <div className="w-24 h-6 bg-slate-600/50 rounded animate-pulse"></div>
              ) : (
                <h3 className="text-xs text-slate-300">
                  Hello, {profile?.username ?? "..."}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideNav;
