# Decap CMS with YAML — Practical Guide

## Why YAML instead of JSON

JSON is unforgiving. One missing comma, one smart quote from a paste, one line break in the wrong place — the entire file breaks and the CMS admin panel becomes unusable until you fix the file manually in the repository.

YAML handles all of this gracefully:
- Multi-line text is natural (no `\n` escaping)
- No curly braces, no commas between fields
- Smart quotes and special characters rarely cause issues
- Blank lines are ignored
- Much more readable

**Rule:** Always use YAML for content files in Decap CMS. The config file (`config.yml`) is always YAML anyway.

---

## Project File Structure

```
project/
├── public/
│   └── admin/
│       ├── index.html        # CMS admin panel HTML
│       └── config.yml        # CMS configuration
├── content/
│   ├── pages/
│   │   ├── home.fi.yaml      # Fixed page content (FI)
│   │   ├── home.en.yaml      # Fixed page content (EN)
│   │   ├── about.fi.yaml
│   │   └── about.en.yaml
│   └── productions/          # Collection — one file per item
│       ├── lumivalkea.yaml
│       └── kesayon-uni.yaml
└── ...
```

---

## Admin Panel HTML

`public/admin/index.html` — always the same, copy as-is:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

---

## config.yml — Backend Setup

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

# Locale for the CMS UI
locale: "fi"
```

---

## Two Types of Collections

### 1. File Collection — fixed pages (one file per page)

Use for: Home, About, Contact — pages that always exist.

```yaml
collections:
  - name: "pages"
    label: "Sivut"
    files:

      - name: "home_fi"
        label: "Etusivu (FI)"
        file: "content/pages/home.fi.yaml"
        fields:
          - { label: "Otsikko", name: "title", widget: "string" }
          - { label: "Esittelyteksti", name: "intro", widget: "text" }
          - { label: "Hero-kuva", name: "heroImage", widget: "image" }

      - name: "home_en"
        label: "Home page (EN)"
        file: "content/pages/home.en.yaml"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Intro text", name: "intro", widget: "text" }
          - { label: "Hero image", name: "heroImage", widget: "image" }
```

### 2. Folder Collection — dynamic items (one file per item)

Use for: Productions, Events, Personnel — lists that grow over time.

```yaml
collections:
  - name: "productions"
    label: "Esitykset"
    label_singular: "Esitys"
    folder: "content/productions"
    create: true
    extension: yaml        # saves as .yaml files
    format: yaml           # reads as YAML
    slug: "{{slug}}"       # filename = slugified title
    fields:
      - { label: "Nimi (FI)", name: "title_fi", widget: "string" }
      - { label: "Name (EN)", name: "title_en", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }
      - label: "Kategoria"
        name: "category"
        widget: "select"
        options: ["ohjelmisto", "lapset", "vieraileva", "menneet"]
      - { label: "Ensi-ilta", name: "premiereDate", widget: "date" }
      - { label: "Kansikuva", name: "coverImage", widget: "image" }
      - { label: "Kuvaus (FI)", name: "description_fi", widget: "markdown" }
      - { label: "Description (EN)", name: "description_en", widget: "markdown" }
      - { label: "Lippulinkki", name: "ticketUrl", widget: "string", required: false }
```

---

## YAML Content File Examples

### Fixed page (`content/pages/home.fi.yaml`)

```yaml
title: Tanssiteatteri Rimpparemmi
intro: >
  Pohjoisimman Suomen ammattitanssiteatteri,
  joka kiertää ympäri Suomen aina Lappiin saakka.
heroImage: /images/uploads/hero-2024.jpg
ctaText: Katso ohjelmisto
```

### Collection item (`content/productions/lumivalkea.yaml`)

```yaml
title_fi: Lumivalkea
title_en: Snow White
slug: lumivalkea
category: lapset
premiereDate: "2024-11-15"
coverImage: /images/uploads/lumivalkea-cover.jpg
description_fi: >
  Lumivalkea on tarina rohkeudesta ja ystävyydestä.
  Esitys sopii kaikenikäisille.
