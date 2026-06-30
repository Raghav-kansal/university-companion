# University Companion

University Companion is the ultimate, centralized digital hub for university students. Designed as a mobile-first Progressive Web Application (PWA), it merges daily utility tracking, an academic resource repository, and a collaborative networking marketplace into a single, seamless platform.

## Features
- **Global Architecture**: Persistent state caching for personalized dashboards (e.g., Campus and Branch selection).
- **Academic Tools**: Advanced SGPA calculators, CGPA estimators (using historical data), and Target Grade Planners.
- **Resource Shelf**: A crowdsourced repository for slides, notes, PYQs, and assignments, categorized by branch and semester.
- **Connect / Marketplace**: A networking hub to find project collaborators, filter by skills, and send connection requests.
- **Progressive Web App**: Installable native-like mobile experience.

## Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API & LocalStorage Persistence (Mocked for Demo)
- **Icons**: Lucide React

## Project Architecture
The application is built on a client-side reactive architecture using Next.js. 
- `app/`: Next.js App Router providing the application shell and global layout.
- `components/`: Modular React components divided by feature (e.g., `shelf`, `marketplace`, `tools`).
- `lib/store.tsx`: Centralized state management acting as the source of truth for the entire application.
- `lib/data.ts`: Mock database acting as the backend API data source.

## Installation and Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/university-student-app.git
   cd university-student-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing
This project is developed by a team of 6 members following strict open-source software development practices. Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for branch management and pull request guidelines.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
