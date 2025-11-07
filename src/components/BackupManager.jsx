import React, { useState, useEffect } from "react";
import { Download, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  exportBackupFile,
  restoreBackupFile,
  applyBackup,
  getBackupInfo,
  getLastBackupInfo,
} from "../utils/backup";

function BackupManager() {
  const { t } = useTranslation();
  const [showCreateBackup, setShowCreateBackup] = useState(false);
  const [showRestoreBackup, setShowRestoreBackup] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restorePassword, setRestorePassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [backupInfo, setBackupInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [lastBackup, setLastBackup] = useState(null);

  useEffect(() => {
    const info = getLastBackupInfo();
    if (info) {
      setLastBackup(info);
    }
  }, []);

  const handleCreateBackup = async () => {
    if (!password || !confirmPassword) {
      setMessage({
        type: "error",
        text: t("backup_error_enter_password"),
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: t("backup_error_passwords_mismatch"),
      });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: t("backup_error_password_too_short"),
      });
      return;
    }

    try {
      setIsProcessing(true);
      await exportBackupFile(password);
      setMessage({
        type: "success",
        text: t("backup_success_created"),
      });
      setPassword("");
      setConfirmPassword("");
      setShowCreateBackup(false);

      // Update last backup info
      const now = new Date().toISOString();
      setLastBackup({ timestamp: now });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || t("backup_error_failed_create"),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const info = await getBackupInfo(file);
      setSelectedFile(file);
      setBackupInfo(info);
      setMessage(null);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || t("backup_error_invalid_file"),
      });
      setSelectedFile(null);
      setBackupInfo(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedFile || !restorePassword) {
      setMessage({
        type: "error",
        text: t("backup_error_select_file_and_password"),
      });
      return;
    }

    const confirmed = window.confirm(t("backup_confirm_restore"));
    if (!confirmed) return;

    try {
      setIsProcessing(true);
      const restoredData = await restoreBackupFile(
        selectedFile,
        restorePassword,
      );
      const result = applyBackup(restoredData);

      setMessage({
        type: "success",
        text: t("backup_success_restored", { count: result.entriesRestored }),
      });

      // Reset form
      setRestorePassword("");
      setSelectedFile(null);
      setBackupInfo(null);
      setShowRestoreBackup(false);

      // Reload page to show new data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || t("backup_error_failed_restore"),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">
        {t("backup_title")}
      </h2>

      {/* Last Backup Info */}
      {lastBackup && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-900">
                {t("backup_last_backup_created")}
              </p>
              <p className="text-sm text-green-700">
                {new Date(lastBackup.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
            message.type === "error"
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          {message.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          )}
          <p
            className={
              message.type === "error" ? "text-red-700" : "text-green-700"
            }
          >
            {message.text}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => {
            setShowCreateBackup(!showCreateBackup);
            setShowRestoreBackup(false);
            setMessage(null);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          <Download className="w-5 h-5" />
          {t("backup_button_create")}
        </button>

        <button
          onClick={() => {
            setShowRestoreBackup(!showRestoreBackup);
            setShowCreateBackup(false);
            setMessage(null);
          }}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          <Upload className="w-5 h-5" />
          {t("backup_button_restore")}
        </button>
      </div>

      {/* Create Backup Form */}
      {showCreateBackup && (
        <div className="p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-4">
            {t("backup_form_title_create")}
          </h3>
          <p className="text-gray-600 dark:text-gray-200 mb-4">
            {t("backup_form_description_create")}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t("backup_form_label_password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 dark:text-gray-200 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("backup_form_placeholder_password")}
              />
              <p className="text-xs text-gray-600 dark:text-gray-200 mt-1">
                {t("backup_form_helper_password")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t("backup_form_label_confirm_password")}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 dark:text-gray-200 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("backup_form_placeholder_confirm_password")}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateBackup}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {isProcessing
                  ? t("backup_form_processing_create")
                  : t("backup_form_button_create")}
              </button>
              <button
                onClick={() => {
                  setShowCreateBackup(false);
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
              >
                {t("backup_form_button_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Backup Form */}
      {showRestoreBackup && (
        <div className="p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-4">
            {t("backup_form_title_restore")}
          </h3>
          <p className="text-gray-600 dark:text-gray-200 mb-4">
            {t("backup_form_description_restore")}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t("backup_form_label_file")}
              </label>
              <input
                type="file"
                accept=".symlog,.json"
                onChange={handleFileSelect}
                disabled={isProcessing}
                className="w-full dark:text-gray-200"
              />
              {backupInfo && (
                <div className="mt-2 p-3 bg-white border border-gray-300 rounded text-sm text-gray-700">
                  <p>
                    {t("backup_form_backup_info_file", {
                      filename: backupInfo.filename,
                    })}
                  </p>
                  <p>
                    {t("backup_form_backup_info_created", {
                      date: new Date(backupInfo.timestamp).toLocaleString(),
                    })}
                  </p>
                  <p>
                    {t("backup_form_backup_info_size", {
                      size: backupInfo.size,
                    })}
                  </p>
                </div>
              )}
            </div>

            {selectedFile && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {t("backup_form_label_password")}
                </label>
                <input
                  type="password"
                  value={restorePassword}
                  onChange={(e) => setRestorePassword(e.target.value)}
                  className="w-full px-4 py-2 dark:text-gray-200 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("backup_form_placeholder_password")}
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRestoreBackup}
                disabled={!selectedFile || isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {isProcessing
                  ? t("backup_form_processing_restore")
                  : t("backup_form_button_restore")}
              </button>
              <button
                onClick={() => {
                  setShowRestoreBackup(false);
                  setRestorePassword("");
                  setSelectedFile(null);
                  setBackupInfo(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
              >
                {t("backup_form_button_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-transparent border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-gray-200 mb-2">
          {t("backup_info_title")}
        </h4>
        <ul className="text-sm text-blue-800 dark:text-gray-400 space-y-1">
          <li>{t("backup_info_item_1")}</li>
          <li>{t("backup_info_item_2")}</li>
          <li>{t("backup_info_item_3")}</li>
          <li>{t("backup_info_item_4")}</li>
        </ul>
      </div>
    </div>
  );
}

export default BackupManager;
