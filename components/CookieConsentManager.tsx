"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  COOKIE_ANALYTICS_COOKIE,
  COOKIE_CONSENT_COOKIE,
  COOKIE_CONSENT_SET_COOKIE,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_MARKETING_COOKIE,
  COOKIE_PREFERENCES_UPDATED_EVENT,
  CookiePreferences,
  OPEN_COOKIE_PREFERENCES_EVENT,
} from "@/lib/cookie-consent";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

const createPreferences = (input?: Partial<CookiePreferences>): CookiePreferences => ({
  necessary: true,
  analytics: Boolean(input?.analytics),
  marketing: Boolean(input?.marketing),
  updatedAt: input?.updatedAt || new Date().toISOString(),
  version: 1,
});

const parsePreferences = (raw: string): CookiePreferences | null => {
  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return createPreferences(parsed);
  } catch {
    return null;
  }
};

const readCookieValue = (name: string): string => {
  const encodedName = `${name}=`;
  const parts = document.cookie.split(";").map((part) => part.trim());
  const hit = parts.find((part) => part.startsWith(encodedName));
  if (!hit) {
    return "";
  }
  return decodeURIComponent(hit.slice(encodedName.length));
};

const readSavedPreferences = (): CookiePreferences | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const fromStorage = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (fromStorage) {
    const parsed = parsePreferences(fromStorage);
    if (parsed) {
      return parsed;
    }
  }

  const fromCookie = readCookieValue(COOKIE_CONSENT_COOKIE);
  if (!fromCookie) {
    return null;
  }
  return parsePreferences(fromCookie);
};

const writeCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
};

const persistPreferences = (preferences: CookiePreferences) => {
  const serialized = JSON.stringify(preferences);
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);

  writeCookie(COOKIE_CONSENT_COOKIE, serialized);
  writeCookie(COOKIE_ANALYTICS_COOKIE, preferences.analytics ? "granted" : "denied");
  writeCookie(COOKIE_MARKETING_COOKIE, preferences.marketing ? "granted" : "denied");
  writeCookie(COOKIE_CONSENT_SET_COOKIE, "1");

  window.dispatchEvent(
    new CustomEvent(COOKIE_PREFERENCES_UPDATED_EVENT, {
      detail: preferences,
    })
  );
};

export default function CookieConsentManager() {
  const [initialPreferences] = useState<CookiePreferences | null>(() =>
    readSavedPreferences()
  );
  const [isOpen, setIsOpen] = useState(() => !initialPreferences);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [hasSavedChoice, setHasSavedChoice] = useState(Boolean(initialPreferences));
  const [draftAnalytics, setDraftAnalytics] = useState(
    initialPreferences?.analytics || false
  );
  const [draftMarketing, setDraftMarketing] = useState(
    initialPreferences?.marketing || false
  );

  const previewPreferences = useMemo(
    () =>
      createPreferences({
        analytics: draftAnalytics,
        marketing: draftMarketing,
      }),
    [draftAnalytics, draftMarketing]
  );

  useEffect(() => {
    const openPreferences = () => {
      setIsOpen(true);
      setIsCustomizing(true);
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  const commit = (preferences: CookiePreferences) => {
    persistPreferences(preferences);
    setDraftAnalytics(preferences.analytics);
    setDraftMarketing(preferences.marketing);
    setHasSavedChoice(true);
    setIsCustomizing(false);
    setIsOpen(false);
  };

  const acceptAll = () => {
    commit(
      createPreferences({
        analytics: true,
        marketing: true,
      })
    );
  };

  const rejectOptional = () => {
    commit(
      createPreferences({
        analytics: false,
        marketing: false,
      })
    );
  };

  const saveSelection = () => {
    commit(previewPreferences);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section
      className={`cookie-consent ${isCustomizing ? "expanded" : ""}`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Preferences"
    >
      <div className="cookie-consent-head">
        <div>
          <p className="cookie-consent-kicker">Privacy Controls</p>
          <p className="cookie-consent-title">Cookie Preferences</p>
        </div>
        {hasSavedChoice ? (
          <button
            type="button"
            className="cookie-consent-close"
            aria-label="Close cookie settings"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        ) : null}
      </div>

      <p className="cookie-consent-copy">
        Essential cookies keep this website secure. Optional cookies help us improve
        performance and communication.
      </p>

      {isCustomizing ? (
        <div className="cookie-consent-grid">
          <label className="cookie-pref-row">
            <span>
              <strong>Necessary</strong>
              <small>Always active for site security and core functionality.</small>
            </span>
            <input type="checkbox" checked readOnly disabled />
          </label>
          <label className="cookie-pref-row">
            <span>
              <strong>Analytics</strong>
              <small>Helps us understand visits and improve website performance.</small>
            </span>
            <input
              type="checkbox"
              checked={draftAnalytics}
              onChange={(event) => setDraftAnalytics(event.target.checked)}
            />
          </label>
          <label className="cookie-pref-row">
            <span>
              <strong>Marketing</strong>
              <small>Supports campaign tracking and follow-up communication.</small>
            </span>
            <input
              type="checkbox"
              checked={draftMarketing}
              onChange={(event) => setDraftMarketing(event.target.checked)}
            />
          </label>
        </div>
      ) : null}

      <div className="cookie-consent-actions">
        <button type="button" className="button small" onClick={acceptAll}>
          Accept All
        </button>
        <button type="button" className="button small ghost" onClick={rejectOptional}>
          Reject Optional
        </button>
        {isCustomizing ? (
          <button type="button" className="button small ghost" onClick={saveSelection}>
            Save Preferences
          </button>
        ) : (
          <button
            type="button"
            className="button small ghost"
            onClick={() => setIsCustomizing(true)}
          >
            Customize
          </button>
        )}
      </div>

      <p className="cookie-consent-legal">
        Review details in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </section>
  );
}
