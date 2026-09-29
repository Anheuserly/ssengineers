export const SERVICE_BUCKET_STORAGE_KEY = "ss_service_bucket_v1";
export const SERVICE_BUCKET_UPDATED_EVENT = "ss:service-bucket-updated";

export type BucketService = {
  name: string;
  category: string;
};

const isBucketService = (value: unknown): value is BucketService => {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<BucketService>;
  return typeof item.name === "string" && typeof item.category === "string";
};

export const readServiceBucket = (): BucketService[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(SERVICE_BUCKET_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isBucketService) : [];
  } catch {
    return [];
  }
};

export const writeServiceBucket = (items: BucketService[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SERVICE_BUCKET_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent(SERVICE_BUCKET_UPDATED_EVENT, { detail: items })
  );
};

export const toggleServiceBucketItem = (item: BucketService) => {
  const current = readServiceBucket();
  const exists = current.some((entry) => entry.name === item.name);
  const next = exists
    ? current.filter((entry) => entry.name !== item.name)
    : [...current, item];
  writeServiceBucket(next);
  return next;
};
