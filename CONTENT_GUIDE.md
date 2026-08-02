# Content Guide for Garden Club Website

This guide explains how to update the information on the club website. All content lives in small text files inside the `src/data/` folder. You do **not** need to know how to code — just follow the instructions below carefully.

**You do not need to install anything.** Every edit in this guide can be made in a web browser, signed in to GitHub as the club.

---

## Before You Start: Sign In

You need the club's GitHub account:

- **Username:** `gardengategardenclub`
- **Signs in with:** `gardengate.communications@gmail.com`

This account has **write access** to the website, which means your edits publish themselves. You do not need to ask anyone to publish for you.

---

## How to Edit Content

This is the whole workflow. It takes about two minutes.

1. Go to **https://github.com/howeitis/garden-club** and sign in as the club account.
2. Click into the `src` folder, then `data`, then click the file you want to change — for example `officers.json`.
3. Click the **pencil icon** (✏️ *Edit this file*) in the top-right of the file view.
4. Make your changes directly in the browser, following the format already in the file.
5. Scroll to the bottom. Leave **"Commit directly to the `main` branch"** selected.
6. Write a short note in the description box, like *"Update officer roster for 2026"*.
7. Click **Commit changes**.

**That's it — you have published.** The website rebuilds itself automatically and your change is live in about a minute. There is no separate "publish" button and no one to notify.

### Checking that it worked

Click the **Actions** tab at the top of the repository. You will see your change listed:

- **Green check ✓** — published successfully. Refresh the website to see it.
- **Yellow dot** — still building. Wait about a minute.
- **Red ✗** — something in the file was formatted incorrectly. **The live website is unaffected and still shows the previous version.** Click into the red entry to see which file and line caused the problem, fix it the same way, and commit again.

> **You cannot break the live site with a typo.** The website is checked automatically every time it is published. If a file has a mistake, publishing stops and the previous working version stays up until the error is fixed.

### One important limit

You can publish, but you **cannot undo a publish yourself.** If you post something you would rather take back, the fix is to edit the file again and commit the correction — which takes another minute. Rolling back to an earlier version of the whole site requires the Vercel dashboard, which only Owen Howe can access. For content edits this rarely matters; just correct and re-commit.

---

## A Much Easier Way: Let an AI Assistant Do It

**This is the recommended approach, and it is genuinely easier than editing files by hand.**

