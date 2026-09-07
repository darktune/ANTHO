# ANTHO: Vercel Deployment & Supabase Backend Guide

This guide walks you through connecting your **ANTHO** GitHub repository (`darktune/ANTHO`) to **Vercel** with a **Supabase PostgreSQL** backend, using the high-performance pooler architecture established across your projects (e.g. `SIPHOON`).

---

## 1. Supabase Setup

1. **Create a Supabase Project**:
   - Log into [Supabase Dashboard](https://supabase.com/dashboard).
   - Click **New project**, name it `antho` (or `antho-store`), set your database password, and pick the closest region (e.g., Frankfurt/London or US East).

2. **Retrieve PostgreSQL Connection Strings**:
   - Go to **Project Settings** (gear icon) > **Database** > **Connection string**.
   - Under **Transaction pooler** (Port `6543`), copy the URI and ensure `?pgbouncer=true` is appended:
     ```
     postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
     *(This is your `DATABASE_URL`)*
   - Under **Session** mode or Direct connection (Port `5432`), copy the URI:
     ```
     postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
     ```
     *(This is your `DIRECT_URL`)*

3. **Retrieve API Keys**:
   - Go to **Project Settings** > **API**.
   - Copy:
     - **Project URL** &rarr; `NEXT_PUBLIC_SUPABASE_URL`
     - **anon / public key** &rarr; `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role secret key** &rarr; `SUPABASE_SERVICE_ROLE_KEY`

4. **Push Schema to Supabase**:
   From your local terminal with `DATABASE_URL` and `DIRECT_URL` configured in `.env`:
   ```bash
   npm run db:push
   ```
   To seed initial collections, categories, and products:
   ```bash
   npm run db:seed
   ```

---

## 2. Connect GitHub to Vercel (Continuous Deployment)

1. **Import Repository in Vercel**:
   - Open [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New...** &rarr; **Project**.
   - Select **GitHub** and locate `darktune/ANTHO` (or your connected account/org).
   - Click **Import**.

2. **Configure Project Settings**:
   - **Framework Preset**: Next.js (automatically detected).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: `prisma generate && next build` (defined in `vercel.json` and `package.json`).
   - **Install Command**: `npm install` (default).

3. **Add Environment Variables**:
   In the **Environment Variables** section on Vercel, copy values from your `.env.example`:

   | Variable Name | Value Description | Environment |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | Supabase Pooler Port `6543` with `?pgbouncer=true` | Production, Preview, Dev |
   | `DIRECT_URL` | Supabase Direct Port `5432` | Production, Preview, Dev |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://[PROJECT-REF].supabase.co` | Production, Preview, Dev |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public Anon Key | Production, Preview, Dev |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase Secret Service Key | Production, Preview, Dev |
   | `NEXTAUTH_SECRET` | 32-character random string | Production, Preview, Dev |
   | `NEXTAUTH_URL` | `https://[YOUR-VERCEL-DOMAIN].vercel.app` | Production, Preview, Dev |
   | `NEXT_PUBLIC_SITE_URL` | `https://[YOUR-VERCEL-DOMAIN].vercel.app` | Production, Preview, Dev |
   | `ADMIN_EMAIL` | Admin login email | Production |
   | `ADMIN_PASSWORD` | Admin login password | Production |
   | `PAYSTACK_PUBLIC_KEY` | Live or test public key (`pk_...`) | Production, Preview |
   | `PAYSTACK_SECRET_KEY` | Live or test secret key (`sk_...`) | Production, Preview |

4. **Deploy**:
   - Click **Deploy**.
   - Vercel will clone `darktune/ANTHO`, execute `prisma generate`, compile the Next.js storefront, and assign your live production URL (e.g., `https://antho.vercel.app`).
   - Any future `git push origin main` will automatically build and deploy new updates.

---

## 3. Storage Buckets (Optional for Media Uploads)

If you plan to allow users or admins to upload custom lookbook/product photos via the dashboard:
1. Go to Supabase > **Storage** > **Create new bucket**.
2. Name it `antho-media` and toggle **Public bucket** ON.
3. Access media through `https://[YOUR-PROJECT-REF].supabase.co/storage/v1/object/public/antho-media/...`.
