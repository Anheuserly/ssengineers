-- S.S. Engineers & Consultants public business profile and service catalogue.
-- This seed is idempotent and uses quote-on-request service listings only.

INSERT INTO businesses (
  id, business_id, name, kind, location, plan_tier, legal_name, tagline,
  regd_office, support_email, support_phone, website, description, metadata
) VALUES (
  '30ddc1d6-9961-4ce1-98ad-aeb897fd9242', 'ssengineers', 'S.S. Engineers & Consultants',
  'service_provider', 'New Delhi, India', 'silver', 'S.S. Engineers & Consultants',
  'Fire Protection & MEP Specialists',
  'Plot No. 535, Second Floor, Left Side, Khasra No. 60, 128-D21, Chattarpur Pahadi, New Delhi - 110074',
  'anilkumarsaini0507@gmail.com', '9871936847', 'https://www.ssengineers.in',
  'Design, supply, installation, testing, commissioning, AMC and maintenance for fire protection, electrical, plumbing, ELV, security and related MEP systems.',
  '{"website":"ssengineers.in","service_model":"quote_on_request","catalogue_visibility":"public"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  business_id = EXCLUDED.business_id, name = EXCLUDED.name, kind = EXCLUDED.kind,
  location = EXCLUDED.location, plan_tier = EXCLUDED.plan_tier, legal_name = EXCLUDED.legal_name,
  tagline = EXCLUDED.tagline, regd_office = EXCLUDED.regd_office,
  support_email = EXCLUDED.support_email, support_phone = EXCLUDED.support_phone,
  website = EXCLUDED.website, description = EXCLUDED.description, metadata = EXCLUDED.metadata,
  updated_at = now();

INSERT INTO business_memberships (business_id, user_id, role, status, permissions, is_primary, invited_by)
VALUES (
  '30ddc1d6-9961-4ce1-98ad-aeb897fd9242', 'u89c907f4', 'owner', 'active',
  '["manage_business","manage_members","manage_requests","manage_products"]'::jsonb, true, 'system'
) ON CONFLICT (business_id, user_id) DO UPDATE SET
  role = EXCLUDED.role, status = 'active', permissions = EXCLUDED.permissions,
  is_primary = true, updated_at = now();

-- The 50 quote-on-request service records were applied to the live catalogue.
-- Their canonical website source is lib/service-catalog.ts. Keep that file and
-- this database catalogue aligned whenever a capability is added or retired.
