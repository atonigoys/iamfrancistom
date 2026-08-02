# Portfolio UI/UX Redesign — Implementation Plan

**Site:** iamfrancistom.vercel.app · **Stack:** Vite + React 18 + TS + Tailwind + shadcn/ui + framer-motion
**Status:** Plan for review. Nothing pushed. Local dev only.

---

## 1. Diagnosis

### What's already strong (keep and amplify)
Your project data is genuinely excellent and it is **buried**. Across 16 case studies you have hard, specific numbers — `$3,000/mo saved`, `40 hrs/mo saved`, `95% less manual research`, `8–12 min/contact` — plus real tech stacks and real workflow screenshots. Most automation freelancers have none of this. It is currently sitting below three scroll-screens of decoration.

### Problems, in order of what they cost you

**P1 — The design reads as "built with a template," which contradicts what you're selling.**
Neon `#00FF8A` on `#0D0D0D` with a particle-network canvas is the single most common AI-freelancer template look. It's also literally traceable: `package.json` name is `vite_react_shadcn_ts`, `lovable-tagger` is in devDependencies, `index.html` still has the comment `<!-- TODO: Set the document title to the name of your application -->`, and `twitter:site` is `@Lovable`. A buyer evaluating you as a technical operator is pattern-matching for craft. This actively works against you.

**P2 — The hero spends your most valuable real estate on decoration.**
`AI-Powered / Automation / for Smarter Workflows` set at `10rem` says nothing a prospect can act on. There's zero proof above the fold. The subhead ("I design intelligent workflows that connect apps…") is the same sentence every competitor uses.

**P3 — Everything moves at once, so nothing has emphasis.**
Running simultaneously: an 80-node canvas with O(n²) link-distance checks + mouse tracking, a 30s marquee, four scanning/pulsing `NeonDivider`s, and a CTA that pulses, floats, *and* shines on infinite loop. Perpetual motion on a CTA reads as pressure, not confidence. Nothing respects `prefers-reduced-motion`.

