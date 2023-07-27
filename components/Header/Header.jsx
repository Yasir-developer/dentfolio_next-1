import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const AppHeader = () => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  // console.log(router, "router");
  return (
    <>
      {router.pathname !== '/dentist/login' &&
      router.pathname !== '/dentist/sign-up' &&
      router.pathname !== '/dentist/edit-case' &&
      router.pathname !== '/dentist/view-profile' &&
      router.pathname !== '/dentist/create-case' &&
      router.pathname !== '/dentist/edit-profile' &&
      router.pathname !== '/dentist/forgot-password' &&
      router.pathname !== '/admin/overview' &&
      router.pathname !== '/dentist/billing' &&
      router.pathname !== '/dentist/billing-history' &&
      router.pathname !== '/dentist/settings' &&
      router.pathname !== '/admin/overview' &&
      router.pathname !== '/admin/dentist' &&
      router.pathname !== '/admin/revenue' &&
      router.pathname !== '/admin/settings' ? (
        <div className="border-b border-[#D1CDD2]">
          <header className="inset-x-0 top-0 z-50 sizingStyles">
            <nav
              className="flex items-center justify-between py-6 mx-auto"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5" passHref>
                  <img className="h-8 w-auto" src={'/images/logo.png'} alt="" />
                </Link>
              </div>
              {user ? (
                <>
                  <div className="flex">
                    <div className="flex flex-row items-center justify-center lg:pr-[80px] lg:pl-[30px]">
                      <Image
                        src={
                          user?.profile_photo ? user?.profile_photo : profile
                        }
                        alt="logo"
                        width={51}
                        height={51}
                        sizes="100vw"
                        className="rounded-[25.5px] cursor-pointer"
                        onClick={() => router.push('/dentist/view-profile')}
                      />

                      <h2
                        className="hidden lg:block text-custom-blue text-[16px] font-semibold px-2 cursor-pointer"
                        onClick={() => router.push('/dentist/view-profile')}
                      >
                        {user?.displayName}
                        {/* Dylan Taylor */}
                      </h2>
                      {/* className="hidden md:block" */}
                      <div
                        className="flex"
                        style={{ zIndex: 1 }}
                        ref={dropdownRef}
                      >
                        <div
                          className="flex items-center justify-center px-2 rounded-l-md cursor-pointer"
                          onClick={toggleDropdown}
                        >
                          <HiChevronDown
                            className={`transform  h-5 w-5 text-[#919191] ${
                              isDropdownOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />

                          {isDropdownOpen && (
                            <div class="absolute top-[50px] mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                              <p
                                class="block px-4 py-2 text-gray-800 hover:bg-custom-blue hover:text-white"
                                onClick={() => {
                                  // handleOptionSelect;
                                  router.push('/dentist/profile/view-profile');
                                }}
                              >
                                Dashboard
                              </p>

                              <a
                                // href="#"
                                onClick={(e) => {
                                  // handleOptionSelect;
                                  // Router.push('/dentist/dentist-plan');
                                  // handleLogout(e);
                                }}
                                class="block px-4 py-2 text-gray-800 hover:bg-custom-blue hover:text-white"
                              >
                                Sign out
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle>
                  <FaAngleDown
                    style={{
                      color: "#919191",
                      width: "20px",
                      height: "20px",
                    }}
                    className="hidden lg:block"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
                    </div>
                  </div>
                </>
              ) : (
                <div className="lg:flex lg:gap-x-2">
                  <button
                    className="bg-custom-blue hover:bg-blue-600 text-white font-poppins font-medium py-2 px-[25px] rounded lg:justify-end text-sm"
                    onClick={() => router.push('/dentist/login')}
                  >
                    LOGIN
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        router.pathname == '/'
                          ? '/dentist/dentist-plan'
                          : '/dentist/sign-up'
                      );
                    }}
                    className="bg-white border border-custom-blue text-blue-500 font-poppins font-medium py-2 px-4 rounded w-139 text-sm hidden lg:block"
                  >
                    SIGN UP
                  </button>
                </div>
              )}
            </nav>
          </header>
        </div>
      ) : null}
    </>
  );
};
export default AppHeader;
