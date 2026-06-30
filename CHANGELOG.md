# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-30

### Added
- **Global Architecture**: Centralized React Context store handling user profiles, branch preferences, and saved materials.
- **Resource Shelf**: 
  - Dynamic filtering system (by branch, semester, subject, and material kind).
  - Mocked file upload integration supporting PDFs, PPTs, and DOCXs.
  - Integration with WhatsApp, Discord, and Telegram academic gateway links.
- **Academic Tools**:
  - Live SGPA Calculator computing dynamically from selected grades.
  - CGPA Estimator supporting historical semester data.
  - Target Grade Planner calculating required points for a desired SGPA.
- **Connect & Marketplace**:
  - Peer networking directory with skill-based filtering.
  - Project incubator for hackathon and startup collaborations.
  - Actionable connection request workflows.
- **UI System**:
  - Responsive, mobile-first design using Tailwind CSS.
  - Reusable `components/kit.tsx` architecture.
  - Glassmorphism design elements and fluid animations.

### Changed
- Refactored `localStorage` dependency to run cleanly in a stateless "Demo Mode" to avoid caching issues during presentations.

### Fixed
- Addressed React `forwardRef` issues inside the UI `Card` component to ensure compatibility with Next.js strict mode.
