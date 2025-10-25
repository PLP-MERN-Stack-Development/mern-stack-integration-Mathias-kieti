import React from "react";
import PostsPage from "./pages/PostsPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 app-root">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600 page-title">MERN Blog</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Fallback container (App.css) will style this when Tailwind isn't loaded */}
      <div className="app-container">
        <PostsPage />
      </div>
    </div>
  );
}

export default App;