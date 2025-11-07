/**
 * Encrypted Backup & Restore Utilities
 * Uses crypto-js for AES encryption
 */

import CryptoJS from "crypto-js";

const BACKUP_VERSION = "1.0";

/**
 * Create encrypted backup file
 */
export const createBackup = (password) => {
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Collect all data
  const profile = localStorage.getItem("symlog_profile");
  const entries = localStorage.getItem("symlog_entries");

  const backupData = {
    version: BACKUP_VERSION,
    timestamp: new Date().toISOString(),
    data: {
      profile: profile ? JSON.parse(profile) : null,
      entries: entries ? JSON.parse(entries) : [],
    },
  };

  // Encrypt the data
  const jsonString = JSON.stringify(backupData);
  const encrypted = CryptoJS.AES.encrypt(jsonString, password).toString();

  // Create backup object
  const backup = {
    version: BACKUP_VERSION,
    timestamp: new Date().toISOString(),
    encryptedData: encrypted,
  };

  return backup;
};

/**
 * Export backup as JSON file
 */
export const exportBackupFile = (password) => {
  try {
    const backup = createBackup(password);
    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `symlog_backup_${new Date().toISOString().split("T")[0]}.symlog`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (err) {
    console.error("Error exporting backup:", err);
    throw err;
  }
};

/**
 * Restore backup from file
 */
export const restoreBackupFile = (file, password) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const backupData = JSON.parse(event.target.result);

        if (backupData.version !== BACKUP_VERSION) {
          reject(new Error("Incompatible backup version"));
          return;
        }

        // Decrypt the data
        const decrypted = CryptoJS.AES.decrypt(
          backupData.encryptedData,
          password,
        ).toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
          reject(new Error("Invalid password or corrupted backup file"));
          return;
        }

        const originalData = JSON.parse(decrypted);

        // Verify data structure
        if (!originalData.data) {
          reject(new Error("Invalid backup file structure"));
          return;
        }

        resolve({
          timestamp: originalData.timestamp,
          profile: originalData.data.profile,
          entries: originalData.data.entries,
        });
      } catch {
        reject(new Error("Failed to decrypt backup. Check your password."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read backup file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Restore data to localStorage
 */
export const applyBackup = (backupData) => {
  try {
    // Restore profile
    if (backupData.profile) {
      localStorage.setItem(
        "symlog_profile",
        JSON.stringify(backupData.profile),
      );
    }

    // Restore entries
    if (backupData.entries && Array.isArray(backupData.entries)) {
      localStorage.setItem(
        "symlog_entries",
        JSON.stringify(backupData.entries),
      );
    }

    return {
      success: true,
      profileRestored: !!backupData.profile,
      entriesRestored: backupData.entries ? backupData.entries.length : 0,
      timestamp: backupData.timestamp,
    };
  } catch {
    throw new Error("Failed to restore backup data");
  }
};

/**
 * Get backup info without password
 */
export const getBackupInfo = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const backupData = JSON.parse(event.target.result);
        resolve({
          version: backupData.version,
          timestamp: backupData.timestamp,
          filename: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
        });
      } catch {
        reject(new Error("Invalid backup file format"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read backup file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Get last backup info from localStorage
 */
export const getLastBackupInfo = () => {
  const lastBackup = localStorage.getItem("symlog_last_backup_info");
  return lastBackup ? JSON.parse(lastBackup) : null;
};

/**
 * Save backup info to localStorage
 */
export const saveBackupInfo = (info) => {
  localStorage.setItem(
    "symlog_last_backup_info",
    JSON.stringify({
      timestamp: new Date().toISOString(),
      size: info.size,
    }),
  );
};
