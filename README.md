# Symlog
Visit [Symlog](https://symlog.zekfat.xyz)

A privacy-friendly, open-source **symptom and health diary** that helps patients track daily symptoms using validated clinical scales like **UAS7**, **PHQ-9**, **GAD-7**, and more.

Data can be exported and shared with doctors to support diagnosis and long-term monitoring. Visualization features coming in the future.

---

## Features

- ✅ **Track symptoms using validated scales** — UAS7 (Urticaria), PHQ-9 (Depression), GAD-7 (Anxiety), Pain VAS, DLQI (Dermatology), IBS-SSS, HIT-6 (Headache), and more
- ✅ **Log daily scores, notes, and medication use** — Comprehensive health tracking
- ✅ **View progress trends and summaries** — Understand your health patterns
- ✅ **Fully local & private** — Your data stays on your device, no external servers
- ✅ **Export & share reports** — Generate doctor-ready PDFs and text reports
- ✅ **Encrypted backups** — Secure backup and restore your data with password protection
- ✅ **Configurable symptom sets** — Easy to extend with new symptom types
- ✅ **Multi-language support** — English and Finnish (more languages welcome!)
- ✅ **Dark mode** — Comfortable for all lighting conditions
- ✅ **Offline-first** — Works completely without internet connection

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

Clone the repository:

```bash
git clone https://github.com/vicking20/symlog.git
cd symlog
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Data Privacy

- 🔒 **All entries are stored locally** on your device in browser localStorage
- 🔒 **No external servers** are contacted unless you explicitly enable backup/sync
- 🔒 **You control your data** — export or delete it at any time
- 🔒 **Encrypted backups** — password-protected with AES-256 encryption
- 🔒 **No tracking** — no analytics, no telemetry, no ads

---

## Supported Clinical Scales

Symlog includes built-in support for:

| Scale | Use Case | Full Name |
|-------|----------|-----------|
| **UAS7** | Urticaria tracking | Urticaria Activity Score |
| **PHQ-9** | Depression screening | Patient Health Questionnaire-9 |
| **GAD-7** | Anxiety assessment | Generalized Anxiety Disorder-7 |
| **Pain VAS** | Pain severity | Visual Analog Scale |
| **ACT** | Asthma control | Asthma Control Test |
| **HIT-6** | Migraine impact | Headache Impact Test-6 |
| **DLQI** | Dermatology quality of life | Dermatology Life Quality Index |
| **IBS-SSS** | IBS symptom severity | IBS Symptom Severity Score |
| Generic Symptom | Any custom symptom | Severity + Duration tracking |

---

## Contributing

### Translations

Symlog is open to translations! Help us support more languages:

1. Navigate to `src/locales/` directory
2. Create a new folder for your language (e.g., `de` for German, `es` for Spanish)
3. Copy the structure from `src/locales/en/common.json`
4. Translate all the strings
5. Submit a pull request

Example structure:
```
src/locales/
├── en/
│   └── common.json
├── fi/
│   └── common.json
└── [your-language]/
    └── common.json
```

### Bug Reports & Feature Requests

Found a bug or have a feature idea? Open an issue on GitHub!

### Code Contributions

We welcome code contributions! Feel free to:
- Fix bugs
- Add new clinical scales
- Improve UI/UX
- Optimize performance
- Add tests

---

## Support This Project

If you find Symlog helpful and would like to support development and hosting costs:

**[Sponsor on Ko-fi](https://ko-fi.com/vicking20)** ☕

Your support helps us maintain and improve this project.

---

## Technology Stack

- **Frontend:** React 19 + React Router 7
- **Styling:** Tailwind CSS 3
- **Build Tool:** Vite
- **Internationalization:** i18next
- **Encryption:** crypto-js (for backups)
- **Icons:** Lucide React
- **Date Handling:** Native JavaScript Date API

---

## License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](./LICENSE) file for details.

---

## Disclaimer

⚠️ **Important:** Symlog is **not a medical device** and does not replace professional medical advice.

- Always consult your doctor for medical evaluation or treatment decisions
- This app is a tool for tracking and organizing your health information
- Do not use this app as a substitute for professional medical care
- If you experience a medical emergency, contact emergency services immediately

---

## Roadmap

- 🔄 Cloud sync & backup (optional, encrypted)
- 📊 Advanced data visualization & analytics
- 🔔 Reminder notifications
- 📱 Mobile app (iOS/Android)
- 🧬 Integration with health platforms (Apple Health, Google Fit)
- 📈 Predictive insights

---

## Questions?

Have questions or need help? Feel free to:
- Open an issue on GitHub
- Check existing discussions
- Email: vfatunse@gmail.com

---

Made with ❤️ for better health tracking.
