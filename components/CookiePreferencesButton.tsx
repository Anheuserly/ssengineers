"use client";

import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/lib/cookie-consent";

type CookiePreferencesButtonProps = {
  className?: string;
};

export default function CookiePreferencesButton({
  className = "footer-link-button",
}: CookiePreferencesButtonProps) {
  const onClick = () => {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  };

  return (
    <button type="button" className={className} onClick={onClick}>
      Cookie Settings
    </button>
  );
}
