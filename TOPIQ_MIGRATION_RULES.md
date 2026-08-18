# TOPIQ Migration Rules

This file is the permanent contract for the migration of `topiq_mockup_v25.html` into the React/Next.js dashboard.

## Rules

1. `topiq_mockup_v25.html` is the source of truth.
2. The migration must reproduce the mockup, not redesign it.
3. Existing landing/marketing pages must remain unchanged.
4. Existing routes must remain functional.
5. Dashboard code must be isolated from the existing marketing pages as much as reasonably possible.
6. Existing mockup CSS must be preserved.
7. Do not convert the CSS to Tailwind.
8. Do not rewrite CSS values merely for "cleanliness".
9. Do not change colors, spacing, dimensions, typography, borders, shadows, animations, breakpoints, or responsive behavior.
10. Do not remove functionality from the mockup.
11. Do not replace working mockup behavior with placeholder behavior.
12. Every vanilla JavaScript interaction must eventually have an equivalent React implementation.
13. Every screen in the mockup must eventually have an equivalent React screen.
14. React state should replace DOM manipulation where appropriate.
15. React event handlers should replace inline `onclick`, `onkeydown`, etc.
16. Mockup data should initially remain mock/local data unless I explicitly request API integration.
17. Do not connect APIs, databases, authentication, payments, or backend services during this visual migration.
18. Do not modify the mockup's authored content unless required by React syntax.
19. Do not create a second design based on your own interpretation.
20. When uncertain, inspect the original mockup before making a decision.
21. When a visual difference exists between the React version and the mockup, the mockup wins.
22. Never silently skip a screen or interaction.
23. Complete one migration phase at a time.
24. After each phase, report exactly what was changed.
25. Do not proceed to the next phase without my instruction.

## CURRENT MIGRATION STATUS

