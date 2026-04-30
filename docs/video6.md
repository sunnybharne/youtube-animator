# Video 6 — OpenCode + Agents on the Mac Mini (Working on Repo Context Hub)

> ⚠️ **Assumption flag:** I'm reading "open claw" as **OpenCode** (`sst/opencode`) — the open-source Claude Code alternative TUI agent. If you actually meant **OpenHands**, **Aider**, **Continue.dev**, or something else, swap the tool name throughout — the structure stays the same.
>
> **Format:** Vlog wrapper, Lab core. Cold open → Helsinki intro → Why bother → Install + first run → Life break → Build the agents/workflows → Demo on Repo Context Hub → Reflection → Helsinki outro.
> **Target runtime:** 9–11 min.
> **Standard beat template:** `Script / On-screen / B-roll / Cliffhanger`.
> **Callback rule:** This is a sequel to **video 4**. Reference it openly. The Repo Context Hub repo is the playground.

---

## 0. COLD OPEN (≈ 6s)

- **Script (deadpan, at the desk, Mac Mini visible):** "I'm giving an open-source AI agent the keys to my project, my Mac Mini, and my GitHub. What could go wrong."
- **On-screen:** No music. Hard cuts.
- **B-roll (3 fast cuts):**
  1. Close-up of the Mac Mini fan vent.
  2. OpenCode TUI booting up, splash screen.
  3. Title card: **"My Mac Mini Is the Intern Now."**

---

## 1. HELSINKI INTRO (≈ 30s)

- **Script:** "Back in Helsinki, back at the desk, and I have a Mac Mini sitting there doing nothing 22 hours a day. So I'm turning it into an agent. Today I'm installing **OpenCode** — open-source, free, runs locally — and I'm going to set up workflows that work on the Repo Context Hub project from last week. No paid APIs, no cloud round-trip. Just a tiny silver box on my desk, and a list of tasks."
- **On-screen:** Walk into the apartment, drop bag, sit at desk, gesture at the Mac Mini.
- **B-roll:**
  - Quick Helsinki transit clip.
  - Mac Mini close-up — quiet, blinking power LED.
  - GitHub repo from video 4 open on a monitor.
- **Cliffhanger:** "But first — why bother."

---

## 2. WHY BOTHER (≈ 45s)

- **Script:** "Three reasons. One — I burned $80 on Claude in the last video. I'd like a free option that's actually mine. Two — I want an agent that can run while I sleep, on hardware I already own. Three — I want to know if open-source agents have caught up, or if last video's verdict still holds. Same project. Same model class as last time. Different tool. Let's see."
- **On-screen:** You at the desk, casual.
- **B-roll:**
  - Replay 2s of the video 4 cost ticker (callback).
  - Cut to the Mac Mini specs on screen.
- **Cliffhanger:** "Step one. Install."

---

## 3. INSTALL + FIRST RUN (≈ 90s)

- **Script:** "OpenCode is a TUI — runs in the terminal, agent loop, can read your repo, edit files, run shell commands, the whole thing. Install is one line. The interesting bit is the model. I'm pointing it at my local Ollama running a coder model — same one that lost in the last video, by the way — so when OpenCode 'thinks,' that's my Mac Mini's GPU thinking, not Anthropic's data center."
- **On-screen (show real commands, ~2s each):**
  ```bash
  # install
  brew install sst/tap/opencode

  # ollama running locally on the mini
  ollama run qwen3-coder:30b

  # point opencode at the local model
  opencode --model ollama/qwen3-coder:30b
  ```
- **B-roll:**
  - First boot of OpenCode — the splash screen, the empty prompt.
  - You typing the first message: "what's in this repo?"
  - It reads the repo. File tree streams in.
  - HUD overlay (faded, smaller than video 4): ⏱ time · 🌡 GPU temp · 🔁 turns · 💰 **$0.00 (locked)**.
- **First-run honesty moment:** Caption a moment where it does something dumb on first try — wrong file path, hallucinated import, whatever. Don't hide it.
- **Cliffhanger:** "Okay. It works. Now the fun part — making it work *on its own*."

