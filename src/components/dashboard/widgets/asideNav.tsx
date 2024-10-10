"use client";
import { useState, useEffect } from "react";
import dashlink from "../data/links.json";
import Link from "next/link";
import logo from "/public/logo/pody logo dark.png";
import Image from "next/image";
import userIcon from "/public/avatar/user5.jpeg";
import useProfile from "@/hooks/user/useProfile";
import { motion } from "framer-motion"; // Import motion from framer-motion

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
    const elements = Array.from({ length: 30 }, (_, i) => ({
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

  return (
    <>
      {/* Desktop menu */}
      <aside className="hidden md:flex w-full bg-pody-primary/20 items-center justify-between py-6 px-12 gap-x-4">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
          <Image
            src={logo}
            className="w-16 object-contain mb-4 sm:mb-0 sm:me-6"
            alt="Pody"
          />
          <ul className="text-sm flex flex-wrap justify-center sm:flex-row gap-4 sm:gap-x-6">
            {dashlink.map((data, index) => (
              <li
                key={index}
                className="py-2 hover:text-slate-500 hover:transition-all rounded-full text-slate-700"
              >
                <Link href={data.url}>{data.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <header className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-4 sm:mt-0">
          <div className="flex flex-row items-center gap-x-2">
            <div className="w-9 h-9 rounded-full bg-black/20">
              <Image
                src={userIcon}
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-full"
                alt="user"
              />
            </div>
            {isLoading || isError ? (
              <div className="w-24 h-6 bg-slate-300 animate-pulse rounded"></div>
            ) : (
              <h3 className="text-base text-slate-700">
                Hello, {profile?.username}.
              </h3>
            )}
          </div>
          <ul className="flex flex-row items-center text-sm text-slate-700 __dashheader_icon_info">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
              </svg>
            </li>
          </ul>
        </header>
      </aside>

      {/* Mobile menu button */}
      <div className="md:hidden bg-pody-primary/20 w-full py-6 px-6 gap-x-4 relative">
        <div className="flex flex-row items-center justify-between w-full sm:w-auto relative">
          <Image
            src={logo}
            className="w-20 object-contain sm:mb-0 sm:me-6"
            alt="Pody"
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${mobileMenuOpen && "fixed z-50 right-8"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9"
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

      {/* Web3 Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-pody-primary z-40 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
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

          <Image src={logo} className="w-24 object-contain mb-8" alt="Pody" />
          <ul className="text-lg flex flex-col items-center gap-y-4 relative z-50">
            {dashlink.map((data, index) => (
              <Link href={data.url} onClick={() => setMobileMenuOpen(false)}>
                <li
                  key={index}
                  className="py-2 hover:text-indigo-300 transition-all rounded-full text-pody-dark"
                >
                  {data.title}
                </li>
              </Link>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center gap-y-4">
            <div className="flex items-center gap-x-2 bg-indigo-800/50 p-2 rounded-full">
              <div className="w-9 h-9 rounded-full bg-indigo-600 overflow-hidden">
                <Image
                  src={userIcon}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  alt="user"
                />
              </div>
              {isLoading || isError ? (
                <div className="w-24 h-6 bg-indigo-600/50 rounded animate-pulse"></div>
              ) : (
                <h3 className="text-base text-white">
                  Hello, {profile?.username ?? "..."}.
                </h3>
              )}
            </div>
            <ul className="flex gap-x-4 text-sm text-white">
              {/* ... (include the SVG icons here with text-white class) ... */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideNav;
