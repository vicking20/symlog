import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, User, Menu, X } from "lucide-react";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "fi", name: "Suomi" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    setIsLanguageOpen(false);
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-4 z-50 mx-4">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("app_title")}
          </span>
        </Link>

        {/* Navigation Items - Same order for desktop and mobile */}
        <div className="flex items-center md:gap-2">
          {/* Entries Link - Full text on desktop, hamburger on mobile */}
          <div className="hidden md:block">
            <Link
              to="/entries"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              {t("entries")}
            </Link>
          </div>

          <div className="md:hidden">
            <Link
              to="/entries"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              title="Entries"
            >
              <Menu className="w-6 h-6" />
            </Link>
          </div>

          {/* Language Switcher - Chinese character button with dropdown */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-xl font-semibold"
              title="Change language"
            >
              文
            </button>

            {/* Language Dropdown Menu */}
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2 min-w-[150px] z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-2 transition ${
                      i18n.language === lang.code
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Link */}
          <Link
            to="/profile"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Profile"
          >
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