---

## 4. THE THREE AGENTS / WORKFLOWS I'M BUILDING (≈ 2m 30s — three micro-segments, ~50s each)

> **Editing note:** These are concrete, useful, and visibly demoable. Pick the 2–3 that land best in real footage; cut the rest if time runs over.

### 4a. The Triage Agent — "read every new issue, label it, propose a one-line plan" (≈ 50s)
- **Script:** "Agent one. Triage. When someone opens an issue on the Repo Context Hub repo, the Mac Mini wakes up, reads the issue, labels it (`bug` / `feature` / `chore`), and posts a one-paragraph plan as a comment. That's it. It doesn't write code. It doesn't merge anything. It just turns vague issues into actionable ones, while I sleep."
- **On-screen:**
  - The OpenCode workflow file or prompt template (whatever the syntax is — show the real file).
  - A `cron` or `launchd` plist polling GitHub every 10 min.
  - Live demo: open a fake issue → wait 30s (timelapse) → see the comment appear.
- **B-roll:** GitHub notification on your phone — "the Mac Mini commented on your issue."
- **Honest line:** "About 1 in 5 of its plans is unhinged. That's why it only comments. I review before doing anything."

### 4b. The Dependency Janitor — "weekly upgrade PRs that I can actually merge" (≈ 50s)
- **Script:** "Agent two. Every Sunday night, the Mac Mini runs `pnpm outdated`, picks the safe upgrades, makes a branch, runs the test suite, and opens a PR — but only if the tests still pass. If they don't, it opens an issue saying which package broke and stops. No automatic merge. No auto-anything. It just does the boring 30 minutes of dependency hygiene I keep skipping."
- **On-screen:**
  - The workflow definition.
  - A real PR it opened — small, green, clean.
  - The diff on screen, you scrolling through it.
- **B-roll:** Sunday evening footage — Helsinki dark, you doing literally anything else, while a screen on the desk shows the Mini working.
- **Honest line:** "Half the joy of this is watching a computer do my chores."

### 4c. The Repo Context Hub Power User — "live agent that uses the app I built" (≈ 50s)
- **Script:** "Agent three is the meta one. Repo Context Hub — the project from last week — links GitHub repos to Notion pages. So I built a workflow where the agent, when it touches a repo, also reads the linked Notion pages from my own app, picks up the architectural context, and uses *that* before writing code. Yes — the agent uses my SaaS app. Yes — that's the most full-circle I've ever felt about anything. And yes — the first time it worked I genuinely laughed."
- **On-screen:**
  - The workflow showing it call the Repo Context Hub API.
  - It reads a Notion page ("ARCHITECTURE.md equivalent").
  - It writes code that respects that doc.
- **B-roll:** You leaning back, chuckling, on camera. "It worked."
- **Cliffhanger:** "I need a coffee."

---

## 5. LIFE BREAK — HELSINKI (≈ 30s)

- **Script:** "Walked to the harbor while the Mini was running its dependency PRs. Helsinki is doing that golden-hour thing where the sea looks fake. Realized halfway through the walk that I'd just delegated a Sunday evening to a $700 computer in my apartment. We live in a weird timeline."
- **On-screen:** No HUD. No code.
- **B-roll:**
  - Harbor.
  - Coffee.
  - The construction building — one MORE floor up since video 5. (Running gag.)
  - You back at the door, opening it.
- **Cliffhanger:** "When I got home — the PR was already open."

---

## 6. THE END-OF-SESSION DEMO (≈ 60s)

- **Script:** "Here's what 24 hours of this looks like. The triage agent labeled 4 issues. The janitor opened 1 dependency PR — green tests. The power-user agent shipped one small feature on the Repo Context Hub repo, which I reviewed and merged this morning. Total cost: zero dollars. Total Mac Mini fan noise: a reasonable amount. Total times I had to step in and undo something: twice. Both small. Both my fault for trusting it too much, too fast."
- **On-screen:** Animated dashboard — could literally be a markdown table on screen:

