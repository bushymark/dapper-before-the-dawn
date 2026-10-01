# Dapper Before the Dawn — public campaign wiki

Curated Pathfinder 2e campaign chronicles, built with Quartz 5 and published at https://bushymark.github.io/dapper-before-the-dawn/.

This public repository contains selected campaign pages and website code. It does not contain original transcripts/recordings or the private GM biography. Source locators remain in published notes; originals are held in the private archive. Campaign spoilers are present.

## Build locally

Use Node 24 or newer and npm 10.9.2 or newer:

```sh
npm ci
npx quartz build --serve
```

Content is generated from an explicit publication list in the private campaign wiki. Update canonical lore there and re-export it; edits to these generated copies can be overwritten. GitHub Actions builds and deploys on pushes to main.

Quartz is MIT licensed; see LICENSE.txt and UPSTREAM.md. No analytics are configured.
