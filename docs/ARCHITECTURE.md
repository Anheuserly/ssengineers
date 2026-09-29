# S.S. Engineers Website Architecture

## Purpose

The public website presents verified company capability and converts a visitor's chosen services into one engineering enquiry. It is not a price catalogue: scope, compliance and commercial terms are evaluated after technical review.

## Main flows

1. A visitor browses the published service catalogue.
2. They add one or more services to the browser-local service bucket.
3. The bucket page collects site and contact details.
4. `POST /api/service-request` creates one `work_requests` record and one direct `work_request_targets` record for the S.S. Engineers business in the central AMC MEP database.
5. The operations team reviews the request and responds using its normal work-request workflow.

## Data boundaries

- Public website: static company content, project material and service capability descriptions.
- Browser: selected service names and categories only, stored under `ss_service_bucket_v1`; no contact data is stored in the bucket.
- Server: validates and writes service requests to the central PostgreSQL database using `AMCMEP_DATABASE_URL`.
- Database tenant: `SS_ENGINEERS_BUSINESS_ID` scopes every website-generated work request to S.S. Engineers & Consultants.

## Platform handoff

The S.S. Engineers site links to the shared AMC MEP 24x7 One App for account access. Its canonical web login destination is `https://amcmep.in/login`; mobile store links are maintained in `lib/content.ts` alongside the product name.

## Environment variables

Required production variables:

- `AMCMEP_DATABASE_URL`
- `SS_ENGINEERS_BUSINESS_ID`
- `PORTAL_SESSION_SECRET`

Do not add legacy third-party backend configuration or browser-exposed secrets to project environment files.

## Security notes

- The API validates required contact fields and bounds user-provided text.
- The form includes a honeypot field to reject basic automated submissions.
- Cookie preferences are stored only after client hydration to avoid server/client HTML mismatches.
- Real listing media must be attached to a verified individual listing; generic website photography must not be presented as service-specific media.
