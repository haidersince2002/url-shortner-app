import { useState } from "react";
import { createShortUrlApi } from "../api/shortUrl.api";

const UrlForm = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const shortUrl = await createShortUrlApi(url);
      setShortUrl(shortUrl.url);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="space-y-4">
        <p className="text-md text-black font-medium mb-2">Enter Your URL:</p>
        <div>
          <input
            type="url"
            placeholder="Enter your long URL here..."
            value={url}
            onInput={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Shortening...
            </span>
          ) : (
            "Shorten URL"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 pt-4 ">
          <p className="text-md text-black font-semibold mb-2">
            Your shortened URL:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-zinc-400 rounded-lg text-gray-700 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-200 text-black border-blue-300 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm font-medium"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlForm;
