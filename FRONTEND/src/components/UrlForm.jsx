import { useState } from "react";
import axios from "axios";

const UrlForm = () => {
  const loading = "";
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    const data = await axios.post("http://localhost:3000/api/create", { url });
    console.log(data);
  };

  return (
    <>
      <div className="space-y-4">
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

      {/* {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600 font-medium mb-2">
            Your shortened URL:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-gray-700 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-medium"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default UrlForm;
