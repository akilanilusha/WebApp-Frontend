import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
// import Logo from "../assets/logo.png";

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
    <Disclosure
      as="nav"
      className="fixed top-0 w-full z-50 bg-black backdrop-blur-md"
    >
      {({ open }) => (
        <>
          {/* ================= DESKTOP BAR ================= */}
          <div className="relative z-50 px-6 md:px-10 py-5 flex items-center justify-between text-white">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-xl">
              {/* <img src={Logo} className="h-8" /> */}
              TripGenix
            </div>

            {/* Center Menu */}
            <div className="hidden md:flex items-center gap-6 bg-white/20 backdrop-blur-md rounded-full px-6 py-2 text-sm">
              {/* Home (pill active) */}
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  classNames(
                    "px-4 py-1 rounded-full font-medium transition",
                    isActive ? "bg-white text-black" : "hover:text-white/80"
                  )
                }
              >
                Home
              </NavLink>

              {/* Services Dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-1 hover:text-white/80">
                  Services <IoIosArrowDown />
                </MenuButton>

                <MenuItems className="absolute top-full mt-3 w-44 bg-white text-black rounded-xl shadow-lg overflow-hidden">
                  {services.map((item) => (
                    <MenuItem key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            "block px-4 py-2 text-sm",
                            isActive
                              ? "bg-gray-100 font-semibold"
                              : "hover:bg-gray-100"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              {/* Other Links */}
              {navigation.slice(1).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      "px-4 py-1 rounded-full font-medium transition",

                      isActive
                        ? "bg-white text-black" : "hover:text-white/80"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <NavLink
                  to="/login"
                  className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold"
                >
                  Login
                </NavLink>
              ) : (
                <Menu as="div" className="relative">
                  <MenuButton>
                    <img
                      src={profileImageUrl}
                      className="h-9 w-9 rounded-full border border-white"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 mt-3 w-40 bg-white text-black rounded-xl shadow-lg">
                    <MenuItem>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              )}

              {/* Mobile Toggle */}
              <DisclosureButton className="md:hidden p-2">
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </DisclosureButton>
            </div>
          </div>

          {/* ================= MOBILE OVERLAY ================= */}
          <div
            className={classNames(
              open ? "opacity-100 visible" : "opacity-0 invisible",
              "fixed inset-0 bg-black/50 transition md:hidden"
            )}
          />

          {/* ================= MOBILE PANEL ================= */}
          <DisclosurePanel
            static
            className={classNames(
              open ? "translate-x-0" : "translate-x-full",
              "fixed top-0 right-0 h-full w-72 bg-white text-black transform transition-transform duration-300 md:hidden z-50"
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <span className="font-bold text-lg">TripGenix</span>
              <DisclosureButton>
                <XMarkIcon className="h-6 w-6" />
              </DisclosureButton>
            </div>

            <div className="px-6 py-6 space-y-4">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  classNames(
                    "block px-3 py-2 rounded",
                    isActive ? "bg-blue-600 text-white" : "text-gray-700"
                  )
                }
              >
                Home
              </NavLink>

              <div>
                <p className="font-semibold mb-1">Services</p>
                {services.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        "block ml-3 px-2 py-1 rounded",
                        isActive ? "bg-blue-100 text-blue-700" : "text-gray-600"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {navigation.slice(1).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      "block px-3 py-2 rounded",
                      isActive ? "bg-blue-600 text-white" : "text-gray-700"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {!isLoggedIn ? (
                <NavLink
                  to="/login"
                  className="block bg-blue-600 text-white text-center py-2 rounded-full"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className="block bg-gray-100 text-center py-2 rounded-full"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-red-600 text-white py-2 rounded-full"
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
