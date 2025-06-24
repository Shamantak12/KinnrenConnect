# Kinnren - Family Social Platform

## Overview

Kinnren is a family-focused social platform built with a full-stack TypeScript architecture. The application provides families with tools to share memories, play games, manage events, and stay connected through various interactive features. The platform uses a modern web stack with React frontend, Express backend, PostgreSQL database, and real-time communication capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Kinnren color scheme
- **State Management**: React Query for server state and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Package Manager**: npm

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: express-session with PostgreSQL store
- **WebSocket**: Native WebSocket support for real-time features
- **Development**: tsx for TypeScript execution

### Database Design
- **Database**: PostgreSQL 16
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless for PostgreSQL hosting
- **Tables**: Users, families, posts, comments, stories, events, time capsules, and more

## Key Components

### Authentication & Session Management
- Replit Auth integration for user authentication
- Session-based authentication with PostgreSQL session store
- User profiles with family association capabilities

### Core Features
1. **Home Feed**: Social media-style post sharing with likes, comments, and bookmarks
2. **Family Map**: Connect and discover other families in the area
3. **Family Games**: Interactive games including bingo, ludo, karaoke, and scavenger hunts
4. **Anonymous Chat**: Private family messaging with real-time WebSocket communication
5. **Family Outings**: Event planning and management system
6. **Calendar**: Integrated calendar for family events and time capsules
7. **Family Tree**: Visual family relationship mapping
8. **Story Time**: Audio story recording and playback system
9. **Time Capsule**: Scheduled content release system
10. **Video Features**: Video calls and montage creation
11. **Heritage**: Family tradition and recipe preservation

### Real-time Features
- WebSocket implementation for live chat
- Real-time notifications for family activities
- Live video room capabilities (UI implemented, backend integration needed)

## Data Flow

### Client-Server Communication
1. **API Layer**: RESTful endpoints for CRUD operations
2. **Real-time Layer**: WebSocket connections for instant messaging
3. **File Handling**: Image upload and processing for posts and profiles
4. **Query Management**: React Query for caching and synchronization

### Database Operations
1. **User Management**: Profile creation, family joining, authentication
2. **Content Management**: Posts, comments, stories, and media storage
3. **Event System**: Calendar events, time capsules, and family activities
4. **Social Features**: Likes, bookmarks, follows, and connections

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool and dev server
- **typescript**: Type checking and compilation

### Authentication & Session
- **openid-client**: OAuth/OpenID Connect client
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Port Configuration**: Local port 5000, external port 80
- **Hot Reload**: Vite dev server with HMR support

### Production Build
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations handle schema updates
4. **Environment**: Production configuration with secure session settings

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `REPL_ID`: Replit environment identifier
- `ISSUER_URL`: OAuth issuer URL for authentication

## Changelog

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.