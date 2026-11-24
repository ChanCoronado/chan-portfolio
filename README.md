# Portfolio

My personal portfolio. I'm Christian "Chan" Coronado, a BS Information Technology graduate from PUP Sto. Tomas, looking for Junior Software Engineer and Full-Stack Web Developer roles.

It is built with Next.js, React and TypeScript.

<p>
  <img src="docs/screenshots/desktop.webp" alt="The home page on a desktop screen" width="640">
</p>

## What is in it

- Home page with my projects, experience, skills, about, and contact.
- A page for each featured project, and a `/projects` page that lists all of them.
- A wall of my certificates.
- A layout that works on phones, tablets and desktops.
- A small assistant called Ask Chan. It is switched off by default.

## Built with

- Next.js 16 (App Router) and React 19
- TypeScript
- CSS Modules
- `next/image` and `next/font`
- `@anthropic-ai/sdk`, only for the optional assistant

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint
```

## Changing the content

The text lives in `src/data/`:

- `projects.ts` for the projects
- `experience.ts` for work experience
- `about.ts` for education, highlights and certificates
- `skills.ts` for skills

## Ask Chan

Ask Chan answers questions about this portfolio using the Claude API. It stays off unless you turn it on. Copy `.env.example` to `.env.local` and fill it in:

```bash
ASK_CHAN_ENABLED=true
ANTHROPIC_API_KEY=your-key
```

The API key is only used on the server. Each question costs a small amount, so set a spending limit in the Anthropic Console.

## Folders

```
src/app          pages and routes
src/components   the pieces of the pages
src/data         the content
src/lib          helpers
public           images, the CV, and my first portfolio's small projects
docs             images used in this README
```

## Notes

I used AI tools (Claude Code) while building this. I made the decisions and checked the result myself.

The photos, certificates, CV and text are mine, so please don't reuse them.
