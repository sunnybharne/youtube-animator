1. **HOOK**
   - **Script:** I'm building the same SaaS app twice — once with Claude Opus 4.7 ($200/mo), and once with free open-source models. Let's see if those "premium" AI companies are actually worth your money.
   - **B-roll:** Split screen — Claude logo + "$200/mo" on one side, open-source logo + "$0" on the other. Quick cuts.

2. **THE IDEA GENERATOR**
   - **Script:** But first, I needed an idea. So I let AI pick for me. I built a tiny slot-machine web app that scrolls random SaaS ideas, pings the OpenAI API in the background, and ten seconds later — slams down the one I'm building today: **Repo Context Hub** — a dashboard that pulls in your GitHub repos and links each one to its related Notion pages, so code and context finally live in the same place.
     Oh — and one more thing: this generator is rigged. I'll explain at the end.
   - **B-roll:** Screen recording of the slot-machine app scrolling text fast, slowing down, locking onto the final idea. Freeze-frame on the result with a "DING" sound. Small badge appears in the corner: **🔒 secret revealed at the end**.
   - **Punchline (optional VO):** Yes — I used AI to decide whether AI is worth paying for. The irony is not lost on me.

3. **THE RULES**
   - **Script:** Before we start, ground rules — otherwise this isn't a fair fight. Same idea. Same prompt. Same stack: Next.js, Postgres, GitHub OAuth, Notion API. Same deadline: one working day. Same finish line: deployed, logged in, pulling real data. One build runs on Claude Opus 4.7. The other runs on a free open-source model — no paid APIs, no cheating. May the better model win.
   - **B-roll:** Animated checklist appearing one item at a time — ✅ Same idea ✅ Same prompt ✅ Same stack ✅ Same deadline ✅ Same finish line. Then a versus card: **Claude Opus 4.7 🆚 Open-Source LLM**.
   - **Optional sting:** Boxing-bell sound on the versus card.

4. **ROUND 1 — CLAUDE OPUS 4.7 (via Claude Code)**
   - **Script:** Round one. I open a terminal, type `claude`, paste the spec, and hit enter. From here on I don't touch the keyboard — I just watch. Claude Code reads the repo, writes files, runs `pnpm install`, hits an OAuth error, fixes it, runs the migrations, deploys to Vercel. Four hours and twelve minutes later I have a real, working app — and an API bill I'm not ready to talk about yet.
   - **Setup on screen (show for 2s):** terminal running `claude`, VS Code open in a split with the file tree empty.
   - **B-roll:**
     - Full prompt on screen, 2s freeze.
     - Persistent corner HUD throughout: ⏱ build timer · 💰 API cost ticker (real $) · 🔁 turns/re-prompts counter.
     - Side-by-side: terminal output streaming on the left, VS Code file tree filling up on the right.
     - 3 micro-moments (10–15s each): (1) OAuth working first try — reaction shot, (2) one funny mistake Claude makes and self-corrects — caption the screw-up, (3) final `vercel deploy` — app loads in browser, real repos appear.
   - **Cliffhanger:** It works. Mostly. We'll come back to the "mostly." Now — the free model.

   - **📋 The Prompt (paste this verbatim into BOTH Claude and the open-source model):**

     ````
     You are a senior full-stack engineer. Build a production-ready web app called
     "Repo Context Hub" end-to-end. Deliver complete, runnable code — no placeholders,
     no "TODO" comments, no skipped files.

     ## Product
     A dashboard where a logged-in user sees all of their GitHub repositories, and
     for each repo can view a side panel of linked Notion pages. The user can manually
     link/unlink Notion pages to a repo. Links persist in the database per user.

     ## Tech stack (do not substitute)
     - Next.js 15 (App Router, TypeScript, Server Actions)
     - PostgreSQL via Prisma
     - NextAuth v5 with GitHub OAuth provider
     - Notion official SDK (@notionhq/client) — user pastes a Notion integration token
       in settings; store it encrypted (AES-256-GCM) in the DB
     - Tailwind CSS + shadcn/ui
     - Deployed on Vercel; Postgres on Neon

     ## Required features
     1. Sign in with GitHub (OAuth scopes: read:user, repo).
     2. Home page: paginated grid of the user's repos (name, description, language,
        stars, last-updated). Search + filter by language.
     3. Repo detail page: README preview (rendered markdown) + a "Linked Notion Pages"
        sidebar.
     4. Settings page: paste/save Notion integration token; "Test connection" button.
     5. From the repo detail page: search the user's Notion workspace and link a page
        to the current repo. Unlink with one click. Links are stored in a join table
        keyed by (userId, repoFullName, notionPageId).
     6. All API calls are server-side. No tokens ever exposed to the client.

     ## Non-negotiables
     - Type-safe end to end. No `any`. No `// @ts-ignore`.
     - Real error handling (try/catch, user-facing toasts, server logs).
     - Rate-limit GitHub + Notion calls; cache repo list for 5 minutes per user.
     - Seed script + README with one-command local setup (`pnpm i && pnpm dev`)
       and a `.env.example` listing every required variable.
     - Include a `vercel.json` and Prisma migration files.

     ## Output format
     1. Print the final file tree.
     2. Then print every file's full contents in fenced code blocks, with the file
        path as the language hint comment on line 1.
     3. End with: setup steps, deploy steps, and a list of every env var.

     Begin.
     ````

   - **Tip:** Save this prompt as `prompt.md` in the repo so the video can show "same file, two models" on screen.

