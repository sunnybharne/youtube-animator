# Video 5 — My Mac Dev Setup (Helsinki Edition)

> **Format:** Vlog wrapper, Setup tour core. Cold open → Helsinki intro → Why this setup → Tool tour (Ghostty / tmux / Neovim / dotfiles) → Life break → Workflow demo → Reflection → Helsinki outro.
> **Target runtime:** 8–10 min.
> **Standard beat template:** `Script / On-screen / B-roll / Cliffhanger`.
> **Tone reminder:** This is NOT a tutorial. It's "here's how I work, here's why, here's what's broken about it." Self-deprecation > authority.

---

## 0. COLD OPEN (≈ 6s)

- **Script (deadpan, Helsinki street, cold air):** "Everyone keeps asking what's on my screen. Fine. I'll show you. Spoiler: it's three terminals and a lot of green text."
- **On-screen:** No music. Hard cuts.
- **B-roll (3 fast cuts, ~2s each):**
  1. Close-up of Ghostty + tmux + Neovim split — fast typing.
  2. You shrugging at the camera in a Helsinki tram.
  3. Title card: **"My Mac Setup, Honestly."**

---

## 1. HELSINKI INTRO (≈ 30s)

- **Script:** "Back in Helsinki. The snow's mostly gone, the construction guys added two more floors while I was away, and I'm finally back at my actual desk. A bunch of you asked what I use to code — the editor, the terminal, the weird keyboard shortcuts — so today I'm just gonna show you. Nothing fancy. Mostly free tools. Mostly stolen from people smarter than me."
- **On-screen:** Walking from the tram stop to your apartment / desk.
- **B-roll:**
  - Quick clips of Helsinki — tram, harbor, a coffee, the construction site (callback to earlier vlogs).
  - You unlocking the door, dropping the bag, sitting at the desk.
- **Cliffhanger:** "Okay. Top to bottom."

---

## 2. WHY THIS SETUP — THE PHILOSOPHY (≈ 45s)

- **Script:** "Three rules. One — everything has to work the same on this Mac, my Mac Mini, my work laptop, and my Linux box. Two — I should be able to nuke the laptop and be back to a fully working setup in under ten minutes. Three — no app I can't quit with `:q`. That's it. That's the whole philosophy. The reason I use this stuff isn't because it's cool. It's because I'm lazy and I move between four machines."
- **On-screen:** You at the desk, casual, talking to camera. Triple-monitor setup visible.
- **B-roll:**
  - Cut to dotfiles repo on GitHub.
  - Quick montage: same terminal opening on Mac, Mac Mini, Linux laptop.
- **Cliffhanger:** "Tool one. The terminal."

---

## 3. THE TOUR — GHOSTTY · TMUX · NEOVIM · DOTFILES (≈ 3m 30s, four micro-segments)

> **Editing note:** Each tool gets ~45s. Show, don't lecture. Failure-first when possible.

### 3a. Ghostty (≈ 45s)
- **Script:** "Terminal is Ghostty. Switched from iTerm last year. It's GPU-rendered, the config is one file, and it doesn't feel like an app — it feels like a window. The only thing I customize is the font, the padding, and the color scheme. That's it. If you're spending more than ten minutes on terminal config, you're cosplaying as a developer."
- **On-screen:** Open `~/.config/ghostty/config`, scroll through it slowly.
- **B-roll:** Quick cut showing font rendering vs. a default terminal — caption: "yes, I can tell."
- **Self-deprecation moment:** "I did spend two hours on the color scheme. So… do as I say."

### 3b. tmux (≈ 45s)
- **Script:** "Inside Ghostty, tmux. Reason: I want my work to survive when I close the lid, kill the terminal, or my Mac panics. I have one session per project. Three windows: editor, server, scratch. Prefix is `Ctrl-a` because `Ctrl-b` is for people who hate themselves."
- **On-screen:**
  - `tmux ls` — show current sessions.
  - Attach to one with `tmux a -t repo-context-hub` (callback to the video4 project).
  - Show the 3-window layout.
- **B-roll:** A `~/.tmux.conf` scroll-through, highlight 3–4 lines max.
- **Failure beat:** "I once lost a four-hour debugging session because I forgot tmux wasn't running. Now I have a shell function that yells at me if I try to open a project outside tmux."

### 3c. Neovim (≈ 60s — the longest of the four)
- **Script:** "Editor is Neovim. I switched from VS Code last year. Was it worth it? Honestly — for me, yes. For most people, no. I'll save you the rant. Config is LazyVim as the base, with maybe twenty lines of my own on top. LSP, telescope, fugitive, copilot. That's it. I am not a Neovim wizard. I am a guy who can quit it without Googling, and I'm proud of that."
- **On-screen:**
  - Open Neovim on the Repo Context Hub repo from video4.
  - Telescope: fuzzy-find a file. Open it.
  - Show one LSP rename.
  - Show Copilot completing a line — caption: "yes, AI in Neovim. Get over it."
