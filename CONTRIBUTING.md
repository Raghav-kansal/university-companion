# Contributing to University Companion

First off, thank you for considering contributing to University Companion! This document lays out the guidelines and Git workflow our team uses to manage this open-source project. 

## Git Workflow

We use a feature-branch workflow. All changes must be made on a dedicated branch and merged into `main` via a Pull Request (PR). Direct commits to `main` are disabled.

### Branch Naming Conventions
- Feature branches: `feat/feature-name` (e.g., `feat/academic-tools`)
- Bug fixes: `bug/bug-description` (e.g., `bug/navbar-layout`)
- Documentation: `docs/documentation-update` (e.g., `docs/project-documentation`)

### Step-by-Step Contribution Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/university-student-app.git
   cd university-student-app
   ```
2. **Create a new branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes**: 
   Write your code, ensuring it follows our coding standards (TypeScript + React functional components).
4. **Commit your changes**:
   Write a meaningful commit message.
   ```bash
   git add .
   git commit -m "feat: added new SGPA calculator logic"
   ```
5. **Push to the repository**:
   ```bash
   git push origin feat/your-feature-name
   ```
6. **Open a Pull Request**:
   Go to the GitHub repository and open a Pull Request against the `main` branch. 
   - Reference the Issue you are solving (e.g., `Resolves #3`).
   - Describe what you changed and why.

## Code Review Policy
- All Pull Requests require at least **one review** from a team member before they can be merged.
- Reviewers should check for code functionality, responsiveness, and adherence to the UI design system.

## Task Management
- We use GitHub Issues to track all bugs, tasks, and feature requests.
- Before starting work, ensure an Issue exists for your task and assign it to yourself.
