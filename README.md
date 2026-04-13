# Discord Bot Generator

**[한국어](README.ko.md) · [日本語](README.ja.md)**

A web-based wizard that generates a ready-to-run [discord.js v14](https://discord.js.org/) bot project as a ZIP file — no sign-up required.

**Live:** https://gminji.github.io/Discord-Bot-Generator/

---

## Features

Select the modules you need, configure them, and download a complete bot project:

| Module | Commands / Features |
|---|---|
| **Moderation** | kick, ban, mute/timeout, warn, unban, purge |
| **Utility** | ping, serverinfo, userinfo, avatar, help, rolelist |
| **Fun** | magic 8-ball, dice roll, joke, coin flip |
| **Economy** | balance, daily, work, pay, leaderboard (JSON, no DB) |
| **AutoMod** | profanity filter, spam detection, link blocker |
| **Welcome** | welcome & goodbye messages |
| **Reaction Roles** | reaction → role mapping |
| **Auto Responder** | keyword/phrase auto-reply |
| **Poll** | emoji voting polls (up to 5 options) |

**Command styles:** Slash commands (`/`) or Prefix commands (e.g. `!`)

**Languages:** English · 日本語 · 한국어

---

## How to use

1. Open the live site
2. **Step 1 — Features:** Select the modules and sub-commands you want
3. **Step 2 — Config:** Set bot prefix, channel IDs, economy values, etc.
4. **Step 3 — Download:** Review and download the generated ZIP

### After downloading

```bash
# 1. Extract the ZIP
# 2. Copy the example env file
cp .env.example .env
# Fill in your bot token in .env

# 3. Install dependencies
npm install

# 4. (Slash commands only) Register commands once
node deploy-commands.js

# 5. Start the bot
npm start
```

---

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [JSZip](https://stuk.github.io/jszip/) + [file-saver](https://github.com/eligrey/FileSaver.js/) — ZIP generation

---

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build    # production build
npm run preview  # preview production build
npm run lint     # ESLint
```

---

## License

MIT
