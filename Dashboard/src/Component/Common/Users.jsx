import React, { useEffect, useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [apiIsLoading, setApiIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setApiIsLoading(false);
      })
      .catch(() => {
        setError("Couldn't load contributors. Try refreshing the page.");
        setApiIsLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A8878] mb-2">
        The masthead
      </p>
      <h1
        className="text-[1.9rem] text-[#23262E] mb-8"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Contributors
      </h1>

      <div className="relative max-w-md mb-8">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B7B4A6]"
        />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#FBFAF5] border border-[#DAD6C8] rounded-md pl-10 pr-4 py-2.5 text-[15px] outline-none focus:border-[#B8863E] focus:ring-2 focus:ring-[#B8863E]/15 transition-colors duration-150 placeholder:text-[#B7B4A6]"
        />
      </div>

      {apiIsLoading && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-6 animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#E7E3D6]" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-[#E7E3D6] rounded w-2/3" />
                  <div className="h-2.5 bg-[#EFEDE4] rounded w-1/3" />
                </div>
              </div>
              <div className="h-9 bg-[#EFEDE4] rounded" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-[#B2503F]/10 border border-[#B2503F]/25 rounded-lg p-6 text-center max-w-md">
          <AlertCircle size={20} className="text-[#B2503F] mx-auto mb-3" />
          <p className="text-sm text-[#8A5A50]">{error}</p>
        </div>
      )}

      {!apiIsLoading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;