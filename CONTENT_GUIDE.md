# Content Guide for Garden Club Website

This guide explains how to update the information on the club website. All content lives in small text files inside the `src/data/` folder. You do **not** need to know how to code — just follow the instructions below carefully.

---

## How to Edit Content

1. Open the file you want to edit in a plain-text editor (e.g., Notepad, VS Code, or TextEdit).
2. Make your changes, following the format already in the file.
3. Save the file.
4. Ask your web contact to rebuild and publish the site, **or** commit and push the file if you have GitHub access.

> **Important:** The website is automatically checked for errors every time it is published. If a file has a mistake, the build will fail and the site will not update until the error is fixed. This protects the live site from broken data.

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

Edit this to update the club name, founding year, mission statement, or annual theme.

```json
{
  "name": "Maplewood Garden Club",
  "foundingDates": {
    "club": "1952",
    "federation": "1955"
  },
  "missionStatement": "To foster the love of gardening...",
  "nonprofitStatus": "501(c)(3) nonprofit organization",
  "theme": "Roots & Renewal: Growing Together for Tomorrow"
}
```

---

### `contact.json` — Email, Mailing Address & Social Media

Edit this to update the contact email, mailing address, or social media links.

```json
{
  "primaryEmail": "info@maplewoodgardenclub.org",
  "mailingAddress": {
    "street": "P.O. Box 412",
    "city": "Maplewood",
    "state": "NJ",
    "zip": "07040"
  },
  "socialLinks": {
    "facebook": "https://facebook.com/maplewoodgardenclub",
    "instagram": "https://instagram.com/maplewoodgardenclub"
  }
}
```

To remove social links entirely, you may delete the `"socialLinks"` section (including its `{` and `}`).

---

### `meetings.json` — Meeting Schedule & Agenda

Edit the `timeBlocks` to change the schedule, `dues` to update the annual fee, and `orderOfBusiness` to adjust the agenda.

---

### `affiliations.json` — NGC, Region & State Links

Update the names, themes, and officers for national, regional, and state affiliations here.

---

### `officers.json` — Board Members (Array)

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

Each project documents a club initiative. The `"imageReference"` is the photo's filename written as a path, e.g. `"/pollinator-garden.jpg"`.

**Complete example entry:**
```json
{
  "name": "Memorial Park Pollinator Garden",
  "yearsActive": "2018–present",
  "description": "A quarter-acre pollinator meadow planted and maintained by club volunteers, featuring native milkweed, coneflowers, and black-eyed Susans to support monarch butterflies and native bees.",
  "location": "Memorial Park, Maplewood, NJ",
  "imageReference": "/pollinator-garden.jpg"
}
```

- `"yearsActive"` — Use formats like `"2021–present"` or `"2009–2015"` (use an en-dash `–`, not a hyphen `-`).
- `"imageReference"` — A `/` followed by the image's filename (no folders, no spaces in the name). The photo file itself lives in the `src/assets/content/` folder — ask your web contact to add the image file first; the site optimizes it automatically at build time.

---

## The Contact Form

Messages sent through the **Contact** page are emailed to **gardengate.communications@gmail.com**. They are not stored anywhere on the website, so treat that inbox as the only copy.

A few things worth knowing:

- **Replying works normally.** Hit Reply on the notification email and it goes straight back to the person who wrote in.
- **Changing `primaryEmail` in `contact.json` does not change where form messages go.** That setting only controls the email address *displayed* on the Contact page. The delivery address is configured separately by your web contact. If the club changes its email address, ask them to update both.
- **Check the spam folder occasionally**, at least early on, and mark the notifications as "not spam" so Gmail learns to trust them.

---

## Validation Tip

Before handing off your changes, paste the entire file contents into [jsonlint.com](https://jsonlint.com). If it shows a green "Valid JSON" message, you're good. If it shows an error, it will point to the exact line with the problem.
