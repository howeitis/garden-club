# Website Handover — Garden Gate Garden Club

**Site:** https://gardengategardenclub.com
**Prepared:** August 2026
**Audience:** GGGC board members, and whoever maintains the website next

This document has two parts. **Part 1 is a one-page summary** — if you read nothing else, read that. **Part 2 is the detail** behind each item, including the technical specifics.

---

# Part 1 — The One-Pager

## What you have

A website for the Garden Gate Garden Club at **gardengategardenclub.com**. Thirteen pages covering the club's history, board, community service projects, membership, gardening resources, and a working contact form. It is a "static" site, which means it is fast, cheap (currently free to host), and has no database or login system to maintain.

## Status: everything is live and working

| Item | Status |
|---|---|
| Website at gardengategardenclub.com | ✅ Live |
| Contact form → club inbox | ✅ Live and tested |
| Google Search Console | ✅ Verified, sitemap submitted |
| Automatic publishing when content changes | ✅ Working |

## The five accounts that keep the site alive

| # | Service | What it does | Who controls it today |
|---|---|---|---|
| 1 | **Vercel** | Hosts the site **and** holds the domain registration | Personal account (`howeitis`) |
| 2 | **Domain** `gardengategardenclub.com` | The web address; renews annually for a fee | Registered inside that same Vercel account |
| 3 | **GitHub** `howeitis/garden-club` | Stores all the website's files and content | Personal account, with the club added as a collaborator |
| 4 | **Gmail** `gardengate.communications@gmail.com` | Receives every contact-form message | The club |
| 5 | **Web3Forms** | Delivers form messages to that inbox | No account — a key stored in Vercel |

## ⚠️ The three things that could take the site down

1. **The Vercel account is one person's personal account.** It holds both the hosting *and* the domain registration. If that account lapses, is closed, or its payment card expires, the domain can expire and the website goes offline. **This is the single biggest risk and the most important thing to resolve.**

2. **The club Gmail account has no confirmed backup access.** Every contact-form message goes there and is stored nowhere else. If no one can get into that inbox, those messages are gone.

3. **The GitHub repository must stay public.** It is public today, and that is what allows the club to publish changes. Switching it to private will silently stop the club's updates from going live, with a confusing error.

## What to do next

| Priority | Action | Who |
|---|---|---|
| 1 | Decide the long-term home for the Vercel account and domain | Board + current maintainer |
| 2 | Add two board members as recovery contacts on the club Gmail | Board |
| 3 | Confirm the domain renewal date and who pays it | Board |
| 4 | Note "keep the GitHub repo public" in board records | Board |

## Day-to-day: who does what

- **Updating text and photos** (officers, projects, awards, meeting dates): follow `CONTENT_GUIDE.md`. No coding required.
- **Contact-form messages**: check `gardengate.communications@gmail.com`. Reply normally — replies go straight to the sender.
- **Anything else** (design changes, new pages, settings): needs someone comfortable with the code. See Part 2.

---
---

# Part 2 — The Detail

## 1. What the website is built with

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static site generation) |
| Styling | Tailwind CSS 3 |
| Language | TypeScript |
| Content | JSON data files, validated at build time |
| Hosting | Vercel |
| Contact form | Web3Forms |
| Fonts | Google Fonts — Cormorant Garamond, Inter |

**"Static site"** means every page is pre-built into plain HTML files. There is no database, no server-side code, no user accounts, and no admin login. This makes the site fast, secure, and free to host — but it also means **any content change requires the site to be rebuilt and republished**. That happens automatically (see §4).

Further technical reference lives in `README.md` (setup, deployment, environment variables) and `CLAUDE.md` (architecture and design system).

---

## 2. Accounts and access — the full inventory

This is the most important section of the document. **Losing access to any of these is difficult or impossible to recover without the original owner.**

### 2.1 Vercel — hosting *and* domain registration

- **Plan:** believed to be the free "Hobby" tier — worth confirming in the dashboard.
- **What it holds:** the live website, the domain registration, the environment variables, deployment history, and rollback ability.
- **Who has access:** the personal account only.

Two important constraints:

- **Hobby accounts are single-user.** You cannot invite the club as a team member without upgrading to a paid plan (Pro, currently around $20/user/month).
- **The domain registration lives inside this account.** Because the domain was purchased through Vercel rather than a separate registrar, it cannot simply be pointed elsewhere — moving it means a domain transfer.

