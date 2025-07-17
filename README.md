# MediVox AI 🩺

MediVox AI is a modern healthcare web application that provides voice-first AI medical assistance. It allows users to have real-time voice conversations with AI-powered specialist doctors, automates medical report generation, and simplifies patient care workflows. The platform supports appointment scheduling, consultation history tracking, and premium subscription features.

## Features

- AI Voice Consultation: Have natural voice conversations with AI medical specialists powered by OpenAI and Vapi.
- Automated Report Generation: Instant medical summaries based on the consultation transcript.
- Consultation History: View past sessions with summaries and doctor details.
- Doctor Suggestions: Get AI-recommended doctors based on symptoms.
- Authentication: Seamless sign-in and sign-up flow using Clerk.
- Premium Access: Subscription management using Clerk's pricing plans.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Clerk Authentication
- **Backend**: Next.js API routes, Drizzle ORM, NeonDB (PostgreSQL), OpenAI API, Vapi AI
- **State Management**: React Context API
- **Voice Assistant**: Vapi AI integration with OpenAI GPT-4

## Getting Started
- Clone the Repository
```bash
git clone https://github.com/your-username/medivox-ai.git
cd medivox-ai
```

- Install Dependencies
```bash
npm install
```

- Configure Environment Variables
```env
DATABASE_URL=your_postgresql_connection_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_VAPI_KEY=your_vapi_key
OPENAI_API_KEY=your_openai_api_key
```

- Run Development Server
```bash
npm run dev
```

- Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000 to see it in action.

## Database Setup

The project uses Drizzle ORM and NeonDB (PostgreSQL) for database management.

- To generate types and migrations:
```bash
npx drizzle-kit generate
```


- Apply migrations to your database accordingly.