**P4 — The portfolio actively hides your best asset.**
16 projects behind pagination at 4/page under "All", 2/page under a filter — so a visitor sees 4 and must click. Worse, the interaction is inverted: "All" shows *compact* cards while a filter shows *detailed* ones. And [`Portfolio.tsx:469-476`](src/components/Portfolio.tsx#L469-L476) preloads **all 16 full-size images on mount** (4.6 MB — `curbside-cafe-website.png` alone is 1.03 MB) with every `<img>` set to `loading="eager"` and `decoding="sync"`. That's your LCP and your mobile data budget, spent on images nobody has scrolled to.

**P5 — There is no credibility layer at all.**
No photo. No bio. No process. No pricing or engagement model. `Testimonials.tsx`, `Certificates.tsx`, and `Experience.tsx` all exist and are **never imported** into [`Index.tsx`](src/pages/Index.tsx) — you built them and they've never shipped. Page is: Hero → Services → Portfolio → Calendly. A stranger is asked to book a call having learned nothing about who you are.

**P6 — Conversion path is a raw 700px iframe.**
[`Contact.tsx:42-49`](src/components/Contact.tsx#L42-L49) embeds Calendly directly — third-party JS on every page load, visually foreign to the rest of the site, no fallback for anyone who won't book a call today. The social icons next to it link to `href="#"` — four dead links.

**P7 — Meta / SEO is broken.**
The OG image is an expired signed GCS URL (`Expires=1773002141` — lapsed). Every link share renders blank. `author` is `FRANCIS.TECH`, `twitter:site` is `@Lovable`. No canonical, no JSON-LD, no sitemap.

**P8 — Accessibility gaps.** No visible focus states anywhere. Filter buttons carry no `aria-pressed`. Lightbox is a bare `createPortal` div — no focus trap, no Escape handler, no `role="dialog"`. Tool logos use `brightness-0 invert opacity-70`, flattening every brand to identical grey.

---

## 2. Design direction

> **"Systems Operator."** Evidence-led, instrument-panel restraint. The numbers do the selling; the interface gets out of their way.

The positioning insight: you are not selling *"AI automation"* as a vibe — that market is saturated with neon. You are selling **measured operational outcomes**. So the design should look like instrumentation, not like sci-fi. Closer to Linear / Vercel / Stripe's confidence than to a cyberpunk landing page.

Three principles:

1. **Proof before poetry.** Every section opens with something verifiable — a number, a stack, a screenshot — before it makes a claim.
2. **One motion language.** Motion earns its place by clarifying hierarchy on entry. Nothing loops forever. Everything honours `prefers-reduced-motion`.
3. **Green as signal, not atmosphere.** The accent marks the important thing on screen. It stops being ambient glow on every border, shadow, and divider — which is what currently makes it read as cheap.

### Visual system changes

| | Now | Proposed |
|---|---|---|
| **Surfaces** | Flat `#0D0D0D` + `#141414` | Layered warm-neutral ramp (5 steps) so cards read as depth, not as black rectangles on black |
| **Accent** | `151 100% 50%` used for glow, borders, shadows, dividers, text | Same hue family, chroma reduced for large areas; full-neon reserved for small marks. **Single CSS var — one line to change if you dislike it** |
| **Type** | Montserrat + Poppins | Display grotesk (headings) + **mono for all metrics**. Setting `$2,000/mo · 35 hrs/mo` in mono is the highest-leverage move in this doc — it makes your numbers read as instrumentation |
| **Motion** | 5 infinite loops | Entry-only, one easing curve, reduced-motion honoured |
| **Hero bg** | 80-node animated canvas | Static structural field + *optional* low-cost gradient drift; canvas retired |

---

## 3. Implementation phases

Sequential. Each phase leaves the site working, so you can review at any point.

### Phase 0 — Design foundations
- Rewrite the `:root` token block in [`src/index.css`](src/index.css) — layered surface ramp, tuned accent, new radii/shadow scale.
- Add `--font-display` / `--font-mono`; wire into [`tailwind.config.ts`](tailwind.config.ts); update the font `<link>` in [`index.html`](index.html).
- Add a global `:focus-visible` ring and a `@media (prefers-reduced-motion: reduce)` block.
- Delete dead CSS: `cta-pulse-glow`, `cta-float`, `cta-shine`, `hover-blink`.

### Phase 1 — Hero
- Replace the decorative three-line headline with an outcome-led one naming who it's for and what changes.
- **Add a live proof bar directly under the CTA**, computed from the `projects` array (not hardcoded): projects shipped, total $/mo saved, total hrs/mo saved, distinct tools integrated. Derived at build time — the numbers are already in your data.
- Retire `NeuralNetworkBackground` (keep the file; unmount it) for a static structural background. Kills the biggest paint cost on the page.
- Rebuild the tool marquee: smaller, brand colours restored on hover, pauses on hover, `prefers-reduced-motion` aware.

### Phase 2 — Portfolio rebuild *(highest-impact phase)*
- **Remove pagination.** All 16 visible in a scannable masonry-ish grid; filter chips become `aria-pressed` toggles with counts (`n8n · 9`).
- One consistent card: screenshot, title, stack chips, and the savings pair in mono. No more compact/detailed inversion.
- Full case study moves into a proper accessible dialog — focus trap, Escape, `role="dialog"`, restore focus on close. Reuse the existing shadcn `dialog.tsx` rather than the hand-rolled portal.
- **Fix the loading:** drop the mount-time preload loop, `loading="lazy"` + `decoding="async"` below the fold, explicit `width`/`height` to stop layout shift, and downscale the two 800KB–1MB PNGs. Expect a large LCP improvement.

### Phase 3 — Credibility layer *(the biggest gap)*
- **About** — photo, short first-person bio, where you're based, how you work.
- **Process** — 4 steps (Audit → Design → Build → Handover), with what you need from them and what they get. This is what converts hesitant buyers.
- **Certificates** — wire up the existing component; n8n / Make / Zapier / Prompt Eng. badges are real credentials, currently invisible.
- **Testimonials** — see the flag in §5 before this ships.
- Fold `Experience.tsx` into About rather than shipping a 2-item timeline as its own section.

### Phase 4 — Contact
- Calendly becomes **click-to-load** (facade button → iframe on demand). Removes third-party JS from initial load.
- Add a real message form beside it for people not ready to book — the current page offers one single action.
- Fix or remove the four dead `href="#"` social links.

### Phase 5 — Meta, SEO, performance, a11y
- Rewrite `index.html`: real OG image committed to `public/`, correct `author`, drop `@Lovable`, add canonical + `Person`/`ProfessionalService` JSON-LD.
- Remove `lovable-tagger`, rename the package, delete the leftover `TODO` comment.
- Add `sitemap.xml`; fix `robots.txt`.
- Pass: keyboard nav end-to-end, contrast check on muted text, `alt` text on all 16 screenshots.

---

## 4. Files touched

**Rewritten:** `src/index.css` · `src/components/Hero.tsx` · `src/components/Portfolio.tsx` · `src/components/Contact.tsx` · `src/pages/Index.tsx` · `index.html`
**Edited:** `tailwind.config.ts` · `src/components/Navbar.tsx` · `src/components/Services.tsx` · `src/components/Footer.tsx` · `package.json`
**New:** `src/components/About.tsx` · `src/components/Process.tsx` · `src/components/ProofBar.tsx` · `src/data/projects.ts` (data extracted out of the component)
**Wired up (exist, unused):** `Certificates.tsx` · `Testimonials.tsx` · `Experience.tsx`
**Unmounted (kept on disk):** `NeuralNetworkBackground.tsx`

New page order: `Nav → Hero+Proof → Services → Portfolio → Process → About+Certs → [Testimonials] → Contact → Footer`

---

## 5. Two things I need from you

**A. The testimonials are placeholders.** [`Testimonials.tsx:5-21`](src/components/Testimonials.tsx#L5-L21) contains "Sarah Johnson, Operations Manager", "Mark Chen, CTO, TechStartup", "Lisa Alvarez, Head of Support" — generic invented names with invented quotes. I won't ship fabricated testimonials as genuine client feedback; if a prospect ever checks, it costs you far more than the section gains. Options: send me real ones (name + role + company, with permission), or I replace the section with something equally persuasive and true — e.g. an outcomes strip drawn from your actual case-study results. **Default if you don't reply: I build the outcomes strip and leave the fake testimonials unmounted.**

**B. Assets that would materially improve this** — a photo of you for About, and your real LinkedIn / GitHub / X URLs for those four dead links. If you don't have them ready I'll build with a tasteful placeholder and a `TODO`, and it's a one-line swap later.

Everything else I'm deciding per your "choose the best design" — noted throughout.

---

## 6. Review workflow

Local only, on a branch. `bun dev` → I hand you `http://localhost:8080`. Nothing pushed to `main`, nothing deployed to Vercel, until you say so.
