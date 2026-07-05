import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, PenSquare } from "lucide-react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [success, setSuccess] = useState("");

  const validate = () => {
    let valid = true;
    const newErrors = { title: "", body: "" };

    if (!title.trim()) {
      newErrors.title = "Give the entry a title.";
      valid = false;
    } else if (title.trim().length < 4) {
      newErrors.title = "Titles need at least 4 characters.";
      valid = false;
    }

    if (!body.trim()) {
      newErrors.body = "The entry needs some content.";
      valid = false;
    } else if (body.trim().length < 10) {
      newErrors.body = "Write at least 10 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: title.trim(),
            body: body.trim(),
            userId: 1,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (!response.ok) throw new Error("Failed to submit post");

      const data = await response.json();
      console.log("Server Response:", data);

      setTitle("");
      setBody("");
      setSuccess("Entry filed. It's live on the feed.");
    } catch (err) {
      console.error("API Error:", err);
      setErrors((prev) => ({
        ...prev,
        body: "Couldn't reach the server. Try again in a moment.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2.5 mb-1">
        <PenSquare size={18} className="text-[#B8863E]" strokeWidth={1.75} />
        <span className="text-[11px] uppercase tracking-[0.14em] text-[#8A8878]">
          New entry
        </span>
      </div>
      <h1
        className="text-[1.9rem] text-[#23262E] mb-8"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Draft a post
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-[#FBFAF5] border border-[#DAD6C8] rounded-lg p-7 sm:p-9 space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-[#3D3B32]">
            Title
          </label>
          <input
            id="title"
            type="text"
            disabled={isLoading}
            placeholder="Understanding modern React state"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full text-[15px] bg-[#FDFCF8] border rounded-md px-4 py-2.5 outline-none transition-colors duration-150 placeholder:text-[#B7B4A6] disabled:bg-[#F2F0E8] disabled:text-[#B7B4A6]
              ${
                errors.title
                  ? "border-[#B2503F] focus:ring-2 focus:ring-[#B2503F]/15"
                  : "border-[#DAD6C8] focus:border-[#B8863E] focus:ring-2 focus:ring-[#B8863E]/15"
              }`}
          />
          {errors.title && (
            <p className="flex items-center gap-1.5 text-[#B2503F] text-xs font-medium">
              <AlertCircle size={13} />
              {errors.title}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="body" className="block text-sm font-medium text-[#3D3B32]">
            Content
          </label>
          <textarea
            id="body"
            rows={6}
            maxLength={500}
            disabled={isLoading}
            placeholder="What's the entry about?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`w-full text-[15px] bg-[#FDFCF8] border rounded-md px-4 py-2.5 outline-none transition-colors duration-150 resize-none placeholder:text-[#B7B4A6] disabled:bg-[#F2F0E8] disabled:text-[#B7B4A6]
              ${
                errors.body
                  ? "border-[#B2503F] focus:ring-2 focus:ring-[#B2503F]/15"
                  : "border-[#DAD6C8] focus:border-[#B8863E] focus:ring-2 focus:ring-[#B8863E]/15"
              }`}
          />
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {errors.body && (
                <p className="flex items-center gap-1.5 text-[#B2503F] text-xs font-medium">
                  <AlertCircle size={13} />
                  {errors.body}
                </p>
              )}
            </div>
            <span
              className={`text-xs font-mono shrink-0 tabular-nums ${
                body.length >= 500 ? "text-[#B8863E] font-medium" : "text-[#B7B4A6]"
              }`}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {body.length}/500
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#171A21] hover:bg-[#232733] disabled:bg-[#8A8878] text-[#F4F2E9] font-medium py-3 px-4 rounded-md transition-colors duration-150 text-sm flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Publishing…
            </>
          ) : (
            "Publish entry"
          )}
        </button>

        {success && (
          <div className="bg-[#55705B]/10 border border-[#55705B]/25 text-[#3F5744] p-4 rounded-md flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#55705B] shrink-0" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPost;