import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../assets/logo.png";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Booking", href: "/booking" },
  { name: "Service Details", href: "/service-details" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setProfileImageUrl(localStorage.getItem("profileImageUrl") || "");
    };

    syncAuthState();
    window.addEventListener("auth-change", syncAuthState);

    return () => {
      window.removeEventListener("auth-change", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8 ">
            <div className="flex h-16 items-center justify-between">

              <img src={Logo} alt="Logo" className="h-8 w-auto" />

              <div className="hidden sm:flex items-center space-x-6 text-sm font-medium">
                <Link to="/home" className="text-gray-700 hover:text-indigo-600">
                  Home
                </Link>

                <Menu as="div" className="relative group">
                  <MenuButton className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
                    Service
                    <IoIosArrowDown className="transition-all duration-300 group-hover:rotate-180" />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute left-0 top-[120%] w-48 bg-white shadow-lg border border-gray-200
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 data-closed:opacity-0"
                  >
                    {services.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                {navigation.slice(1).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="px-5 py-2 border border-[#113D47] text-[#113D47]
                    rounded-full hover:bg-[#113D47] hover:text-white text-sm"
                  >
                    Login
                  </Link>
                ) : (
                  <Menu as="div" className="relative">
                    <MenuButton className="flex rounded-full">
                      <img
                        src={profileImageUrl}
                        alt="User"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg
                      outline outline-black/5 data-closed:scale-95 data-closed:opacity-0"
                    >
                      <MenuItem>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                )}

                <DisclosureButton className="sm:hidden p-2">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <div
            className={classNames(
              open ? "opacity-100 visible" : "opacity-0 invisible",
              "fixed inset-0 bg-black/40 transition sm:hidden"
            )}
          />

          <DisclosurePanel
            static
            className={classNames(
              open ? "translate-x-0" : "translate-x-full",
              "fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 sm:hidden z-50"
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <img src={Logo} alt="Logo" className="h-7 w-auto" />
              <DisclosureButton className="p-2 hover:bg-gray-100 rounded">
                <XMarkIcon className="h-6 w-6" />
              </DisclosureButton>
            </div>

            <div className="px-6 py-6 space-y-4">
              <Link to="/home" className="block">Home</Link>

              <div>
                <p className="font-semibold">Service</p>
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block ml-4 text-gray-600 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {navigation.slice(1).map((item) => (
                <Link key={item.name} to={item.href} className="block">
                  {item.name}
                </Link>
              ))}

              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="block text-center bg-indigo-600 text-white py-2 rounded"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-center bg-gray-100 py-2 rounded"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-red-600 text-white py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
