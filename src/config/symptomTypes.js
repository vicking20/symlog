/**
 * Symptom Type Configuration
 *
 * This defines the structure of different entry types in the app.
 * Each symptom type can have custom fields, metrics, and validation.
 *
 * Easy to extend: just add a new type object to the array below.
 */

export const SYMPTOM_TYPES = {
  symptom: {
    id: "symptom",
    label: "symptom_type_symptom_label",
    icon: "activity",
    color: "red",
    description: "symptom_type_symptom_description",
    subtypes: [
      {
        id: "urticaria_uas7",
        label: "symptom_subtype_urticaria_uas7_label",
        fields: [
          {
            id: "itching_severity",
            label: "symptom_field_itching_severity_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
            description: "symptom_field_itching_severity_description",
          },
          {
            id: "hives_extent",
            label: "symptom_field_hives_extent_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
            description: "symptom_field_hives_extent_description",
          },
          {
            id: "activity_impairment",
            label: "symptom_field_activity_impairment_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
            description: "symptom_field_activity_impairment_description",
          },
        ],
      },
      {
        id: "pain_vas",
        label: "symptom_subtype_pain_vas_label",
        fields: [
          {
            id: "pain_score",
            label: "symptom_field_pain_score_label",
            type: "slider",
            min: 0,
            max: 10,
            step: 1,
          },
        ],
      },
      {
        id: "asthma_act",
        label: "symptom_subtype_asthma_act_label",
        fields: [
          {
            id: "activity_limitation",
            label: "symptom_field_activity_limitation_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "shortness_of_breath",
            label: "symptom_field_shortness_of_breath_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "night_awakenings",
            label: "symptom_field_night_awakenings_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "rescue_inhaler_use",
            label: "symptom_field_rescue_inhaler_use_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "self_assessed_control",
            label: "symptom_field_self_assessed_control_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
        ],
      },
      {
        id: "anxiety_gad7",
        label: "symptom_subtype_anxiety_gad7_label",
        fields: [
          {
            id: "nervous_anxious",
            label: "symptom_field_nervous_anxious_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "control_worry",
            label: "symptom_field_control_worry_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "excessive_worrying",
            label: "symptom_field_excessive_worrying_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "trouble_relaxing",
            label: "symptom_field_trouble_relaxing_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "restlessness",
            label: "symptom_field_restlessness_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "irritability",
            label: "symptom_field_irritability_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "fear_something_bad",
            label: "symptom_field_fear_something_bad_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
        ],
      },
      {
        id: "headache_hit6",
        label: "symptom_subtype_headache_hit6_label",
        fields: [
          {
            id: "pain_intensity",
            label: "symptom_field_pain_intensity_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "social_limitations",
            label: "symptom_field_social_limitations_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "irritability",
            label: "symptom_field_irritability_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "concentration_difficulty",
            label: "symptom_field_concentration_difficulty_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "fatigue",
            label: "symptom_field_fatigue_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
          {
            id: "role_disruption",
            label: "symptom_field_role_disruption_label",
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
          },
        ],
      },
      {
        id: "depression_phq9",
        label: "symptom_subtype_depression_phq9_label",
        fields: [
          {
            id: "interest_pleasure",
            label: "symptom_field_interest_pleasure_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "feeling_down",
            label: "symptom_field_feeling_down_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "sleep_issues",
            label: "symptom_field_sleep_issues_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "fatigue",
            label: "symptom_field_fatigue_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "appetite_change",
            label: "symptom_field_appetite_change_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "self_worth",
            label: "symptom_field_self_worth_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "concentration_difficulty",
            label: "symptom_field_concentration_difficulty_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "psychomotor_change",
            label: "symptom_field_psychomotor_change_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "suicidal_thoughts",
            label: "symptom_field_suicidal_thoughts_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
        ],
      },
      {
        id: "ibd_ibsss",
        label: "symptom_subtype_ibd_ibsss_label",
        fields: [
          {
            id: "abdominal_pain_severity",
            label: "symptom_field_abdominal_pain_severity_label",
            type: "slider",
            min: 0,
            max: 100,
            step: 10,
          },
          {
            id: "abdominal_distension",
            label: "symptom_field_abdominal_distension_label",
            type: "slider",
            min: 0,
            max: 100,
            step: 10,
          },
          {
            id: "bowel_habit_satisfaction",
            label: "symptom_field_bowel_habit_satisfaction_label",
            type: "slider",
            min: 0,
            max: 100,
            step: 10,
          },
          {
            id: "life_interference",
            label: "symptom_field_life_interference_label",
            type: "slider",
            min: 0,
            max: 100,
            step: 10,
          },
          {
            id: "abdominal_pain_days",
            label: "symptom_field_abdominal_pain_days_label",
            type: "slider",
            min: 0,
            max: 10,
            step: 1,
          },
        ],
      },
      {
        id: "dermatology_dlqi",
        label: "symptom_subtype_dermatology_dlqi_label",
        fields: [
          {
            id: "itch_soreness",
            label: "symptom_field_itch_soreness_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "embarrassment",
            label: "symptom_field_embarrassment_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "daily_activity_limitations",
            label: "symptom_field_daily_activity_limitations_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "social_work_interference",
            label: "symptom_field_social_work_interference_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
          {
            id: "treatment_difficulty",
            label: "symptom_field_treatment_difficulty_label",
            type: "slider",
            min: 0,
            max: 3,
            step: 1,
          },
        ],
      },
      {
        id: "pain_symptom",
        label: "symptom_subtype_pain_symptom_label",
        fields: [
          {
            id: "pain_score",
            label: "symptom_field_pain_score_label",
            type: "slider",
            min: 0,
            max: 10,
            step: 1,
            placeholder: "symptom_field_pain_score_placeholder",
          },
          {
            id: "stiffness_duration",
            label: "symptom_field_stiffness_duration_label",
            type: "slider",
            min: 1,
            max: 10,
            step: 1,
          },
          {
            id: "fatigue",
            label: "symptom_field_fatigue_label",
            type: "slider",
            min: 0,
            max: 5,
            step: 1,
          },
          {
            id: "mobility_function",
            label: "symptom_field_mobility_function_label",
            type: "slider",
            min: 0,
            max: 5,
            step: 1,
          },
        ],
      },
      {
        id: "generic_symptom",
        label: "symptom_subtype_generic_symptom_label",
        fields: [
          {
            id: "symptom_name",
            label: "symptom_field_symptom_name_label",
            type: "text",
            placeholder: "symptom_field_symptom_name_placeholder",
          },
          {
            id: "severity",
            label: "symptom_field_severity_label",
            type: "slider",
            min: 1,
            max: 10,
            step: 1,
          },
          {
            id: "duration",
            label: "symptom_field_duration_label",
            type: "select",
            options: [
              "duration_option_1",
              "duration_option_2",
              "duration_option_3",
              "duration_option_4",
            ],
          },
        ],
      },
    ],
  },

  medication: {
    id: "medication",
    label: "symptom_type_medication_label",
    icon: "pill",
    color: "blue",
    description: "symptom_type_medication_description",
    subtypes: [
      {
        id: "standard_medication",
        label: "symptom_subtype_standard_medication_label",
        fields: [
          {
            id: "medication_name",
            label: "symptom_field_medication_name_label",
            type: "text",
            placeholder: "symptom_field_medication_name_placeholder",
          },
          {
            id: "dosage",
            label: "symptom_field_dosage_label",
            type: "text",
            placeholder: "symptom_field_dosage_placeholder",
          },
          {
            id: "time_taken",
            label: "symptom_field_time_taken_label",
            type: "time",
          },
          {
            id: "reason",
            label: "symptom_field_reason_for_taking_label",
            type: "text",
            placeholder: "symptom_field_reason_for_taking_placeholder",
          },
        ],
      },
    ],
  },

  diary: {
    id: "diary",
    label: "symptom_type_diary_label",
    icon: "book",
    color: "green",
    description: "symptom_type_diary_description",
    subtypes: [
      {
        id: "diary_note",
        label: "symptom_subtype_diary_note_label",
        fields: [
          {
            id: "title",
            label: "symptom_field_title_label",
            type: "text",
            placeholder: "symptom_field_title_placeholder",
          },
          {
            id: "mood",
            label: "symptom_field_mood_label",
            type: "select",
            options: [
              "mood_option_great",
              "mood_option_good",
              "mood_option_okay",
              "mood_option_bad",
              "mood_option_terrible",
            ],
          },
          {
            id: "energy_level",
            label: "symptom_field_energy_level_label",
            type: "slider",
            min: 1,
            max: 10,
            step: 1,
          },
        ],
      },
    ],
  },

  test_result: {
    id: "test_result",
    label: "symptom_type_test_result_label",
    icon: "beaker",
    color: "purple",
    description: "symptom_type_test_result_description",
    subtypes: [
      {
        id: "lab_test",
        label: "symptom_subtype_lab_test_label",
        fields: [
          {
            id: "test_name",
            label: "symptom_field_test_name_label",
            type: "text",
            placeholder: "symptom_field_test_name_placeholder",
          },
          {
            id: "result",
            label: "symptom_field_result_label",
            type: "text",
            placeholder: "symptom_field_result_placeholder",
          },
          {
            id: "result_value",
            label: "symptom_field_result_value_label",
            type: "text",
            placeholder: "symptom_field_result_value_placeholder",
          },
          {
            id: "test_date",
            label: "symptom_field_test_date_label",
            type: "date",
          },
        ],
      },
    ],
  },
};

/**
 * Helper function to get all entry types
 */
export const getEntryTypes = () => {
  return Object.values(SYMPTOM_TYPES).map((type) => ({
    id: type.id,
    label: type.label,
    icon: type.icon,
    color: type.color,
    description: type.description,
  }));
};

/**
 * Helper function to get subtypes for a given entry type
 */
export const getSubtypes = (typeId) => {
  const type = SYMPTOM_TYPES[typeId];
  return type ? type.subtypes : [];
};

/**
 * Helper function to get fields for a specific subtype
 */
export const getFields = (typeId, subtypeId) => {
  const type = SYMPTOM_TYPES[typeId];
  if (!type) return [];
  const subtype = type.subtypes.find((st) => st.id === subtypeId);
  return subtype ? subtype.fields : [];
};

/**
 * Helper function to get type/subtype label
 */
export const getTypeLabel = (typeId, subtypeId) => {
  const type = SYMPTOM_TYPES[typeId];
  if (!type) return "";
  const subtype = type.subtypes.find((st) => st.id === subtypeId);
  return subtype ? subtype.label : type.label;
};

/**
 * Helper function to get color for type
 */
export const getTypeColor = (typeId) => {
  const type = SYMPTOM_TYPES[typeId];
  return type ? type.color : "gray";
};
