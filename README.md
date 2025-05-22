My KoinX Assignment submission for the Front-END Intern Role 
Saw the tweet on May 20 9:30pm, Stayed up all night and delivered the final product at 7:30am May 21.
Tech stack was nextjs, tailwindsCSS, shadcn and used UseContext for state management.
Assignment - (https://koinx.notion.site/KoinX-Tax-Loss-Harvesting-Assignment-1eeda378a243800b96fcd67178aa77dd)
Deployed - (https://koinx-assignment-rho.vercel.app/)

# 📊 Tax Harvesting Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A dashboard for analyzing and optimizing crypto capital gains through tax-loss harvesting, with a clean, modular architecture and responsive UI.


## 🚀 Features

✅ **Mobile Responsive UI** – Seamlessly adapts to all screen sizes.
✅ **Reusable Components** – Built with clarity and reusability in mind using a component-driven approach (`/components`).
✅ **State Management with Context API** – Used `useContext` for managing selected holdings (`/Context`).
✅ **Visual Feedback** –

* Hover states on interactive elements
* Row highlighting when selected
  ✅ **Custom Hooks** – API interactions handled using `useCapitalGains` and `useHoldings` hooks for better separation of concerns (`/hooks`).
  ✅ **Loader and Error States** – Display feedback during API calls for better UX.
  ✅ **Deployed on Vercel** –
  🌐 [Live Demo](https://koinx-assignment-rho.vercel.app/)*


## 🧭 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action.


---

## 🧱 Folder Structure Overview

```
src/
├── app/
│   ├── api/                  # API routes (capital gains, holdings)
│   ├── components/           # UI & functional components
│   ├── Context/              # Global state using React Context
│   ├── hooks/                # Custom hooks for API interactions
│   ├── lib/                  # Utility functions
│   ├── theme/                # Theme toggle and provider setup
│   ├── Types.ts              # Shared TypeScript types

```

---

## 📦 Deployment

Deployed on [Vercel](https://vercel.com).
🔗 **Live Project**: https://koinx-assignment-rho.vercel.app/

## Dark Mode Screenshots
![first-part](image.png)
![second-part](image-1.png)

## Light Mode Screenshots
![first-part](image-2.png)
![second-part](image-3.png)
