"use client"
import Link from "next/link";
import footlink from "./data/footlink.json";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import logoIcon from "/public/logo/Logo Icon Varient.png";
import gsap from "gsap";

const Footer = () => {
  const starRef = useRef(null);

  useEffect(() => {
    const star = starRef.current;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 15, ease: "power1.inOut" },
    });

    tl.to(star, {
      rotation: 360,
      transformOrigin: "center",
    });

    tl.to(
      "#orange-to-pink stop:nth-child(1)",
      { stopColor: "#F25F5C", duration: 2 },
      0
    )
      .to(
        "#orange-to-pink stop:nth-child(2)",
        { stopColor: "#0D1B2A", duration: 2 },
        0
      )
      .to(
        "#orange-to-pink stop:nth-child(3)",
        { stopColor: "#E4FDE1", duration: 2 },
        0
      );
  }, []);

  const year = new Date().getFullYear();
  return (
    <section
      className="bg-[#E9EADB] relative py-4 flex flex-col justify-center text-slate-400 text-sm overflow-hidden"
      aria-label="Footer"
    >
      <div>
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="w-full relative">
            <div className="text-xs text-slate-500 flex flex-col gap-y-3 w-full md:w-10/12 py-7">
              <p>
                Pody Network is a decentralized platform designed for virtual
                classrooms. Enjoy interactive, virtual environments tailored for
                education to Meet and Earn rewards for participation in
                real-time. Participant mint A unique, blockchain-based identity.
                Pody is Focused on privacy with decentralized data protection.
              </p>
              <p>
                Students on Pody Network are rewarded based on the time they
                spend in virtual classrooms. Points are calculated in real-time
                using a hash rate per second system. The longer you participate
                in a session, the more points you accumulate. However, final
                point calculations are made when you leave the classroom or the
                session ends.
              </p>
              <p>
                Teachers (hosts) receive an additional 10% of the total points
                earned by all participants in their classrooms. This bonus is
                calculated at the end of the session or when students leave.
                These points reflect engagement and participation, enhancing the
                rewards system for both students and hosts.
              </p>
              <p>
                By minting more NFTs directly from the Pody dashboard, users can
                boost their point-earning capabilities.
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-y-10 gap-x-16 py-7 text-pody-secondary">
              <div className="relative">
                <div className="flex flex-row items-center gap-x-1">
                  <Link href="/">
                    <Image
                      src={logoIcon}
                      alt="Pody Logo"
                      className="w-5 object-contain"
                    />
                  </Link>
                  <h5 className="font-bold text-2xl">Pody Network</h5>
                </div>
                <p className="text-xs font-medium mt-1">
                  &#169; {year} All rights reserved.
                </p>
              </div>
              <div className="relative grid grid-cols-1 __pdsm:grid-cols-2 md:grid-cols-3 flex-1 max-w-4xl gap-7">
                <div className="flex flex-col flex-wrap text-sm w-full">
                  <p className="pb-5 font-bold">Quick Links</p>
                  <ul className="flex flex-col" aria-label="Quick Links Menu">
                    {footlink.link.map((link, index) => (
                      <li
                        key={index}
                        className="hover:text-pody-primary flex gap-1 flex-row justify-between items-center hover:transition-all duration-100 font-medium border-t border-pody-secondary/40 p-3.5"
                      >
                        <Link href={link.url}>{link.title}</Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col flex-wrap text-sm w-full">
                  <p className="pb-5 font-bold">Socials</p>
                  <ul className="flex flex-col" aria-label="Social Links">
                    {footlink.socials.map((link, index) => (
                      <li
                        key={index}
                        className="hover:text-pody-primary flex gap-1 flex-row justify-between items-center hover:transition-all duration-100 font-medium border-t border-pody-secondary/40 p-3.5"
                      >
                        <Link href={link.url}>{link.name}</Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col flex-wrap text-sm w-full">
                  <p className="pb-5 font-bold">Legal</p>
                  <ul className="flex flex-col" aria-label="Social Links">
                    {footlink.legal.map((link, index) => (
                      <li
                        key={index}
                        className="hover:text-pody-primary flex gap-1 flex-row justify-between items-center hover:transition-all duration-100 font-medium border-t border-pody-secondary/40 p-3.5"
                      >
                        <Link href={link.url}>{link.title}</Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-7 flex flex-row justify-between gap-3">
              <p className="text-6xl md:text-8xl font-semibold text-pody-secondary/5">
                PODY NETWORK
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-16 -bottom-16">
        <svg
          ref={starRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-80 h-80"
        >
          <defs>
            <linearGradient
              id="orange-to-pink"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="orange" />
              <stop offset="50%" stopColor="#3F3B60" />
              <stop offset="100%" stopColor="#dbd1fb" />
            </linearGradient>
          </defs>
          <path
            className="star-path"
            d="M23 11h-8.59l6.07-6.07-1.41-1.41L13 9.59V1h-2v8.59L4.93 3.52 3.52 4.93 9.59 11H1v2h8.59l-6.07 6.07 1.41 1.41L11 14.41V23h2v-8.59l6.07 6.07 1.41-1.41L14.41 13H23z"
            fill="url(#orange-to-pink)"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Footer;
