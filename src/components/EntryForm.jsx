import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { X, Plus } from "lucide-react";
import {
  getEntryTypes,
  getSubtypes,
  getFields,
  getTypeLabel,
} from "../config/symptomTypes";

function EntryForm({ onAddEntry, onClose, editingEntry = null }) {
  const { t } = useTranslation();
  const [entryType, setEntryType] = useState("");
  const [subtypeId, setSubtypeId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fieldValues, setFieldValues] = useState({});
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [uasScore, setUasScore] = useState(0);

  const entryTypes = getEntryTypes();
  const subtypes = entryType ? getSubtypes(entryType) : [];
  const fields = subtypeId ? getFields(entryType, subtypeId) : [];

  // Calculate UAS score
  useEffect(() => {
    if (subtypeId === "urticaria_uas7") {
      const itching = Number(fieldValues.itching_severity) || 0;
      const hives = Number(fieldValues.hives_extent) || 0;
      setUasScore(itching + hives);
    } else {
      setUasScore(0);
    }
  }, [fieldValues, subtypeId]);

  // Pre-fill if editing
  useEffect(() => {
    if (editingEntry) {
      setEntryType(editingEntry.entry_type);
      setSubtypeId(editingEntry.subtype_id);
      setDate(editingEntry.date);
      setFieldValues(editingEntry.values || {});
      setNotes(editingEntry.notes || "");
      setTags(editingEntry.tags?.join(", ") || "");
    }
  }, [editingEntry]);

  const handleFieldChange = (fieldId, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e, shouldAddAnother = false) => {
    e.preventDefault();
    if (!entryType || !subtypeId || !date) {
      alert(t("form_alert_required_fields"));
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const finalValues = { ...fieldValues };
    if (subtypeId === "urticaria_uas7") {
      finalValues.uas_score = uasScore;
    }

    const entry = {
      id: editingEntry?.id || Date.now(),
      entry_type: entryType,
      subtype_id: subtypeId,
      subtype_label: getTypeLabel(entryType, subtypeId),
      date,
      values: finalValues,
      notes,
      tags: tagArray,
      created_at: editingEntry?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onAddEntry(entry);

    if (shouldAddAnother) {
      // Reset form but keep the entry type and subtype for convenience
      setDate(new Date().toISOString().split("T")[0]);
      setFieldValues({});
      setNotes("");
      setTags("");
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setEntryType("");
    setSubtypeId("");
    setDate(new Date().toISOString().split("T")[0]);
    setFieldValues({});
    setNotes("");
    setTags("");
  };

  const renderField = (field) => {
    const value = fieldValues[field.id] || "";

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder ? t(field.placeholder) : ""}
            className="w-full px-3 py-2 dark:text-gray-200 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-3 py-2 dark:text-gray-200 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case "time":
        return (
          <input
            type="time"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-3 py-2 dark:text-gray-200 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-3 py-2 dark:text-gray-200 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">
              {t("form_select_placeholder", {
                label: t(field.label).toLowerCase(),
              })}
            </option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {t(opt)}
              </option>
            ))}
          </select>
        );

      case "slider": {
        const numValue = Number(value) || 0;
        const options = Array.from(
          { length: field.max - field.min + 1 },
          (_, i) => field.min + i * field.step,
        );
        return (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-2 flex-wrap">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleFieldChange(field.id, option)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      numValue === option
                        ? "bg-blue-600 text-white shadow-md"
                        : "border text-gray-700 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <span className="text-lg font-bold text-blue-600 bg-blue-50 dark:bg-transparent border px-4 py-2 rounded-lg min-w-fit">
                {t("form_slider_value", { value: numValue })}
              </span>
            </div>
            {field.description && (
              <p className="text-xs text-gray-600 dark:text-gray-200 p-2 rounded">
                {t(field.description)}
              </p>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          {editingEntry ? t("form_edit_entry") : t("form_new_entry")}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Entry Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            {t("form_entry_type")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {entryTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setEntryType(type.id);
                  setSubtypeId("");
                }}
                className={`p-3 rounded-lg border-2 transition text-left ${
                  entryType === type.id
                    ? "border-blue-600 bg-blue-10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-gray-200">
                  {t(type.label)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {t(type.description)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Subtype Selection */}
        {subtypes.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              {t("form_specific_type")}
            </label>
            <select
              value={subtypeId}
              onChange={(e) => setSubtypeId(e.target.value)}
              className="w-full px-4 py-2 bg-transparent dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{t("form_select_a_type")}</option>
              {subtypes.map((subtype) => (
                <option key={subtype.id} value={subtype.id}>
                  {t(subtype.label)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {t("form_date")}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 bg-transparent dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Dynamic Fields */}
        {fields.length > 0 && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200">
              {t("form_details")}
            </h3>

            {/* UAS Description */}
            {subtypeId === "urticaria_uas7" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Trans i18nKey="form_uas_description" />
                </p>
              </div>
            )}

            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {t(field.label)}
                </label>
                {renderField(field)}
              </div>
            ))}

            {/* UAS Total Score */}
            {subtypeId === "urticaria_uas7" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-lg font-semibold text-green-800">
                  {t("form_total_daily_uas", { score: uasScore })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {t("form_additional_notes")}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            placeholder={t("form_notes_placeholder")}
            className="w-full px-4 py-2 bg-transparent dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {t("form_tags")}
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder={t("form_tags_placeholder")}
            className="w-full px-4 py-2 bg-transparent dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, false)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            {editingEntry ? t("form_update_entry") : t("form_save_entry")}
          </button>
          {!editingEntry && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e, true);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
              title={t("form_save_and_add_another")}
            >
              <Plus className="w-5 h-5" />
              {t("form_save_and_add_another")}
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-4 rounded-lg transition"
            >
              {t("form_cancel")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EntryForm;
