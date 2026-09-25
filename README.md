# Resilient Shores website

Website for **Resilient Shores: Adapting to Climate Change Through Storytelling** by Bob Freitag (Springer Nature, 2026). Built with [Jekyll](https://jekyllrb.com/), which GitHub Pages runs automatically. There's no build step to install.

## Where things live

```
_config.yml                 Site-wide settings: title, emails, Springer link, review mode
_data/navigation.yml        Menu links (used by both header and footer)
_layouts/default.html       Page shell every page uses
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
    author/                 Author photo
    book/                   Book cover
    worksheets/             Blank Resilience Story Board
  downloads/                PDF worksheets (blank and Eden family example)
index.html                  Home                      /
about/index.html            About the author          /about/
create-a-story/index.html   Why create a story?       /create-a-story/
  example/index.html        Eden family example       /create-a-story/example/
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
| Contact email, author email, Springer link | `_config.yml` |
| Colors, fonts, spacing | `assets/css/main.css` (colors are variables at the top) |
| Page text | That page's `index.html` |
| A page's search title/description | The `title:` and `description:` lines at the top of that page |

Every page gets the header, band, and footer from the files above, so a change there shows up site-wide.

## Publishing on GitHub Pages

1. Create a repository and upload everything in this folder (keep the folder structure).
2. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. After a minute or two the site is live at `https://<username>.github.io/<repo-name>/`. Every push rebuilds it.

Don't add a `.nojekyll` file; Jekyll needs to run to assemble the header and footer.

## Caching

CSS and JavaScript are separate files, so browsers cache them across pages. Their links include a version stamp that changes on every build, so visitors get your updates right away instead of a stale cached copy.

## Before launch

- [ ] In `_config.yml`, set `noindex: false` (the draft currently tells search engines not to index it).
- [ ] Confirm `author_email` in `_config.yml` (currently ag@outlook.com).
- [ ] To use ResilientShores.org: add the domain under **Settings → Pages → Custom domain** (GitHub creates a `CNAME` file), then point the domain's DNS at GitHub Pages.

## Preview locally (optional)

Requires Ruby. Then:

```
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000.
