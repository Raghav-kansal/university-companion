# Contributors & Division of Responsibilities

The University Companion project was developed collaboratively by a team of 6 members. Below is the breakdown of each member's role, responsibilities, and specific code contributions.

| Name | Role / Area of Contribution | Primary Files Modified |
| :--- | :--- | :--- |
| **Raghav Kansal** | Project Lead & Core Architecture | `app/layout.tsx`, `app/page.tsx`, `lib/store.tsx`, `lib/types.ts` |
| **Anant Agarwal** | Data Engineering & Academic Tools | `lib/data.ts`, `components/tools/tools.tsx` |
| **Rishab Tyagi** | UI/UX & Design System | `components/kit.tsx`, `components/navbar.tsx`, `components/progress-ring.tsx` |
| **Adwitta Saxena** | Feature Dev: Resource Shelf | `components/shelf/shelf.tsx`, `components/shelf/trending.tsx`, `components/shelf/chat-gateways.tsx` |
| **Anushka Mittal** | Feature Dev: Connect / Marketplace | `components/marketplace/marketplace.tsx` |
| **Suyash Singhal** | Profile & Project Documentation | `components/profile/profile-screen.tsx`, `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md` |

## Team Member Details

- **Raghav Kansal**: Set up the initial Next.js repository, configured the Tailwind CSS theme, designed the routing architecture, and built the centralized React Context + LocalStorage global state store.
- **Anant Agarwal**: Designed the mock data schemas and implemented the complex business logic for the SGPA Calculator, CGPA Estimator, and Target Grade Planner.
- **Rishab Tyagi**: Built the modular, highly reusable UI component library (`components/kit.tsx`) and the custom animated SVG progress rings, ensuring a unified glassmorphism design language across the app.
- **Adwitta Saxena**: Engineered the Resource Shelf module, allowing users to dynamically filter through crowdsourced materials (Slides, Notes, PYQs) and built the mock file upload integration.
- **Anushka Mittal**: Developed the Connect (Marketplace) tab, implementing multi-tab search interfaces, skill-based filtering, and the logic to send connection requests to peers and project owners.
- **Suyash Singhal**: Developed the Profile statistics dashboard, managed the DevOps lifecycle, and maintained all open-source documentation adhering to standard GitHub project guidelines.
