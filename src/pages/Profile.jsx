import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  User,
  Heart,
  Briefcase,
  Settings,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { getProfile, saveProfile } from "../utils/profileStorage";
import BackupManager from "../components/BackupManager";

function Profile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [newCondition, setNewCondition] = useState("");
  const [newAllergy, setNewAllergy] = useState("");

  useEffect(() => {
    const loaded = getProfile();
    setProfile(loaded);
    setFormData(loaded);
  }, []);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (section, field, nested, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          [nested]: value,
        },
      },
    }));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setFormData((prev) => ({
        ...prev,
        medical_info: {
          ...prev.medical_info,
          conditions: [...prev.medical_info.conditions, newCondition.trim()],
        },
      }));
      setNewCondition("");
    }
  };

  const removeCondition = (idx) => {
    setFormData((prev) => ({
      ...prev,
      medical_info: {
        ...prev.medical_info,
        conditions: prev.medical_info.conditions.filter((_, i) => i !== idx),
      },
    }));
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData((prev) => ({
        ...prev,
        medical_info: {
          ...prev.medical_info,
          allergies: [...prev.medical_info.allergies, newAllergy.trim()],
        },
      }));
      setNewAllergy("");
    }
  };

  const removeAllergy = (idx) => {
    setFormData((prev) => ({
      ...prev,
      medical_info: {
        ...prev.medical_info,
        allergies: prev.medical_info.allergies.filter((_, i) => i !== idx),
      },
    }));
  };

  const handleSave = () => {
    saveProfile(formData);
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleDeleteAllData = () => {
    const confirmed = window.confirm(t("profile_delete_confirm_1"));

    if (confirmed) {
      const finalConfirm = window.confirm(t("profile_delete_confirm_2"));

      if (finalConfirm) {
        // Clear all localStorage
        localStorage.removeItem("symlog_entries");
        localStorage.removeItem("symlog_profile");
        localStorage.removeItem("symlog_backup");

        // Reload page to reset everything
        window.location.reload();
      }
    }
  };

  if (!formData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t("profile_title")}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("profile_subtitle")}
          </p>
        </div>

        {/* Edit Button */}
        <div className="mb-6">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              {t("profile_edit_button")}
            </button>
          )}
        </div>

        {/* Profile Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                {t("profile_personal_info_title")}
              </h2>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("profile_full_name")}
                  </label>
                  <input
                    type="text"
                    value={formData.personal_info.name}
                    onChange={(e) =>
                      handleInputChange("personal_info", "name", e.target.value)
                    }
                    className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("profile_full_name_placeholder")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {t("profile_age")}
                    </label>
                    <input
                      type="number"
                      value={formData.personal_info.age || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "personal_info",
                          "age",
                          e.target.value ? parseInt(e.target.value) : null,
                        )
                      }
                      className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("profile_age_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {t("profile_gender")}
                    </label>
                    <select
                      value={formData.personal_info.gender}
                      onChange={(e) =>
                        handleInputChange(
                          "personal_info",
                          "gender",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t("profile_gender_select")}</option>
                      <option value="M">{t("profile_gender_male")}</option>
                      <option value="F">{t("profile_gender_female")}</option>
                      <option value="O">{t("profile_gender_other")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("profile_blood_type")}
                  </label>
                  <select
                    value={formData.personal_info.blood_type}
                    onChange={(e) =>
                      handleInputChange(
                        "personal_info",
                        "blood_type",
                        e.target.value,
                      )
                    }
                    className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t("profile_blood_type_select")}</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {t("profile_weight", {
                        unit: formData.personal_info.weight.unit,
                      })}
                    </label>
                    <input
                      type="number"
                      value={formData.personal_info.weight.value || ""}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "personal_info",
                          "weight",
                          "value",
                          e.target.value ? parseFloat(e.target.value) : null,
                        )
                      }
                      className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("profile_weight_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {t("profile_height", {
                        unit: formData.personal_info.height.unit,
                      })}
                    </label>
                    <input
                      type="number"
                      value={formData.personal_info.height.value || ""}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "personal_info",
                          "height",
                          "value",
                          e.target.value ? parseFloat(e.target.value) : null,
                        )
                      }
                      className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("profile_height_placeholder")}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_full_name")}
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                    {formData.personal_info.name || t("profile_not_set")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {t("profile_age")}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                      {formData.personal_info.age || t("profile_not_set")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {t("profile_gender")}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                      {formData.personal_info.gender || t("profile_not_set")}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_blood_type")}
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                    {formData.personal_info.blood_type || t("profile_not_set")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {t("display_weight")}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                      {formData.personal_info.weight.value
                        ? `${formData.personal_info.weight.value} ${formData.personal_info.weight.unit}`
                        : t("profile_not_set")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {t("display_height")}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                      {formData.personal_info.height.value
                        ? `${formData.personal_info.height.value} ${formData.personal_info.height.unit}`
                        : t("profile_not_set")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medical Information */}
          <div className="rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                {t("profile_medical_info_title")}
              </h2>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t("profile_conditions")}
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addCondition();
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:bg-transparent dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("profile_add_condition_placeholder")}
                    />
                    <button
                      onClick={addCondition}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.medical_info.conditions.map((cond, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {cond}
                        <button
                          onClick={() => removeCondition(idx)}
                          className="hover:text-blue-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t("profile_allergies")}
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addAllergy();
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:bg-transparent dark:text-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("profile_add_allergy_placeholder")}
                    />
                    <button
                      onClick={addAllergy}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.medical_info.allergies.map((allergy, idx) => (
                      <div
                        key={idx}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {allergy}
                        <button
                          onClick={() => removeAllergy(idx)}
                          className="hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("profile_doctor_name")}
                  </label>
                  <input
                    type="text"
                    value={formData.medical_info.doctor_name}
                    onChange={(e) =>
                      handleInputChange(
                        "medical_info",
                        "doctor_name",
                        e.target.value,
                      )
                    }
                    className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("profile_doctor_name_placeholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("profile_doctor_email")}
                  </label>
                  <input
                    type="email"
                    value={formData.medical_info.doctor_email}
                    onChange={(e) =>
                      handleInputChange(
                        "medical_info",
                        "doctor_email",
                        e.target.value,
                      )
                    }
                    className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("profile_doctor_email_placeholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("profile_diagnosis")}
                  </label>
                  <textarea
                    value={formData.medical_info.diagnosis}
                    onChange={(e) =>
                      handleInputChange(
                        "medical_info",
                        "diagnosis",
                        e.target.value,
                      )
                    }
                    rows="3"
                    className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("profile_diagnosis_placeholder")}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_conditions")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.medical_info.conditions.length > 0 ? (
                      formData.medical_info.conditions.map((cond, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {cond}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600 dark:text-gray-200">
                        {t("profile_not_set")}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_allergies")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.medical_info.allergies.length > 0 ? (
                      formData.medical_info.allergies.map((allergy, idx) => (
                        <span
                          key={idx}
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                        >
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600 dark:text-gray-200">
                        {t("profile_not_set")}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_doctor_name")}
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                    {formData.medical_info.doctor_name || t("profile_not_set")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_doctor_email")}
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                    {formData.medical_info.doctor_email || t("profile_not_set")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    {t("profile_diagnosis")}
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-400 whitespace-pre-wrap">
                    {formData.medical_info.diagnosis || t("profile_not_set")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg shadow-md p-6 border border-gray-200 mt-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              {t("profile_contact_info_title")}
            </h2>
          </div>

          {isEditing ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {t("profile_emergency_contact_name")}
                </label>
                <input
                  type="text"
                  value={formData.contact_info.emergency_contact_name}
                  onChange={(e) =>
                    handleInputChange(
                      "contact_info",
                      "emergency_contact_name",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("profile_emergency_contact_name_placeholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {t("profile_emergency_contact_phone")}
                </label>
                <input
                  type="tel"
                  value={formData.contact_info.emergency_contact_phone}
                  onChange={(e) =>
                    handleInputChange(
                      "contact_info",
                      "emergency_contact_phone",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-2 dark:bg-transparent dark:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("profile_emergency_contact_phone_placeholder")}
                />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  {t("profile_emergency_contact_name")}
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                  {formData.contact_info.emergency_contact_name ||
                    t("profile_not_set")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  {t("profile_emergency_contact_phone")}
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-400">
                  {formData.contact_info.emergency_contact_phone ||
                    t("profile_not_set")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              {t("profile_save_changes")}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-8 rounded-lg transition"
            >
              {t("form_cancel")}
            </button>
          </div>
        )}

        {/* Backup & Restore Section */}
        <div className="mt-8">
          <BackupManager />
        </div>

        {/* Danger Zone - Delete All Data */}
        <div className="mt-8 bg-red-50 dark:bg-transparent border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-bold text-red-600">
              {t("profile_delete_data_title")}
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            {t("profile_delete_data_description")}
          </p>
          <button
            onClick={handleDeleteAllData}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            {t("profile_delete_all_data_button")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
