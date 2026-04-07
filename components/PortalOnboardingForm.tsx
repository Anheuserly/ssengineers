"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "saving" | "error";

type ProfilePayload = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  profileCompleted: boolean;
};

export default function PortalOnboardingForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [note, setNote] = useState("");
  const [formData, setFormData] = useState<ProfilePayload>({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    city: "",
    profileCompleted: false,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/auth/profile", { method: "GET" });
        if (!response.ok) {
          throw new Error("Unable to load your profile right now.");
        }
        const data = (await response.json()) as {
          profile?: Partial<ProfilePayload>;
        };
        setFormData((prev) => ({
          ...prev,
          fullName: String(data.profile?.fullName || ""),
          phone: String(data.profile?.phone || ""),
          email: String(data.profile?.email || ""),
          company: String(data.profile?.company || ""),
          city: String(data.profile?.city || ""),
          profileCompleted: Boolean(data.profile?.profileCompleted),
        }));
        setStatus("idle");
      } catch (error) {
        setStatus("error");
        setNote(
          error instanceof Error && error.message
            ? error.message
            : "Unable to load profile."
        );
      }
    };
    void load();
  }, []);

  const updateField = (key: keyof ProfilePayload, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setNote("");
    try {
      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          city: formData.city,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string; redirectTo?: string }
        | null;
      if (!response.ok) {
        throw new Error(data?.message || "Unable to save profile right now.");
      }

      router.push(data?.redirectTo || "/");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setNote(
        error instanceof Error && error.message
          ? error.message
          : "Unable to save profile."
      );
    }
  };

  if (status === "loading") {
    return <p className="muted">Loading profile...</p>;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input
            required
            maxLength={120}
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
        </label>
        <label>
          Phone Number
          <input
            required
            maxLength={15}
            inputMode="tel"
            pattern="[0-9]{10,15}"
            value={formData.phone}
            onChange={(event) =>
              updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 15))
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            maxLength={160}
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>
        <label>
          Company Name
          <input
            maxLength={160}
            value={formData.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </label>
        <label>
          City
          <input
            maxLength={120}
            value={formData.city}
            onChange={(event) => updateField("city", event.target.value)}
          />
        </label>
      </div>

      <button className="button" type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : "Save & Continue"}
      </button>

      {note ? <p className="form-note error">{note}</p> : null}
    </form>
  );
}
