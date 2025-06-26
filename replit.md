# Grevy - E-commerce Platform

## Overview

Grevy is a modern e-commerce platform specializing in fishing apparel and equipment. Built with a React frontend, Express.js backend, and PostgreSQL database, the application features a dual storage approach supporting both local development and Directus CMS integration for production content management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React Context for local state
- **Styling**: Tailwind CSS with Shadcn/UI components
- **Animations**: Framer Motion for page transitions and marine-themed effects
- **Payments**: Stripe integration for checkout processing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based auth with Directus integration
- **File Serving**: Vite development server integration
- **API Design**: RESTful endpoints with TypeScript schemas

### Build System
- **Development**: Vite with HMR and React plugin
- **Production**: esbuild for server bundling, Vite for client assets
- **TypeScript**: Shared types between client and server via `/shared` directory

## Key Components

### Data Layer
- **Primary Database**: PostgreSQL with Drizzle ORM schema
- **CMS Integration**: Optional Directus backend for content management
- **Storage Strategy**: Dual storage interface (IStorage) supporting both local and Directus data sources
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`

### Authentication System
- **Session Management**: Express session middleware with PostgreSQL store
- **Directus Auth**: OAuth-style authentication with Directus backend
- **User Management**: Local user storage with Directus ID mapping
- **Protected Routes**: Session-based route protection

### E-commerce Features
- **Product Catalog**: Categories, products with images and variants
- **Shopping Cart**: Session-based cart with persistent storage
- **Wishlist**: User-specific product favorites
- **Checkout**: Stripe payment processing with order confirmation
- **Reviews**: Product review system with ratings

### UI/UX Design
- **Design System**: Shadcn/UI components with custom theming
- **Marine Theme**: Ocean-inspired animations and color palette
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Custom underwater-themed loading animations
- **Page Transitions**: Smooth navigation with Framer Motion

## Data Flow

### Client-Server Communication
1. React components use TanStack Query for data fetching
2. API requests route through `/api/*` endpoints
3. Express middleware handles authentication and session management
4. Drizzle ORM provides type-safe database operations
5. Response data flows back through React Query cache

### Storage Abstraction
1. Storage interface (`IStorage`) abstracts data operations
2. DirectusStorage implementation for CMS integration
3. LocalStorage fallback for development/standalone mode
4. Runtime selection based on environment configuration

### Authentication Flow
1. Login requests authenticate against Directus
2. Session data stored in PostgreSQL with connect-pg-simple
3. User profile data synchronized between local DB and Directus
4. Client maintains auth state through React Context

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@stripe/stripe-js**: Payment processing
- **framer-motion**: Animation library

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type safety
- **tsx**: TypeScript execution for server
- **esbuild**: Production bundling

## Deployment Strategy

### Development Environment
- **Database**: Local PostgreSQL or Neon development branch
- **Server**: Node.js with tsx for TypeScript execution
- **Client**: Vite development server with HMR
- **Storage**: Local storage implementation for rapid development

### Production Environment
- **Platform**: Autoscale deployment target
- **Database**: Neon PostgreSQL (production)
- **Build Process**: 
  1. `npm run build` - Builds client assets and server bundle
  2. Client assets built to `dist/public`
  3. Server bundled to `dist/index.js`
- **Runtime**: `npm run start` serves production build
- **CMS**: Directus integration for content management

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **DIRECTUS_URL**: Optional CMS backend URL
- **DIRECTUS_API_KEY**: CMS authentication
- **STRIPE_SECRET_KEY**: Payment processing
- **SESSION_SECRET**: Session encryption key

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```