| Agent | Ran | Output | Cost | Human overrides |
|---|---|---|---|---|
| Triage | 12× | 4 issues labeled + planned | $0 | 1 |
| Dependency Janitor | 1× | 1 green PR | $0 | 0 |
| Power User (uses Repo Context Hub) | 3× | 1 merged feature | $0 | 1 |

- **B-roll:** Side-by-side: GitHub PR list / OpenCode log / Mac Mini sitting innocently on a shelf.
- **Cliffhanger:** "So… is this actually good?"

---

## 7. REFLECTION (≈ 45s)

- **Script:** "Last week I said you pay for Claude because it can recover from its own mistakes. That's still true. But this week showed me something else — open-source agents don't have to *win* to be useful. They just have to be *trustworthy enough for boring work*. Triage. Dependency bumps. Reading docs. The stuff I keep avoiding. The Mini doesn't have to be smarter than Claude. It just has to be smart enough, cheap enough, and *mine*. And it is. That's the whole thing."
- **On-screen:** You at the desk, lights low, Mac Mini glowing.
- **B-roll:** Slow Helsinki at night — windows lit, harbor still.
- **Cliffhanger:** "Alright."

---

## 8. HELSINKI OUTRO (≈ 30s)

- **Script:** "All three workflow files are linked in the description — steal them, fork them, break them. Tell me what you'd point one of these agents at. Drop a comment, I read every one. If you liked this format — me handing my computer to a robot and reporting back — subscribe, it really helps. Thanks for hanging out. See you next week."
- **On-screen:** No HUD. No code.
- **B-roll:**
  - You leaving the desk, lights off.
  - Last shot: Mac Mini LED glowing in a dark room.
  - Hard cut to black.

---

## ⏱ Runtime tracker

| Beat | Spoken | Visual add | Running total |
|---|---|---|---|
| 0. Cold open | ~6s | — | **~6s** |
| 1. Helsinki intro | ~30s | — | **~36s** |
| 2. Why bother | ~40s | +5s callback to v4 | **~81s (~1m 21s)** |
| 3. Install + first run | ~50s | +40s real-run footage | **~171s (~2m 51s)** |
| 4a. Triage agent | ~40s | +10s demo | **~221s (~3m 41s)** |
| 4b. Dependency janitor | ~40s | +10s demo | **~271s (~4m 31s)** |
| 4c. Repo Context Hub power user | ~45s | +10s demo + reaction | **~326s (~5m 26s)** |
| 5. Life break — Helsinki | ~25s | +5s ambient | **~356s (~5m 56s)** |
| 6. End-of-session demo | ~50s | +20s scoreboard animation | **~426s (~7m 06s)** |
| 7. Reflection | ~40s | +10s ambient | **~476s (~7m 56s)** |
| 8. Helsinki outro | ~25s | +5s | **~506s (~8m 26s)** |

**Total target: ~8 min 30s – 10 min** _(expect ~9–10 min once real install/agent footage is cut in)_

---

## ✂️ Editing rules

1. **HUD only on the lab beats (3, 4, 6).** Off for Helsinki.
2. **Every agent demo must show a real artifact** — a real PR, a real comment, a real diff.
3. **At least one "agent did something dumb" moment per video.** Honesty rule applies.
4. **Callback to video 4 at least once** — the cost ticker, the Repo Context Hub repo, the verdict line.
5. **End on a quiet shot of the Mac Mini.** It's the actual main character.

---

## 🧠 Bonus ideas (cut if runtime explodes)

- **The "agent on agent" experiment:** Have OpenCode agent #1 review the PRs of OpenCode agent #2. Possibly chaotic, possibly amazing, definitely a clip.
- **Voice trigger:** Wake the Mini with a Siri shortcut → "run the janitor" → it runs. 10-second gag, very shareable.
- **Power consumption stat:** Show kWh used by the Mini for 24h vs $ Claude burned in video 4. Climate-pilled developer content writes itself.
- **Failure compilation:** A 15-second supercut of the agent doing dumb things across the week. Comedy beat.
