import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div>
        <nav className="bg-white dark:bg-gray-800  shadow ">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <Link href="/">
                  <a className="flex-shrink-0">
                    <img
                      className="h-10 w-30"
                      src="/logo/trackCovid.svg"
                      alt="trackCovidLogo"
                    />
                  </a>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/">
                      <a className="text-gray-800  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Home
                      </a>
                    </Link>
                    <Link href="/guidelines">
                      <a className="text-gray-500 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Guidelines
                      </a>
                    </Link>

                    <Link href="/measures">
                      <a className="text-gray-500  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Measures
                      </a>
                    </Link>
                    <Link href="/faq">
                      <a className="text-gray-500  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        FAQ
                      </a>
                    </Link>
                    <Link href="/helpfulresources">
                      <a className="text-gray-500  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Helpful Resources
                      </a>
                    </Link>
                    <Link href="/statewisereports">
                      <a className="text-gray-500  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        State Wise Reports
                      </a>
                    </Link>
                    <Link href="/team">
                      <a className="text-gray-500  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Our Team
                      </a>
                    </Link>
                    <Link href="/vaccine">
                      <a className="dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium border bg-blue-500 text-gray-50 hover:bg-blue-700 transition duration-200 hover:text-gray-50">
                        Vaccine availability
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6"></div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setToggle(!toggle)}
                  className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="h-8 w-8"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            {toggle && (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/">
                  <a className="text-gray-800 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Home
                  </a>
                </Link>
                <Link href="/guidelines">
                  <a className="text-gray-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Guidelines
                  </a>
                </Link>
                <Link href="/measures">
                  <a className="text-gray-500 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Measures
                  </a>
                </Link>

                <Link href="/faq">
                  <a className="text-gray-500 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    FAQ
                  </a>
                </Link>
                <Link href="/helpfulresources">
                  <a className="text-gray-500 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Helpful Resources
                  </a>
                </Link>
                <Link href="/statewisereports">
                  <a className="text-gray-500 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    State Wise Reports
                  </a>
                </Link>
                <Link href="/team">
                  <a className="text-gray-500 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Our Team
                  </a>
                </Link>
                <Link href="/vaccine">
                  <a className="text-gray-500 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Vaccine Availability
                  </a>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
