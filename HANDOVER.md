# Website Handover — Garden Gate Garden Club

**Site:** https://gardengategardenclub.com
**Prepared:** August 2026
**Audience:** GGGC board members, and whoever maintains the website next

This document has two parts. **Part 1 is a one-page summary** — if you read nothing else, read that. **Part 2 is the detail** behind each item, including the technical specifics.

---

# Part 1 — The One-Pager

## What you have

A website for the Garden Gate Garden Club at **gardengategardenclub.com**. Fifteen pages covering the club's history, board, community service projects, a Member of the Month feature, membership, gardening resources, and a working contact form — plus an admin screen where the club edits all of it without touching code. It is a "static" site, which means it is fast, cheap (currently free to host), and has no database to maintain.

## Status

| Item | Status |
|---|---|
| Website at gardengategardenclub.com | ✅ Live |
| Contact form → club inbox | ✅ Live and tested |
| Google Search Console | ✅ Verified, sitemap submitted |
| Automatic publishing when content changes | ✅ Working |
| Editing admin (app.pagescms.org) | ✅ Live — every section opens, saves publish in about a minute (tested September 2026) |
| Visitor analytics | ✅ Vercel Web Analytics |
| Social media links | ✅ Facebook and Instagram |
| **Board roster** | ⚠️ **Not filled in** — the Board section is hidden on the About page until names are entered |
| Meeting venue, guest policy | ⚠️ Not on the site yet — needs the board's answers (§9.5) |

## ▸ The first job: the board roster

**The About page has no Board of Officers section right now.** The four roles exist but their names are "TBD", and the site hides the section rather than publish placeholders. As soon as one real name is entered, the section appears.

Filling it in is a five-minute job in the admin — **Board of Officers**, open each role, type the name, Save. See `CONTENT_GUIDE.md` §4.

## The six accounts that keep the site alive

| # | Service | What it does | Who controls it |
|---|---|---|---|
| 1 | **Vercel** | Hosts the site **and** holds the domain registration | **Owen Howe** (`howeitis`) |
| 2 | **Domain** `gardengategardenclub.com` | The web address; renews annually | **Owen Howe** — registered through his Vercel account |
| 3 | **GitHub** `howeitis/garden-club` | Stores all the website's files and content | **Owen Howe** (`howeitis`), owner — the club account `gardengategardenclub` is a collaborator with write access |
| 4 | **Pages CMS** (app.pagescms.org) | The editing screens the club uses day to day | Free service; its GitHub App is installed on the repository by Owen. The club signs in with its GitHub account and can invite other editors by email |
| 5 | **Gmail** `gardengate.communications@gmail.com` | Receives every contact-form message | The club |
| 6 | **Web3Forms** | Delivers form messages to that inbox | No account — a key stored in Vercel |

## Three things to know

1. **Owen Howe manages the hosting and the domain.** The club can publish content changes on its own (see below), but anything touching settings, the domain, or the contact-form key goes through Owen. He is the point of contact for those.

2. **The GitHub repository must stay public.** It is public today, and that is what lets the club publish changes directly. Switching it to private will silently stop the club's updates from going live, with a confusing error. This one is worth writing down because the cause is not obvious later.

3. **Contact-form messages live only in the club inbox.** They are not stored on the website or anywhere else, so treat that inbox as the record.

## What to do next

| Action | Who |
|---|---|
| **Enter the four officers' names** in the admin (Board of Officers) | Communications chair |
| **Decide and supply**: where meetings are held (or "shared on RSVP"), whether guests may visit a meeting, the next NGC convention date | Board → communications chair |
| **Invite this year's editors** to the admin by email (§3.1) | Whoever holds the club GitHub login |
| Note "keep the GitHub repo public" in board records | Board |
| Note the domain renewal date (August 2027) on the club calendar | Board |

## Day-to-day: who does what

- **Updating text and photos** (officers, projects, Member of the Month, meeting dates, plants…): sign in to the admin at **app.pagescms.org**, fill in the form, save. **No software to install, no coding required.** Full walkthrough in `CONTENT_GUIDE.md`.
- **Anything the admin doesn't cover** (layout, navigation, a new page): ask an AI assistant like [Claude Code](https://claude.com/claude-code) to make the change in plain English — see §3.2.
- **Contact-form messages**: check `gardengate.communications@gmail.com`. Reply normally — replies go straight to the sender.
- **Design changes, new pages, or settings**: also well within reach of an AI assistant. Hosting settings and rollbacks go through Owen Howe.

