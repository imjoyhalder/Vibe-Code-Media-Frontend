# 🎨 VibeCode Media - Frontend

The modern, responsive React-based frontend for VibeCode Media, built with Next.js 16, TypeScript, and Tailwind CSS. This application provides an elegant user interface for browsing, creating, and rating community projects.

**🚀 Live Demo:** [https://vibecode-gray.vercel.app](https://vibecode-gray.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Components Architecture](#components-architecture)
- [Services & API Integration](#services--api-integration)
- [Authentication](#authentication)
- [Styling](#styling)
- [State Management](#state-management)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)

---

## 🎯 Overview

VibeCode Media Frontend is a full-featured Next.js application that allows users to:
- Browse and search community projects
- Register and authenticate with JWT
- Create and manage projects
- Rate and comment on projects
- Manage user profiles
- View leaderboards and activity feeds
- Experience responsive design across all devices

Built with modern best practices and production-ready performance optimization.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Secure session management
- Protected routes and components
- Auto-logout on token expiration

### 📱 Responsive UI
- Mobile-first design approach
- Desktop, tablet, and mobile optimization
- Adaptive layouts and navigation
- Touch-friendly interface

### 🎨 Modern Design
- Light and Dark mode support
- Tailwind CSS utility-first styling
- shadcn/ui component system
- Smooth animations and transitions
- Accessible UI components (Radix UI)

### 🔍 Project Discovery
- Browse all community projects
- Full-text search by title
- Filter and sort by tags
- Infinite scroll or pagination
- Project detail pages with ratings

### ⭐ Rating System
- 5-star project ratings
- Visual rating breakdown
- User-specific ratings
- Average rating display

### 💬 Community Features
- Comment on projects
- Real-time feedback section
- User profiles and bios
- Activity tracking

### 🚀 Project Management
- Create new projects
- Edit project information
- Upload project screenshots
- Add repository and live links
- Tag organization
- Dashboard with project list

### 👤 User Dashboard
- Profile management
- Avatar and bio customization
- Project management
- Activity history
- User statistics

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js** 16.2.2 - React framework with App Router
- **React** 19.2.4 - UI library
- **TypeScript** 5 - Type safety

### Styling & UI
- **Tailwind CSS** 4 - Utility-first CSS framework
- **PostCSS** - CSS processing
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Accessible component primitives
- **class-variance-authority** - CSS class management
- **tailwind-merge** - Tailwind class merging

### Icons & Visual
- **Lucide React** - Beautiful SVG icons
- **Phosphor Icons** - Additional icon library
- **Recharts** - Data visualization
- **react-easy-crop** - Image cropping

### Form & Validation
- **React Hook Form** 7.72.1 - Simple form management
- **Zod** 4.3.6 - TypeScript-first schema validation

### Interactions
- **dnd-kit** - Drag and drop functionality
- **TanStack React Table** - Headless table component
- **vaul** - Sheet/drawer component
- **Sonner** - Toast notifications
- **next-themes** - Theme management

### Development
- **ESLint** - Code linting
- **Tailwind PostCSS** - Advanced Tailwind features

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- Backend API running (see main README)

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vibecode-media.git
cd vibecode-media/vibecode-media-frontend-
```

### 2. Install Dependencies

```bash
npm install
```

or with yarn:

```bash
yarn install
```

### 3. Environment Setup

Create `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Site name
NEXT_PUBLIC_SITE_NAME=VibeCode Media
```

### 4. Verify Backend Connection

Ensure the backend API is running on `http://localhost:5000`

---

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   ├── not-found.tsx             # 404 page
│   │
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Registration page
│   │
│   ├── (private)/                # Protected route group
│   │   ├── layout.tsx            # Private layout with sidebar
│   │   ├── dashboard/
│   │   │   ├── layout.tsx        # Dashboard layout
│   │   │   ├── page.tsx          # Dashboard home
│   │   │   ├── activity/
│   │   │   │   └── page.tsx      # Activity feed
│   │   │   ├── profile/
│   │   │   │   └── page.tsx      # User profile
│   │   │   └── projects/
│   │   │       └── page.tsx      # My projects
│   │   │
│   │   └── projects/
│   │       ├── [id]/
│   │       │   └── edit/
│   │       │       └── page.tsx  # Edit project
│   │       └── new/
│   │           └── page.tsx      # Create project
│   │
│   └── (public)/                 # Public route group
│       ├── page.tsx              # Home/Feed page
│       ├── leaderboard/
│       │   └── page.tsx          # Leaderboard page
│       └── project/
│           └── [id]/
│               ├── layout.tsx    # Project detail layout
│               └── page.tsx      # Project details
│
├── components/                   # Reusable React components
│   ├── actions/
│   │   ├── actions.tsx          # Action buttons
│   │   └── theme-toggle.tsx     # Light/dark mode toggle
│   │
│   ├── common/                  # Common/layout components
│   │   ├── DashboardSidebar.tsx # Navigation sidebar
│   │   ├── LayoutWrapper.tsx    # Layout wrapper
│   │   ├── MobileNav.tsx        # Mobile navigation
│   │   ├── navbar1.tsx          # Main navbar
│   │   ├── UserAvatar.tsx       # User avatar component
│   │   └── footer.tsx           # Footer component
│   │
│   ├── projects/               # Project-specific components
│   │   ├── ProjectCard.tsx     # Project card display
│   │   └── ProjectListSkeleton.tsx  # Loading skeleton
│   │
│   ├── home/                   # Home page components
│   │   └── [other components]
│   │
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── dropdown-menu.tsx
│       ├── navigation-menu.tsx
│       ├── sheet.tsx
│       ├── accordion.tsx
│       ├── slider.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── field.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── tooltip.tsx
│       ├── sonner.tsx
│       ├── radio-group.tsx
│       ├── input-group.tsx
│       └── project-details-skeleton.tsx
│
├── context/                    # React Context
│   └── AuthContext.tsx         # Auth state management
│
├── hooks/                      # Custom React hooks
│   └── use-mobile.ts           # Mobile detection hook
│
├── lib/                        # Utility functions
│   └── utils.ts                # Helper utilities
│
├── services/                   # API service layer
│   ├── apiClient.ts           # Axios instance
│   ├── auth/
│   │   └── auth.service.ts    # Auth API calls
│   ├── projects/
│   │   ├── project.service.ts # Project API calls
│   │   └── project.types.ts   # Project TypeScript types
│   └── user/
│       ├── user.service.ts    # User API calls
│       └── user.types.ts      # User TypeScript types
│
├── utils/                      # General utilities
├── env.ts                      # Environment configuration
├── proxy.ts                    # API proxy configuration
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── postcss.config.mjs         # PostCSS config
├── eslint.config.mjs          # ESLint config
└── components.json            # shadcn/ui config
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

Features:
- Hot module reloading
- Fast refresh
- Source map debugging

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

Check for code style issues and TypeScript errors.

---

## 🏗️ Components Architecture

### Page Components

**Authentication Pages** (`(auth)`)
- `/login` - User login form
- `/register` - New user registration

**Private Pages** (`(private)`)
- `/dashboard` - Main dashboard
- `/dashboard/profile` - User profile management
- `/dashboard/projects` - My projects list
- `/dashboard/activity` - Activity feed
- `/projects/new` - Create new project
- `/projects/[id]/edit` - Edit project

**Public Pages** (`(public)`)
- `/` - Feed/Home page with project listings
- `/leaderboard` - Leaderboard rankings
- `/project/[id]` - Project details page

### Component Hierarchy

```
Root Layout
├── Auth Provider
├── Theme Provider
├── Toast Provider
│
└── Route Groups
    ├── (auth)
    │   └── Layout + Page
    ├── (private)
    │   ├── Layout (Sidebar + Header)
    │   └── Pages
    └── (public)
        ├── Layout (Navbar only)
        └── Pages
```

### Reusable Components

**Layout Components**
- `navbar1` - Top navigation bar
- `DashboardSidebar` - Dashboard sidebar
- `footer` - Footer component
- `LayoutWrapper` - Layout wrapper

**Project Components**
- `ProjectCard` - Project card display
- `ProjectListSkeleton` - Loading state

**UI Components** (shadcn/ui)
- All standard UI components from shadcn/ui library
- Fully styled with Tailwind CSS
- Accessible and customizable

---

## 🔌 Services & API Integration

### API Client (`apiClient.ts`)

Configured Axios instance with:
- Base URL from environment variables
- Automatic token inclusion in headers
- Error handling
- Request/response interceptors

### Auth Service (`services/auth/`)

```typescript
// Login
await authService.login(email, password);

// Register
await authService.register(name, email, password);

// Logout
await authService.logout();

// Get current user
await authService.getMe();
```

### Project Service (`services/projects/`)

```typescript
// Get all projects
await projectService.getProjects({ title, tag, limit });

// Get single project
await projectService.getProjectById(id);

// Create project
await projectService.createProject(formData);

// Update project
await projectService.updateProject(id, data);

// Delete project
await projectService.deleteProject(id);

// Get project ratings
await projectService.getProjectRatings(id);

// Create rating
await projectService.createRating(projectId, rating);
```

### User Service (`services/user/`)

```typescript
// Get user profile
await userService.getUserProfile(id);

// Update profile
await userService.updateProfile(id, data);

// Get user projects
await userService.getUserProjects(id);
```

---

## 🔐 Authentication

### Authentication Flow

```
1. User fills login/register form
2. Form submitted to backend API
3. Backend validates and returns JWT token
4. Token stored in secure cookie
5. AuthContext updated with user data
6. User redirected to dashboard
7. Token automatically included in API requests
```

### Protected Routes

Routes in `(private)` group are protected by:
- Client-side route guards
- Server-side validation
- Token verification middleware

### AuthContext

Manages global authentication state:
- `user` - Current user object
- `isAuthenticated` - Auth status
- `login()` - Login function
- `register()` - Registration function
- `logout()` - Logout function

---

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework. Configured in `tailwind.config.ts`

Example usage:
```jsx
<div className="flex items-center justify-between gap-4 p-6 md:p-8">
  <h1 className="text-2xl font-bold text-foreground">Title</h1>
</div>
```

### shadcn/ui Components

Pre-built, customizable components. Add new ones:

```bash
npx shadcn-ui@latest add button
```

### Global Styles

`globals.css` includes:
- Base styles
- CSS variables for theming
- Custom utilities

### Theme Variables

CSS variables for light/dark modes:
```css
--background
--foreground
--primary
--secondary
--accent
--destructive
--border
--input
--muted
```

---

## 🔄 State Management

### React Context API

**AuthContext** (`context/AuthContext.tsx`)
- Global auth state
- User information
- Login/logout functions

Usage:
```tsx
const { user, isAuthenticated, login } = useContext(AuthContext);
```

### Component State

Local state with `useState` for:
- Form inputs
- UI toggles
- Loading states
- Search/filter terms

### Custom Hooks

```typescript
// Mobile detection
const isMobile = useMobile();

// Can add more custom hooks as needed
```

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Start development server |
| Build | `npm run build` | Create production build |
| Start | `npm start` | Start production server |
| Lint | `npm run lint` | Run ESLint |

---

## 🌍 Environment Variables

### Required Variables

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Variables

```env
# Site metadata
NEXT_PUBLIC_SITE_NAME=VibeCode Media

# Analytics (if needed)
NEXT_PUBLIC_ANALYTICS_ID=...
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically deploys on push
4. Set environment variables in Vercel dashboard
5. Custom domain configuration (optional)

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

### Environment Setup for Production

On your hosting platform, set:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 🗂️ Key Files Explained

### `env.ts`
Environment configuration file. Validates and exports environment variables with type safety.

### `proxy.ts`
API proxy configuration for Next.js handling.

### `app/layout.tsx`
Root layout component that wraps all pages with providers:
- AuthProvider
- ThemeProvider
- ToastProvider

### `tsconfig.json`
TypeScript configuration:
- Path aliases (`@/*` maps to `src/*`)
- Strict mode enabled
- Next.js optimizations

### `next.config.ts`
Next.js configuration:
- Image optimization
- Webpack customization
- API routes setup

### `tailwind.config.ts`
Tailwind CSS configuration:
- Custom colors
- Theme variables
- Plugin setup

---

## 💡 Best Practices

### Component Organization
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into hooks

### Styling
- Use Tailwind utility classes
- Avoid custom CSS when possible
- Use theme variables for consistency

### API Calls
- Use services layer for all API calls
- Handle errors gracefully
- Show loading states

### Authentication
- Always check auth before rendering protected content
- Store JWT securely
- Implement auto-logout on token expiration

### TypeScript
- Define types for all props
- Use interfaces for objects
- Avoid `any` type

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

### API Connection Issues

- Ensure backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify CORS settings on backend

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear cache
npm cache clean --force
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes following code style
3. Test thoroughly
4. Submit pull request with description

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write meaningful component names

---

## 📞 Support

- 🐛 **Bug Reports**: GitHub Issues
- 💡 **Feature Requests**: GitHub Discussions
- 📧 **Email**: support@vibecode.com

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Made with ❤️ by the VibeCode **

Last Updated: April 2026
