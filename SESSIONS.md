# SESSIONS.md — where things are right now

read this first. latest state of fomties.com and the last session in detail. `MEMORY.md` has history, `CLAUDE.md` the conventions.

last updated: 2026-10-26 14:20, session 1.

## state

- **not live yet.** repo scaffolded on ryan's mac at `~/fomties-website-main`. no git init, no github, no netlify yet. fomties.com still points at the old quartz site (netlify project `fomt`).
- stack: astro 5 static, plain css, one script, content in `src/data/site.json`.
- pages: `/` only. `/apply` and `/newsletter` redirect out (netlify.toml). `/conversations` is planned, not built.
- mock lives on a claude design canvas ("fomties landing mockup", v3 poster + phone artboards). the repo is that mock ported, plus motion.

## how we work

- ryan does not code. he builds from this chat, linked to his mac.
- claude writes files to `~/fomties-website-main` through the device shell; ryan keeps `npm run dev` running and watches localhost:4321.
- design changes: talk first, change the file, ryan looks at localhost. he does not want layouts "fixed" by stretching or stacking things.
- lowercase everywhere. no code comments. npm. no secrets.
- commits: ask first. only ryan pushes.

## session 1 in detail (26 oct)

### plan
- read the vault (`me.md`, `brand.md`, the 24 oct fomties/soffcopy research note, the 0940 brainstorm), the old quartz fomties repo, ryeones-website-main, joincore.com, thebecomingself.com, microflora.priyanshu.me, the notion casting form.
- research note's council said a landing page was lowest priority until three conversations exist. ryan went ahead; kept it to a poster, not a brand site.

### mock, three rounds on the canvas
- v1: sand ground + blue blob + sections. too close to ryeones.
- v2: microflora-style, cool white, serif, hero image card, how-it-works cards, conversations grid. ryan: "too saas".
- v3: joincore poster. stock photo → blue duotone + motion blur + grain, seamless fade to blue, serif headline, mono caps, two pill buttons, apply → conversation → uncut strip, footer. ryan: lighter blue (done), copy rewritten off the notion form (done).

### copy (final for v1)
- eyebrow: `● rec · one question, passed on`
- h1: everyone else looks like they have it figured out. they think the same about you.
- sub: honest conversations about what this decade actually looks like — from people still inside it. big things, small things, the stuff nobody says out loud.
- ctas: sit down with us (notion form) · the newsletter (substack)
- steps: 01 apply · your take on your twenties / 02 conversation · a simple chat. no script. / 03 uncut · the cut goes out. the question gets passed on.
- footer: socials · ryan@fomties.com (c copies) · conversation 00 of 06

### repo
- scaffolded from the ryeones skeleton, stripped: Base, Header, Hero, Steps, Footer, global.css, site.js, site.json, conversations.json (empty).
- emil kowalski's animation skills + elaya's landing-page skill copied into `.claude/skills/`.
- motion written to emil's rules (see CLAUDE.md).

### next
- ryan: `cd ~/fomties-website-main && npm install && npm run dev`, open localhost:4321, react.
- then: animation pass with `find-animation-opportunities` → `animate` → `review-animations`.
- then: own photo (barber chair / car / kickabout), rerun the image pass, swap.
- then: git init, github, netlify `fomt` repointed, old quartz folder moved aside.