The club does have its own Vercel account under the club Gmail, which makes an eventual transfer feasible. See §9.1.

### 2.2 Domain — `gardengategardenclub.com`

- Registered through Vercel.
- Nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`.
- **Renews annually for a fee**, billed to the payment method on the Vercel account. Confirm the exact amount and renewal date in the Vercel dashboard.
- **If the renewal fails, the domain expires and the website goes offline.** This is the most common way volunteer-run websites die.

**DNS records currently in place:**

| Type | Purpose | Do not delete |
|---|---|---|
| A records | Point the domain at the website | Required for the site to load |
| TXT | Google Search Console verification | Required — deleting it unverifies the property |

### 2.3 GitHub — `howeitis/garden-club`

- **Visibility: public.** This matters — see §9.4.
- **Collaborators:** `howeitis` (admin), `gardengategardenclub` (write access).

The club's account can edit files and publish changes. It cannot delete the repository, change its settings, or transfer ownership — those require admin.

There is no confidential information in this repository. The contact-form key is stored in Vercel, not in the code, and local environment files are excluded from version control.

### 2.4 Gmail — `gardengate.communications@gmail.com`

Used for three things:

1. Receiving every contact-form submission.
2. The club's GitHub account login.
3. The club's own Vercel account login.

**Messages are not stored anywhere else.** There is no copy on the website, no database, and no backup. This inbox is the only record.

**Action required:** confirm that recovery phone and recovery email are set to something the *club* controls — not one individual's personal phone — and that at least two board members can sign in.

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

All the site's text content lives in eight files under `src/data/`:

| File | Controls |
|---|---|
| `clubInfo.json` | Club name, mission, theme, membership numbers |
| `contact.json` | Displayed email address, mailing address, social links |
| `meetings.json` | Meeting schedule, dues, order of business |
| `officers.json` | Board roster |
| `awards.json` | Awards and criteria |
| `judges.json` | Certified judges |
| `projects.json` | Community service projects |
| `affiliations.json` | National, regional, and state affiliations |

**`CONTENT_GUIDE.md` is the step-by-step guide written for non-technical editors.** It covers the exact format, the five mistakes that most often break things, and how to check your work before publishing.

One safety feature worth knowing: **if a content file has a formatting error, the site refuses to republish and keeps showing the previous working version.** A typo cannot take the site down — it just means the update does not appear until the error is fixed.

Gardening tips, plant lists, and the gardens-to-visit list live in the page files rather than the data files. See the table in `CLAUDE.md` for exactly which file to edit.

---

## 4. How changes get published

```
Edit a file  →  Push to GitHub (main branch)  →  Vercel rebuilds  →  Live in ~1 minute
```

There is no separate "publish" button. Saving a change to the `main` branch is publishing.

Two automated checks run on every change:

- **GitHub Actions** runs a type-check and a full build. Visible in the repository's "Actions" tab.
- **Vercel** rebuilds and deploys. If the build fails, **the previous version stays live** — a broken change cannot replace a working site.

**Why the club can publish even though hosting is on someone else's account:** Vercel normally requires the person making a change to have access to the hosting account. That restriction applies only to *private* repositories. Because this repository is public, any collaborator can publish. This is exactly why §9.4 matters.

---

## 5. The contact form

**Where messages go:** `gardengate.communications@gmail.com`.

**How it works:** the form posts to Web3Forms, which emails the submission to the club inbox. Replying to that notification goes directly back to the person who wrote in.

**Built-in protections:**
- A hidden "honeypot" field that catches automated spam bots.
- If the Web3Forms key is ever missing, the page shows the club's email address instead of a form. This is deliberate — a broken form would look like it works while silently discarding every message.

**Two things that commonly confuse people:**

1. **Changing `primaryEmail` in `contact.json` does not change where messages are delivered.** That setting only controls the address *displayed* on the Contact page. Delivery is set by the Web3Forms key in Vercel. If the club changes its email address, **both** must be updated.

2. **Check the spam folder early on** and mark notifications as "not spam" so Gmail learns to trust them.

**To change the delivery address or rotate the key:** request a new key at web3forms.com using the new inbox, update `PUBLIC_WEB3FORMS_KEY` in Vercel, then redeploy. Because the site is statically built, an environment-variable change only takes effect on the next deployment.

---

## 6. Domain and web addresses

- **Primary address:** `https://gardengategardenclub.com`
- `www.gardengategardenclub.com` redirects to it automatically.
- The old Vercel address `garden-club-eight.vercel.app` redirects to it as well. This is Vercel's own behavior, not a setting in the code — a note in `CLAUDE.md` explains why it should not be "fixed" in `vercel.json`.

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
| Domain renewal | Annual fee — confirm amount and date in Vercel |
| Web3Forms | Free (250 submissions/month) |
| Google Search Console | Free |
| GitHub (public repository) | Free |

