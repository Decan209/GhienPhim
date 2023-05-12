import React, { useState } from "react";
import { items } from "./Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const NavbarMobile = () => {
  const [hide, setHide] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleNavbarMb = () => {
    setHide(!hide);
  };
  return (
    <>
      <div className="flex sm:hidden mb-2">
        <div
          onClick={handleNavbarMb}
          className={`text-gray-200 text-sm px-3 mt-4 font-medium cursor-pointer ${
            hide ? "text-orange-500" : ""
          }`}
        >
          Danh Mục
        </div>
        <div className={`${session?.user?"hover-signOut":""} relative`}>
          <div
            onClick={() => signIn()}
            className={`text-gray-200 text-sm px-3 mt-4 font-medium cursor-pointer ${session?.user?"pointer-events-none":""}`}
          >
            {session?.user ? (
              <div>{session?.user?.email}</div>
            ) : (
              "Truy Cập Vào Tài Khoản"
            )}
          </div>
          <button onClick={() => signOut({ callbackUrl: "/auth/Login" })} className="bg-gray-700 p-2 rounded-lg text-sm font-medium text-orange-500 absolute right-1 top-16 hidden max-sm:top-8 signOut">
            Đăng xuất
          </button>
        </div>
        <Link
          href={`${session?.user?'/categories/favorite':'/auth/Login'}`}
          className={`text-gray-200 text-sm px-3 mt-4 font-medium cursor-pointer ${
            router.asPath === "/categories/favorite" ? "text-orange-500" : ""
          }`}
        >
          Mục Yêu Thich
        </Link>
      </div>
      <ul className={hide ? "" : "hidden"}>
        {items.map((arr) => (
          <Link href={arr.path} key={arr.id}>
            <li
              className={` pl-2 bg-black text-white text-sm p-2 font-medium cursor-pointer ${
                router.asPath === arr.path ? "text-orange-500" : ""
              } `}
            >
              {arr.name}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default NavbarMobile;