5. **ROUND 2 — THE FREE OPEN-SOURCE BUILD (via Aider + Ollama)**
   - **Script:** Round two. Same prompt, same stack, same finish line — zero dollars. I'm running a top open-source coder model locally with Ollama, and wrapping it with Aider so it has the same powers Claude Code had: read the repo, edit files, run commands, fix its own mistakes. No paid APIs. No internet calls to a model provider. Just my laptop… and a fan that's about to learn what suffering means.
   - **Setup on screen (show for 3s):** terminal running `ollama run <model>` in one pane, `aider --model ollama/<model>` in another, VS Code split alongside.
   - **B-roll:**
     - Same corner HUD as Round 1, recolored: ⏱ build timer · 💰 cost = **$0.00** (locked) · 🔁 turns/re-prompts counter · 🌡 laptop fan / GPU temp readout for comedy.
     - Side-by-side: Aider output streaming on the left, VS Code file tree filling on the right.
     - 3 micro-moments (10–15s each): (1) the first time it confidently writes broken code — caption the bug, (2) the moment you have to step in and re-prompt (mark the turn count jumping), (3) the eventual win OR the give-up — whichever actually happens. **Don't fake it.**
     - Optional cutaway: laptop overheating, fan audio peaking.
   - **Honesty rule:** if it never finishes, that *is* the result. Show it. Viewers can smell a rigged ending.
   - **Cliffhanger into beat 6:** So… was the $200 worth it? Let's score them.

---

## ⏱ Runtime tracker

| Beat | Spoken | Visual add | Running total |
|---|---|---|---|
| 1. Hook | ~11s | — | **~11s** |
| 2. Idea Generator (incl. tease) | ~32s | +5s reveal | **~48s** |
| 2. Punchline VO (optional) | ~5s | — | **~53s** |
| 3. The Rules | ~22s | +3s versus card | **~78s (~1m 18s)** |
| 4. Round 1 — Claude Code | ~34s | +20s micro-moments & HUD | **~132s (~2m 12s)** |
| 5. Round 2 — Aider + Ollama | ~38s | +25s micro-moments & HUD | **~195s (~3m 15s)** |

**Total so far: ~3 min 10s – 3 min 20s** _(at ~165 wpm; subtract ~20% if you talk faster)_
