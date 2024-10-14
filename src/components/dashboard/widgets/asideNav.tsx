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
      <aside className="hidden md:flex flex-col items-center w-full bg-pody-primary/20">
        <div className="md:flex w-full items-center justify-between py-6 px-12 gap-x-4 xl:max-w-[1300px]">
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
            <Link href="/">
              <Image
                src={logo}
                className="w-14 object-contain mb-4 md:mb-0 sm:me-6"
                alt="Pody"
              />
            </Link>
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
              <div className="w-7 h-7 rounded-full bg-black/20">
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
                <h3 className="text-sm text-slate-500">
                  Hello, {profile?.username}.
                </h3>
              )}
            </div>
            <ul className="flex flex-row items-center text-sm text-slate-700 __dashheader_icon_info">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M482.31-160q-133.34 0-226.67-93.33-93.33-93.34-93.33-226.67 0-121.54 79.23-210.77t196.15-105.38q3.23 0 6.35.23 3.11.23 6.11.69-20.23 28.23-32.03 62.81-11.81 34.57-11.81 72.42 0 106.67 74.66 181.33Q555.64-404 662.31-404q38.07 0 72.54-11.81 34.46-11.81 61.92-32.04.46 3 .69 6.12.23 3.11.23 6.35-15.38 116.92-104.61 196.15T482.31-160Zm0-40q88 0 158-48.5t102-126.5q-20 5-40 8t-40 3q-123 0-209.5-86.5T366.31-660q0-20 3-40t8-40q-78 32-126.5 102t-48.5 158q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h256.15v40H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h256.15v40H224.62Zm433.84-178.46-28.08-28.77L723.15-460H367.69v-40h355.46l-92.77-92.77 28.08-28.77L800-480 658.46-338.46Z" />
                </svg>
              </li>
            </ul>
          </header>
        </div>
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
              <Link
                key={index}
                href={data.url}
                onClick={() => setMobileMenuOpen(false)}
              >
                <li className="py-2 hover:text-indigo-300 transition-all rounded-full text-pody-dark">
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
                <div className="w-24 h-6 bg-slate-600/50 rounded animate-pulse"></div>
              ) : (
                <h3 className="text-xs text-white">
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