Tools like **[Claude Code](https://claude.com/claude-code)** or **OpenAI's Codex** can make these changes for you. You describe what you want in plain English and the assistant edits the right files, checks the formatting, and publishes.

For example, you can simply say:

> *"Update the officers list: Jane Smith is President, Maria Lopez is Treasurer, Anne Chen is Reporting Secretary, and Pat Rivera is Corresponding Secretary."*

> *"Add a new community service project called Spring Bulb Planting at Rockford Park, chaired by Ellen Ward, running 2026 to present."*

> *"Add our Facebook page to the website."*

The assistant handles the file format, the commas, the quotes — all the things the "Common Mistakes" section below warns about. **Nobody on the board needs to learn JSON.**

The rest of this guide explains the file formats for anyone who prefers to edit by hand, or who wants to check an assistant's work.

---

## Common Mistakes

These are the most frequent errors that prevent the site from building. Read this section carefully before making edits.

### 1. Trailing Commas

JSON does **not** allow a comma after the last item in a list or object.

```json
// WRONG — trailing comma after last item
[
  { "name": "Alice" },
  { "name": "Bob" },   ← this comma will break the file
]

// CORRECT
[
  { "name": "Alice" },
  { "name": "Bob" }
]
```

### 2. Missing Quotes Around Text

Every piece of text (a word, sentence, email address, etc.) must be wrapped in double quotes `"like this"`. Numbers do **not** use quotes.

```json
// WRONG
{ "role": President }

// CORRECT
{ "role": "President" }
```

### 3. Accidentally Deleting Brackets or Braces

Each file uses `{` `}` for objects and `[` `]` for lists. Deleting one of these will break the entire file.

- `{` must always have a matching `}`
- `[` must always have a matching `]`

**Tip:** Use a free JSON validator like [jsonlint.com](https://jsonlint.com) — paste your file contents to check for errors before saving.

### 4. Using Single Quotes Instead of Double Quotes

JSON requires double quotes `"`. Single quotes `'` are not allowed.

```json
// WRONG
{ 'name': 'Alice' }

// CORRECT
{ "name": "Alice" }
```

### 5. Forgetting Commas Between Items

Every item in a list or object (except the last one) needs a comma after it.

```json
// WRONG
{
  "name": "Alice"
  "role": "President"
}

// CORRECT
{
  "name": "Alice",
  "role": "President"
}
```

---

## File Reference

### `clubInfo.json` — Club Name, Mission & Theme

Edit this to update the club name, founding dates, mission statement, or annual theme. This is the club's real file, abbreviated:

```json
{
  "name": "Garden Gate Garden Club",
  "foundingDates": {
    "club": "September 1963",
    "federation": "June 1964",
    "incorporated": "October 2018"
  },
  "nonprofitStatus": "501(c)(3) Organization",
  "theme": "Promoting our love of gardening through kindness."
}
```

---

### `contact.json` — Email, Mailing Address & Social Media

Edit this to update the contact email, mailing address, or social media links. This is the club's real file:

```json
{
  "primaryEmail": "gardengate.communications@gmail.com",
  "mailingAddress": {
    "street": "P.O. Box 4754",
    "city": "Wilmington",
    "state": "Delaware",
    "zip": "19807"
  },
  "socialLinks": {
    "facebook": "https://www.facebook.com/people/Garden-Gate-Garden-Club-Delaware/61592716023518/",
    "instagram": "https://www.instagram.com/gardengategardenclub/"
  }
}
```

Social links appear in two places automatically: as text links in the "Follow Us" section of the Contact page, and as icon buttons in the footer of every page. To add another platform, add a line inside `socialLinks` — for example `"youtube": "https://youtube.com/@yourchannel"`. Remember the comma after the previous entry.

Facebook and Instagram get their own icons. Any other platform falls back to a generic link icon, which is fine — ask if you want a custom one added.

If you remove all of them and leave `{}`, both sections simply disappear.

> **Note:** changing `primaryEmail` changes the address **shown** on the Contact page. It does **not** change where contact-form messages are delivered. Those two are set in different places — see the handover document if the club's email address ever changes.

---

### `meetings.json` — Meeting Schedule & Agenda

Edit the `timeBlocks` to change the schedule, `dues` to update the annual fee, and `orderOfBusiness` to adjust the agenda.

---

### `affiliations.json` — NGC, Region & State Links

Update the names, themes, and officers for national, regional, and state affiliations here.

---

### `officers.json` — Board Members (Array)

> ### ▸ Start here
>
> **The board roster is not filled in yet.** All four entries currently say `"TBD"`, and those four "TBD"s are visible on the live About page right now. **Replacing them is the first content job for the club.** Follow the workflow at the top of this guide, or just ask an AI assistant to do it.

This is a **list** of officer entries. Each entry uses `{` `}` and is separated by commas.

**Complete example entry:**
```json
{
  "role": "Vice President – Programs",
  "name": "Diane Okafor",
  "sortOrder": 2,
  "bio": "Diane coordinates our monthly speakers and has a background in horticultural therapy."
}
```

- `"role"` — The officer's title (required)
- `"name"` — Full name (required)
- `"sortOrder"` — A number controlling display order; use `1` for President, `2` for next, etc. (required, **no quotes** around the number)
- `"bio"` — Short biography paragraph (optional — you may omit this line entirely)

**To add a new officer**, copy an existing `{ ... }` block, paste it before the closing `]`, and add a comma after the previous entry.

**To remove an officer**, delete the entire `{ ... }` block for that person and remove the preceding comma if it was the last item.

---

### `awards.json` — Club Awards (Array)

Each award entry must include the award name, a description, a list of recent winners, and the judging criteria.

**Complete example entry:**
```json
{
  "awardName": "Founder's Cup",
  "description": "Awarded annually to the member who best exemplifies the club's founding values of community service and horticultural excellence.",
  "recentWinners": [
    "Patricia Moore (2023)",
    "James Whitaker (2022)",
    "Ruth Alcott (2021)"
  ],
  "judgingCriteria": [
    "Years of active club membership",
    "Volunteer hours contributed",
    "Impact on community beautification",
    "Mentorship of newer members"
  ]
}
```

- `"recentWinners"` and `"judgingCriteria"` are both **lists** — each item is a quoted string, separated by commas, inside `[` `]`.

---

### `judges.json` — Certified Judges (Array)

List all club-certified judges. The `"status"` field must be exactly `"active"` or `"emeritus"` (lowercase, with quotes).

**Complete example entry:**
```json
{
  "name": "Beverly Ashworth",
  "certificationLevel": "Master Judge",
  "status": "active"
}
```

Valid status values:
- `"active"` — currently serving as a judge
- `"emeritus"` — retired / honorary status

---

### `projects.json` — Community Projects (Array)

Each project documents a club initiative. The `"imageReference"` is the photo's filename written as a path, e.g. `"/bluestar.webp"`.

**Complete example entry** (this is a real entry from the club's file, shortened):
```json
{
  "name": "Blue Star Memorial Marker",
  "yearsActive": "2014–present",
  "chairperson": "TBD",
  "description": "GGGC installed the Blue Star Memorial Marker at the Wilmington VA Medical Center in 2014.",
  "location": "Wilmington VA Medical Center",
  "imageReference": "/bluestar.webp"
}
```

- `"yearsActive"` — Use formats like `"2021–present"` or `"2009–2015"` (use an en-dash `–`, not a hyphen `-`).
- `"imageReference"` — A `/` followed by the image's filename (no folders, no spaces in the name). The photo file itself lives in the `src/assets/content/` folder. See **Adding Photos** below — you can do this yourself.

---

## Adding Photos

You can add photos yourself, in the browser, without installing anything. It is a two-step job: upload the file, then point a data file at it.

### Step 1 — Upload the photo

1. Go to **https://github.com/howeitis/garden-club** and sign in as the club account.
2. Navigate into `src`, then `assets`, then `content`.
3. Click **Add file → Upload files** in the top-right.
4. Drag your photo in.
5. Leave **"Commit directly to the `main` branch"** selected and click **Commit changes**.

### Step 2 — Point a data file at it

Edit the relevant file (for example `projects.json`) and set the `imageReference` to a `/` plus the filename:

```json
"imageReference": "/spring-bulb-planting.jpg"
```

The website resizes and optimizes the photo automatically when it publishes. You do not need to shrink it first.

### Filename rules — these matter

| Rule | Good | Bad |
|---|---|---|
| **No spaces** — use hyphens | `spring-bulb-planting.jpg` | `spring bulb planting.jpg` |
| **All lowercase** | `rose-garden.jpg` | `Rose-Garden.JPG` |
| **Reference must match exactly** | file `bluestar.webp` → `"/bluestar.webp"` | file `bluestar.webp` → `"/bluestar.jpg"` |

A filename with a space in it will break the photo's web address. If the name and the reference do not match exactly — including the `.jpg` / `.webp` ending — the photo will not appear.

> **Easier option:** ask an AI assistant. *"I've uploaded spring-bulb-planting.jpg to src/assets/content — add it to the Spring Bulb Planting project."* It will handle the naming and the reference.

---

## The Contact Form

Messages sent through the **Contact** page are emailed to **gardengate.communications@gmail.com**. They are not stored anywhere on the website, so treat that inbox as the only copy.

A few things worth knowing:

- **Replying works normally.** Hit Reply on the notification email and it goes straight back to the person who wrote in.
- **Changing `primaryEmail` in `contact.json` does not change where form messages go.** That setting only controls the email address *displayed* on the Contact page. Delivery is configured separately, in the hosting settings. If the club changes its email address, both must be updated — ask Owen Howe for the second one.
- **Check the spam folder occasionally**, at least early on, and mark the notifications as "not spam" so Gmail learns to trust them.

---

## Validation Tip

If you are editing by hand and want to check your work **before** committing, copy the entire file contents into [jsonlint.com](https://jsonlint.com). A green "Valid JSON" message means the format is correct. An error will point to the exact line with the problem.

This is optional — the website checks the file automatically when you publish, and refuses to update if there is a mistake. Validating first just saves you a round trip.
