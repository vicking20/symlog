import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Lock,
  FileText,
  BarChart3,
  Heart,
  Check,
  ArrowRight,
  Shield,
  Smartphone,
  Users,
  Zap,
  TrendingUp,
  Calendar,
  Github,
  Linkedin,
} from "lucide-react";

function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Lock,
      title: t("feature_private_title"),
      description: t("feature_private_desc"),
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: FileText,
      title: t("feature_flexible_title"),
      description: t("feature_flexible_desc"),
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: BarChart3,
      title: t("feature_smart_reports_title"),
      description: t("feature_smart_reports_desc"),
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Shield,
      title: t("feature_encrypted_backups_title"),
      description: t("feature_encrypted_backups_desc"),
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Smartphone,
      title: t("feature_offline_title"),
      description: t("feature_offline_desc"),
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: TrendingUp,
      title: t("feature_progress_title"),
      description: t("feature_progress_desc"),
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const benefits = [
    {
      title: t("benefit_patients_title"),
      items: [
        t("benefit_patients_item_1"),
        t("benefit_patients_item_2"),
        t("benefit_patients_item_3"),
        t("benefit_patients_item_4"),
      ],
      icon: Heart,
    },
    {
      title: t("benefit_healthcare_title"),
      items: [
        t("benefit_healthcare_item_1"),
        t("benefit_healthcare_item_2"),
        t("benefit_healthcare_item_3"),
        t("benefit_healthcare_item_4"),
      ],
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 fade-in-up">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <img
              src="/undraw_spreadsheets_bh6n.svg"
              alt={t("home_hero_alt")}
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t("home_hero_title")}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 font-semibold">
            {t("home_hero_subtitle")}
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("home_hero_secondary_subtitle")}
          </p>
          <div className="flex justify-center mb-12">
            <Link
              to="/entries"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              {t("get_started")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <div className="py-20 fade-in-up">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t("features")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            {t("home_features_subtitle")}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className={`${feature.bg} dark:bg-gray-700 rounded-xl p-8 hover:shadow-lg transition border border-gray-200 dark:border-gray-600`}
                >
                  <div className={`${feature.color} mb-4 inline-block`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
              {t("home_features_subtitle2")}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
              {t("home_features_subtitle3")}
            </p>
            <p className="text-blue-600 text-xl">
              <a href="mailto:vfatunse@gmail.com">vfatunse@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 fade-in-up">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-8">
                {t("home_story_title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                {t("home_story_p1")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                {t("home_story_p2")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-semibold">
                {t("home_story_p3")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mt-6">
                {t("home_story_p4")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-12 flex items-center justify-center h-96">
              <div className="text-center">
                <Calendar className="w-24 h-24 text-blue-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-700 text-lg font-medium">
                  {t("home_story_image_caption")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Symlog */}
      <div className="py-20 fade-in-up">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 text-center mb-16">
            {t("home_why_title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-transparent rounded-xl p-8 border border-gray-200"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                      {benefit.title}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {benefit.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 dark:text-gray-200">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Differentiators */}
      <div className="py-20 fade-in-up">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 text-center mb-4">
            {t("home_differentiators_title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            {t("home_differentiators_subtitle")}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-6 inline-block p-4 bg-blue-100 rounded-full">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200  mb-3">
                {t("home_differentiators_1_title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 ">
                {t("home_differentiators_1_text")}
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-block p-4 bg-green-100 rounded-full">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">
                {t("home_differentiators_2_title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 ">
                {t("home_differentiators_2_text")}
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-block p-4 bg-purple-100 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">
                {t("home_differentiators_3_title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                {t("home_differentiators_3_text")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 fade-in-up">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 text-center mb-16">
            {t("home_how_it_works_title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-gray-200 ">
                {t("home_how_it_works_1_title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 ">
                {t("home_how_it_works_1_text")}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">
                {t("home_how_it_works_2_title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 ">
                {t("home_how_it_works_2_text")}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">
                {t("home_how_it_works_3_title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 ">
                {t("home_how_it_works_3_text")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 fade-in-up">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-8">
            {t("home_cta_title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            {t("home_cta_subtitle")}
          </p>
          <Link
            to="/entries"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg transition shadow-lg hover:shadow-xl text-lg"
          >
            {t("start_tracking")}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-600 mt-8 text-sm">{t("home_cta_note")}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            {t("footer_copyright")}
          </p>

          <p className="text-gray-500 dark:text-gray-600 text-sm mt-6">
            {t("footer_privacy_note")}
          </p>
        </div>
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://github.com/vicking20"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition"
            title="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/victorfatunse/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
