/**
 * Profile Storage Utilities
 * Manages user profile data in localStorage
 */

const PROFILE_KEY = "symlog_profile";

export const defaultProfile = {
  id: "profile",
  personal_info: {
    name: "",
    age: null,
    gender: "",
    weight: { value: null, unit: "kg" },
    height: { value: null, unit: "cm" },
    blood_type: "",
  },
  medical_info: {
    conditions: [],
    allergies: [],
    doctor_name: "",
    doctor_email: "",
    diagnosis: "",
  },
  contact_info: {
    emergency_contact_name: "",
    emergency_contact_phone: "",
  },
  preferences: {
    language: localStorage.getItem("language") || "en",
    unit_system: "metric",
    privacy_mode: true,
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

/**
 * Get user profile from localStorage
 */
export const getProfile = () => {
  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    return stored ? JSON.parse(stored) : defaultProfile;
  } catch (error) {
    console.error("Error loading profile:", error);
    return defaultProfile;
  }
};

/**
 * Save user profile to localStorage
 */
export const saveProfile = (profile) => {
  try {
    const updatedProfile = {
      ...profile,
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
};

/**
 * Update specific profile field
 */
export const updateProfileField = (path, value) => {
  const profile = getProfile();

  // Handle nested paths like "personal_info.name"
  const keys = path.split(".");
  let obj = profile;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!obj[keys[i]]) {
      obj[keys[i]] = {};
    }
    obj = obj[keys[i]];
  }

  obj[keys[keys.length - 1]] = value;

  return saveProfile(profile);
};

/**
 * Delete profile (reset to default)
 */
export const deleteProfile = () => {
  localStorage.removeItem(PROFILE_KEY);
  return defaultProfile;
};

/**
 * Check if profile is empty
 */
export const isProfileEmpty = () => {
  const profile = getProfile();

  return (
    !profile.personal_info.name &&
    !profile.personal_info.age &&
    !profile.medical_info.doctor_name &&
    profile.medical_info.conditions.length === 0
  );
};

/**
 * Export profile as JSON
 */
export const exportProfile = () => {
  const profile = getProfile();
  return JSON.stringify(profile, null, 2);
};

/**
 * Get profile summary for display
 */
export const getProfileSummary = () => {
  const profile = getProfile();

  return {
    name: profile.personal_info.name || "Not set",
    age: profile.personal_info.age || "Not set",
    weight: profile.personal_info.weight.value
      ? `${profile.personal_info.weight.value} ${profile.personal_info.weight.unit}`
      : "Not set",
    height: profile.personal_info.height.value
      ? `${profile.personal_info.height.value} ${profile.personal_info.height.unit}`
      : "Not set",
    conditions: profile.medical_info.conditions.join(", ") || "None",
    doctor: profile.medical_info.doctor_name || "Not set",
  };
};
