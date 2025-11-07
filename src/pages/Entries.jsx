import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EntryForm from "../components/EntryForm";
import EntryListGrouped from "../components/EntryListGrouped";
import Toolbar from "../components/Toolbar";
import ReportBuilder from "../components/ReportBuilder";

function Entries() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' or 'asc'
  const [currentPage, setCurrentPage] = useState(1);
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const ITEMS_PER_PAGE = 10;

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("symlog_entries");
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading entries:", error);
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    localStorage.setItem("symlog_entries", JSON.stringify(newEntries));
  };

  const handleAddEntry = (entry) => {
    if (editingEntry) {
      // Update existing entry
      const updatedEntries = entries.map((e) =>
        e.id === entry.id ? entry : e,
      );
      saveEntries(updatedEntries);
      setEditingEntry(null);
    } else {
      // Add new entry
      saveEntries([entry, ...entries]);
    }
    setShowForm(false);
  };

  const handleDeleteEntry = (id) => {
    saveEntries(entries.filter((e) => e.id !== id));
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // Filter and search entries
  const filteredEntries = entries.filter((entry) => {
    const typeMatch = filterType === "all" || entry.entry_type === filterType;
    const searchMatch =
      searchTerm === "" ||
      entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      entry.subtype_label?.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && searchMatch;
  });

  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === "desc") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedEntries.length / ITEMS_PER_PAGE);
  const paginatedEntries = sortedEntries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  // Handle page change when entries are deleted
  useEffect(() => {
    if (paginatedEntries.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [paginatedEntries, currentPage]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t("my_entries")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("entries_subtitle")}
          </p>
        </div>

        {/* Main Content */}
        {showForm ? (
          // Form View
          <div className="max-w-7xl mx-auto mb-8">
            <EntryForm
              onAddEntry={handleAddEntry}
              onClose={handleCloseForm}
              editingEntry={editingEntry}
            />
          </div>
        ) : (
          <>
            {/* Toolbar */}
            {!showReportBuilder && (
              <Toolbar
                entries={filteredEntries}
                onAddEntry={() => setShowForm(true)}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterType={filterType}
                onFilterChange={setFilterType}
                sortOrder={sortOrder}
                onSortOrderChange={handleSortOrderChange}
                onBuildReport={() => setShowReportBuilder(true)}
              />
            )}

            {/* Report Builder Section - Collapsible */}
            {filteredEntries.length > 0 && showReportBuilder && (
              <div className="mb-8">
                <ReportBuilder
                  entries={filteredEntries}
                  shouldShowBuilder={true}
                  onClose={() => setShowReportBuilder(false)}
                />
              </div>
            )}

            {/* Entries List - Grouped by Date with Pagination */}
            {!showReportBuilder && (
              <div className="">
                <EntryListGrouped
                  entries={paginatedEntries}
                  onDeleteEntry={handleDeleteEntry}
                  onEditEntry={handleEditEntry}
                  filterType={filterType}
                  sortOrder={sortOrder}
                />
              </div>
            )}

            {/* Pagination Controls */}
            {!showReportBuilder && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                >
                  {t("entries_pagination_previous")}
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                >
                  {t("entries_pagination_next")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Entries;