---
---

# Part 2 — The Detail

## 1. What the website is built with

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static site generation) |
| Styling | Tailwind CSS 3 |
| Language | TypeScript |
| Content | One small Markdown or YAML file per item under `src/content/`, validated at build time |
| Editing | Pages CMS — a free admin that edits those files through forms |
| Hosting | Vercel |
| Contact form | Web3Forms |
| Fonts | Cormorant Garamond and Inter, served from the site itself (no third-party font request) |

**"Static site"** means every page is pre-built into plain HTML files. There is no database and no server-side code; the admin is a separate service that edits the source files, not part of the site. This makes the site fast, secure, and free to host — but it also means **any content change requires the site to be rebuilt and republished**. That happens automatically (see §4).

Further technical reference lives in `README.md` (setup, deployment, environment variables) and `CLAUDE.md` (architecture and design system).

---

## 2. Accounts and access — the full inventory

Knowing who controls what is the practical value of this section — it tells you who to contact when something needs changing.

### 2.1 Vercel — hosting *and* domain registration

- **Account holder:** **Owen Howe** (`howeitis`).
- **Plan:** Hobby (free tier).
- **What it holds:** the live website, the domain registration, the environment variables, deployment history, and rollback ability.

One structural note: **Hobby accounts are single-user**, so the club cannot be added as a team member without upgrading to a paid plan. This is why the club publishes through GitHub rather than through Vercel directly (see §4). The club does also have its own Vercel account under the club Gmail, which keeps a future transfer straightforward if the board ever wants one. See §9.1.

### 2.2 Domain — `gardengategardenclub.com`

