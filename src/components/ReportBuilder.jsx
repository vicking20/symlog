import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Download,
  Printer,
  Mail,
  Copy,
  ChevronDown,
  ChevronUp,
  User,
  Activity,
  Info,
} from "lucide-react";
import { getProfile } from "../utils/profileStorage";

function ReportBuilder({ entries, shouldShowBuilder = false, onClose = null }) {
  const { t } = useTranslation();
  const [showBuilder, setShowBuilder] = useState(shouldShowBuilder);
  const [expandedSections, setExpandedSections] = useState({});

  function getEarliestDate() {
    if (entries.length === 0) {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date.toISOString().split("T")[0];
    }
    const dates = entries.map((e) => new Date(e.date));
    const earliest = new Date(Math.min(...dates));
    return earliest.toISOString().split("T")[0];
  }

  const [reportConfig, setReportConfig] = useState({
    title: "My Health Report",
    include: {
      personal_info: true,
      medical_info: true,
      symptoms: true,
      medications: true,
      test_results: true,
      diary: true,
    },
    filters: {
      date_from: getEarliestDate(),
      date_to: new Date().toISOString().split("T")[0],
    },
    style: "detailed",
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleConfigChange = (path, value) => {
    setReportConfig((prev) => {
      const keys = path.split(".");
      const updated = JSON.parse(JSON.stringify(prev));

      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const getFilteredEntries = () => {
    let filtered = entries;

    // Date range filter
    const dateFrom = new Date(reportConfig.filters.date_from);
    const dateTo = new Date(reportConfig.filters.date_to);

    filtered = filtered.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= dateFrom && entryDate <= dateTo;
    });

    // Include/exclude types
    filtered = filtered.filter((entry) => {
      const typeKey =
        entry.entry_type === "diary" ? "diary" : `${entry.entry_type}s`;
      return reportConfig.include[typeKey];
    });

    return filtered;
  };

  const filteredEntries = getFilteredEntries();

  const handlePrint = () => {
    const profile = getProfile();
    const reportContent = generateReportHTML(
      reportConfig,
      filteredEntries,
      profile,
    );

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>${reportConfig.title}</title>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleEmail = () => {
    const profile = getProfile();
    const reportHTML = generateReportHTML(
      reportConfig,
      filteredEntries,
      profile,
    );
    const subject = encodeURIComponent(reportConfig.title);
    const body = encodeURIComponent(reportHTML);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyToClipboard = async () => {
    const profile = getProfile();
    const reportText = generateReportText(
      reportConfig,
      filteredEntries,
      profile,
    );
    try {
      await navigator.clipboard.writeText(reportText);
      alert("Report copied to clipboard!");
    } catch {
      alert("Failed to copy to clipboard");
    }
  };

  const SectionHeader = ({ title, section, IconComponent }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4  hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg transition font-semibold text-gray-900"
    >
      <span className="flex items-center gap-2 dark:text-gray-200">
        {IconComponent && <IconComponent className="w-5 h-5 text-blue-600" />}
        {title}
      </span>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-blue-600" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );

  return (
    <div className="rounded-lg shadow-lg border border-blue-200">
      {/* Header */}
      <div className="p-6 border-b border-blue-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                {t("report_builder_title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("report_builder_description")}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (showBuilder && onClose) {
                onClose();
              } else {
                setShowBuilder(!showBuilder);
              }
            }}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              showBuilder
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {showBuilder
              ? t("report_builder_toggle_close")
              : t("report_builder_toggle_create")}
          </button>
        </div>
      </div>

      {showBuilder && (
        <div className="p-6 space-y-6 rounded-b-lg">
          {/* Report Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              {t("report_builder_report_title_label")}
            </label>
            <input
              type="text"
              value={reportConfig.title}
              onChange={(e) => handleConfigChange("title", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder={t("report_builder_report_title_placeholder")}
            />
          </div>

          {/* Report Style */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" />
              {t("report_builder_report_style_label")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "simple",
                  icon: "📄",
                  desc: t("report_builder_report_style_facts_only"),
                },
                {
                  name: "detailed",
                  icon: "📊",
                  desc: t("report_builder_report_style_full_info"),
                },
              ].map(({ name, icon, desc }) => (
                <button
                  key={name}
                  onClick={() => handleConfigChange("style", name)}
                  className={`p-4 rounded-lg border-2 font-medium capitalize transition text-center ${
                    reportConfig.style === name
                      ? "border-blue-600 text-blue-900 dark:text-blue-300 shadow-md"
                      : "border-gray-200 text-gray-700 dark:text-gray-200 hover:border-blue-300 hover:bg-blue-10"
                  }`}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-200 mt-1">
                    {desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Include Personal Data Section */}
          <div className="space-y-3">
            <SectionHeader
              title={t("report_builder_personal_section_title")}
              section="personal"
              IconComponent={User}
            />
            {expandedSections.personal && (
              <div className="p-4 space-y-3 rounded-lg border border-blue-100">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:border transition">
                  <input
                    type="checkbox"
                    checked={reportConfig.include.personal_info}
                    onChange={(e) =>
                      handleConfigChange(
                        "include.personal_info",
                        e.target.checked,
                      )
                    }
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t("report_builder_include_personal_data")}
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:border transition">
                  <input
                    type="checkbox"
                    checked={reportConfig.include.medical_info}
                    onChange={(e) =>
                      handleConfigChange(
                        "include.medical_info",
                        e.target.checked,
                      )
                    }
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t("report_builder_include_medical_info")}
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Health Data Section */}
          <div className="space-y-3">
            <SectionHeader
              title={t("report_builder_health_data_section_title")}
              section="health"
              IconComponent={Activity}
            />
            {expandedSections.health && (
              <div className="p-4 border space-y-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {t("report_builder_date_from_label")}
                    </label>
                    <input
                      type="date"
                      value={reportConfig.filters.date_from}
                      onChange={(e) =>
                        handleConfigChange("filters.date_from", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {t("report_builder_date_to_label")}
                    </label>
                    <input
                      type="date"
                      value={reportConfig.filters.date_to}
                      onChange={(e) =>
                        handleConfigChange("filters.date_to", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:border transition">
                    <input
                      type="checkbox"
                      checked={reportConfig.include.symptoms}
                      onChange={(e) =>
                        handleConfigChange("include.symptoms", e.target.checked)
                      }
                      className="w-5 h-5 cursor-pointer accent-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {t("report_builder_include_symptoms")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:border transition">
                    <input
                      type="checkbox"
                      checked={reportConfig.include.medications}
                      onChange={(e) =>
                        handleConfigChange(
                          "include.medications",
                          e.target.checked,
                        )
                      }
                      className="w-5 h-5 cursor-pointer accent-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {t("report_builder_include_medications")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:border transition">
                    <input
                      type="checkbox"
                      checked={reportConfig.include.test_results}
                      onChange={(e) =>
                        handleConfigChange(
                          "include.test_results",
                          e.target.checked,
                        )
                      }
                      className="w-5 h-5 cursor-pointer accent-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {t("report_builder_include_test_results")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:border transition">
                    <input
                      type="checkbox"
                      checked={reportConfig.include.diary}
                      onChange={(e) =>
                        handleConfigChange("include.diary", e.target.checked)
                      }
                      className="w-5 h-5 cursor-pointer accent-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {t("report_builder_include_diary_entries")}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="border border-blue-200 rounded-lg p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-900 dark:text-gray-200 font-semibold mb-1">
                {t("report_builder_preview_section_title")}
              </p>
              <p className="text-sm text-blue-800 dark:text-gray-400">
                {filteredEntries.length} entries will be included
                {reportConfig.include.personal_info && " - personal data"}
                {reportConfig.include.medical_info && " - medical info"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrint}
              className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-3 rounded-lg transition shadow-md hover:shadow-lg"
              title={t("report_builder_button_export")}
            >
              <Printer className="w-6 h-6" />
              <span className="text-xs font-medium">
                {t("report_builder_button_export")}
              </span>
            </button>

            <button
              onClick={handleEmail}
              className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-3 rounded-lg transition shadow-md hover:shadow-lg"
              title={t("report_builder_button_email")}
            >
              <Mail className="w-6 h-6" />
              <span className="text-xs font-medium">
                {t("report_builder_button_email")}
              </span>
            </button>

            <button
              onClick={handleCopyToClipboard}
              className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-3 rounded-lg transition shadow-md hover:shadow-lg"
              title={t("report_builder_button_copy")}
            >
              <Copy className="w-6 h-6" />
              <span className="text-xs font-medium">
                {t("report_builder_button_copy")}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function generateReportHTML(reportConfig, entries, profile) {
  let html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">${reportConfig.title}</h1>
      <p style="font-size: 0.8em; color: #666;">Generated: ${new Date().toLocaleDateString()}</p>
  `;

  if (reportConfig.include.personal_info && profile?.personal_info) {
    html += `
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0066cc; margin-top: 20px;">PERSONAL INFORMATION</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Name:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.personal_info.name || "Not set"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Age:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.personal_info.age || "Not set"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Weight:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.personal_info.weight.value ? `${profile.personal_info.weight.value} ${profile.personal_info.weight.unit}` : "Not set"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Height:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.personal_info.height.value ? `${profile.personal_info.height.value} ${profile.personal_info.height.unit}` : "Not set"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Blood Type:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.personal_info.blood_type || "Not set"}</td>
          </tr>
        </table>
      </div>
    `;
  }

  if (reportConfig.include.medical_info && profile?.medical_info) {
    html += `
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0066cc; margin-top: 20px;">MEDICAL INFORMATION</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Conditions:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.medical_info.conditions.join(", ") || "None"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Allergies:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.medical_info.allergies.join(", ") || "None"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Doctor:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.medical_info.doctor_name || "Not set"}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;"><strong>Diagnosis:</strong></td>
            <td style="padding: 5px; border: 1px solid #ddd; vertical-align: top;">${profile.medical_info.diagnosis || "Not set"}</td>
          </tr>
        </table>
      </div>
    `;
  }

  if (entries.length > 0) {
    html += `
      <div>
        <h2 style="color: #0066cc; margin-top: 20px;">HEALTH LOG</h2>
    `;

    const groupedByDate = entries.reduce((acc, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = [];
      }
      acc[entry.date].push(entry);
      return acc;
    }, {});

    const sortedDates = Object.keys(groupedByDate).sort(
      (a, b) => new Date(b) - new Date(a),
    );

    sortedDates.forEach((date) => {
      html += `
        <div style="margin-top: 15px;">
          <h3 style="background-color: #f0f0f0; padding: 8px; border-radius: 5px;">${new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h3>
          <ul style="list-style-type: none; padding-left: 10px;">
      `;

      groupedByDate[date].forEach((entry) => {
        html += `
          <li style="border-left: 3px solid #0066cc; padding-left: 10px; margin-top: 10px;">
            <strong>${entry.subtype_label || entry.entry_type}</strong>
        `;

        if (reportConfig.style === "detailed") {
          if (Object.keys(entry.values || {}).length > 0) {
            html += `<ul style="list-style-type: circle; padding-left: 20px; font-size: 0.9em;">`;
            Object.entries(entry.values).forEach(([key, value]) => {
              if (key !== "uas_score") {
                html += `<li><strong>${key.replace(/_/g, " ")}:</strong> ${value}</li>`;
              }
            });
            html += `</ul>`;

            if (entry.values.uas_score !== undefined) {
              html += `<div style="background-color: #e8f5e9; padding: 5px; margin-top: 5px; text-align: center; border-radius: 4px;"><strong>Total Daily UAS: ${entry.values.uas_score}</strong></div>`;
            }
          }

          if (entry.notes) {
            html += `<p style="font-style: italic; color: #555; margin-top: 5px;">"${entry.notes}"</p>`;
          }
        }
        html += `</li>`;
      });

      html += `</ul></div>`;
    });

    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

function generateReportText(reportConfig, entries, profile) {
  let text = `${reportConfig.title}\n`;
  text += `Generated: ${new Date().toLocaleDateString()}\n`;
  text += "=".repeat(50) + "\n\n";

  if (reportConfig.include.personal_info && profile?.personal_info) {
    text += "PERSONAL INFORMATION\n";
    text += "-".repeat(50) + "\n";
    text += `Name: ${profile.personal_info.name || "Not set"}\n`;
    text += `Age: ${profile.personal_info.age || "Not set"}\n`;
    text += `Weight: ${profile.personal_info.weight.value ? profile.personal_info.weight.value + " " + profile.personal_info.weight.unit : "Not set"}\n`;
    text += `Height: ${profile.personal_info.height.value ? profile.personal_info.height.value + " " + profile.personal_info.height.unit : "Not set"}\n`;
    text += `Blood Type: ${profile.personal_info.blood_type || "Not set"}\n\n`;
  }

  if (reportConfig.include.medical_info && profile?.medical_info) {
    text += "MEDICAL INFORMATION\n";
    text += "-".repeat(50) + "\n";
    text += `Conditions: ${profile.medical_info.conditions.join(", ") || "None"}\n`;
    text += `Allergies: ${profile.medical_info.allergies.join(", ") || "None"}\n`;
    text += `Doctor: ${profile.medical_info.doctor_name || "Not set"}\n`;
    text += `Diagnosis: ${profile.medical_info.diagnosis || "Not set"}\n\n`;
  }

  if (entries.length > 0) {
    text += "HEALTH LOG\n";
    text += "-".repeat(50) + "\n";
    entries.forEach((entry, idx) => {
      text += `${idx + 1}. ${entry.subtype_label || entry.entry_type} - ${entry.date}\n`;
      if (Object.keys(entry.values || {}).length > 0) {
        Object.entries(entry.values).forEach(([key, value]) => {
          text += `   ${key}: ${value}\n`;
        });
      }
      if (entry.notes) {
        text += `   Notes: ${entry.notes}\n`;
      }
      text += "\n";
    });
  }

  return text;
}

export default ReportBuilder;
