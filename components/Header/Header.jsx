import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const AppHeader = () => {
  const router = useRouter();
  // console.log(router, "router");
  return (
    <>
      {router.pathname !== "/dentist/login" &&
      router.pathname !== "/dentist/sign-up" &&
      router.pathname !== "/dentist/edit-case" &&
      router.pathname !== "/dentist/view-profile" &&
      router.pathname !== "/dentist/create-case" &&
      router.pathname !== "/dentist/edit-profile" &&
      router.pathname !== "/dentist/forgot-password" &&
      router.pathname !== "/admin/overview" &&
      router.pathname !== "/dentist/billing" &&
      router.pathname !== "/dentist/billing-history" &&
      router.pathname !== "/dentist/settings" &&
      router.pathname !== "/admin/overview" &&
      router.pathname !== "/admin/dentist" &&
      router.pathname !== "/admin/revenue" &&
      router.pathname !== "/admin/settings" ? (
        <div className="border-b border-[#D1CDD2]">
          <header className="inset-x-0 top-0 z-50 sizingStyles">
            <nav
              className="flex items-center justify-between py-6 mx-auto"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5" passHref>
                  <img className="h-8 w-auto" src={"/images/logo.png"} alt="" />
                </Link>
              </div>

              <div className="lg:flex lg:gap-x-2">
                <button
                  className="bg-custom-blue hover:bg-blue-600 text-white font-poppins font-medium py-2 px-[25px] rounded lg:justify-end text-sm"
                  onClick={() => router.push("/dentist/login")}
                >
                  LOGIN
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      router.pathname == "/"
                        ? "/dentist/dentist-plan"
                        : "/dentist/sign-up"
                    );
                  }}
                  className="bg-white border border-custom-blue text-blue-500 font-poppins font-medium py-2 px-4 rounded w-139 text-sm hidden lg:block"
                >
                  SIGN UP
                </button>
              </div>
            </nav>
          </header>
        </div>
      ) : null}
    </>
  );
};
export default AppHeader;