- **Registered by Owen Howe**, through his Vercel account, on **2 August 2026**.
- **Renews:** **August 2027**, then annually. **Auto-renew is on.**
- **Cost:** **$12/year**, billed to the payment method on Owen's Vercel account.
- Nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`.
- Because the domain was purchased through Vercel rather than a separate registrar, moving it to another account would be a domain transfer rather than a simple repointing.

**DNS records currently in place:**

| Type | Purpose | Do not delete |
|---|---|---|
| A records | Point the domain at the website | Required for the site to load |
| TXT | Google Search Console verification | Required — deleting it unverifies the property |

### 2.3 GitHub — `howeitis/garden-club`

- **Owner: Owen Howe** (`howeitis`), admin.
- **Collaborator:** the club account `gardengategardenclub`, with **write access**.
- **Visibility: public.** This matters — see §9.3.

The club's account can edit files and publish changes. It cannot delete the repository, change its settings, or transfer ownership — those require admin, which is Owen.

There is no confidential information in this repository. The contact-form key is stored in Vercel, not in the code, and local environment files are excluded from version control.

### 2.4 Gmail — `gardengate.communications@gmail.com`

Used for three things:

1. Receiving every contact-form submission.
2. The club's GitHub account login.
3. The club's own Vercel account login.

**Messages are not stored anywhere else.** There is no copy on the website, no database, and no backup. This inbox is the only record.

Because it is the login for the club's GitHub and Vercel accounts as well as the form inbox, whoever holds it effectively holds the club's website access. On a board with annually rotating officers, that makes it worth recording who has it and how it passes on.

**Custody record — for the club to complete and keep with its records:**

| | |
|---|---|
| Password held by | |
| Also known to | |
| Two-factor authentication enabled? | |
| Where 2FA backup codes are filed | |
| Recovery email on the account | |
| Recovery phone on the account | |
| Handover procedure at officer rotation | |

*Left blank deliberately — the club has chosen to complete this after handover.*

### 2.5 Web3Forms — contact-form delivery

- **No account or password.** Web3Forms issues an "access key" tied to an email address; messages are relayed to that address.
- The key is stored in Vercel as the environment variable `PUBLIC_WEB3FORMS_KEY`.
- **Free tier: 250 submissions per month**, far more than this site should ever need.

### 2.6 Google Search Console

- Verified as a **Domain property** using the DNS TXT record described in §2.2.
- The sitemap (`sitemap-index.xml`) has been submitted.
- **Leave the TXT record in place permanently.** Google re-checks it, and removing it silently unverifies the property and stops the reports.

---

## 3. Updating content (no coding required)

**The club publishes changes on its own, through an admin screen.** Nothing needs to be installed.

### 3.1 The admin: Pages CMS

The admin lives at **https://app.pagescms.org**. It is a free, open-source service that presents the site's content as forms — pick *Community Service Projects*, click a project, change a field, **Save** — and writes the result straight into the club's GitHub repository, which publishes it. Live in about a minute.

Two kinds of login:

- **The club's GitHub account** (`gardengategardenclub`) signs in with *Sign in with GitHub* and opens the `garden-club` repository. This account can do everything, including inviting other editors.
- **Anyone else is invited by email** from inside the admin (Settings → Collaborators). They sign in with their email, see only this site, and can edit content and photos but not the admin's configuration. **This is how a rotating board should work:** one custodian holds the GitHub login; each year's editors are added and removed by email invite.

`CONTENT_GUIDE.md` is the step-by-step manual written for the club — which screen does what, the common jobs, photos, and what to do when a save is refused.

**What makes it safe.** Every save is checked before it goes live. A missing field, a mistyped dropdown value, or a photo the site can't use stops the publish, keeps the previous version of the site up, and reports the problem by name (*"plants → japanese-barberry: type must be native or invasive"*). Nothing the club can do in the admin can take the site down.

**How it's wired up.** A GitHub App for Pages CMS is installed on the repository (by Owen, from his GitHub account — it appears under *Settings → GitHub Apps* on the repository). The file `.pages.yml` in the repository tells the admin what is editable and what each field means; `src/content.config.ts` is the website's own definition of the same fields, and the two are kept in step.

**If Pages CMS ever goes away.** Every piece of content is a small text file in the repository under `src/content/`, not in the admin. The admin is only a way of editing those files. If the service disappeared tomorrow, nothing would be lost: the club can edit the files directly on GitHub (Appendix of `CONTENT_GUIDE.md`), use a different git-based CMS pointed at the same folders, or ask an AI assistant.

### 3.2 For everything else: an AI assistant

The admin covers content. For layout, colours, the navigation menu, a new page, or anything else that lives in code, **tools like [Claude Code](https://claude.com/claude-code)** make changes from a plain-English description and publish them. The repository is documented for exactly this: `CLAUDE.md` describes the architecture, conventions, and design system so an assistant follows them rather than inventing its own.

### 3.3 Where the content lives

```
src/content/
  members-of-the-month/   one Markdown file per honoree
  projects/               one per project
  officers/  member-gardens/  awards/  judges/  plants/  gardens/  gardening-tips/
  settings/               club.yml · contact.yml · meetings.yml · affiliations.yml
  pages/                  the editable paragraphs of each page
src/assets/content/       photos (plain JPG/PNG is fine; the site resizes them)
```

---

## 4. How changes get published

```
Save in the admin (or edit a file on GitHub)  →  a commit lands on `main`  →  checks run  →  Vercel rebuilds  →  Live in ~1 minute
```

There is no separate "publish" button. Anything that lands on the `main` branch is published — the admin's **Save** is exactly that.

Two automated checks run on every change:

- **GitHub Actions** runs a type-check and a full build. Visible in the repository's "Actions" tab.
- **Vercel** rebuilds and deploys. If the build fails, **the previous version stays live** — a broken change cannot replace a working site.

**Why the club can publish even though hosting is on Owen's account:** Vercel normally requires the person making a change to have access to the hosting account. That restriction applies only to *private* repositories. Because this repository is public, any collaborator can publish. This is exactly why §9.3 matters.

### The club can publish, but cannot roll back

These are two different things, and the distinction matters:

- **A broken build cannot replace a working site.** If a file is malformed, publishing stops and the previous version stays live. This is automatic protection against typos.
- **A *successful* publish of something you regret is a different matter.** If the club publishes wording it wants to retract, the site updates normally — nothing is broken, so nothing stops it.

There is no branch protection on `main`; the club account commits directly, which is the intended design. But **rolling back to a previous deployment lives in the Vercel dashboard, which only Owen can reach.**

**The club's self-serve fix is to edit again and commit the correction** — another minute. For content edits that is almost always sufficient. Reach for Owen only if the site needs to be reverted wholesale.

---

## 5. The contact form

**Where messages go:** `gardengate.communications@gmail.com`.

**How it works:** the form posts to Web3Forms, which emails the submission to the club inbox. Replying to that notification goes directly back to the person who wrote in.

**Built-in protections:**
- A hidden "honeypot" field that catches automated spam bots.
- If the Web3Forms key is ever missing, the page shows the club's email address instead of a form. This is deliberate — a broken form would look like it works while silently discarding every message.

**Two things that commonly confuse people:**

1. **Changing the club email in the admin (Club Settings → Contact details) does not change where messages are delivered.** That setting only controls the address *displayed* on the Contact page. Delivery is set by the Web3Forms key in Vercel. If the club changes its email address, **both** must be updated.

2. **Check the spam folder early on** and mark notifications as "not spam" so Gmail learns to trust them.

**To change the delivery address or rotate the key:** request a new key at web3forms.com using the new inbox, update `PUBLIC_WEB3FORMS_KEY` in Vercel, then redeploy. Because the site is statically built, an environment-variable change only takes effect on the next deployment.

---

## 6. Domain and web addresses

- **Primary address:** `https://gardengategardenclub.com`
- `www.gardengategardenclub.com` redirects to it automatically.
- The old Vercel address `garden-club-eight.vercel.app` redirects to it as well. Both of these are 307 (temporary) redirects managed by Vercel itself, not settings in the code — a note in `CLAUDE.md` explains why they should not be "fixed" in `vercel.json`. Harmless: every page carries a canonical URL pointing at the primary address.

