import React, { useState, useEffect } from "react";
import { MessageSquare, AlertCircle, RefreshCw, Inbox } from "lucide-react";

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=12",
      );
      if (!response.ok)
        throw new Error("Couldn't load entries from the server.");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const CatalogCardSkeleton = () => (
    <div className="relative bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-6 pt-8">
      <div className="absolute -top-px left-6 w-10 h-2 bg-[#EFEDE4] border-x border-b border-[#DAD6C8] rounded-b-sm" />
      <div className="animate-pulse space-y-3">
        <div className="w-16 h-3 bg-[#E7E3D6] rounded" />
        <div className="h-4 bg-[#E7E3D6] rounded w-5/6" />
        <div className="h-4 bg-[#E7E3D6] rounded w-1/2" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-[#EFEDE4] rounded" />
          <div className="h-3 bg-[#EFEDE4] rounded" />
          <div className="h-3 bg-[#EFEDE4] rounded w-4/5" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-6 border-b border-[#DAD6C8]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A8878] mb-2">
            The feed
          </p>
          <h1
            className="text-[1.9rem] text-[#23262E]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            All entries
          </h1>
        </div>

        {!isLoading && (
          <button
            onClick={fetchPosts}
            className="inline-flex items-center gap-2 bg-[#FBFAF5] border border-[#DAD6C8] hover:border-[#B8863E]/60 text-[#3D3B32] font-medium py-2 px-4 rounded-md transition-colors duration-150 text-sm shrink-0 self-start"
          >
            <RefreshCw size={14} className="text-[#8A8878]" />
            Refresh
          </button>
        )}
      </div>

      {error && (
        <div className="bg-[#B2503F]/10 border border-[#B2503F]/25 rounded-lg p-6 text-center max-w-md mx-auto my-12">
          <div className="w-11 h-11 rounded-md bg-[#B2503F]/15 text-[#B2503F] flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={20} />
          </div>
          <h3 className="text-[#23262E] font-medium">Couldn't load the feed</h3>
          <p className="text-sm text-[#8A5A50] mt-1 mb-5">{error}</p>
          <button
            onClick={fetchPosts}
            className="bg-[#171A21] hover:bg-[#232733] text-[#F4F2E9] font-medium py-2 px-4 rounded-md text-sm transition-colors duration-150"
          >
            Try again
          </button>
        </div>
      )}

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <CatalogCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="text-center py-16 bg-[#FBFAF5] rounded-lg border border-[#DAD6C8]">
          <div className="w-11 h-11 rounded-md bg-[#EFEDE4] text-[#8A8878] flex items-center justify-center mx-auto mb-4">
            <Inbox size={20} />
          </div>
          <p className="text-[#6E6C60] font-medium">Nothing filed yet.</p>
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-6 pt-8 hover:border-[#B8863E]/50 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
            >
              <div className="absolute -top-px left-6 w-10 h-2 bg-[#EFEDE4] border-x border-b border-[#DAD6C8] rounded-b-sm group-hover:border-[#B8863E]/40 transition-colors duration-150" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-[#EFEDE4] text-[#6E6C60]">
                    Author #{post.userId}
                  </span>
                  <span
                    className="text-xs text-[#B7B4A6]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    No. {String(post.id).padStart(3, "0")}
                  </span>
                </div>

                <h3 className="text-[#23262E] font-medium group-hover:text-[#8A5A2E] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-[#8A8878] mt-2.5 line-clamp-3 leading-relaxed">
                  {post.body}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E7E3D6] flex items-center justify-between text-xs text-[#B7B4A6] font-medium">
                <span className="hover:text-[#3D3B32] cursor-pointer transition-colors">
                  Read entry
                </span>
                <div className="flex items-center gap-1.5 hover:text-[#B8863E] cursor-pointer transition-colors">
                  <MessageSquare size={13} />
                  <span>Comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayPost;