- Phase: 3 (partial) — First content screens + Practice + Sabi AI + Books/Library + Progress + Assignments + Live Class
- Status: Dashboard converted to page-per-navigation-app. Next.js App Router routes under /dashboard; Discover/Home, Subjects, Subject Hub, Practice (hub + session), Sabi AI (launcher, answer/chat, chat history, voice learning), Books/Library (list + book detail + document viewer), Progress, Student Assignments, and Live Class converted to React; remaining nav items route to placeholder pages
- Architecture: shared chrome + state lifted into `dashboard/layout.tsx` -> `DashboardProvider` (context) + `DashboardShell` (rail/topbar/tabbar/drawer/badge toast/certificate modal). Each navigation item is a real page route:
- Practice feature fully verified (headless Chrome automation): practice hub, by-subject/board drill-in, practice setup (duration/question-count steppers), single + mock sessions, question display, answer-selection feedback, countdown timer (hidden during English passage gate until read), question navigation (prev/next + q-palette jump), collapsible topic-grouped review cards, score/perf reports, mock multi-subject switcher with paper labels, exit-to-hub both modes.
- Sabi AI feature fully verified (headless Chrome automation, 30 checks across 3 suites): launcher (usage chip, voice-learn card, typed question -> own answer page), answer/chat screen (user bubble, grounded AI reply with § subject/topic chip + Listen button, usage chip + voice toggle hidden while chatting, new chat), chat history (list, live search filter, open item -> loaded into answer, delete), scan-question UI (launcher scan -> "Scanned a question from my textbook" + photo thumb; answer composer scan; AI reads the textbook question with ref chip), voice learning UI (Listening… -> transcript -> grounded answer + auto-speak), free-tier gating (3/day usage chip decrements, 4th question -> lock bubble with Unlock CTA, voice/scan same gate, Plus activation -> unlimited + voice mode unlock), voice-replies toggle (PLUS-locked -> upgrade modal for free users; auto-plays answer when on), subject auto-detection from syllabus topics + ambiguous-question subject suggestion chips (quickAsk).
- Books/Library feature fully verified (headless Chrome automation, 35 checks across 2 suites): Books list (search, Books/Textbooks type toggle, genre shelf chips filter, Spotlight row, per-genre shelf rows, subject grid in Textbooks view), book detail (hero header + genre, soft-copy file card with deterministic filename/pages/MB, Read button), document viewer modal (page indicator, page-sheet shell, prev/next with disabled states, slider jump, close), Practice box (maps genre -> subject practice handoff; unmapped genre shows "still being put together"), back-to-Books nav, subject cover handoff to subject hub, practice box handoff to practice setup via `?setup=subject`.
- Progress feature fully verified (headless Chrome automation, 18 checks): title/sub, stats row (12 day streak / 184 questions / 76% avg mastery), activity bar chart (7 cols, minutes [42,—,65,30,—,50,20], 2 missed bars, Mon–Sun labels), heatmap (per-subject rows × 7 cells matching mockup deterministic opacity formula, M/T/W/T/F/S/S day headers), mastery-by-subject rows + progress fills, plan-status-card -> /dashboard/upgrade, content-restored after browser back, back-row -> /dashboard. Visual DOM diff against mockup confirms identical plan-card text and identical heatmap cell opacity values.
- Student Assignments feature fully verified (headless Chrome automation, 12 checks): title/sub, 3 assignment cards in mock order (Photosynthesis / Simultaneous equations / Mole concept), due dates (This week/Today/Tomorrow), class metas (SS2 Biology / SS3 Mathematics / SS2 Chemistry), all Pending with Start CTA, Start -> `?setup=subject` practice setup handoff, submitted state (✓ Submitted + Review again →) persists across navigation via context (assignDone), Discover quick-card shows live pending count (3 pending default; 2 after marking one done).
- Live Class feature fully verified (headless Chrome automation, 29 checks): hub title Today's classes, subnav (Today/Upcoming/Attended/Missed), Today rows from Mon timetable (4), live row = Biology index 1 with pulsing dot + "Live — join →", join -> session view (hub hidden, live content shown), topbar (Photosynthesis · 🧬 Biology · SS2 Biology + live dot), Learn pane (article headings + takeaway), Practice pane CTA -> practice-session handoff, Interactive pane (poll question, 4 options, classmate avatars from ROSTERS, live count "N of 34 answered"), poll answer marks correct/wrong + renders pct fills (frozen once answered, not re-rolled), back -> hub, Upcoming/Attended/Missed panes from LIVE_CLASS_LOG with correct attendance badges. Visual DOM diff against mockup confirms identical topbar, learn headings, poll question + options, and avatars.
- Completed: app shell, topbar, desktop rail, mobile tabbar + drawer, main scaffold, dark-mode/theme foundation
- Completed screens: Discover/Home, Subjects, Subject Hub, Practice (Practice hub + full practice/mock session), Sabi AI (launcher, answer/chat page, full chat history, voice learning), Books/Library (Books list, Book detail, Document viewer), Progress, Student Assignments, Live Class (hub Today/Upcoming/Attended/Missed + live session Learn/Practice/Interactive) (user-initiated pane switching, topic filtering, flashcards, hub chat, search, subject navigation, article/tutorial modal)
- Completed interactions summary: tab/screen switching & nav active state, drawer open/close, theme state -> html[data-theme]; Discover search dropdown, subject chips + topic list, quick cards & promo navigation, adaptive "continue" hero; Subjects grid navigation; Hub back nav, Overview/Learn/Flash panes, topic search + list, tutorial render + article modal open, flashcard prev/next/flip/rate/review loop, hub chat composer, article modal (audio player, video mock, quick-check, term grid, takeaway, mark-as-done updating mastery + badge toast + certificate modal); Practice hub (Nigerian/International/By-Subject panes, board drill-in, mock picker with compulsory English + subject chips + year + full/quick type + running total/breakdown, practice setup with year/duration/question-count steppers); Practice session (practice/mock banner, subject switch for mock, passage gate, question track/score/clock, answer-selection feedback, q-palette jump, prev/next, mock multi-subject progress save/load/next-incomplete, mock & single score/perf report grouped by topic/subject, strengths, weak points with study navigation, collapsible review cards, practice-again, back-to-practice)
- Known differences:
  - brand mark uses public/logo.png (replaces mockup's inline base64 PNG)
  - marketing chrome (NavBar/Footer/CookieBanner) hidden on /dashboard via client AppShell wrapper instead of a route-group layout (keeps marketing files untouched)
  - dark-mode visual toggle deferred to Settings screen; the state + effect are in place
  - teacher/school nav configs present in navConfig but mode switching not yet wired (student active)
  - audio/video players and built-in speak-play render/playstate implemented for testing; the mockup's free-tier "upgrade" gate (isPlusUser/studentSchool -> upgrade modal) is not wired in this batch (upgrade/school are out of batch) — playback works so interactions are testable
  - hub/ASK chat uses the canned grounded reply (no backend); free-use gating (3/day) IS enforced in React (Sabi AI: usage chip, lock bubbles, Plus activation) but resets on page load (no persistence)
  - participation tracking (participated list) is wired in React (`openSubject` adds the subject; Practice "By Subject" pane shows the ✅ Participated tag) but is not persisted to any backend
  - Live Class `lsAddClassBtn` (teacher-only quick-add) is omitted on the student-facing converter; teacher/live-management side (startLiveForClass, endLiveSession, nextLivePoll teacher row) is out of batch scope
  - assignment pending count on Discover/rail is driven live from `assignDone` context state (matches mockup's `renderStudentAssignments` updating `qcAssignSub`); challenge counters (activeChallenges) not in scope

### Data migration (sub-phase complete)
- Migrated ALL authored mock data structures (values, order, IDs, labels, icons, relationships preserved 1:1) from the mockup `<script>` into `src/app/dashboard/data/`:
  - `subjects.ts`: SUBJECTS, SUBJECT_DIAGRAMS
  - `books.ts`: BOOK_GENRES, BOOK_CATALOG, GENRE_SUBJECT_MAP
  - `chat.ts`: chatHistoryData, VOICE_SAMPLE_QUESTIONS
  - `workspace.ts`: TIMETABLE, TASKS, EXAMS, STUDY_ACTIVITY_MINUTES
  - `exams.ts`: EXAM_BOARDS, NIGERIA_BOARDS, INTL_BOARDS, MOCK_TYPES, MOCK_SUBJECT_LIMIT
  - `student.ts`: studentProfile, earnedBadges, earnedCertificates, LINKED_ACCOUNTS, OB_GRADES, OB_TRACK_GRADES, FREE_AI_DAILY
  - `challenges.ts`: CHALLENGE_TEMPLATES, COMPETITIONS
  - `teacher.ts`: SCHOOLS, SCHOOL_TEACHERS, SCHOOL_PENDING_STUDENTS, CLASSES, ROSTERS, ASSIGNMENTS, TEACHER_TODAY_SCHEDULE, LIVE_CLASS_LOG, LP_TYPES, LP_DURATIONS, LP_HISTORY, FREE_TEACHER_ASSIGNMENTS
  - `index.ts`: re-exports all 37 names
- Not migrated (runtime/derived, not authored data): SEARCH_INDEX (derived via buildSearchIndex), runtime state vars (currentSubject, sessionIndex, mockMode, activeChallenges, etc.), functions.
- Data sourced from the mockup's init-time values (studentProfile/earnedBadges use their seeded 6937–6941 values, not the empty placeholders in the object-template).
- Verified: `npm run typecheck` and `npm run build` pass.