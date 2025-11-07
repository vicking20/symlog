import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { getTypeColor } from "../config/symptomTypes";

function EntryList({ entries, onDeleteEntry, onEditEntry }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const colorMap = {
    red: "bg-red-100 text-red-800 border-red-300",
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    green: "bg-green-100 text-green-800 border-green-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
    gray: "bg-gray-100 text-gray-800 border-gray-300",
  };

  const filteredEntries =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.entry_type === filter);

  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const getColorClass = (typeId) => {
    const color = getTypeColor(typeId);
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons - Always Visible */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {t("entry_list_filter_all")}
        </button>
        <button
          onClick={() => setFilter("symptom")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "symptom"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {t("entry_list_filter_symptoms")}
        </button>
        <button
          onClick={() => setFilter("medication")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "medication"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {t("entry_list_filter_medications")}
        </button>
        <button
          onClick={() => setFilter("diary")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "diary"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {t("entry_list_filter_diary")}
        </button>
        <button
          onClick={() => setFilter("test_result")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "test_result"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {t("entry_list_filter_tests")}
        </button>
      </div>

      {/* Empty State */}
      {sortedEntries.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 dark:text-gray text-5xl mb-4">📋</div>
          <p className="text-gray-600 dark:text-gray-200 text-lg">
            {t("no_entries")}
          </p>
          <p className="text-gray-600 dark:text-gray-200 text-sm mt-2">
            {filter === "all"
              ? t("entry_list_empty_default")
              : t("entry_list_empty_filtered", { filter })}
          </p>
        </div>
      )}

      {/* Entries Grid */}
      <div className="space-y-3">
        {sortedEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition overflow-hidden"
          >
            {/* Card Header */}
            <button
              onClick={() =>
                setExpandedId(expandedId === entry.id ? null : entry.id)
              }
              className="w-full p-4 flex justify-between items-start hover:bg-gray-50 transition"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${getColorClass(
                      entry.entry_type,
                    )}`}
                  >
                    {entry.subtype_label || entry.entry_type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-200">
                    {entry.date}
                  </span>
                </div>
                <p className="text-gray-700 line-clamp-2">
                  {entry.notes || "No notes added"}
                </p>
                {entry.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4">
                {expandedId === entry.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedId === entry.id && (
              <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                {/* Display Field Values */}
                {Object.keys(entry.values || {}).length > 0 && (
                  <div className="bg-white rounded p-3 space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                      {t("entry_list_recorded_data")}
                    </h4>
                    {Object.entries(entry.values).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Full Notes */}
                {entry.notes && (
                  <div className="bg-white rounded p-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-sm mb-2">
                      {t("entry_list_notes")}
                    </h4>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">
                      {entry.notes}
                    </p>
                  </div>
                )}

                {/* Metadata */}
                <div className="text-xs text-gray-600 dark:text-gray-200 space-y-1">
                  <p>
                    {t("entry_list_created")}
                    {new Date(entry.created_at).toLocaleString()}
                  </p>
                  {entry.updated_at !== entry.created_at && (
                    <p>
                      {t("entry_list_updated")}{" "}
                      {new Date(entry.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onEditEntry(entry)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition text-sm"
                  >
                    {t("edit_button")}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(t("entry_list_delete_confirm"))) {
                        onDeleteEntry(entry.id);
                        setExpandedId(null);
                      }
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t("delete_entry_title")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryList;
