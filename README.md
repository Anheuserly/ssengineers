# S.S. Engineers & Consultants

Next.js service website for S.S. Engineers & Consultants.

## Data

The website uses the central AMC MEP PostgreSQL database. The survey form creates a `work_requests` record and a matching S.S. Engineers target. The service catalogue contains 50 quote-on-request listings with media URLs.

## Local setup

Copy `.env.example` to `.env.local`, configure the database URL and business ID, then run `npm run dev`.
