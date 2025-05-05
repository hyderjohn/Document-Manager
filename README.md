# Document Management System

A web application for managing documents, featuring user authentication, document handling (upload, view, search), QA capabilities, and user management. Built with a modern frontend stack.

## Table of Contents

- [Features](#features-currentplanned)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Running Tests](#running-tests)
- [Linting and Formatting](#linting-and-formatting)
- [Demo Credentials](#demo-credentials)
- [Contributing](#contributing)
- [License](#license)

## Features (Current/Planned)

*   **User Authentication:** Secure Login/Registration using Redux Toolkit for state management.
*   **Document Management:** Upload, view, list, and delete documents. (Currently uses mock data)
*   **Document Search/Filtering:** (Planned)
*   **Document QA:** Ask questions about document content. (Placeholder UI)
*   **User Management:** Admin interface to manage user roles and status. (Currently uses mock data)
*   **Protected Routes:** Role-based access control for different sections.
*   **Responsive UI:** Layout adapts to different screen sizes using Tailwind CSS.

## Tech Stack

*   **Framework/Library:** React, TypeScript
*   **Build Tool:** Vite
*   **State Management:** Redux Toolkit
*   **Routing:** React Router DOM v6
*   **Styling:** Tailwind CSS
*   **UI Components:** Headless UI (for accessible components like Menu)
*   **Icons:** Heroicons
*   **Form Handling:** React Hook Form
*   **Notifications:** React Hot Toast
*   **API Client:** Mock Service (Planned: Axios/Fetch with React Query or RTK Query)
*   **Testing:** (Assumed: Vitest/Jest + React Testing Library - *Please verify/update*)
*   **Linting/Formatting:** ESLint, Prettier (*Please verify/update*)

## Project Structure

```
/src
|-- assets/           # Static assets like images, fonts
|-- components/       # Reusable UI components (auth/, navigation/, common/)
|-- hooks/            # Custom React hooks (e.g., useAuth)
|-- layouts/          # Layout components (MainLayout, AuthLayout)
|-- pages/            # Page-level components (auth/, documents/, users/, qa/, Dashboard.tsx)
|-- services/         # API interaction layer (authService.ts, etc.)
|-- store/            # Redux store configuration (store.ts, *.slice.ts)
|-- styles/           # Global styles, Tailwind config (if customized)
|-- types/            # Shared TypeScript types and interfaces
|-- utils/            # Utility functions
|-- App.tsx           # Main application component, routing setup
|-- main.tsx          # Application entry point
|-- vite-env.d.ts     # Vite TypeScript environment types
|-- index.css         # Main CSS entry point (imports Tailwind)
```

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   **Node.js:** v18 or later recommended (Check with `node -v`)
*   **Package Manager:** npm (v8+) or yarn (v1+) (Check with `npm -v` or `yarn -v`)
*   **Git:** For cloning the repository (Check with `git --version`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:hyderjohn/document-manager.git
    cd document-manager # Or your specific project directory name
    ```
2.  **Install dependencies:**
    ```bash
    # Using npm
    npm install

    # Or using yarn
    yarn install
    ```

### Environment Variables

1.  Create a `.env` file in the project root directory (where `package.json` is located).
2.  Add necessary environment variables. Vite requires variables exposed to the client-side code to be prefixed with `VITE_`.
    ```env
    # Example: Base URL for the backend API
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
3.  *Ensure your backend server (if applicable) is running and accessible at the specified URL(s).*

### Running the Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

This will start the Vite development server, typically at `http://localhost:5173`. The server supports Hot Module Replacement (HMR) for fast updates during development.

### Building for Production

```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

This command type-checks the code and creates an optimized production build in the `dist/` directory. These static files can be deployed to any static hosting provider.

## Running Tests

This project is assumed to use **Vitest** for running unit and integration tests, and **React Testing Library** for component testing.

*Ensure you have installed the development dependencies (`npm install` or `yarn install`).*

To run all tests once:

```bash
# Using npm
npm test

# Or using yarn
yarn test
```

To run tests in watch mode (interactive, re-runs on file changes):

```bash
# Using npm
npm run test:watch

# Or using yarn
yarn test:watch
```

*(Note: These are common script names. Please verify the test runner and script names in your `package.json` and update this section if they differ.)*

## Linting and Formatting

This project uses **ESLint** for identifying and reporting on patterns in ECMAScript/JavaScript code, and **Prettier** for enforcing consistent code style.

To check for linting errors:
```bash
# Using npm
npm run lint

# Or using yarn
yarn lint
```

To automatically fix linting and formatting issues where possible:
```bash
# Using npm
npm run format

# Or using yarn
yarn format
```
*(Note: These are common script names. Please verify them against your `package.json`.)*

## Demo Credentials

You can use the following mock credentials to log in and test the application:

*   **Admin:**
    *   Email: `admin@example.com`
    *   Password: `admin123`
*   **User:**
    *   Email: `user@example.com`
    *   Password: `user123`

## Contributing

(Optional: Detail contribution guidelines here if applicable. Mention things like branch naming conventions, pull request processes, code style expectations, etc.)

Example:

> We welcome contributions! Please follow these steps:
> 1. Fork the repository.
> 2. Create a new branch (`git checkout -b feature/your-feature-name`).
> 3. Make your changes.
> 4. Ensure tests pass (`npm test`).
> 5. Commit your changes (`git commit -m 'Add some feature'`).
> 6. Push to the branch (`git push origin feature/your-feature-name`).
> 7. Open a Pull Request.

## License

(Optional: Specify the project license here. For example: This project is licensed under the MIT License - see the LICENSE.md file for details.)

---
