import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  PenSquare,
  Newspaper,
  Menu,
  X,
  Feather,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Contributors", path: "/users", icon: Users },
  { title: "New entry", path: "/add-post", icon: PenSquare },
  { title: "All entries", path: "/display-post", icon: Newspaper },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#171A21] text-[#EFEDE4] p-2.5 rounded-md shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#171A21] text-[#C9C6BA]
          flex flex-col justify-between
          transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="px-6 pt-7 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Feather
                size={20}
                className="text-[#B8863E]"
                strokeWidth={1.75}
              />
              <span
                className="text-xl text-[#F4F2E9] tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                The Ledger
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#7A7A6E] mt-1.5 pl-[30px]">
              Editorial desk
            </p>
          </div>

          <nav className="mt-4 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 mb-1 rounded-md text-sm transition-colors duration-150
                    ${
                      isActive
                        ? "bg-[#232733] text-[#F4F2E9]"
                        : "text-[#9C9A8E] hover:bg-[#1D2029] hover:text-[#E5E2D6]"
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[#B8863E] transition-opacity duration-150
                      ${isActive ? "opacity-100" : "opacity-0"}`}
                  />
                  <Icon size={17} strokeWidth={1.75} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-[11px] text-[#5F5E54] leading-relaxed"></p>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
