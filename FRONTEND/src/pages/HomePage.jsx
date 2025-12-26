import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔗 URL Shortener
          </h1>
          <p className="text-gray-500">
            Paste your long URL and get a short link
          </p>
        </div>

        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
