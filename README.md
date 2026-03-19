## SS Engineers Website

Marketing website and lead-capture platform for SS Engineers, built with Next.js App Router and Appwrite-backed form APIs.

### Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Appwrite Database + Storage (for form submissions and resume uploads)
- ESLint (Next.js config)

### Prerequisites

- Node.js 20+
- npm 10+
- Appwrite project with required database collections and bucket

### Quick Start

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in the Appwrite values in `.env.local`.

4. Start development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Required variables are documented in [`.env.example`](./.env.example).

Important keys:
- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_API_KEY` (required for career resume upload)
- `APPWRITE_CONTACTS_COLLECTION_ID`
- `APPWRITE_SERVICE_REQUESTS_COLLECTION_ID`
- `APPWRITE_CAREER_COLLECTION_ID`
- `APPWRITE_VENDOR_REGISTRATIONS_COLLECTION_ID`
- `APPWRITE_FEEDBACK_COLLECTION_ID`
- `APPWRITE_TESTIMONIALS_COLLECTION_ID`
- `APPWRITE_CAREER_BUCKET_ID`

### Compliance PDFs (ESI / PF / GST / MSME / Company Profile)

Upload public-facing qualification PDFs to:

`/public/documents`

Use these exact filenames:
- `esi-registration.pdf`
- `pf-registration.pdf`
- `gst-delhi-certificate.pdf`
- `gst-haryana-certificate.pdf`
- `msme-udyam-certificate.pdf`
- `company-profile.pdf`

These are linked automatically from:
- `/compliance-documents`
- Home page `Quick Access > Compliance Documents`
- Footer `Compliance Documents` quick link

### Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint checks
- `npm run appwrite:sync` - create/update required Appwrite collections, attributes, indexes, and career bucket
- `npm run sync:project-images` - import project-wise images from configured MediaFire folder

### Project Structure

- `app/` - pages, layouts, and API routes (`app/api/*/route.ts`)
- `components/` - reusable UI and form components
- `lib/` - static content and server validation utilities
- `functions/` - shared Appwrite helper functions
- `public/` - static assets

### Form API Endpoints

- `POST /api/contact` - contact form submission
- `POST /api/service-request` - service inquiry submission
- `POST /api/career` - career application + resume upload
- `POST /api/vendor-registration` - vendor pre-qualification registration
- `POST /api/feedback` - saves feedback directly to Appwrite `feedback` collection
- `GET /api/testimonials` - returns published testimonials (Appwrite-backed with static fallback)

All endpoints validate and sanitize inputs server-side.

Testimonials and feedback are intentionally separated:
- Feedback form submissions go to `feedback` for internal review.
- Public testimonial cards read from `testimonials` where `status` should be `published`.

`npm run appwrite:sync` also updates existing string-attribute constraints (for example size/required/default) to match the current API payload schema.

### Appwrite Contacts Attributes (Chat Leads)

Chat lead saves now store these fields as dedicated attributes in the `contacts` collection:
- `location` (string, 180)
- `requirement` (string, 2000)
- `timeline` (string, 120)
- `budget` (string, 120)

If these attributes are missing, the API auto-creates them using Appwrite Admin API before inserting the lead document.
This requires `APPWRITE_API_KEY` with permission to manage database attributes.

### Deploy

Standard Next.js deployment works (Vercel, self-hosted Node, containerized setups).  
Ensure all required environment variables are configured in the target environment.
