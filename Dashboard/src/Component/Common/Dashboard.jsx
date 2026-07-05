import React from "react";
import { Link } from "react-router-dom";
import { Users, PenSquare, Newspaper, ArrowUpRight } from "lucide-react";

const shortcuts = [
  {
    label: "Contributors",
    desc: "Browse everyone writing for the desk and what they've filed.",
    path: "/users",
    icon: Users,
  },
  {
    label: "New entry",
    desc: "Draft and publish a fresh post to the feed.",
    path: "/add-post",
    icon: PenSquare,
  },
  {
    label: "All entries",
    desc: "Review everything that's gone out so far.",
    path: "/display-post",
    icon: Newspaper,
  },
];

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A8878] mb-2">
        {today}
      </p>
      <h1
        className="text-[2.1rem] leading-tight text-[#23262E] mb-2"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Good to see you at the desk.
      </h1>
      <p className="text-[#6E6C60] mb-10 max-w-xl">
        Everything here reads from a shared mock feed, so it's safe to
        publish, edit, and poke around freely.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-5 hover:border-[#B8863E]/60 hover:shadow-sm transition-all duration-150"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-md bg-[#EFEDE4] flex items-center justify-center text-[#B8863E]">
                  <Icon size={17} strokeWidth={1.75} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#B7B4A6] group-hover:text-[#B8863E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                />
              </div>
              <h2 className="text-[#23262E] font-medium mb-1">{s.label}</h2>
              <p className="text-sm text-[#8A8878] leading-relaxed">
                {s.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;