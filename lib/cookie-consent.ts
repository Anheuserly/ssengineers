export const COOKIE_CONSENT_STORAGE_KEY = "ss_cookie_preferences_v1";
export const COOKIE_CONSENT_COOKIE = "ss_cookie_preferences";
export const COOKIE_ANALYTICS_COOKIE = "ss_cookie_analytics";
export const COOKIE_MARKETING_COOKIE = "ss_cookie_marketing";
export const COOKIE_CONSENT_SET_COOKIE = "ss_cookie_consent_set";

export const OPEN_COOKIE_PREFERENCES_EVENT = "ss:open-cookie-preferences";
export const COOKIE_PREFERENCES_UPDATED_EVENT = "ss:cookie-preferences-updated";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: number;
};
