import dashlink from "../data/links.json";
import Link from "next/link";
import logo from "/public/logo/logo_black.svg";
import Image from "next/image";
import userIcon from "/public/avatar/user5.jpeg";

const AsideNav = () => {
  return (
    <aside className="w-full bg-pody-primary/20 flex flex-row items-center justify-between py-6 px-12 gap-x-4">
      <div className="flex flex-row">
        <Image src={logo} className="w-24 object-contain me-8" alt="Pody" />
        <ul className="text-[0.8rem] flex flex-row gap-x-5">
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
      <header className="flex flex-row justify-between gap-x-4 items-center">
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
          <h3 className="text-base text-slate-700">Hello, 0x3ax.</h3>
        </div>
        <ul className="flex flex-row items-s items-stretch text-sm text-slate-700 __dashheader_icon_info">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path>
              <circle cx="9.5" cy="11.5" r="1.5"></circle>
              <circle cx="14.5" cy="11.5" r="1.5"></circle>
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
            </svg>
          </li>
        </ul>
      </header>
    </aside>
  );
};

export default AsideNav;