**If the domain ever changes**, two files must be updated together:
1. `astro.config.mjs` — the `site` value
2. `public/robots.txt` — the `Sitemap:` line

They feed the sitemap, the canonical URLs, and the link previews shown when the site is shared on Facebook or in a text message.

---

## 7. Search engine setup

- **Sitemap:** automatically generated at `/sitemap-index.xml`, listing 11 pages.
- **`/thank-you`** is deliberately excluded and marked "noindex" — it exists only as the page shown after submitting the contact form.
- **Structured data:** every page includes machine-readable organization details (name, founding date, address, email) so search engines can display the club correctly.
- **Link previews:** sharing any page on social media or in messages shows a purpose-built preview image.

Search Console will take days to weeks to fully index the site. That is normal.

---

## 8. Running costs

| Item | Cost |
|---|---|
| Vercel hosting (Hobby tier) | Free |
| Domain renewal | **$12/year**, auto-renewing each August — billed to Owen Howe's Vercel account |
| Web3Forms | Free (250 submissions/month) |
| Google Search Console | Free |
| GitHub (public repository) | Free |

The domain renewal is the only recurring cost, and it renews automatically. The board may want **August 2027** noted on the club calendar for awareness.

---

## 9. Ownership, access, and things to watch

### 9.1 How ownership is arranged today

Hosting, the domain registration, environment variables, and rollback ability all sit in **Owen Howe's** Vercel account, and the Pages CMS GitHub App is installed from his GitHub account. The club publishes content changes independently through the admin (which writes to GitHub), but changes to hosting settings, the domain, or the contact-form key go through Owen.

This works, and there is nothing that needs fixing. It is documented here so the board knows who to contact, and so the options are on record if the club ever wants the site fully under its own accounts.

**If the board ever chooses to consolidate:**

| Option | Cost | Trade-off |
|---|---|---|
| Move project + domain to the club's own Vercel account | Free | Requires a domain transfer between accounts — confirm the process with Vercel support first |
| Upgrade to Vercel Pro and add the club as a team member | ~$20/user/month | Ongoing cost for a nonprofit |
| Leave as arranged | Free | Settings changes continue to route through Owen |

The club already has a Vercel account under its Gmail, so the first option is available whenever it is wanted. There is no deadline on this decision.

### 9.2 Domain renewal

**$12/year, auto-renewing, next due August 2027**, through Owen's Vercel account. Auto-renew means no action is needed; the date is worth noting on the club calendar for awareness.

### 9.3 Keep the GitHub repository public — easily overlooked

Making it private will cause the club's changes to stop publishing, with the error *"Git author must have access to the project on Vercel to create deployments."* The cause will not be obvious months later. Record this decision somewhere the board will find it.

### 9.4 Search Console TXT record — do not delete

Removing the DNS TXT record unverifies the Search Console property.

