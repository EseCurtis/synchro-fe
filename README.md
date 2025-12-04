# Synchro Admin Dashboard

This is a [Next.js](https://nextjs.org/) project for the Synchro Admin Dashboard.

## Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher

## Getting Started

### 1. Install Dependencies

This project uses **pnpm** as the package manager. Install dependencies with:

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory with your environment variables.

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production

```bash
pnpm build
```

### 5. Start Production Server

```bash
pnpm start
```

## Why pnpm?

This project uses pnpm for several reasons:
- **Faster**: pnpm is faster than npm and yarn
- **Disk Efficient**: Uses a content-addressable store for packages
- **Strict**: Better dependency management with strict peer dependencies
- **Monorepo Ready**: Built-in workspace support

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Project Structure

```
synchro-admin/
├── src/
│   ├── app/              # Next.js 13+ App Directory
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── v2/               # Version 2 types and interfaces
├── public/               # Static assets
├── .npmrc                # pnpm configuration
├── apprunner.yaml        # AWS App Runner configuration
└── package.json          # Project dependencies
```

## Features

- **Events Management**: Create, edit, and manage events (including AI-scraped events)
- **Venues Management**: Upload and manage venue data from JSON
- **User Management**: Admin controls for user accounts
- **KYC Management**: Handle KYC verification
- **Roles & Permissions**: Granular access control
- **Reports & Analytics**: Dashboard with charts and statistics

## Deployment

### AWS App Runner

This project is configured to deploy on AWS App Runner. The `apprunner.yaml` file contains the build and runtime configuration.

The build process:
1. Installs pnpm globally
2. Installs dependencies with `pnpm install --frozen-lockfile`
3. Builds the application with `pnpm run build`
4. Starts the server with `pnpm start`

## Tech Stack

- **Framework**: Next.js 13.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Forms**: Formik + Yup
- **HTTP Client**: Axios
- **Charts**: Chart.js + react-chartjs-2
- **Date Handling**: Moment.js, Day.js
- **Icons**: React Icons

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [pnpm Documentation](https://pnpm.io/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributing

When contributing to this project:
1. Use pnpm for all package operations
2. Follow the existing code style
3. Run `pnpm format` before committing
4. Ensure `pnpm build` passes before creating a PR
