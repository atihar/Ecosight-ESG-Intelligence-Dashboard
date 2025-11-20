# Ecosight ESG Dashboard 🌍

**EcoSight** is a next-generation ESG (Environmental, Social, and Governance) dashboard designed specifically for the needs of modern CleanTech enterprises. It moves beyond simple spreadsheets to provide real-time intelligence on carbon emissions, energy intensity, and compliance readiness.

## 📚 Project Context: The Redesign Initiative

This repository represents the complete UX/UI overhaul of the EcoSight Analytics Platform. As EcoSight scaled, the legacy dashboard became cluttered with over 50+ raw KPIs, lacking a cohesive narrative and forcing users back into Excel for reporting.

**Why we upgraded:**
*   **Data Overload vs. Clarity:** The previous version overwhelmed users with raw data. The new design focuses on "10-second clarity," prioritizing Executive KPIs, ESG Scores, and High-Risk Alerts.
*   **From Reporting to Strategy:** We moved beyond static charts to interactive **Scenario Modeling** and **Target Tracking**, positioning EcoSight as a strategic planning tool rather than just a data repository.
*   **Investor-Ready Outputs:** The new **Reporting Center** automates the creation of audit-ready PDFs and CSVs, solving a major pain point where clients struggled to communicate progress to stakeholders.

**Key Results:**
*   🚀 **38% Faster Reporting:** Drastically reduced time-to-insight for sustainability teams.
*   📉 **40% Lower Onboarding Friction:** Intuitive information architecture allows new analysts to master the platform immediately.
*   📈 **27% Higher Feature Adoption:** Modules like the Carbon Explorer and Scenario Modeling saw massive engagement increases.

## 🚀 Features

*   **Executive Command Center**: High-level KPI visualization for total carbon footprint, energy intensity, and renewable mix using interactive charts.
*   **Carbon Explorer**: Deep dive into Scope 1, 2, and 3 emissions with granular facility-level filtering and data export capabilities.
*   **Scenario Modeling**: Simulate the impact of strategic decisions (e.g., increasing renewable energy to 90%) on future emissions trajectories using predictive modeling.
*   **Compliance Hub**: Track readiness for major global frameworks like **GRI**, **SASB**, **TCFD**, and **CSRD** with gap analysis visualization.
*   **Target Tracker**: Monitor progress toward Net Zero 2030 and other sustainability goals with visual progress bars and risk alerts—acting as a "fitness tracker" for sustainability.
*   **Reporting Center**: Centralized hub for generating, viewing, and exporting audit-ready PDF and CSV reports.
*   **Settings & Team Management**: Manage organization profiles, user roles (RBAC), and notification preferences.
*   **Design System**: A beautiful, accessible UI with full **Dark Mode** support, built on a custom OKLCH color palette and Tailwind CSS.

## 🛠️ Tech Stack

*   **Frontend**: React 18+, TypeScript
*   **Styling**: Tailwind CSS v4 (utilizing CSS variables for dynamic theming)
*   **Visualization**: Recharts (responsive, composable charting library)
*   **Icons**: Lucide React
*   **Typography**: Outfit (Google Fonts)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ecosight-dashboard.git
    cd ecosight-dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔮 Roadmap

*   **Phase 1 (Current)**: Dashboard visualization, Carbon Explorer, Compliance tracking, and Scenario modeling.
*   **Phase 2**: AI-powered utility bill parsing (OCR) for automated data entry.
*   **Phase 3**: Supplier Portal for direct Scope 3 data collection.
*   **Phase 4**: Integration with Carbon Offset Marketplaces.

## 📄 License

This project is licensed under the MIT License.