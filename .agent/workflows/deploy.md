---
description: How to host the Oscar Edu Hyper Mart project for free
---

# Free Hosting Guide

This guide explains how to deploy your project using the free tiers of **Vercel** (for the frontend) and **Sanity** (for the content management).

## 1. Prerequisites
- A [GitHub](https://github.com) account.
- A [Vercel](https://vercel.com) account.
- Your project code pushed to a GitHub repository.

## 2. Deploying Sanity Studio
Sanity provides free managed hosting for your Studio.

1.  Open your terminal in the `studio` directory.
2.  Run the following command:
    ```powershell
    npx sanity deploy
    ```
3.  Follow the prompts to choose a URL (e.g., `oscar-edu-hyper-mart.sanity.studio`).
4.  Once finished, your Studio is live!

## 3. Deploying Next.js Frontend (Vercel)
Vercel is the best way to host Next.js apps for free.

1.  Push your entire project (including the root `package.json`) to GitHub.
2.  Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New" -> "Project"**.
3.  Import your GitHub repository.
4.  **Important**: In the **Environment Variables** section, add your Sanity Project ID:
    - Key: `NEXT_PUBLIC_SANITY_PROJECT_ID`
    - Value: `4zr5h0mx`
5.  Click **"Deploy"**.

## 4. Final Step: CORS Settings
To allow your deployed frontend to talk to Sanity, you must add the Vercel URL to Sanity's CORS list.

1.  Go to [Sanity Manage](https://www.sanity.io/manage).
2.  Select your project (`4zr5h0mx`).
3.  Go to **API -> CORS Origins** and click **"Add CORS origin"**.
4.  Enter your Vercel URL (e.g., `https://oscar-edu-hyper-mart.vercel.app`) and check **"Allow credentials"**.

---
// turbo-all
