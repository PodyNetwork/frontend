"use client"
import Link from 'next/link'
import Image from 'next/image'
import navlink from "../data/link.json"
import logo from "/public/logo/pody logo 1.png"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
  return (
    <>
        <div className='w-full hidden md:flex flex-row items-center text-sm justify-between py-8 px-8 md:px-16 text-slate-500' aria-label='Navigation Menu'>
            <ul className='flex flex-row gap-6 items-center' aria-label='Menu'>
                <Link href="/"><Image src={logo} alt='Pody' className='w-16 object-contain' /></Link>
                {navlink.mainLink.map((link, index) => (
                    <li key={index} className='hover:text-pody-primary hover:transition-all duration-100'>
                        <Link href={link.url}>{link.title}</Link>
                    </li>
                ))}
            </ul>
            <ul className='flex flex-row items-center gap-6'>
                <li className='px-2 hover:text-pody-primary hover:transition-all duration-100'>
                    <Link href="/login">Login</Link>
                </li>
            </ul>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden w-full py-6 px-5 gap-x-4 relative">
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
                className={`${mobileMenuOpen && "fixed z-50 right-8"}`}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 text-slate-300"
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
        className={`md:hidden fixed inset-0 bg-pody-secondary z-40 transition-all duration-300 ease-in-out ${
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
          <Link href="/"><Image src={logo} className="w-20 object-contain mb-8" alt="Pody" /></Link>
          <ul className="text-sm xs:text-lg flex flex-col items-center gap-y-4 relative z-50">
            {navlink.mainLink.map((data, index) => (
              <Link
                key={index}
                href={data.url}
                onClick={() => setMobileMenuOpen(false)}
              >
                <li className="py-2 hover:text-pody-primary transition-all rounded-full text-slate-400">
                  {data.title}
                </li>
              </Link>
            ))}
          </ul>
          <div className='text-sm xs:text-lg flex flex-col items-center mt-4 relative z-50'>
            <Link href="/login"><span className='hover:text-pody-primary transition-all rounded-full text-slate-400'>Login</span></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav