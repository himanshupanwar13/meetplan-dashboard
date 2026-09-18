# MeetPlan Dashboard

A Next.js dashboard app that displays Google Calendar events. Built as a technical assignment.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** for styling
- **NextAuth.js** for Google OAuth
- **Google Calendar API** for events
- **date-fns** for date formatting

## Getting Started

### 1. Clone & install

```bash
git clone <your-repo>
cd meetplan-dashboard
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with:

| Variable | Where to get it |
|---|---|
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |

> **Google OAuth setup:** Add `http://localhost:3000/api/auth/callback/google`
> as an Authorized Redirect URI in your OAuth 2.0 Client.
> Enable the **Google Calendar API** in your project.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
meetplan-dashboard/
├── app/
│   ├── (auth)/login/       # Sign-in page
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   └── calendar/            # Google Calendar API route
│   ├── dashboard/          # Protected dashboard page
│   ├── layout.js           # Root layout
│   └── providers.js        # Client-side SessionProvider
├── components/
│   ├── ui/                 # Reusable primitives (Button, Card, Avatar)
│   ├── dashboard/          # Layout components (Sidebar, Header)
│   └── calendar/           # Calendar-specific components (EventCard)
├── hooks/
│   └── useCalendarEvents.js  # Custom hook for fetching events
├── lib/
│   ├── auth.js             # NextAuth config & Google OAuth options
│   └── googleCalendar.js   # Google Calendar API helper
└── .env.example            # Environment variable template
```

## Deployment

Push to GitHub and deploy on [Vercel](https://vercel.com). Set the environment
variables in the Vercel project settings. Update `NEXTAUTH_URL` to your
production URL and add it as an authorized redirect URI in Google Cloud Console.