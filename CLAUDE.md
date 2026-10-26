# fomties.com — site repo

the landing page for fomties™ (figuring out my twenties), ryan tham's project documenting the twenties from the middle. **read `SESSIONS.md` first** for the current state, then `MEMORY.md` for history. the vault lives in `~/ryeones world`, the personal site in `~/ryeones-website-main`. the old quartz fomties site is in `~/fomties.com` and is retired.

## what this is

a poster landing page plus five sub pages (stories, strategies, systems, spaces, letter) that share `src/layouts/Page.astro`: count line · title · serif lede · content · footer, like ryeones.com/work. the header shows the nav only on sub pages; the landing stays nav-less. designed in a cowork session on 2026-10-26 against a canvas mock (v3, joincore-style). more pages (`/conversations`, `/conversations/[slug]`) come later when there are conversations to show.

## stack

- astro 5, static output, `npm` (no pnpm on this mac)
- styling: `src/styles/global.css`, tokens on `:root`. single dark-on-blue theme, no modes
- one client script: `src/scripts/site.js` (clock, scroll reveals, glow parallax, copy email)
- fonts: instrument serif (display), jetbrains mono (everything else) via google fonts. two faces, never a third
- type tiers, use the classes, don't invent sizes: `h1` hero · `.block h2` section title · `.t3` row/step/kind title (serif 22–30) · `.letter p` letter body (serif 20–26) · `.mono` labels (11px, uppercase, .12em) · `.body` running text (mono 12.5px, lowercase) · `.golink` (mono 11px uppercase, underlined). uppercase = labels, links, captions. lowercase = everything that reads as a sentence
- no code comments. lowercase everywhere in copy
- headings wrap naturally, left to right, left-aligned. **never `text-wrap:balance`** on anything left-aligned — ryan has asked for this repeatedly; balance makes a two-line title break early and looks like a mistake. the only centred text is the hero and the close
- deploys on netlify (project `fomt`), builds on push. `/apply` and `/newsletter` are redirects in `netlify.toml`

## content lives in `src/data/`

| file | drives |
|---|---|
| `site.json` | headline, sub, eyebrow, ctas, the three steps, socials, email, the `conversation 00 of 06` counter |
| `pages.json` | the sub pages: nav, `/stories` (cards: still, name/role/place, the question, reel link), `/strategies` (newsletter), `/systems` (empty state + what's being built), `/spaces` (waitlist). `/letter` reads `site.json → letter` |

changing copy = editing json. layout never changes.

## the look

- blue is the subject, not a tint. `--blue #1472ea` ground (lightest blue that keeps 11px white text at 4.5:1), `--blue2 #0195ff`, `--ice #eaf2ff` for text and the primary button. the reference is ryan's gradient: `#0195ff` centre → `#66befe` → `#d0ebff` → white
- the photo is the whole page: `public/assets/hero-wide.jpg` (desktop) / `hero-tall.jpg` (phone). both are the same stock shot run through the python pass in `MEMORY.md` — motion blur, blue duotone, grain, vignette. swap the source photo, rerun the pass, nothing else changes
- svg grain over everything at .35 soft-light. static, not animated
- the strip photos are NOT blue. natural colour, desaturated 25%, lifted blacks, grain, vignette (`strip/`), with a b/w set in `strip-bw/`; `site.json → strip.grade` picks `film` or `bw`. blue duotone on real faces reads as a filter — only the hero gets it
- veil fades the photo into solid blue at the bottom so the page is seamless
- not ryeones.com: no sand, no geist, no cards, no modes

## alignment

centred = the two poster moments only (hero, close). left = words, everything you read or tap. right edge = readouts, the clock top-right and the coordinates bottom-right. nothing else is ever centred or right-aligned.

## buttons vs links

there are no buttons. every action on the site — the sit-down ask and the newsletter in the hero and close, every sub-page action — is the underlined mono link (`.golink`, text + `→`). the primary ask gets `.golink.main` (solid underline) next to the faint one; that is the whole hierarchy. a pill would be the only non-typographic element on a page that is otherwise just type on a photo — don't add one.

## motion (emil kowalski's rules, see `skills/animate`)

- `transform` and `opacity` only. ease-out `cubic-bezier(.23,1,.32,1)` for entrances, `cubic-bezier(.77,0,.175,1)` for on-screen movement. never `ease-in`, never browser defaults
- hero entrance: css animation (off main thread), 800ms, 90ms stagger via `--i`
- photo: 1.6s fade+settle on load, then a 30s breathe. the only thing that loops
- steps + footer: intersection observer reveal, once, 700ms, 80ms stagger
- glow follows the pointer, lerped, raf-throttled, desktop only
- links: underline colour 200ms on hover, nothing on press
- `prefers-reduced-motion`: `.rm` on `<html>`, everything becomes a plain fade

## skills in `skills/`

(the desktop bridge cannot write into `.claude/`. copy `skills/*` to `.claude/skills/` by hand if claude code should auto-load them; until then claude reads them from `skills/`.)

- `animate`, `animation-vocabulary`, `find-animation-opportunities`, `review-animations` — emil kowalski (github.com/emilkowalski/skills). load `animate` before adding motion, `review-animations` before shipping it
- `landing-page-design` — elaya design (github.com/elayadesign/ai-design-skills). part A (structure, copy) is useful; part B's visual system is a saas default — the look here deliberately breaks it (serif, italics allowed, one colour)

## commands

`npm install` · `npm run dev` (localhost:4321, also on the lan via `--host`) · `npm run build`. ryan runs `npm run dev` in a terminal tab and watches localhost; claude edits files from the device shell and the page hot-reloads. only ryan can push (github desktop). the shell cannot delete files — move leftovers into a `_to_delete_*` folder.
