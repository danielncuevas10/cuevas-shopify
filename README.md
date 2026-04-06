# Cuevas Storefront

**Cuevas** is a high-end, alternative e-commerce experience.
Moving away from standard Shopify templates, this project utilizes a **Headless Architecture** made at home, to provide a bespoke UI that matches the brand's unique aesthetic.

## The Goal
The objective was to move beyond the basic liquid-based themes. By using Shopify as a headless commerce engine, I gained total control over the user experience—implementing custom slide-out animations, a unique grid system, and a highly optimized cart flow.

## Process
1. **Design First:** Every interaction, from the sliding navigation menu to the cart drawer, was first prototyped in **Figma** to ensure a premium feel.
2. **Type-Safe Commerce:** Built with **TypeScript**, ensuring that product data fetching from the Shopify Storefront API is predictable and robust.
3. **Performance:** Leveraged **Next.js Server Components** and **Client Components** strategically to ensure instant page loads while maintaining a dynamic shopping cart.
4. **Deployment:** Hosted on **Vercel** with a CI/CD pipeline, including real-time performance monitoring and analytics.

## Tech Stack
* **Next.js (App Router)** — The backbone for server-side rendering and routing.
* **Shopify Storefront API** — GraphQL-based headless commerce engine for products and checkout.
* **TypeScript** — Ensuring strict type safety across the entire data layer.
* **Tailwind CSS** — Utility-first styling for a responsive, desktop-first design.
* **React Context** — Global state management for the shopping cart and UI toggles.
* **Vercel** — Production-grade deployment, hosting, and edge analytics.

## Key Features
* **Headless Integration:** Complete separation of the frontend from the Shopify backend.
* **Custom Cart Logic:** A fully bespoke React-based cart with local storage persistence and subtotal formatting.
* **Mobile-Optimized UX:** A custom sliding navigation menu and a "grounded" cart drawer designed for thumb-friendly interaction.
* **Responsive Architecture:** A desktop-first approach that gracefully adapts to tablets and mobile devices.

## Live Demo
[https://cuevas-shopify.vercel.app/]