### 9.5 Open content items — these need the board, not a developer

- **Officers' names** ([#11](https://github.com/howeitis/garden-club/issues/11)) — enter in the admin.
- **Where meetings are held.** The Membership page gives the day, months, and timetable but no venue — the one fact a prospective visitor most needs. If the location varies or is private, "shared when you RSVP" is fine.
- **Guests.** Guests may attend meetings, which rotate among members' homes. The 30-member figure is a soft cap with no waiting list, so the site no longer shows it (the `maxActive` field was removed). A "Visit as a guest" invitation (the order of business already includes *Introduction of Guests*) is a lower hurdle than "Become a Member"; changing the wording is a two-minute admin edit.
- **The next NGC convention date** (Club Settings → Affiliations; currently May 2026, past).
- **A line about the next meeting or program** on the home page, if someone will keep it current — the most-shared thing a club site can carry.

Also open as GitHub issues: events calendar ([#12](https://github.com/howeitis/garden-club/issues/12)), newsletter signup ([#13](https://github.com/howeitis/garden-club/issues/13)), photo gallery ([#17](https://github.com/howeitis/garden-club/issues/17)), SVG logo ([#16](https://github.com/howeitis/garden-club/issues/16)).

### 9.6 Optional improvements

- **Real photography** — the page layouts are built to showcase photos of actual members, meetings, and member gardens; most current photos are stand-ins.
- **Officer photos** — would need a `photo` field added to the officers collection (a small developer/AI-assistant job); the card layout has room for a headshot.
- **Per-honoree social posts** — every Member of the Month has a permanent page with their portrait as the share image, ready to link from Facebook or Instagram.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| A content change is not appearing | The build failed, or the change was not pushed to `main` | Check the "Actions" tab on GitHub for a red ✗ |
| A save in the admin is refused / build fails | A required field is empty, a dropdown value is mistyped, or a photo is too large or badly named | The report names the item and field in plain English. Fix and save again — see `CONTENT_GUIDE.md` §8 |
| The admin (app.pagescms.org) is down | Third-party service outage | Content is safe in GitHub. Wait, or edit directly on GitHub (`CONTENT_GUIDE.md` appendix) |
| An editor can't see the site in the admin | They weren't invited, or the invite went to a different email | Re-invite from the admin's Collaborators screen |
| Contact page shows an email address instead of a form | `PUBLIC_WEB3FORMS_KEY` is missing from Vercel | Re-add it in Vercel, then redeploy |
| Form messages stopped arriving | Monthly limit exceeded, spam filtering, or an invalid key | Check the Gmail spam folder first |
| Club's changes stop deploying | The repository was switched to private | Make it public again (§9.3) |
| Whole site is offline | Hosting or domain issue | Contact Owen Howe — check the Vercel dashboard |
| Search Console lost verification | The DNS TXT record was deleted | Re-add it (§2.6) |

---

## 11. Glossary

| Term | Meaning |
|---|---|
| **Repository (repo)** | The folder of all the website's files, stored on GitHub with full history |
| **Push / commit** | Saving a change to GitHub — which is what publishes it |
| **Branch (`main`)** | The live version of the site. Changes to `main` go live |
| **Build / deploy** | Converting the source files into the actual website and publishing it |
| **DNS** | The system translating `gardengategardenclub.com` into the server that answers |
| **Environment variable** | A setting stored in Vercel rather than in the code, typically a key or password |
| **Static site** | A pre-built website with no database or login system |
| **The admin / Pages CMS** | The editing screens at app.pagescms.org. A separate free service that edits the site's content files through forms and saves them to GitHub |
| **Content file** | One small text file per item (a project, an honoree, a page's paragraphs) under `src/content/` in the repository. What the admin edits; what the site is built from |
| **Sitemap** | A machine-readable list of pages, submitted to Google |
| **Canonical URL** | The official address of a page, so search engines do not treat duplicates as separate |

---

## Reference: other documentation in this repository

| File | Audience | Covers |
|---|---|---|
| `HANDOVER.md` | Board + maintainer | This document |
| `CONTENT_GUIDE.md` | Club editors | The admin, step by step: every screen, the common jobs, photos, troubleshooting |
| `README.md` | Developers | Setup, deployment, environment variables, project structure |
| `CLAUDE.md` | Developers | Architecture, design system, conventions |
