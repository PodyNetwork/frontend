import React from "react";
import footlink from "../../data/footlink.json";
import Link from "next/link";

const QuickLinks = () => {
  return (
    <div className="flex flex-col flex-wrap text-sm w-full">
      <p className="pb-5 font-bold">Quick Links</p>
      <ul className="flex flex-col" aria-label="Quick Links Menu">
        {footlink.link.map((link, index) => (
          <Link href={link.url} key={index}>
            <li className="hover:text-pody-primary flex gap-1 flex-row justify-between items-center hover:transition-all duration-100 font-medium py-3.5">
              <p>{link.title}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
