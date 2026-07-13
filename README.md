# Topiq — Web (Next.js)

Open a subject. Find your topic. Practise until you know it.

## Structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout with nav header
│   ├── page.tsx                       # Home — subject grid
│   ├── globals.css                    # Tailwind base
│   ├── subjects/
│   │   ├── page.tsx                   # All subjects listing
│   │   └── [subject]/
│   │       ├── page.tsx               # Subject topic tree
│   │       └── [topic]/page.tsx       # Concept + practice view
│   ├── practice/page.tsx              # Practice dashboard
│   ├── progress/page.tsx              # Mastery & weak topics
│   └── dashboard/page.tsx             # Stats overview
├── lib/
│   ├── api-client.ts                  # Fetch wrapper
│   ├── types.ts                       # Subject, Topic, Question
│   └── utils.ts                       # cn() utility
```

## Run

```bash
npm install
npm run dev
```