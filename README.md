# Anatare Nigeria Codebase

[![Deployed to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/)

## Features

- Vue 3 via Nuxt 4
- Server-Side rendering on Cloudflare Workers
- [Drizzle ORM with SQLite](https://hub.nuxt.com/docs/recipes/drizzle)

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and update the variables with your own values.

The `BETTER_AUTH_SECRET` should be a random string of your choosing used by Better Auth for encryption and generating hashes.

## Database Migration

Run a database migration:

```bash
pnpm db:generate
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy

Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server logs, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).
