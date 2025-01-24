"use client";
import Link from "next/link";
import Image from "next/image";
import navlink from "../data/link.json";
import logo from "/public/logo/pody logo dark.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JoinDrawer from "../v1/widgets/JoinDrawer";
import Loader from "@/components/preloader/Loader";
import { useNavigate } from "@/components/utils/PageRouter";
import { useRouter } from "next/navigation";

type FloatingElement = {
  id: number;
  left: string;
  top: string;
};

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );

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

  const { handleClick, isPending } = useNavigate();

  const router = useRouter();

  useEffect(() => {
    router.prefetch('/login');
    router.prefetch('/signup');
    router.prefetch('/#features');
    router.prefetch('/#reward');
    router.prefetch('/#roadmap');
    router.prefetch('/#faq');
    router.prefetch('/faucet');
    router.prefetch('/dashboard');
  }, [router]);

  return (
    <>
      {isPending && <Loader />}
      <div
        className="w-full hidden md:flex flex-row justify-between items-center text-sm text-slate-600 my-4 relative gap-x-3 font-medium"
        aria-label="Navigation Menu"
      >
        <div className="rounded-full gap-x-5 h-11 py-3.5 me-3.5 flex-row flex flex-1 justify-between items-center">
          <Link href="/">
            <Image src={logo} alt="Pody Logo" className="w-16 object-contain" />
          </Link>
          <ul
            className="flex flex-row justify-between items-center gap-x-5"
            aria-label="Menu"
          >
            {navlink.mainLink.map((link, index) => (
              <li
                key={index}
                className="hover:text-pody-primary hover:transition-all duration-100 px-1"
              >
                <button
                  onClick={() => {
                    handleClick(link.url);
                  }}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex flex-row items-center gap-x-2">
          <button
            onClick={() => {
              handleClick("/login");
            }}
          >
            <li className="bg-pody-secondary/40 hover:transition-all duration-100 h-10 rounded-full px-8 flex items-center cursor-pointer">
              Login
            </li>
          </button>
          <JoinDrawer />
        </ul>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden w-full py-6 gap-x-4 relative">
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
              className={`w-9 h-9 ${mobileMenuOpen ? "text-slate-300 " : "text-slate-700"}`}
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
        className={`md:hidden fixed right-0 top-0 h-full w-full __nav_mobile_dash __shadow_pody bg-pody-secondary z-50 transition-all duration-300 ease-in-out ${
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
                  duration: Math.random() * 30 + 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <Link href="/">
            <Image src={logo} className="w-20 object-contain mb-8" alt="Pody" />
          </Link>
          <ul className="flex flex-col items-center gap-y-4 relative z-50">
            {navlink.mainLink.map((data, index) => (
              <button
                key={index}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleClick(data.url);
                }}
              >
                <li className="py-2 hover:text-pody-primary transition-all rounded-full text-slate-400">
                  {data.title}
                </li>
              </button>
            ))}
          </ul>
          <div className="flex flex-col items-center mt-4 relative z-50">
            <Link href="/login">
              <span className="hover:text-pody-primary transition-all rounded-full text-slate-400">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
