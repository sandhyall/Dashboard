import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Building2, ArrowRight } from "lucide-react";

const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-6 hover:border-[#B8863E]/50 hover:shadow-sm transition-all duration-150">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-full bg-[#171A21] text-[#F4F2E9] flex items-center justify-center text-sm font-medium shrink-0"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {initials(user.name)}
        </div>
        <div className="min-w-0">
          <h2 className="text-[#23262E] font-medium truncate">{user.name}</h2>
          <p className="text-xs text-[#B7B4A6]">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-[#6E6C60]">
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-[#B8863E] shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-[#55705B] shrink-0" />
          <span className="truncate">{user.company.name}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/users/${user.id}`)}
        className="mt-5 w-full bg-[#EFEDE4] hover:bg-[#171A21] hover:text-[#F4F2E9] text-[#3D3B32] py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-150"
      >
        View entries
        <ArrowRight size={15} />
      </button>
    </div>
  );
};

export default UserCard;
