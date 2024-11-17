import React, { useEffect, useRef } from "react";
import {
  Bell,
  ShoppingBag,
  Film,
  CreditCard,
  HelpCircle,
  Settings,
  Gift,
  Repeat,
} from "lucide-react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import '../assets/styles/SideMenu.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";

const MenuItem = ({ icon, text, subtext, hasArrow, isInactive }) => {
  return (
    <div
      className={`flex items-center p-2 mb-2 bg-white shadow-md rounded-md transition-transform transform hover:scale-105 hover:shadow-lg ${
        isInactive ? "text-gray-400" : "text-black"
      }`}
      style={{ minHeight: '60px' }} // Set smaller fixed height for the cards
    >
      <span className="mr-3">{icon}</span>
      <div className="flex flex-col w-full">
        <span className="text-sm font-medium">{text}</span>
        {subtext && (
          <p className="text-xs text-gray-500 mt-1 leading-tight">
            {subtext}
          </p>
        )}
      </div>
      {hasArrow && <span className="ml-auto text-gray-400 text-lg">&gt;</span>}
    </div>
  );
};

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const menuRef = useRef(null);

  useEffect(() => {
    console.log(user);
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <>
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[20%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out w-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold w-full text-left text-sm-none">Hey There! {user?user.displayName?user.displayName.split(' ')[0]:user.firstName: "user"}</h1>
            <button
              onClick={toggleMenu}
              className={`text-4xl focus:outline-none absolute top-4 right-4 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "rotate-90" : ""
              }`}
              aria-label="Close menu"
            >
              <IoMdCloseCircleOutline className="text-gray-700" />
            </button>
          </div>
          <hr className="border-t border-gray-300 mb-6" />

          {/* Rewards Section */}
          

          <div className="overflow-y-auto flex-grow custom-scrollbar">
            <div className="space-y-1">
              <MenuItem
                icon={<Bell size={24} />}
                text="Notifications"
                subtext="All your notifications at one place"
                hasArrow
              />
              <MenuItem
                icon={<ShoppingBag size={24} />}
                text="Your Orders"
                subtext="View all your bookings & purchases"
              />
              <MenuItem
                icon={<CreditCard size={24} />}
                text="Play Credit Card"
                subtext="View your Play Credit Card details and offers"
              />
              <MenuItem
                icon={<HelpCircle size={24} />}
                text="Help & Support"
                subtext="View commonly asked queries and Chat"
                hasArrow
              />
              <MenuItem
                icon={<Settings size={24} />}
                text="Accounts & Settings"
                subtext="Location, Payments, Permissions & More"
              />
              <MenuItem
                icon={<Gift size={24} />}
                text="Rewards"
                subtext="View your rewards & unlock new ones"
                hasArrow
              />
              <MenuItem
                icon={<Repeat size={24} />}
                text="BookAChange"
                hasArrow
              />
            </div>
            {user ? (
          <button
            className="btn btn-outline-primary"
            onClick={() => dispatch(logout(navigate))}
          >
            Log out
          </button>
        ) : (
          <div className="flex flex-row gap-2 justify-center items-center">
            <button
              className="hidden sm:block px-2 rounded-lg w-[120px] py-2 border-[2px] font-semibold hover:font-semibold hover:text-white border-red-600 hover:bg-red-500"
              onClick={() => navigate("/login")}
            >
              Login/SignUp
            </button>
          </div>
        )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;