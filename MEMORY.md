# MEMORY.md — history and decisions

## decisions

- 2026-10-26 · poster, not a site. one page, joincore-style. no nav, no sections, no cards, no modes. more pages only when conversations exist.
- 2026-10-26 · not ryeones.com's sibling visually. different ground (blue, not sand), different faces (instrument serif + jetbrains mono, not bricolage + geist). shared only in how it's built (astro, json content, one css, one js).
- 2026-10-26 · "tape" is out of the copy. "conversation" everywhere.
- 2026-10-26 · copy is not entrepreneur-flavoured. no "building", no "what broke". it's about what people are figuring out — the notion form's framing.
- 2026-10-26 · blue is the lighter electric blue from the first reference (`#0a84ff` core), not navy.
- 2026-10-26 pm · lighter again: ryan re-sent the gradient. ground `#1472ea`, photo grade to `#0195ff`/`#66befe`/white. anything darker reads 'bold'.
- 2026-10-26 · one light theme only. no dark mode.

## the image pass

the hero photo is produced by this python (pillow + numpy), run on any source photo. keep the values; swap the input.

```
motion blur: 30 shifted copies along a vertical path with 0.3 diagonal, averaged; 82% blur + 18% sharp
gaussian blur 1.0, grayscale, contrast 1.1
duotone (v2, 26 oct pm, lighter): black (16,110,235) → mid (80,180,255) at midpoint 128 → white (236,246,255); vignette floor 120 over (20,114,234)
strip frames: same but L=10, mix .5, blur .6, contrast 1.15, noise 16, floor 130
grain: gaussian noise sigma 20
vignette: ellipse 1.2×, blur 0.22×width, composited over (10,80,215), floor 110/255
export: 1080×1440 tall · 1600×1111 wide crop (y 260–1010 of the tall)
```

## references

- joincore.com — the structure. one tinted photo, one line, one button.
- microflora.priyanshu.me — rejected (too saas) but the serif headline survived.
- thebecomingself.com — rejected. only the "explain in stages" rhythm survived as apply → conversation → uncut.
- vault: `aios/sessions/2026-10-24 fomties and soffcopy deep research.md`, `+/2026-10-24 0940 fomties and soffcopy brainstorm.md`
- notion form: fomties.notion.site/405e41e19f358092a0a9e49f9ab6eefd — source of the copy's framing and the "pass a question to the next person" mechanic.

## sessions

- 2026-10-28 · vault-side only: brand doc, issue template, channels doc, project memory rewritten in `~/ryeones world/efforts/02 agency/fomties/`. decision: substack stays `ryeones.substack.com` for now; if it ever moves to `fomties.substack.com` the links are `site.json → cta2.href`, `pages.json → strategies.cta.href`, `netlify.toml → /newsletter`.

- session 1 · 2026-10-26 · plan, three mock rounds, scaffold. see SESSIONS.md.

## standing rules ryan has repeated
- left-aligned text wraps naturally. no `text-wrap:balance`, no manual breaks. he has said this several times — it is in CLAUDE.md now, don't let it come back
- hover-only behaviour (strip pause, card dim, cursor) must be gated behind `.fine` or `(hover:hover)`. ios makes `:hover` stick after a tap, which is why the strip "sometimes" stopped scrolling on his phone
