# Coding Vlog — GitHub Actions Menubar App — Transcript

## Intro

Hello everyone, welcome to my mini coding vlog series. This is going to be a very chill, lightly paced video where I share my days and all the stupid things I'm working on. So sit back, relax, and grab a coffee or two.

## Helsinki Weather

The weather in Helsinki is getting a bit warmer, and I definitely see a lot more people hanging out on the streets — which is a rare sight here. If you know, you know.

## Today's Project

Today, I am tyring create a utiliy tool for my macbook, and the inspiration for this tool  stems for a sheer frustration.more on that later

Before I proceed, quick note: don't steal my idea. Just kidding — it's so simple you'll probably wonder why I'm even making a video about it.

## The Frustration

So here's the thing. I work with GitHub Actions/azure pipelines every day. And every single time I push code, I end up with a GitHub tab open, refreshing the Actions page, waiting to see if my workflow passed or failed. Sometimes I forget about it, come back 20 minutes later, and realize it failed 18 minutes ago. It's a small annoyance but it happens every. single. day. My small brain suddenlly realised that hey you are a software engineer you can make something for your self too. Its not just grinding for your your boss but  I am free to build what ever I want in my free time , is it.

## Aside — The Building

Talking about building stuff. This building has been surprising me for almost a few months now. I daily come here for a small jog and I usually gaze at this building for some time to satisfy my curiosity. And to my surprise, somehow some days I go to sleep with one floor and wake up to a fully built extra floor. It's not even a whole month but these men have already built the entire building. Meanwhile, I've been stuck on a Terraform state lock for three days. These guys build floors faster than I push commits. tell me more about incompitent developer. This has nothing to do with my app and still I blabber about it.

## The Idea — A Menubar App

So I thought — why not just build a tiny macOS menubar app that shows me the status of my GitHub Actions? That's it. Nothing fancy. Just a little icon in my menubar that turns green when builds pass and red when something breaks. I just want to glance up and know.

## Why Not Email Notifications

I know what you're thinking — Sunny, this is so basic, why not just use email notiIts impressive to see how far you have come. Keep Growing. ❤️fications? come to me with this question when you have 3000+ unread emails. Because I get 200 emails a day and GitHub notifications are buried somewhere between Jira updates and calendar invites. I don't want notifications. I want a status light. Always there, always visible, no noise.

## Why Swift / SwiftUI

Plus I've been wanting to learn Swift and SwiftUI eventhough I used to work on Java sona now I am mostly working with pythong for a while now. Building a real macOS app has been on my bucket list. So this is the perfect excuse — a small enough project that I can actually finish, and something I'll genuinely use every day.

## The Plan

For the nerds still watching — the plan is super simple. A SwiftUI menubar app that polls the GitHub Actions API, shows workflow run statuses for my repos, and maybe sends a native macOS notification when a build fails. That's it. OAuth2 for GitHub auth, one API endpoint, one menubar icon. If SwiftUI kills me — which it might since I've never used it — I'll fall back to something I know. But I want to try.

## Technical Architecture

Okay, if you're still here, nerd mode on. Let me explain the technical architecture in a way that actually maps to how this video flows.

### Core Idea (≈ 0:00)

At around 0:00, the core idea is this: I am building a macOS menubar app in SwiftUI that monitors GitHub Actions in real time. I don't want to keep opening GitHub. I just want a tiny status light in the menubar. Green means good, red means pain, and if something fails I get notified instantly.

### Problem Statement (≈ 0:30)

Around 0:30, the actual problem statement is visibility. CI/CD is critical, but right now it's reactive. We open GitHub, go to Actions, refresh, and check. This app turns that into ambient monitoring: passive visibility, immediate feedback, and native OS-level alerts.

### Architecture Overview (≈ 1:00)

At about 1:00, the architecture has four parts. First, macOS system integration for menubar and notifications. Second, the SwiftUI app layer for UI, state, and polling logic. Third, authentication with OAuth and secure token storage. Fourth, GitHub Actions API as the external data source.

### System Layer (≈ 1:30)

By 1:30, on the system layer, the menubar icon is the primary interface. It is always there, always glanceable. Color is the status language: green for passing, red for failed. Notifications are only fired on important changes, mainly failures, so signal stays high and noise stays low.

### SwiftUI App Layer (≈ 2:10)

At 2:10, inside the SwiftUI app layer, there are three moving parts. One, the app UI is declarative and updates automatically when state changes. Two, a status cache stores the latest workflow state so I don't over-fetch and the UI stays snappy. Three, a timer-based polling engine runs every N seconds, fetches the latest runs, compares against cache, then decides what changed.

If a change is detected: cache updates, UI refreshes, and if the new state is failure, notification gets triggered.

### Auth Layer (≈ 3:30)

At 3:30, auth layer. Standard GitHub OAuth flow, login once, token issued. Then a token manager stores it in macOS Keychain and attaches it to API requests. So we get secure storage, persistent sessions, and no repeated login drama.

### External Service (≈ 4:10)

At 4:10, external service is GitHub Actions API. Endpoint pattern is GET /repos/{owner}/{repo}/actions/runs. That gives workflow run metadata we need for status tracking.

That is the V1 architecture. Clean boundaries, simple data flow, and easy to extend later for multi-repo support, branch filtering, and smarter notification rules.

## Scratching My Own Itch

I don't know if anyone else would even want this. I'm literally building it for myself because it annoys me. But that's how the best tools start, right? You scratch your own itch.

## Nothing Starts As What It Becomes

Every app that you see today was something totally different — Amazon was a book-selling store, YouTube started as a video dating website inspired by Hot or Not, Instagram was a location check-in app called Burbn before they pivoted to photo sharing, Slack was an internal chat tool built for a failed video game called Glitch, Twitter was a side project inside a podcasting company called Odeo, Netflix started as a DVD-by-mail rental service, and Nokia — which is literally from here in Finland — started as a pulp mill making paper in 1865 before becoming a rubber company, then a cable company, then the biggest phone maker in the world, and now a telecom infrastructure giant. Point is, nothing starts as what it becomes.

## Closing Thoughts

So my naive mind is thinking — maybe this stays a tiny menubar utility that only I use. Maybe it turns into something more. Who knows. For now, I just want my builds to stop failing without me noticing.

If you're a dev and you've ever rage-refreshed the GitHub Actions tab — you know the pain. Let me know in the comments if this is something you'd use too or if I'm the only one bothered by this.

## Outro Quote

A bright mind once said: "I'd rather attempt something great and fail than attempt nothing and succeed." — Robert H. Schuller
