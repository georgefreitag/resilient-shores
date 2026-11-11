# Resilient Shores website

Website for **Resilient Shores: Adapting to Climate Change Through Storytelling** by Bob Freitag (Springer Nature, 2026). Built with [Jekyll](https://jekyllrb.com/), which GitHub Pages runs automatically. There's no build step to install.

## Where things live

```
_config.yml                 Site-wide settings: title, emails, Springer link, review mode
_data/navigation.yml        Menu links (used by both header and footer)
_data/team.yml              Team bios on the About our team page
_layouts/default.html       Page shell every page uses
_layouts/example.html       Filled-in worksheet layout used by the example pages
_includes/
  head.html                 <head>: SEO tags, fonts, stylesheet
  header.html               Sticky green header and menu
  community-cta.html        "Creating a community story?" band above the footer
  footer.html               Footer links, share buttons, copyright
assets/
  css/main.css              All styles
  js/main.js                Menu, share buttons, worksheet scaling, contact form
  images/
    artwork/                Watercolors and pastels
    team/                   Team photos
    book/                   Book cover
    worksheets/             Blank Resilience Story Board
  downloads/                PDF worksheets (blank and Eden family example)
index.html                  Home                      /
about/index.html            About our team            /about/
create-a-story/index.html   Why create a story?       /create-a-story/
  example-eden-family/      Eden family example       /create-a-story/example-eden-family/
  example-tiggers-compromise/  Tigger example        /create-a-story/example-tiggers-compromise/
  your-story/index.html     Blank worksheet           /create-a-story/your-story/
lets-chat/index.html        Contact                   /lets-chat/
404.html                    Page-not-found
robots.txt                  Search engine rules (follows review mode)
```

## Common edits

| To change… | Edit |
|---|---|
| Header or logo | `_includes/header.html` |
| Menu links (header + footer) | `_data/navigation.yml` |
| Footer | `_includes/footer.html` |
| "Creating a community story?" band | `_includes/community-cta.html` (hide it on a page with `hide_cta: true` in that page's front matter) |
| Contact email, Springer link | `_config.yml` |
| Team members, bios, photos, emails | `_data/team.yml` (photos in `assets/images/team/`) |
| Colors, fonts, spacing | `assets/css/main.css` (colors are variables at the top) |
| Page text | That page's `index.html` |
| Example stories (text, arc labels) | The front matter at the top of each `create-a-story/example-*/index.html` |
| A page's search title/description | The `title:` and `description:` lines at the top of that page |

Every page gets the header, band, and footer from the files above, so a change there shows up site-wide.

## Publishing on GitHub Pages

1. Create a repository and upload everything in this folder (keep the folder structure, including the hidden `.github` folder).
2. Create a `staging` branch: `git checkout -b staging && git push -u origin staging && git checkout main`.
3. Go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
4. Go to **Settings → Environments → github-pages** and add `staging` to the allowed deployment branches.
5. Every push to `main` or `staging` rebuilds and publishes both.

Don't add a `.nojekyll` file; Jekyll needs to run to assemble the header and footer.

## Live site and staging

| Branch | Publishes to | Search engines |
|---|---|---|
| `main` | https://resilientshores.org/ | Controlled by `noindex` in `_config.yml` |
| `staging` | https://resilientshores.org/staging/ | Always noindex, and blocked in the root `robots.txt` |

The workflow in `.github/workflows/pages.yml` builds both branches on every push and publishes them together. Staging uses the settings in `_config.staging.yml`: an orange "Staging" bar, noindex, no analytics, and no sitemap entries.

Typical flow:

```
git checkout staging        # work on staging
git add . && git commit -m "Describe the change" && git push
# review at resilientshores.org/staging/, then publish it live:
git checkout main
git merge staging
git push
git checkout staging
```

## Analytics

Google Tag Manager loads on the live site only, using `gtm_id` in `_config.yml`. It's left off staging and local previews so test visits don't count.

## Caching

CSS and JavaScript are separate files, so browsers cache them across pages. Their links include a version stamp that changes on every build, so visitors get your updates right away instead of a stale cached copy.

## Before launch

- [ ] In `_config.yml` on `main`, set `noindex: false` (the live site currently tells search engines not to index it). Staging stays noindex either way.
- [ ] To use ResilientShores.org: add the domain under **Settings → Pages → Custom domain** (GitHub creates a `CNAME` file), then point the domain's DNS at GitHub Pages.

## Preview locally (optional)

Requires Ruby. Then:

```
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000.
