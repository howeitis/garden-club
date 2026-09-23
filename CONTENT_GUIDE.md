# Updating the Garden Gate Website

**For club members. No coding required.**

> A friendlier, illustrated version of this guide is published as a web page: **https://claude.ai/artifact/Whminjsb1VSzEGEEJUi3fm** (ask the communications chair if the link asks you to sign in). This file is the same guide, kept alongside the website's code so it never goes missing.

Everything on the website that changes — officers, projects, the Member of the Month, plants, meeting times, photos, the paragraphs on each page — is edited through a simple admin screen. You fill in forms, click **Save**, and the website updates itself within about a minute.

You cannot break the live site. Every change is checked before it goes live; if something is wrong, the site simply keeps showing the previous version and tells you what to fix.

---

## Contents

1. [Getting in](#1-getting-in)
2. [Making a change](#2-making-a-change)
3. [What you can edit, and where](#3-what-you-can-edit-and-where)
4. [Step-by-step: the common jobs](#4-step-by-step-the-common-jobs)
5. [Photos](#5-photos)
6. [Writing tips](#6-writing-tips)
7. [Checking that it went live](#7-checking-that-it-went-live)
8. [If something goes wrong](#8-if-something-goes-wrong)
9. [Giving someone else access](#9-giving-someone-else-access)
10. [Appendix: editing without the admin](#10-appendix-editing-without-the-admin)

---

## 1. Getting in

The admin is at **https://app.pagescms.org**.

There are two ways to sign in. Either works — use whichever you were given.

**A. With the club's GitHub account.** Click *Sign in with GitHub* and use the club's login (the one tied to `gardengate.communications@gmail.com`). Then open **garden-club** from the list of repositories.

**B. With an email invitation.** If you were invited by email, follow the link in that email and sign in with your email address. You'll see the Garden Club site and nothing else. You won't need a GitHub account.

Once in, the left-hand menu lists everything you can edit.

---

## 2. Making a change

The routine is the same for everything:

1. Pick a section from the left menu (for example **Community Service Projects**).
2. Click the item you want to change, or **Add** to create a new one.
3. Fill in the form. Each field has a short note under it explaining what it's for.
4. Click **Save** at the top.

That's it — saving *is* publishing. The website rebuilds itself and your change is live in about a minute. There's no separate "publish" button and nobody to notify.

**To remove something** (a project that has ended, an officer who has stepped down): open it and use **Delete** in the item's menu. Some sections have a gentler option — see "hiding an officer" below.

**To change the order** things appear on the page: most sections have an **Order on the page** field. Smaller numbers show first. The existing items use 10, 20, 30… so you can slot a new one in between (25) without renumbering everything.

---

## 3. What you can edit, and where

| To change… | Open… | Notes |
|---|---|---|
| The featured member on the home page | **Member of the Month** | Add a new honoree; the newest date becomes the feature automatically |
| Community service projects | **Community Service Projects** | One entry per project |
| The board on the About page | **Board of Officers** | Type `TBD` as the name to hide a role |
| Members' home gardens | **Member Gardens** | |
| Awards received or given | **Awards** | Choose "Received by the club" or "Given by the club" |
| Certified judges | **Certified Judges** | Active or Emeritus |
| Native and invasive plants | **Plants** | Choose Native or Invasive |
| Public gardens to visit | **Gardens to Visit** | Choose Local or Regional |
| Gardening tips | **Gardening Tips** | Choose Evergreen or Garden Rhythms |
| Club name, mission, theme, membership numbers | **Club Settings → Club details** | The mission is also what search engines show |
| Email, mailing address, Facebook, Instagram | **Club Settings → Contact details** | |
| Plant popups ("More about …": height, light, soil, wildlife; for invasives how to spot and remove it, what to plant instead) | **Plants → (the plant)**, fields starting "Popup —" | All optional |
| Meeting day, where we meet, note for guests, timetable, dues, order of business | **Club Settings → Meetings & dues** | |
| NGC, region, and state federation details | **Club Settings → Affiliations** | Leave the convention blank to hide that line |
| The paragraphs on a page | **Page Text → (that page)** | Headings and buttons stay as they are |

Things that are **not** in the admin (they need a developer or an AI assistant — see the appendix): page layouts, colours and fonts, the navigation menu, adding a whole new page, the logo.

---

## 4. Step-by-step: the common jobs

### A new Member of the Month

1. Get one or two photos from the member. A **tall (portrait) photo** works best for the main one.
2. Open **Member of the Month** → **Add**.
3. Fill in:
   - **Member's name**
   - **Month featured** — pick any day in the month. This is what makes them the current feature (the newest date wins). Turn off *Show the month on the page* if you'd rather not print a date.
   - **Headline** and **Tagline** — the big two-line title, e.g. *Celebrating Joy Ericson* / *and her love of flowers*.
   - **One-sentence summary** — appears on the home page.
   - **Main photo** — upload it, then write one sentence describing it (this is read aloud to visitors using screen readers).
   - **The story** — write it in short chapters. For each chapter, put the title on its own line as a **Heading 2** (use the toolbar's heading button or type `## ` before it), then the paragraph. The website turns each heading into a numbered chapter label.
   - **At a glance** — up to four big numbers (e.g. `40+` / *Years as a certified judge*). Optional.
   - **Second photo** and **Closing note** — optional.
4. **Save.** The previous honoree automatically moves to the "Past Honorees" archive, and both keep their own page.

Every honoree gets a permanent web address you can share on Facebook or Instagram:
`https://gardengategardenclub.com/members/member-of-the-month/<their-name>/` — for example `/members/member-of-the-month/joy-ericson/`. The link keeps working after the next honoree is featured.

### A new community service project

**Community Service Projects → Add.** Fill in the project name, **Years active** (`2026–present` for ongoing, or `2026–2027` for a one-season project), who chairs it, the location, a photo, and the description. Set **Order on the page** to control where it sits in the list.

When a project ends, either delete it or change *Years active* to the finished range.

### Updating the board

**Board of Officers.** There is one entry per role. Open a role and change the **Name**. Add a short bio if you like.

To keep a role listed but hidden from the website (say, between elections), set the name to `TBD`. When *every* role is `TBD`, the whole "Board of Officers" section disappears from the About page and reappears as soon as one real name is entered.

### Meeting times, dues, order of business

**Club Settings → Meetings & dues.** *Where we meet* and *Note for guests* appear together on the Membership page; since meetings move between members' homes, the note tells visitors how to get the address rather than giving it publicly. The timetable and the order of business are lists — use the **+** button to add a row, the arrows to reorder, and the **×** to remove one.

### The theme, mission, or membership numbers

**Club Settings → Club details.**

### Adding a plant, garden, or tip

**Plants**, **Gardens to Visit**, or **Gardening Tips → Add.** Each has a dropdown that decides which section of the page it appears in (Native/Invasive, Local/Regional, Evergreen/Rhythms).

### Changing a paragraph on a page

**Page Text → (the page).** Each field is labelled with where on the page it appears. Bold and links work in most of them.

---

## 5. Photos

- **Any JPG or PNG straight from a phone or camera is fine.** The website resizes and compresses photos itself, so you don't need to edit them first.
- **Size:** under 3 MB is ideal. Anything over 8 MB is refused with a message asking you to resize it. (Most phones offer a "medium" or "large" export that's well under this.)
- **Shape:** most spots on the site show photos in landscape. The Member of the Month main photo is the exception — it's tall.
- **Filenames** are tidied automatically when you upload through the admin. If you ever add photos another way, use only letters, numbers, and dashes: `spring-planting.jpg`, not `Spring Planting (1).JPG`.
- **Rename before uploading if you can.** Phones name photos `IMG_1875.jpeg` or `1000019960.jpeg`; a name that says what's in the picture (`fire-pink.jpeg`) helps it turn up in Google image search. The site notes these in its build log but still publishes them.
- **Focus point:** if a photo is cropped badly on the page (someone's head cut off), open the item and fill in **Photo focus point** — `center 30%` keeps the top third in view; `center bottom` keeps the bottom. Leave it blank normally.
- **Describe the photo** fields (sometimes labelled *alt*): one plain sentence saying what's in the picture. Visitors who can't see the photo hear this instead.

---

## 6. Writing tips

- Most description fields accept simple formatting: **bold**, *italic*, and links. Use the toolbar, or type `**bold**`, `*italic*`, and `[link text](https://example.org)`.
- For the Member of the Month story, each **Heading 2** starts a new chapter. Keep chapters short — two or three paragraphs.
- Link to other pages on the site by their path, **ending with a slash**: `/membership/`, `/members/awards-and-judges/`, `/resources/plants/`. If a link is missing its slash or points at a page that doesn't exist, the site won't update and the error message names the link to fix — the live site stays as it was.
- The site handles curly quotes and dashes for you — type straight quotes and they'll look right.
- Keep the **One-sentence summary** fields to a sentence. They appear in small spaces.

---

## 7. Checking that it went live

Wait a minute, then open the website and refresh the page. If you're impatient or something looks off:

1. Go to **https://github.com/howeitis/garden-club/actions**.
2. The top row is your change. **Green check ✓** — it's live. **Yellow dot** — still building. **Red ✗** — something needs fixing (next section).

---

## 8. If something goes wrong

**The website is never broken by a mistake.** If a change can't be published, the previous version stays up, and the build report says exactly what's wrong. The messages are written in plain English — for example:

> `plants → japanese-barberry` — "type" must be "native" or "invasive"

> `A photo problem: spring planting.jpg has spaces in the filename. Rename it using only letters, numbers, and dashes.`

> Every project needs a "chair" (the member who leads it)

Open the item named, fix the field named, and save again.

**You published something you'd rather take back.** Edit it again and save — that's another minute. (Rolling back to an earlier version of the whole site is a Vercel-dashboard job for Owen; for content edits, correcting and re-saving is always enough.)

**The admin won't load or shows an error.** The admin (Pages CMS) is a free service run by other people. Everything you edit is stored safely in the club's GitHub repository, not in the admin, so nothing is lost. If it's down for more than a day, edit through GitHub directly (appendix), or ask an AI assistant to make the change.

---

## 9. Giving someone else access

The club's GitHub login is the master key, and it's best to keep it with one person. Everyone else should get an **email invitation** — it gives them the editing screens and nothing more.

1. Sign in to the admin with the club's GitHub account.
2. Open the garden-club site → **Settings** (in the left menu) → **Collaborators**.
3. Enter their email address and send the invite.

They'll receive a link, sign in with their email, and can start editing. Remove them from the same screen when they step down.

---

## 10. Appendix: editing without the admin

Every item on the site is a small text file in the club's GitHub repository, under `src/content/`. The admin is just a friendly way of editing those files — you can also edit them directly on GitHub if you ever need to.

### Where things live

```
src/content/
  members-of-the-month/   one file per honoree      (joy-ericson.md)
  projects/               one file per project      (blue-star-memorial-marker.md)
  officers/               one file per role         (president.md)
  member-gardens/         one file per garden
  awards/                 one file per award
  judges/                 one file per judge
  plants/                 one file per plant
  gardens/                one file per garden to visit
  gardening-tips/         one file per tip
  settings/               club.yml · contact.yml · meetings.yml · affiliations.yml
  pages/                  one file per page's editable paragraphs (home.yml, about.yml …)
src/assets/content/       all the photos
```

### What a file looks like

A project, for example:

```markdown
---
title: Goodstay Gardens’ Peony Garden Renovation
years: 2025–2026
chair: Jane Hollingsworth
location: Goodstay Gardens, Wilmington
image: /goodstaygardens.webp
order: 20
---

This project marks a new opportunity for Garden Gate to continue its
support of Goodstay Gardens — one of Wilmington’s best-kept secrets…
```

The part between the `---` lines is a list of `field: value` pairs. Below it is the description, as ordinary text. To add a project by hand, copy an existing file, rename it, and change the values.

A settings file (`settings/meetings.yml`) is the same `field: value` style all the way through, with lists shown as lines starting with `- `.

### Editing on GitHub

1. Go to **https://github.com/howeitis/garden-club** and sign in as the club.
2. Click into `src` → `content` → the folder → the file.
3. Click the **pencil** (✏️) to edit, or **Add file → Create new file** to add one.
4. Make the change, then **Commit changes** with "Commit directly to the main branch" selected.

The same checks run and the same rules apply: if a field is missing or mistyped, the build report names it and the live site is unaffected.

A few things the admin does for you that you must do yourself here:

- Keep the `field:` names exactly as in the other files (`chair`, not `Chair`).
- Values with a colon or a leading symbol need quotes: `dates: "May 4–6, 2026"`.
- Photos go in `src/assets/content/` and are referred to as `/filename.jpg`.

### Letting an AI assistant do it

Tools such as [Claude Code](https://claude.com/claude-code) can make any of these changes from a plain-English request — *"Add Maria Lopez as Treasurer"*, *"Feature Bob Howatt as Member of the Month with these two photos"* — and will check the formatting and publish. This is a good fallback for anything the admin can't do (layout, navigation, new pages).
