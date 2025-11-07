import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, FileText, Search, ArrowDownUp } from "lucide-react";

function Toolbar({
  entries,
  onAddEntry,
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  sortOrder,
  onSortOrderChange,
  onBuildReport,
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-transparent border rounded-lg shadow-md p-4 mb-6 space-y-4">
      {/* Top Row: Add Entry & Build Report Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onAddEntry}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex-1 sm:flex-none"
        >
          <Plus className="w-5 h-5" />
          {t("toolbar_button_add_entry")}
        </button>

        <button
          onClick={onBuildReport}
          disabled={entries.length === 0}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 sm:flex-none"
        >
          <FileText className="w-5 h-5" />
          {t("toolbar_button_build_report")}
        </button>

        <button
          onClick={onSortOrderChange}
          className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition flex-1 sm:flex-none"
        >
          <ArrowDownUp className="w-5 h-5" />
          <span>
            {t("toolbar_button_sort", {
              order:
                sortOrder === "desc"
                  ? t("toolbar_sort_latest_first")
                  : t("toolbar_sort_oldest_first"),
            })}
          </span>
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-200 border flex items-center py-3 px-4 bg-gray-50 dark:bg-transparent rounded-lg flex-1 sm:flex-none">
          {t("toolbar_entry_count", {
            count: entries.length,
            plural:
              entries.length === 1
                ? t("toolbar_entry_singular")
                : t("toolbar_entry_plural"),
          })}
        </div>
      </div>

      {/* Bottom Row: Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("toolbar_search_placeholder")}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-transparent text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "all"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-transparent dark:text-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-700"
          }`}
        >
          {t("toolbar_filter_all")}
        </button>
        <button
          onClick={() => onFilterChange("symptom")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "symptom"
              ? "bg-red-600 text-white"
              : "bg-white dark:bg-transparent dark:text-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-700"
          }`}
        >
          {t("toolbar_filter_symptoms")}
        </button>
        <button
          onClick={() => onFilterChange("medication")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "medication"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-transparent dark:text-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-700"
          }`}
        >
          {t("toolbar_filter_medications")}
        </button>
        <button
          onClick={() => onFilterChange("diary")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "diary"
              ? "bg-green-600 text-white"
              : "bg-white dark:bg-transparent dark:text-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-700"
          }`}
        >
          {t("toolbar_filter_diary")}
        </button>
        <button
          onClick={() => onFilterChange("test_result")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "test_result"
              ? "bg-purple-600 text-white"
              : "bg-white dark:bg-transparent dark:text-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-700"
          }`}
        >
          {t("toolbar_filter_tests")}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
