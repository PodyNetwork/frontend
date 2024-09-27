import dashlink from "../data/links.json";
import Link from "next/link";
import logo from "/public/logo/logo_white.svg";
import Image from "next/image";

const AsideNav = () => {
  return (
    <aside className="w-60 bg-pody-dark_secondary h-[calc(100vh-1.25rem)] fixed px-6 py-4 rounded-2xl">
      <Image src={logo} className="w-20 object-contain mt-2 mb-4" alt="Pody" />
      <ul className="text-xs flex flex-col gap-y-1.5">
        {dashlink.map((data, index) => (
          <li key={index}
            className="py-2 hover:text-slate-500 hover:transition-all rounded-full text-slate-300">
            <Link href={data.url}>{data.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideNav;
