# MeetPlan Dashboard

MeetPlan is a responsive meeting-planning dashboard built with Next.js. It connects to Google Calendar through OAuth and displays upcoming calendar events in a clean, responsive dashboard.

## Live Demo
https://meetplan-dashboard-six.vercel.app

## GitHub
https://github.com/himanshupanwar13/meetplan-dashboard

## Features
- Responsive desktop, tablet, and mobile UI
- Google OAuth authentication with NextAuth.js
- Read-only Google Calendar integration
- Fetches and displays upcoming Google Calendar events
- Today's schedule and upcoming meetings
- Dynamic monthly calendar with event indicators
- Meeting type summaries
- Protected dashboard routes
- Login and logout flow
- Public homepage and privacy policy

## Tech Stack
- Next.js 16
- React 19
- Tailwind CSS
- NextAuth.js
- Google Calendar API
- date-fns
- Lucide React

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/himanshupanwar13/meetplan-dashboard.git
cd meetplan-dashboard
npm install
```

### 2. Environment variables

Create `.env.local` from `.env.example` and configure:

```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

For local development:
`NEXTAUTH_URL=http://localhost:3000`

Never commit `.env.local` or secrets.

### 3. Google Cloud setup

- Enable Google Calendar API.
- Configure Google OAuth.
- Add:
  `http://localhost:3000/api/auth/callback/google`
- Add the production callback:
  `https://meetplan-dashboard-six.vercel.app/api/auth/callback/google`

The application requests:
`https://www.googleapis.com/auth/calendar.readonly`

If the OAuth application is in Testing mode, only configured test users can authenticate.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
meetplan-dashboard/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.js               # Sign-in page with Google Calendar OAuth & back navigation
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js          # NextAuth API route handler
│   │   └── calendar/
│   │       └── route.js              # Server route fetching Google Calendar events
│   ├── dashboard/
│   │   ├── [...slug]/
│   │   │   └── page.js               # Catch-all route for sub-pages (meetings, availability, etc.)
│   │   └── page.js                   # Main protected dashboard page
│   ├── privacy/
│   │   └── page.js                   # Public Privacy Policy compliant with Google API policy
│   ├── globals.css                   # Tailwind CSS v4 styling & theme setup
│   ├── layout.js                     # Root layout with font configuration & metadata
│   ├── page.js                       # Public landing page with verification metadata
│   └── providers.js                  # Client-side NextAuth SessionProvider wrapper
├── components/
│   ├── calendar/
│   │   └── EventCard.js              # Event card with platform badges and join actions
│   ├── dashboard/
│   │   ├── DashboardCalendar.js      # Monthly calendar view with active event day dots
│   │   ├── DashboardLayout.js        # Shared dashboard shell with header, sidebar, and content area
│   │   ├── Header.js                 # Top navigation with live search, notifications, & user avatar
│   │   ├── LiveDashboardView.js      # Live dashboard client orchestrator with refresh states
│   │   ├── MeetingTypes.js           # Meeting type summaries and stats
│   │   ├── NewMeetingButton.js       # New meeting action trigger
│   │   ├── Sidebar.js                # Collapsible navigation sidebar with exact route matching
│   │   ├── StatCard.js               # Reusable metric card with delta indicator
│   │   ├── StatsGrid.js              # 4-column summary metric grid
│   │   ├── TodaysSchedule.js         # Daily chronological schedule timeline
│   │   ├── UpcomingMeetings.js       # Upcoming meeting list with platform actions
│   │   └── WelcomeSection.js         # Personalized user greeting and date banner
│   ├── icons/
│   │   └── PlatformIcons.js          # Custom SVG icons including brand logo & platform marks
│   └── ui/
│       ├── Avatar.js                 # User profile avatar with fallback initials & status dot
│       ├── Button.js                 # Reusable button primitive
│       └── Card.js                   # Rounded container card primitive
├── data/
│   └── dashboardMockData.js          # Fallback demo data for development mode
├── hooks/
│   └── useCalendarEvents.js          # React hook managing event fetching, loading, & errors
├── lib/
│   ├── auth.js                       # NextAuth options & Google OAuth token persistence
│   └── googleCalendar.js             # Server-side Google Calendar API fetcher & normalizer
├── .env.example                      # Template for required environment variables
├── package.json                      # Project metadata, dependencies, and build scripts
└── README.md                         # Project documentation and assignment overview
```

## Architecture

- **NextAuth handles Google OAuth**: Handles the complete OAuth 2.0 authorization code flow, securely authenticating users with their Google account.
- **Server API Route**: Calendar events are fetched through the Next.js server route (`/api/calendar`), acting as a secure backend proxy to Google's Calendar REST API.
- **Server-Side Token Security**: OAuth access tokens and refresh tokens are stored securely in encrypted HTTP-only session tokens managed by NextAuth on the server. They are never exposed to the client bundle.
- **Read-Only Calendar Access**: The application exclusively requests `calendar.readonly` scope. It cannot edit, create, or delete user calendar events.
- **Real Calendar Data**: The dashboard retrieves and visualizes real upcoming Google Calendar events, displaying join links, meeting platforms (Google Meet, Zoom, Microsoft Teams), attendees, and event times.

## Deployment

Production:
https://meetplan-dashboard-six.vercel.app

Production environment variables are configured securely directly within the Vercel Project Settings dashboard. No secrets or credentials are ever committed to version control.

## Assignment

This project was created as a Full Stack Developer technical assignment, focusing on:
- **Reference design recreation**: Faithfully matching the provided visual reference in typography, brand colors, layout, and visual rhythm.
- **Responsive UI**: Seamlessly adapting across mobile phones, tablets, and wide desktop screens.
- **Reusable component structure**: Clean separation between modular layout components, UI primitives, and data hooks.
- **Google OAuth**: Robust authentication lifecycle using NextAuth.js with session persistence.
- **Google Calendar API integration**: Real-time server-side fetching, data normalization, and platform detection.
- **Production deployment**: Fully configured, SSL-enabled production deployment on Vercel with Google Search Console verification and a public privacy policy.