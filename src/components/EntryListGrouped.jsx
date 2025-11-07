import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { getTypeColor } from "../config/symptomTypes";

function EntryListGrouped({
  entries,
  onDeleteEntry,
  onEditEntry,
  filterType,
  sortOrder,
}) {
  const { t } = useTranslation();
  const [expandedDates, setExpandedDates] = useState({});

  const colorMap = {
    red: "bg-red-100 text-red-800 border-red-300",
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    green: "bg-green-100 text-green-800 border-green-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
    gray: "bg-gray-100 text-gray-800 border-gray-300",
  };

  // Group by date
  const groupedByDate = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    if (sortOrder === "desc") {
      return new Date(b) - new Date(a);
    } else {
      return new Date(a) - new Date(b);
    }
  });

  const toggleDateExpansion = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const getColorClass = (typeId) => {
    const color = getTypeColor(typeId);
    return colorMap[color] || colorMap.gray;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-5xl mb-4">📋</div>
        <p className="text-gray-600 dark:text-gray-200 text-lg">
          {t("no_entries")}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
          {filterType === "all"
            ? t("no_entries_all_prompt")
            : t("no_entries_filtered_prompt", { filter: filterType })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      {/* Empty State */}
      {sortedDates.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-5xl mb-4">📋</div>
          <p className="text-gray-600 dark:text-gray-200 text-lg">
            {t("no_entries")}
          </p>
          <p className="text-gray-600 dark:text-gray-200 text-sm mt-2">
            {filterType === "all"
              ? t("no_entries_all_prompt")
              : t("no_entries_filtered_prompt", { filter: filterType })}
          </p>
        </div>
      )}

      {/* Grouped Entries by Date */}
      <div className="space-y-4">
        {sortedDates.map((date) => (
          <div key={date}>
            {/* Date Header - Clickable to expand/collapse */}
            <button
              onClick={() => toggleDateExpansion(date)}
              className="w-full p-4 bg-white dark:bg-transparent rounded-lg border-2 border-gray-200 hover:border-blue-300 transition flex items-center justify-between mb-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-200">
                  {formatDate(date)}
                </span>
                <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                  {groupedByDate[date].length}
                </span>
              </div>
              {expandedDates[date] ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Entries for this date - Vertical stack layout */}
            {expandedDates[date] && (
              <div className="space-y-3 mb-6">
                {groupedByDate[date].map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white dark:bg-transparent rounded-lg border border-gray-200 hover:shadow-md transition overflow-hidden"
                  >
                    {/* Entry Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getColorClass(
                            entry.entry_type,
                          )}`}
                        >
                          {t(entry.subtype_label) || t(entry.entry_type)}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm(t("delete_entry_confirm"))) {
                              onDeleteEntry(entry.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition p-1"
                          title={t("delete_entry_title")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Entry Content */}
                    <div className="p-4 space-y-3 bg-transparent dark:bg-transparent">
                      {/* Field Values */}
                      {Object.keys(entry.values || {}).length > 0 && (
                        <div className="space-y-2">
                          {Object.entries(entry.values).map(([key, value]) => {
                            if (key === "uas_score") {
                              return (
                                <div
                                  key={key}
                                  className="p-2 bg-green-50 rounded-md text-center"
                                >
                                  <span className="text-lg font-semibold text-green-800">
                                    {t("total_daily_uas", { value })}
                                  </span>
                                </div>
                              );
                            }
                            return (
                              <div
                                key={key}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-600 dark:text-gray-200 font-medium capitalize">
                                  {t(key.replace(/_/g, " "))}:
                                </span>
                                <span className="text-gray-900 dark:text-gray-200 font-semibold">
                                  {value}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Notes */}
                      {entry.notes && (
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-sm text-gray-700 dark:text-gray-200 italic">
                            "{entry.notes}"
                          </p>
                        </div>
                      )}

                      {/* Tags */}
                      {entry.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-gray-200">
                        <button
                          onClick={() => onEditEntry(entry)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm transition"
                        >
                          {t("edit_button")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryListGrouped;
