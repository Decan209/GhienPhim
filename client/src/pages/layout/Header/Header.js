"useClient";
import Link from "next/link";
import Navbar from "./Navbar/Navbar";
import NavbarMobile from "./Navbar/NavbarMobile";
import SearchBox from "./SearchBox/SearchBox";
import { signIn, signOut, useSession } from "next-auth/react";
import { data } from "autoprefixer";
import { useEffect } from "react";
import { addSigninGoogle } from "@/services/auth.service";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

export default function Header() {
  const { data: session } = useSession();
  const avatar = session?.user.image;
  console.log(session?.user)
  const userGo = {
    name: session?.user?.name,
    email: session?.user?.email,
    googleId: session?.user?.id,
    picture: session?.user?.image,
  }
    if(session?.user?.id){
      const { isLoading, error, data } = useQuery(["addSigninGoogle",userGo],()=>addSigninGoogle(userGo));
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <BeatLoader color="hsla(33, 100%, 50%, 1)" margin={3} size={20} />
          </div>
        );
      }
    
      if (error) {
        return console.log(error);
      }
    }
    
  return (
    <>
      <div className="flex justify-between px-5 max-sm: pt-4 ">
        <Link href={"/"}>
          <img
            src="https://ghienphim3.net/client_assets/images/logov1.png"
            alt=""
            className="max-w-xs max-sm:w-2/3"
          />
        </Link>
        <SearchBox />
        <div className={`${session?.user?"hover-signOut":""} relative`}>
          <button
            onClick={() => signIn()}
            className={`${
              session?.user ? "pointer-events-none" : ""
            } font-medium max-md:hidden mt-2 w-20 h-20 bg-orange-500 text-center text-white my-auto rounded-lg shadow-lg shadow-orange-500/50 max-sm:hidden`}
          >
            {session?.user ? (
              <div>
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="p-2 rounded-full "
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                    className="p-2 rounded-full "
                  />
                )}
              </div>
            ) : (
              <div>Truy cập tài khoản</div>
            )}
          </button>
          <button onClick={() => signOut({ callbackUrl: "/auth/Login" })} className="bg-gray-700 p-2 rounded-lg text-sm font-medium text-orange-500 absolute right-1 top-16 hidden signOut">
            Đăng xuất
          </button>
        </div>
      </div>
      <Navbar />
      <NavbarMobile />
    </>
  );
}
