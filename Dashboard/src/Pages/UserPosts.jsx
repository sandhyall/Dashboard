import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  PenSquare,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const POSTS_PER_PAGE = 5;

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [apiIsLoading, setApiIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // New-entry form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formErrors, setFormErrors] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Reset everything the moment the contributor changes, so a stale
    // list from the previous contributor never flashes on screen while
    // the new request is in flight.
    let cancelled = false;

    const fetchPosts = async () => {
      setApiIsLoading(true);
      setError("");
      setPosts([]);
      setPage(1);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        if (!cancelled) setPosts(data);
      } catch (err) {
        if (!cancelled) setError("Couldn't load this contributor's entries.");
      } finally {
        if (!cancelled) setApiIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const pagedPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const validate = () => {
    const errs = { title: "", body: "" };
    let valid = true;

    if (!title.trim()) {
      errs.title = "Give the entry a title.";
      valid = false;
    } else if (title.trim().length < 4) {
      errs.title = "Titles need at least 4 characters.";
      valid = false;
    }

    if (!body.trim()) {
      errs.body = "The entry needs some content.";
      valid = false;
    } else if (body.trim().length < 10) {
      errs.body = "Write at least 10 characters.";
      valid = false;
    }

    setFormErrors(errs);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: title.trim(),
            body: body.trim(),
            userId: Number(id),
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (!response.ok) throw new Error("Failed to submit post");
      const data = await response.json();

      // JSONPlaceholder doesn't persist the post, so we prepend it
      // locally to reflect what "should" now exist for this contributor.
      setPosts((prev) => [{ ...data, userId: Number(id) }, ...prev]);
      setPage(1);
      setTitle("");
      setBody("");
      setSuccess("Entry filed for this contributor.");
    } catch (err) {
      setFormErrors((prev) => ({
        ...prev,
        body: "Couldn't reach the server. Try again in a moment.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <Link
        to="/users"
        className="inline-flex items-center gap-1.5 text-sm text-[#8A8878] hover:text-[#3D3B32] transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Back to contributors
      </Link>

      <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A8878] mb-2">
        Contributor #{id}
      </p>
      <h1
        className="text-[1.9rem] text-[#23262E] mb-8"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Filed entries
      </h1>

      {/* New entry form, scoped to this contributor */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-6 mb-10 space-y-4"
      >
        <div className="flex items-center gap-2 text-[#3D3B32] font-medium text-sm mb-1">
          <PenSquare size={15} className="text-[#B8863E]" />
          New entry for contributor #{id}
        </div>

        <div className="space-y-1.5">
          <input
            type="text"
            disabled={isSubmitting}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full text-[15px] bg-[#FDFCF8] border rounded-md px-4 py-2.5 outline-none transition-colors duration-150 placeholder:text-[#B7B4A6] disabled:bg-[#F2F0E8]
              ${
                formErrors.title
                  ? "border-[#B2503F] focus:ring-2 focus:ring-[#B2503F]/15"
                  : "border-[#DAD6C8] focus:border-[#B8863E] focus:ring-2 focus:ring-[#B8863E]/15"
              }`}
          />
          {formErrors.title && (
            <p className="flex items-center gap-1.5 text-[#B2503F] text-xs font-medium">
              <AlertCircle size={13} />
              {formErrors.title}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <textarea
            rows={3}
            disabled={isSubmitting}
            placeholder="Content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`w-full text-[15px] bg-[#FDFCF8] border rounded-md px-4 py-2.5 outline-none transition-colors duration-150 resize-none placeholder:text-[#B7B4A6] disabled:bg-[#F2F0E8]
              ${
                formErrors.body
                  ? "border-[#B2503F] focus:ring-2 focus:ring-[#B2503F]/15"
                  : "border-[#DAD6C8] focus:border-[#B8863E] focus:ring-2 focus:ring-[#B8863E]/15"
              }`}
          />
          {formErrors.body && (
            <p className="flex items-center gap-1.5 text-[#B2503F] text-xs font-medium">
              <AlertCircle size={13} />
              {formErrors.body}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#171A21] hover:bg-[#232733] disabled:bg-[#8A8878] text-[#F4F2E9] font-medium py-2.5 px-5 rounded-md transition-colors duration-150 text-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Publishing…
              </>
            ) : (
              "Publish entry"
            )}
          </button>
          {success && (
            <span className="flex items-center gap-1.5 text-sm text-[#3F5744] font-medium">
              <CheckCircle2 size={15} className="text-[#55705B]" />
              {success}
            </span>
          )}
        </div>
      </form>

      {apiIsLoading && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-5 animate-pulse space-y-3"
            >
              <div className="h-4 bg-[#E7E3D6] rounded w-2/3" />
              <div className="h-3 bg-[#EFEDE4] rounded" />
              <div className="h-3 bg-[#EFEDE4] rounded w-4/5" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-[#B2503F]/10 border border-[#B2503F]/25 rounded-lg p-6 text-center">
          <AlertCircle size={20} className="text-[#B2503F] mx-auto mb-3" />
          <p className="text-sm text-[#8A5A50]">{error}</p>
        </div>
      )}

      {!apiIsLoading && !error && posts.length === 0 && (
        <p className="text-[#8A8878]">No entries filed yet.</p>
      )}

      {!apiIsLoading && !error && posts.length > 0 && (
        <>
          <div className="space-y-4">
            {pagedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-5 hover:border-[#B8863E]/50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h2 className="text-[#23262E] font-medium">{post.title}</h2>
                  <span
                    className="text-xs text-[#B7B4A6] shrink-0"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    No. {String(post.id).padStart(3, "0")}
                  </span>
                </div>
                <p className="text-sm text-[#8A8878] leading-relaxed">
                  {post.body}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#DAD6C8]">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3D3B32] disabled:text-[#C9C6BA] hover:text-[#B8863E] transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors duration-150
                        ${
                          p === page
                            ? "bg-[#171A21] text-[#F4F2E9]"
                            : "text-[#6E6C60] hover:bg-[#EFEDE4]"
                        }`}
                      style={
                        p === page
                          ? { fontFamily: "'IBM Plex Mono', monospace" }
                          : { fontFamily: "'IBM Plex Mono', monospace" }
                      }
                    >
                      {p}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3D3B32] disabled:text-[#C9C6BA] hover:text-[#B8863E] transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPosts;