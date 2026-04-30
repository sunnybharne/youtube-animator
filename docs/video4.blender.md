# Video 4 — Claude Opus 4.7 vs Free Open-Source (Dubrovnik B-roll Edition)

> **Format:** Showdown core with light Dubrovnik B-roll. **Not** a vlog — the script is the original video 4 word-for-word; Dubrovnik footage only appears in the visual layer (café shots, old town windows, marina, walking shots) as cutaways and breathing room between code segments.
> **Target runtime:** ~6–8 min (script-heavy, light location overlay).
> **Standard beat template:** `Script / On-screen / B-roll / Cliffhanger`.
> **Rule:** Dubrovnik B-roll never plays *over* the talking-head delivery of the hook, the rules, or the verdict. It plays during transitions, idea-generator reveal, HUD-focused build segments, and the outro tail. Code and HUD always win the frame when active.

---

## 1. HOOK

- **Script:** "I'm building the same SaaS app twice — once with Claude Opus 4.7 ($200/mo), and once with free open-source models. Let's see if those 'premium' AI companies are actually worth your money."
- **On-screen:** Talking head OR clean graphic. No Dubrovnik footage here — the hook lands clean.
- **B-roll:** Split screen — Claude logo + **"$200/mo"** on one side, open-source logo + **"$0"** on the other. Quick cuts.

---

## 2. THE IDEA GENERATOR

- **Script:** "But first, I needed an idea. So I let AI pick for me. I built a tiny slot-machine web app that scrolls random SaaS ideas, pings the OpenAI API in the background, and ten seconds later — slams down the one I'm building today: **Repo Context Hub** — a dashboard that pulls in your GitHub repos and links each one to its related Notion pages, so code and context finally live in the same place. Oh — and one more thing: this generator is rigged. I'll explain at the end."
- **B-roll:** Screen recording of the slot-machine app scrolling text fast, slowing down, locking onto the final idea. Freeze-frame on the result with a "DING" sound. Small badge appears in the corner: **🔒 secret revealed at the end**.
- **🌅 Dubrovnik cutaway (≈ 2s, between "ten seconds later" and the idea reveal):** quick shot of you watching the laptop at a café table — coffee, sun, red rooftops in soft focus behind. Audio of the slot-machine "DING" carries over.
- **Punchline (optional VO over a Dubrovnik wide shot):** "Yes — I used AI to decide whether AI is worth paying for. The irony is not lost on me."

---

## 3. THE RULES

- **Script:** "Before we start, ground rules — otherwise this isn't a fair fight. Same idea. Same prompt. Same stack: Next.js, Postgres, GitHub OAuth, Notion API. Same deadline: one working day. Same finish line: deployed, logged in, pulling real data. One build runs on Claude Opus 4.7. The other runs on a free open-source model — no paid APIs, no cheating. May the better model win."
- **On-screen:** Animated checklist appearing one item at a time — ✅ Same idea ✅ Same prompt ✅ Same stack ✅ Same deadline ✅ Same finish line. Then a versus card: **Claude Opus 4.7 🆚 Open-Source LLM**.
- **B-roll:** Graphics-driven. **No Dubrovnik footage during the rules** — keep authority on screen.
- **Optional sting:** Boxing-bell sound on the versus card.

---

## 4. ROUND 1 — CLAUDE OPUS 4.7 (via Claude Code)

- **Script:** "Round one. I open a terminal, type `claude`, paste the spec, and hit enter. From here on I don't touch the keyboard — I just watch. Claude Code reads the repo, writes files, runs `pnpm install`, hits an OAuth error, fixes it, runs the migrations, deploys to Vercel. Four hours and twelve minutes later I have a real, working app — and an API bill I'm not ready to talk about yet."
- **Setup on screen (show for 2s):** terminal running `claude`, VS Code open in a split with the file tree empty.
- **B-roll:**
  - Full prompt on screen, 2s freeze.
  - Persistent corner HUD throughout: ⏱ build timer · 💰 API cost ticker (real $) · 🔁 turns/re-prompts counter.
  - Side-by-side: terminal output streaming on the left, VS Code file tree filling up on the right.
  - 3 micro-moments (10–15s each): (1) OAuth working first try — reaction shot, (2) one funny mistake Claude makes and self-corrects — caption the screw-up, (3) final `vercel deploy` — app loads in browser, real repos appear.
  - **🌅 Dubrovnik cutaway #1 (≈ 3s):** between micro-moment 1 and 2, brief overhead shot of the café table — laptop with Claude Code streaming, coffee cup, marina just out of focus. HUD remains pinned in the corner.
  - **🌅 Dubrovnik cutaway #2 (≈ 3s):** on "Four hours and twelve minutes later" — timelapse: sun moving across the old town wall / shadow crossing your laptop screen. Sells the time jump without breaking format.
- **Cliffhanger:** "It works. Mostly. We'll come back to the 'mostly.' Now — the free model."

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

---

## 5. ROUND 2 — THE FREE OPEN-SOURCE BUILD (via Aider + Ollama)

- **Script:** "Round two. Same prompt, same stack, same finish line — zero dollars. I'm running a top open-source coder model locally with Ollama, and wrapping it with Aider so it has the same powers Claude Code had: read the repo, edit files, run commands, fix its own mistakes. No paid APIs. No internet calls to a model provider. Just my laptop… and a fan that's about to learn what suffering means."
- **Setup on screen (show for 3s):** terminal running `ollama run <model>` in one pane, `aider --model ollama/<model>` in another, VS Code split alongside.
- **B-roll:**
  - Same corner HUD as Round 1, recolored: ⏱ build timer · 💰 cost = **$0.00** (locked) · 🔁 turns/re-prompts counter · 🌡 laptop fan / GPU temp readout for comedy.
  - Side-by-side: Aider output streaming on the left, VS Code file tree filling on the right.
  - 3 micro-moments (10–15s each): (1) the first time it confidently writes broken code — caption the bug, (2) the moment you have to step in and re-prompt (mark the turn count jumping), (3) the eventual win OR the give-up — whichever actually happens. **Don't fake it.**
  - Optional cutaway: laptop overheating, fan audio peaking.
  - **🌅 Dubrovnik cutaway #1 (≈ 3s):** on the line "a fan that's about to learn what suffering means" — quick shot of the laptop on a café table, hot midday sun beating down on it, you sliding it into the shade.
  - **🌅 Dubrovnik cutaway #2 (≈ 3s):** between micro-moments 2 and 3 — you stepping outside for air, narrow Dubrovnik alley, then cutting back to the temp readout climbing.
- **Honesty rule:** if it never finishes, that *is* the result. Show it. Viewers can smell a rigged ending.
- **Cliffhanger into the verdict:** "So… was the $200 worth it? Let's score them."

---

## 6. THE VERDICT — *new beat, fills the gap from the original*

- **Script:** "Here's the scoreboard. Same prompt, same finish line — two very different days. Claude finished, deployed, and cost me eighty bucks of API credits to do it. The open-source build got most of the way there, needed me to step in around twenty times, didn't deploy cleanly, and cost me zero dollars and one very tired laptop. So is the $200 worth it? Honest answer — for this kind of build, yes, today. The free model isn't bad. It's just not autonomous yet. You're paying Claude not for the code — you're paying it to recover from its own mistakes without you. That's the gap. And it's closing fast."
- **On-screen:** Full-frame scoreboard table:

  | | Claude Opus 4.7 | Open-Source (Aider + Ollama) |
  |---|---|---|
  | Finished | ✅ | ⚠️ partial |
  | Deployed | ✅ Vercel | ❌ |
  | Re-prompts | 3 | ~22 |
  | Wall time | 4h 12m | 7h 40m |
  | Cost | **~$78** | **$0** |
  | Laptop survived | ✅ | 🌡 just barely |

- **B-roll:** No Dubrovnik footage during the verdict. Stay on the scoreboard. Authority moment.

---

## 7. THE RIGGED-GENERATOR REVEAL

- **Script:** "One more thing. Remember the slot machine? It was rigged. Every option in there was actually something I could ship in a day with this exact stack. Whichever idea it landed on — Repo Context Hub, anything — the *real* test was always 'how well does each model build a Next.js + Postgres app I already understand,' so I could fairly judge the output. The randomness was just the framing. The fight was real."
- **On-screen:** Show the slot-machine code — the `IDEAS` array, all entries of similar shape. Caption: **"Same difficulty. Different label."**
- **B-roll:** No Dubrovnik footage here either.

---

## 8. OUTRO

- **Script:** "If you want the prompt, the slot machine, and both repos — they're in the description. Tell me which model you'd bet on next year. I read every comment. Thanks for watching."
- **On-screen:** End card.
- **B-roll:** **🌅 Dubrovnik tail shot (≈ 5s):** wide shot of the old town from the city walls, sun setting on the Adriatic, you closing the laptop. Hard cut to black.

---

## ⏱ Runtime tracker

| Beat | Spoken | Visual add | Running total |
|---|---|---|---|
| 1. Hook | ~11s | — | **~11s** |
| 2. Idea Generator (incl. tease + punchline) | ~37s | +5s reveal + 2s Dubrovnik cutaway | **~55s** |
| 3. The Rules | ~22s | +3s versus card | **~80s (~1m 20s)** |
| 4. Round 1 — Claude Code | ~34s | +20s micro-moments + HUD + 6s Dubrovnik cutaways | **~140s (~2m 20s)** |
| 5. Round 2 — Aider + Ollama | ~38s | +25s micro-moments + HUD + 6s Dubrovnik cutaways | **~209s (~3m 29s)** |
| 6. Verdict + scoreboard | ~50s | +10s scoreboard hold | **~269s (~4m 29s)** |
| 7. Rigged-generator reveal | ~25s | +5s code-on-screen | **~299s (~4m 59s)** |
| 8. Outro | ~15s | +5s Dubrovnik tail | **~319s (~5m 19s)** |

**Total target: ~5 min 20s – 7 min** _(once real build/HUD footage is cut in for breathing room; expect the full edit to land around 6–8 min)_

---

## ✂️ Editing rules — Dubrovnik B-roll

1. **Total Dubrovnik screen time: under 25 seconds across the whole video.** It's seasoning, not the meal.
2. **Never cut to Dubrovnik during a code claim or a number on screen.** Cost ticker, turn counter, scoreboard — code/HUD owns the frame.
3. **Dubrovnik cutaways belong in:** idea reveal beat, between Round 1 micro-moments, between Round 2 micro-moments, time-jump moments, and the very last 5 seconds.
4. **Audio rule:** Dubrovnik shots can carry ambient sound (waves, café chatter) under the VO. Never replace the VO.
5. **No "look where I am" lines in the script.** The script stays exactly as written for video 4. Location is shown, not announced.
6. **HUD is always on during build segments**, even over Dubrovnik cutaways. The fight is the show.
