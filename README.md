<p align="center">
<img src="https://img.shields.io/github/languages/top/AlvaroAquijeDiaz/wait4it" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/AlvaroAquijeDiaz/wait4it" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/stars/AlvaroAquijeDiaz/wait4it" alt="GitHub stars" />
<img src="https://img.shields.io/github/deployments/AlvaroAquijeDiaz/wait4it/production" alt="GitHub deployment" />
</p>

# 📌 Overview

Wait4it is a project that relies on various essential dependencies, including auth, formkit, radix-ui, tailwindcss, tiptap, trpc, next-auth, and many others. It utilizes a wide range of tools and libraries to deliver its functionality.

## 🔍 Table of Contents

- [📌 Overview](#-overview)
  - [🔍 Table of Contents](#-table-of-contents)
  - [📁 Project Structure](#-project-structure)
  - [✅ Prerequisites](#-prerequisites)
  - [🚀 Run Locally](#-run-locally)
  - [🤔 FAQ](#-faq)
    - [1. What is this project about?](#1-what-is-this-project-about)
    - [2. Can I contribute to this project?](#2-can-i-contribute-to-this-project)
    - [3. Release date?](#3-release-date)
  - [🗺️ Roadmap](#️-roadmap)
  - [🙏 Acknowledgements](#-acknowledgements)
  - [Notes](#notes)

## 📁 Project Structure

```bash
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── README.md
├── components.json
├── dbml.ts
├── drizzle.config.ts
├── kirimase.config.json
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── prettier.config.mjs
├── public
│   ├── next.svg
│   └── vercel.svg
├── schema.dbml
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   ├── email
│   │   │   │   └── route.ts
│   │   │   ├── friends
│   │   │   │   └── route.ts
│   │   │   ├── people
│   │   │   │   └── route.ts
│   │   │   ├── secrets
│   │   │   │   └── route.ts
│   │   │   ├── trpc
│   │   │   │   └── [trpc]
│   │   │   │       └── route.ts
│   │   │   └── user
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── home
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── people
│   │   │   │   └── page.tsx
│   │   │   └── secrets
│   │   │       ├── [id]
│   │   │       │   └── page.tsx
│   │   │       └── new
│   │   │           └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── my
│   │   │   └── settings
│   │   │       └── page.tsx
│   │   ├── page.tsx
│   │   └── resend
│   │       └── page.tsx
│   ├── components
│   │   ├── auth
│   │   │   ├── SignIn.tsx
│   │   │   └── SignOut.tsx
│   │   ├── emails
│   │   │   └── FirstEmail.tsx
│   │   ├── my
│   │   │   └── SettingsForm.tsx
│   │   ├── people
│   │   │   ├── FindPeople.tsx
│   │   │   ├── FriendCard.tsx
│   │   │   ├── FriendsList.tsx
│   │   │   ├── RequestCard.tsx
│   │   │   ├── RequestsList.tsx
│   │   │   ├── UserCard.tsx
│   │   │   ├── completed-profile.tsx
│   │   │   ├── requests-for-user.tsx
│   │   │   └── uncomplete-profile.tsx
│   │   ├── secrets
│   │   │   ├── MySecretsList.tsx
│   │   │   ├── SecretEditor.tsx
│   │   │   ├── SecretForm.tsx
│   │   │   ├── SecretModal.tsx
│   │   │   └── Tiptap.tsx
│   │   └── ui
│   │       └── [shadcn-ui] components
│   ├── lib
│   │   ├── api
│   │   │   ├── friendships
│   │   │   │   ├── mutations.ts
│   │   │   │   └── queries.ts
│   │   │   ├── secrets
│   │   │   │   ├── mutations.ts
│   │   │   │   └── queries.ts
│   │   │   └── user
│   │   │       ├── mutations.ts
│   │   │       └── queries.ts
│   │   ├── auth
│   │   │   ├── Provider.tsx
│   │   │   └── utils.ts
│   │   ├── db
│   │   │   ├── index.ts
│   │   │   ├── migrate.ts
│   │   │   ├── migrations
│   │   │   │   └── meta
│   │   │   │       └── _journal.json
│   │   │   └── schema
│   │   │       ├── attachments.ts
│   │   │       ├── auth.ts
│   │   │       ├── index.ts
│   │   │       └── secrets.ts
│   │   ├── email
│   │   │   ├── index.ts
│   │   │   └── utils.ts
│   │   ├── env.mjs
│   │   ├── hooks
│   │   │   ├── useDebounce.tsx
│   │   │   └── useMounted.tsx
│   │   ├── server
│   │   │   ├── routers
│   │   │   │   ├── _app.ts
│   │   │   │   ├── friendships.ts
│   │   │   │   ├── secrets.ts
│   │   │   │   └── user.ts
│   │   │   └── trpc.ts
│   │   ├── trpc
│   │   │   ├── Provider.tsx
│   │   │   ├── api.ts
│   │   │   ├── client.ts
│   │   │   ├── context.ts
│   │   │   └── utils.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   └── styles
│       └── globals.css
├── tailwind.config.ts
└── tsconfig.json
```

## ✅ Prerequisites

- Planetscale DB -> create it [here](https://app.planetscale.com)
  - Get the `Connection Details` from them and populate the `.env`

## 🚀 Run Locally

1.Clone the wait4it repository:

```sh
git clone https://github.com/AlvaroAquijeDiaz/wait4it
```

2.Install the dependencies with one of the package managers listed below:

```bash
pnpm install
bun install
```

3.Start the development mode:

```bash
pnpm dev
bun dev
```

## 🤔 FAQ

#### 1. What is this project about?

This project is fun way to share secrets between friends, allowing the reveal of them only at a certain date, all data is encrypted and unable to be seen by other users

#### 2. Can I contribute to this project?

Yes, we welcome contributions! Head over to [**Issues**](https://github.com/AlvaroAquijeDiaz/wait4it/issues) and follow this format:

1. Title: [`BUG | FEATURE-REQUEST | HELP`] \<descriptive title>
2. Description: As long as you want, proving screenshots is hugely welcomed

> _Please note that we're only allowing bugs/issues submission, it's possible that we'll enable PRs soon_

#### 3. Release date?

Intended to reach sunlight in two weeks from this commit - aprox (30 oct 2023)

## 🗺️ Roadmap

- May post tasks, updates and project from **Linear** here

## 🙏 Acknowledgements

- [EasyReadme](https://easyreadme.vercel.app/) - for this documentation template generation
- [Kirimase](https://github.com/nicoalbanese/kirimase) - for **easy** project boilerplate/scaffolding
- [This article](https://www.joshwcomeau.com/react/server-components/) - very useful to understand the new paradigms on next.js and react
- [Linear](https://linear.app) - I think we all know them lol
- [shadcn-ui](https://ui.shadcn.com) - Radix-ui - based, headless components

## Notes

- Components divided into
  - RSC => (kebab-case).tsx
  - Client Components => (PascalCase).tsx
    - UI - (kebab-case).tsx
  - Hooks => (camelCase).tsx
- Pages
  - (kebab-case).tsx