**The domain renewal is the only recurring cost, and it is the one that can take the site offline if missed.** Confirm which payment method it bills to and set a calendar reminder ahead of the renewal date.

---

## 9. Risks and recommended actions

### 9.1 Vercel account ownership — highest priority

**The problem:** hosting, the domain registration, environment variables, and rollback ability all sit in one person's personal account. The club can publish content changes, but cannot change settings, rotate the form key, roll back a bad deployment, or renew the domain.

**Why it is not trivial to fix:** Hobby accounts are single-user, so the club cannot simply be added as a member. Vercel's in-dashboard ownership transfer is also restricted on that tier.

**Options:**

| Option | Cost | Trade-off |
|---|---|---|
| Move project + domain to the club's own Vercel account | Free | Requires a domain transfer between accounts — confirm the process with Vercel support first |
| Upgrade to Vercel Pro and add the club as a team member | ~$20/user/month | Ongoing cost for a nonprofit |
| Leave as-is | Free | The site depends on one person's account remaining active and paid |

**Recommendation:** pursue the first option. The club already has a Vercel account under its Gmail, which makes it viable. Sequence it carefully — the domain registration is the part that needs the most attention.

### 9.2 Gmail account recovery — high priority

Set recovery contacts the club controls and ensure at least two board members can sign in. This inbox is the only copy of every contact-form message and is also the login for the club's GitHub and Vercel accounts.

### 9.3 Domain renewal — high priority

Confirm the renewal date and the payment method. Set a calendar reminder. An expired domain takes the website offline and, after a grace period, releases the name for anyone to buy.

### 9.4 Keep the GitHub repository public — important, easily overlooked

Making it private will cause the club's changes to stop publishing, with the error *"Git author must have access to the project on Vercel to create deployments."* The cause will not be obvious months later. Record this decision somewhere the board will find it.

### 9.5 Search Console TXT record — do not delete

Removing the DNS TXT record unverifies the Search Console property.

### 9.6 Optional improvements (not risks)

- **Analytics** — Vercel Web Analytics, or a privacy-friendly option like Plausible or Fathom.
- **Officer photos** — the data structure supports adding headshots.
- **Real photography** — the page layouts are built to showcase photos of actual members, meetings, and member gardens.
- **A content management system** — Decap CMS (free, Git-backed) would let board members edit content through a web interface instead of editing files.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| A content change is not appearing | The build failed, or the change was not pushed to `main` | Check the "Actions" tab on GitHub for a red ✗ |
| Build fails after editing a data file | JSON formatting error — usually a stray or missing comma | The error names the file and line. See `CONTENT_GUIDE.md` |
| Contact page shows an email address instead of a form | `PUBLIC_WEB3FORMS_KEY` is missing from Vercel | Re-add it in Vercel, then redeploy |
| Form messages stopped arriving | Monthly limit exceeded, spam filtering, or an invalid key | Check the Gmail spam folder first |
| Club's changes stop deploying | The repository was switched to private | Make it public again (§9.4) |
| Whole site is offline | Domain renewal lapsed | Check the Vercel dashboard for domain status |
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
| **Sitemap** | A machine-readable list of pages, submitted to Google |
| **Canonical URL** | The official address of a page, so search engines do not treat duplicates as separate |

---

## Reference: other documentation in this repository

| File | Audience | Covers |
|---|---|---|
| `HANDOVER.md` | Board + maintainer | This document |
| `CONTENT_GUIDE.md` | Non-technical editors | Step-by-step content editing |
| `README.md` | Developers | Setup, deployment, environment variables, project structure |
| `CLAUDE.md` | Developers | Architecture, design system, conventions |