description_en: >
  Snow White is a story about courage and friendship.
  Suitable for all ages.
ticketUrl: https://kide.app/events/lumivalkea
```

---

## Common Widgets

| Widget | Use for | YAML output |
|--------|---------|-------------|
| `string` | Short text, titles, URLs | `title: "Teksti"` |
| `text` | Plain multi-line text | `intro: "Teksti\n..."` |
| `markdown` | Rich text (bold, links, lists) | `body: "**bold** text"` |
| `image` | Image upload | `image: /images/uploads/photo.jpg` |
| `file` | PDF or other file upload | `cvFile: /files/cv.pdf` |
| `date` | Date picker | `date: "2024-11-15"` |
| `datetime` | Date + time | `date: "2024-11-15T18:00:00"` |
| `boolean` | On/off toggle | `published: true` |
| `select` | Dropdown with fixed options | `category: lapset` |
| `list` | Repeating items (strings) | `tags:\n  - lapset\n  - kiertue` |
| `object` | Grouped fields | nested keys |

---

## List Widget — Repeating Items

For personnel cards, social links, photo galleries:

```yaml
# In config.yml
- label: "Henkilöstö"
  name: "personnel"
  widget: "list"
  fields:
    - { label: "Nimi", name: "name", widget: "string" }
    - { label: "Titteli", name: "title", widget: "string" }
    - { label: "Kuva", name: "photo", widget: "image" }
    - { label: "Sähköposti", name: "email", widget: "string" }
```

Resulting YAML file:

```yaml
personnel:
  - name: Matti Paloniemi
    title: Taiteellinen johtaja
    photo: /images/uploads/matti.jpg
    email: matti.paloniemi@rimpparemmi.fi
  - name: Liisa Penttilä
    title: Myynti
    photo: /images/uploads/liisa.jpg
    email: liisa.penttila@rimpparemmi.fi
```

---

## Reading YAML in Next.js

Install the parser:

```bash
npm install js-yaml
npm install --save-dev @types/js-yaml
```

Utility function (`src/lib/content.ts`):

```typescript
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function readYaml<T>(filePath: string): T {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return yaml.load(fileContents) as T;
}

export function readYamlCollection<T>(folderPath: string): T[] {
  const fullPath = path.join(process.cwd(), folderPath);
  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".yaml"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(fullPath, file), "utf8");
    return yaml.load(content) as T;
  });
}
```

Using it in a page (`getStaticProps`):

```typescript
import { readYaml, readYamlCollection } from "@/lib/content";

type HomeContent = {
  title: string;
  intro: string;
  heroImage: string;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const content = readYaml<HomeContent>(`content/pages/home.${locale}.yaml`);
  return { props: { content } };
};
```

---

## Tips for Avoiding Corruption

1. **Use `text` widget for plain multi-line text** — never `string` for long content
2. **Use `markdown` only where you actually need bold/links** — not for every field
3. **Avoid pasting from Word or Google Docs** into markdown fields — use plain text paste (`Ctrl+Shift+V`) or retype
4. **Use `select` widget for categories** — dropdown is safer than free-text fields
5. **Test copy-paste** in the CMS admin before handing over to client
6. **Keep required fields minimal** — the more fields that can be empty, the less confusion

---

## Netlify Identity Setup (client auth)

Client gets email + password login — no GitHub account needed.

1. Deploy to Netlify
2. Site Settings → Identity → Enable Identity
3. Settings → Identity → Services → Enable Git Gateway
4. Identity → Invite users → enter client's email
5. Client receives email, sets password, can log in at `yourdomain.com/admin/`

---

## Local Development (test without auth)

Add to `config.yml` for local testing:

```yaml
local_backend: true
```

Run the local proxy in a separate terminal:

```bash
npx decap-server
```

Visit `http://localhost:3000/admin/` — no login needed, reads/writes local files directly.

**Remove `local_backend: true` before deploying to production.**
