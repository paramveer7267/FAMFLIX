import { updates } from "../utils/constants";
import Navbar from "../components/Navbar";

const Updates = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Page Header */}
      <div className="text-center py-10 px-4 border-b border-gray-800">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          FamFlix Changelog
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Track the latest improvements, features and bug fixes.
        </p>
      </div>

      {/* Updates Container */}
      <div className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {updates.map((item, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-2xl p-6 bg-gray-900 shadow-lg hover:shadow-xl transition duration-300"
            >
              {/* Header */}
              <div className="flex justify-between flex-col lg:flex-row lg:items-center mb-4 gap-3">
                <h2 className="text-xl font-bold text-white">{item.title}</h2>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-400">
                    v{item.version} •{" "}
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full ${
                      item.active
                        ? "bg-green-600/20 text-green-400 border border-green-600/40"
                        : "bg-gray-700 text-gray-400 border border-gray-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.active ? "bg-green-400" : "bg-gray-500"
                      }`}
                    ></span>
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-5">{item.description}</p>

              {/* Updates Section */}
              {item.updates && (
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-400 mb-2">
                    🚀 Updates
                  </h3>
                  <ul className="list-disc ml-5 text-gray-300 text-sm space-y-1">
                    {item.updates
                      .trim()
                      .split("•")
                      .filter((u) => u.trim())
                      .map((update, i) => (
                        <li key={i}>{update.trim()}</li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Bug Fixes Section */}
              {item.bugFixes && (
                <div>
                  <h3 className="font-semibold text-red-400 mb-2">
                    🐞 Bug Fixes
                  </h3>
                  <ul className="list-disc ml-5 text-gray-300 text-sm space-y-1">
                    {item.bugFixes
                      .trim()
                      .split("•")
                      .filter((b) => b.trim())
                      .map((fix, i) => (
                        <li key={i}>{fix.trim()}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Updates;
