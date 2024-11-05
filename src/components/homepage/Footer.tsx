import Link from "next/link";
import footlink from "./data/footlink.json";
import React from "react";
import Image from "next/image";
import logo from "/public/logo/pody logo 1.png";
import sociallink from "./data/socails.json";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <section
      className="bg-pody-dark relative py-4 px-5 md:px-0 flex flex-col justify-center text-slate-400 text-sm"
      aria-label="Footer"
    >
      <div>
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
          <div className="w-full relative">
            <div className="text-xs text-slate-500 flex flex-col gap-y-3 w-full md:w-10/12 py-7">
              <p>
                Pody Network is a decentralized platform designed for virtual
                classrooms. Enjoy interactive, virtual environments tailored for education to Meet and Earn rewards for participation in real-time. Participant mint A unique, blockchain-based identity. 
                Pody is Focused on privacy with decentralized data protection.
              </p>
              <p>
              Students on Pody Network are rewarded based on the time they spend in virtual classrooms. Points are calculated in real-time using a hash rate per second system. The longer you participate in a session, the more points you accumulate. However, final point calculations are made when you leave the classroom or the session ends.
              </p>
              <p>
              Teachers (hosts) receive an additional 10% of the total points earned by all participants in their classrooms. This bonus is calculated at the end of the session or when students leave. These points reflect engagement and participation, enhancing the rewards system for both students and hosts.
              </p>
              <p>
              By minting more NFTs directly from the Pody dashboard, users can boost their point-earning capabilities.
              </p>
            </div>
            <div className="flex md:flex-row flex-col justify-between gap-5 py-7 bg-ed-50">
              <Link href="/">
                <Image src={logo} alt="Pody Logo" className="w-16" />
              </Link>
              <ul
                className="flex flex-row gap-5 flex-wrap items-center"
                aria-label="Footer Menu"
              >
                {footlink.map((link, index) => (
                  <li
                    key={index}
                    className="md:px-2 hover:text-pody-primary hover:transition-all duration-100 font-semibold"
                  >
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-slate-500/20" />
            <div className="py-7 flex flexro justify-between gap-3">
              <p className="text-xs">PODY NETWORK {year} &#169; All rights reserved.</p>
              <ul className="flex flex-row gap-4 items-center">
                {sociallink.map((data, index) => (
                  <li
                    key={index}
                    className="hover:text-pody-primary transition-all cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 50 50"
                      style={{ msFilter: "" }}
                      fill="currentColor"
                    >
                      <path d={data.icon}></path>
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