- **B-roll:** `~/.config/nvim/lua/user/` directory tree — short, not a tutorial.
- **Honest moment:** "Neovim made me 5% faster and 100% more annoying at parties."

### 3d. Dotfiles + chezmoi (≈ 45s)
- **Script:** "All of this lives in one git repo, managed with chezmoi. New machine, three commands, fully configured. That's the whole reason I use any of these tools — they're text files I can sync. Anything that can't be a text file in my dotfiles repo eventually gets replaced."
- **On-screen:**
  - `chezmoi apply` on a fresh-ish machine.
  - Show the repo on GitHub (link in description).
- **B-roll:** A side-by-side of two machines waking up with the same prompt.
- **Cliffhanger:** "Okay. Outside for a sec."

---

## 4. LIFE BREAK — HELSINKI (≈ 30s)

- **Script:** "I'm gonna step outside before this turns into a YouTube tutorial channel. Helsinki in late April is the city's best two weeks. People remember they have legs. The cafés put chairs back on the street. The light doesn't quit until 10 p.m. I missed this."
- **On-screen:** No HUD. Pure vlog.
- **B-roll:**
  - Walk along the harbor.
  - Coffee from your usual spot.
  - That construction site — one floor higher than last video.
  - You taking a phone call / waving at a friend / something human.
- **Cliffhanger:** "Right. Last bit. How this actually feels day to day."

---

## 5. WORKFLOW DEMO — A REAL 60 SECONDS OF WORK (≈ 90s)

- **Script:** "Here's what a normal session actually looks like. I open the Repo Context Hub project — yes the one from last week's video — fix one bug, commit, push, watch CI. No music, no fast cuts, just real time. If this looks boring it's because it is. That's the point."
- **On-screen:**
  - tmux attach.
  - Neovim opens, telescope to the file, fix.
  - `:!pnpm test` inline.
  - `git` from inside Neovim (fugitive).
  - Push, then a tiny status badge in the menubar turns green (callback to **video 3's GitHub Actions menubar app** if you want — chef's kiss).
- **B-roll:** None. Let the screen speak.
- **Cliffhanger:** "And that's it. That's the whole show."

---

## 6. REFLECTION (≈ 45s)

- **Script:** "People think a setup makes you better. It doesn't. A setup makes you *consistent*. The reason I use the same tools on every machine isn't speed — it's that I never have to think about the tools. I just think about the problem. The day I stop thinking about my setup is the day my setup actually started working. Steal whatever's useful. Ignore the rest. The best setup is the one you stop noticing."
- **On-screen:** You at the desk, lights low, monitors glowing. Or a quiet Helsinki street at dusk.
- **B-roll:** Slow shots — keyboard, monitor, window, harbor.
- **Cliffhanger:** "Alright."

---

## 7. HELSINKI OUTRO (≈ 30s)

- **Script:** "Dotfiles are linked in the description if you want to copy anything. Don't copy all of it — half of it is wrong for you. If you liked the format, subscribe, it really helps. Drop a comment with one tool I should try next. I read every one. Thanks for hanging out."
- **On-screen:** Walking out, last shot of Helsinki at golden hour.
- **B-roll:** Hard cut to black.

---

## ⏱ Runtime tracker

| Beat | Spoken | Visual add | Running total |
|---|---|---|---|
| 0. Cold open | ~6s | — | **~6s** |
| 1. Helsinki intro | ~30s | — | **~36s** |
| 2. Philosophy | ~40s | — | **~76s (~1m 16s)** |
| 3a. Ghostty | ~35s | +10s config scroll | **~121s (~2m 01s)** |
| 3b. tmux | ~35s | +10s screens | **~166s (~2m 46s)** |
| 3c. Neovim | ~50s | +20s demo | **~236s (~3m 56s)** |
| 3d. Dotfiles / chezmoi | ~35s | +10s | **~281s (~4m 41s)** |
| 4. Life break — Helsinki | ~25s | +5s ambient | **~311s (~5m 11s)** |
| 5. Workflow demo | ~30s | +60s real-time screen | **~401s (~6m 41s)** |
| 6. Reflection | ~40s | +10s ambient | **~451s (~7m 31s)** |
| 7. Helsinki outro | ~25s | +5s | **~481s (~8m 01s)** |

**Total target: ~8 min – 9 min 30s** _(at ~165 wpm)_

---

## ✂️ Editing rules

1. **No tutorial voice.** Show, mention, move on.
2. **At least one self-deprecation line per tool.**
3. **No HUD anywhere.** This isn't the showdown video.
4. **Real-time workflow demo (beat 5) stays uncut for at least 45s.** That authenticity is the whole point.
5. **End on Helsinki, not code.** Always.
