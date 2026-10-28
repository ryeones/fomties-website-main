# SESSIONS.md — where things are right now

read this first. latest state of fomties.com and the last session in detail. `MEMORY.md` has history, `CLAUDE.md` the conventions.

last updated: 2026-10-28 17:15 (vault session, no code changed). session 1 closed 2026-10-26 21:50.

## state

- **2026-10-28 · live.** published to github and netlify `fomt` on the night of 26 oct; www.fomties.com serves this repo. substack welcome post is out; the newsletter stays at `ryeones.substack.com` for now (ryan's call, ~50 subscribers there). the brand is now written down in the vault: `~/ryeones world/efforts/02 agency/fomties/brand/fomties brand.md` — rendered from this site's css, so it's the reference for any new asset. small copy inconsistency to fix some time: the homepage plan block says "a weekly newsletter", everywhere else says every two weeks.

- *(superseded 26 oct night)* **ready to publish, not live yet.** git repo on ryan's mac at `~/fomties-website-main`, 4 commits on `main`, nothing pushed. next: ryan publishes to github (`ryeones/fomties-website`) from github desktop, then repoints netlify project `fomt` (serves www.fomties.com, currently building the old quartz repo `ryeones/fomties.com`) to the new repo and triggers a deploy. the old quartz site stays in its repo.
- pages: `/` (intro cover → hero → three kinds → why → strip → how it works → plan → close → footer), `/letter`, `/stories`, `/strategies`, `/systems`, `/spaces`. redirects `/apply` `/newsletter` `/waitlist`.
- no buttons anywhere, only underlined mono links. headings wrap naturally, never balanced. alignment rule in CLAUDE.md.
- mobile pass done at 390 and 430: header wraps, links side by side, footer two rows, strip 2-col cards, no horizontal scroll. strip pause is desktop-only (ios sticky hover).
- og image at `public/assets/og.jpg` (hero line on the blue photo). countdown runs to 11 jan 2030 (born 2000-01-11).
- open: real reel links for the stories cards; letter year (used 2025, ryan said "2024 or something" — confirm).

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

### close of session 1 (21:50)
- buttons → links everywhere, one grammar. letter page has no cta, ends on the origin line.
- mobile pass. the real bug was the sub-page header meta overflowing and dragging the whole page sideways.
- strip hardened for safari (fixed duration, -webkit-mask, 3d transform, js fallback that drives it if the css animation doesn't move).
- og image, real birthday, git init + 4 commits. ryan publishes and repoints netlify himself.
- vault: three fomties notes — `atlas/notes/fomties.md` is the frozen origin, the efforts project note is the living hub, `fomties.com.md` (currently a placeholder in `x/archive/old site/creations`) should become the build log for the site. same pattern for soffcopy once something is live on a domain.
