# Replit.md - Ekdant Multi Speciality and Implant Center

## Overview

This is a comprehensive dental clinic website for Ekdant Multi Speciality and Implant Center built with a modern full-stack architecture. The application features appointment booking, blog management, dental care assessments, anxiety resources, and patient journey tracking. It combines a React frontend with an Express.js backend, using PostgreSQL for data persistence through Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Custom CSS variables with dark/light theme support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based session storage
- **API Architecture**: RESTful API design with structured error handling

### Development Environment
- **Runtime**: Node.js 20
- **Package Manager**: npm
- **Development Server**: Concurrent frontend (Vite) and backend (tsx) processes
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend

## Key Components

### Database Schema
Located in `shared/schema.ts`, defines three main entities:
- **Users**: Authentication and user management
- **Appointments**: Patient appointment booking system
- **Dental Care Recommendations**: AI-powered care assessment system
- **Blog Posts**: Content management for dental education

### Frontend Pages
- **HomePage**: Landing page with hero section, services, testimonials
- **Appointment Booking**: Multi-step form with anxiety accommodations
- **Blog System**: Category-based blog with search and filtering
- **Dental Care Assessment**: Interactive questionnaire for personalized recommendations
- **Anxiety Resources**: Relaxation techniques and coping strategies

### Backend Services
- **Appointment Management**: CRUD operations with WhatsApp notification logging
- **Blog Management**: Content creation, categorization, and retrieval
- **Assessment Engine**: Processes dental care questionnaires
- **Storage Layer**: Abstracted storage interface supporting both memory and database backends

## Data Flow

1. **Frontend Request**: React components use TanStack Query to make API calls
2. **API Gateway**: Express.js routes handle incoming requests with validation
3. **Business Logic**: Service layer processes requests and applies business rules
4. **Data Layer**: Drizzle ORM manages database interactions with type safety
5. **Response**: JSON responses sent back through the same chain with error handling

### Key Data Flows
- **Appointment Booking**: Form submission → validation → database storage → WhatsApp notification logging
- **Blog Content**: Database retrieval → API response → React Query cache → UI rendering
- **Care Assessment**: Form data → processing logic → recommendation generation → storage

## External Dependencies

### Core Runtime Dependencies
- **@anthropic-ai/sdk**: AI integration for advanced features
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### UI and Styling
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class management
- **@replit/vite-plugin-shadcn-theme-json**: Theme customization

### Development Tools
- **typescript**: Type safety across the stack
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for backend development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- **Development**: Concurrent frontend and backend servers on port 5000
- **Production**: Single Node.js process serving both static files and API
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Deployment Targets
- **Primary**: Replit static deployment with Node.js backend
- **Assets**: Static files served from `dist/public`
- **API**: Express server handles `/api/*` routes
- **Database**: External PostgreSQL instance (Neon Database)

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```