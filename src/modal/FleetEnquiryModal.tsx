"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { phoneError, emailError } from "@/utils/validators";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const FLEET_SIZES = [
  "2–5 vehicles",
  "6–10 vehicles",
  "11–25 vehicles",
  "26–50 vehicles",
  "50+ vehicles",
];

const VEHICLE_TYPES = ["Cars", "Vans", "Utes", "Light Trucks", "Other"];

const SERVICES_NEEDED = [
  "Tyres",
  "Wheels",
  "Wheel balancing & Tyre rotation",
  "Full Package Servicing",
  "Puncture Repair",
  "Other",
];

type FormState = {
  company_name: string;
  abn: string;
  contact_person: string;
  position: string;
  phone: string;
  email: string;
  fleet_size: string;
  vehicle_types: string[];
  services_needed: string[];
  notes: string;
  /** Honeypot — must stay empty. Real users never see or fill this. */
  website: string;
};

const EMPTY_FORM: FormState = {
  company_name: "",
  abn: "",
  contact_person: "",
  position: "",
  phone: "",
  email: "",
  fleet_size: "",
  vehicle_types: [],
  services_needed: [],
  notes: "",
  website: "",
};

/** Only the required / format-validated fields ever carry an error. */
type FieldError =
  | "company_name"
  | "contact_person"
  | "phone"
  | "email"
  | "fleet_size"
  | "abn";
type FormErrors = Partial<Record<FieldError, string>>;

/** Text/select fields the generic `set()` change handler applies to. */
type TextField =
  | "company_name"
  | "abn"
  | "contact_person"
  | "position"
  | "phone"
  | "email"
  | "fleet_size"
  | "notes"
  | "website";

interface FleetEnquiryModalProps {
  visible: boolean;
  onClose: () => void;
  /** Accent colour — the page's section colour. */
  color?: string;
  /** Page slug recorded against the enquiry. */
  sourcePage: string;
}

export default function FleetEnquiryModal({
  visible,
  onClose,
  color = "var(--red, #d4000f)",
  sourcePage,
}: FleetEnquiryModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [enquiryRef, setEnquiryRef] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (visible) {
      const scrollY = window.scrollY;
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      document.body.dataset.scrollY = String(scrollY);
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      const savedY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      delete document.body.dataset.scrollY;
      if (savedY) window.scrollTo(0, savedY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const set =
    (field: TextField) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (field in errors) setErrors((er) => ({ ...er, [field]: "" }));
    };

  // Toggle a value in one of the multi-select checkbox groups.
  const toggleMulti =
    (field: "vehicle_types" | "services_needed", value: string) => () => {
      setForm((f) => {
        const list = f[field];
        return {
          ...f,
          [field]: list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value],
        };
      });
    };

  const validate = () => {
    const e: FormErrors = {};
    if (!form.company_name.trim()) e.company_name = "Required";
    if (!form.contact_person.trim()) e.contact_person = "Required";
    const phoneErr = phoneError(form.phone);
    if (phoneErr) e.phone = phoneErr;
    const emailErr = emailError(form.email);
    if (emailErr) e.email = emailErr;
    if (!form.fleet_size) e.fleet_size = "Required";
    // ABN is optional — only light format validation when provided.
    if (form.abn.trim() && form.abn.replace(/\D/g, "").length !== 11)
      e.abn = "Enter a valid 11-digit ABN";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
    setEnquiryRef("");
    onClose();
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot: bots fill hidden fields. Pretend success without hitting the
    // API so the spam lead is silently dropped.
    if (form.website.trim()) {
      setStatus("success");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/api/v1/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_page: sourcePage,
          source_cta: "fleet_account",
          enquiry_type: "fleet",
          first_name: form.contact_person,
          last_name: "",
          email: form.email,
          phone: form.phone,
          company_name: form.company_name,
          fleet_size: form.fleet_size,
          vehicle_types: form.vehicle_types,
          services_needed: form.services_needed,
          abn: form.abn.trim(),
          position: form.position.trim(),
          // Only the customer's own note — the fields above are their own
          // columns rather than being folded in here.
          message: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setEnquiryRef(data.enquiry_ref ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(6,16,31,0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "fltFadeIn 0.18s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          maxHeight: "92vh",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
          animation: "fltSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Left Panel ── */}
        <div
          className="flt-left"
          style={{
            width: "300px",
            flexShrink: 0,
            background:
              "linear-gradient(160deg, #06101f 0%, #0b1c3a 55%, #0d2248 100%)",
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at 30% 70%, ${color}1F 0%, transparent 60%)`,
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.7rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: color,
              fontWeight: 700,
              marginBottom: 24,
              width: "fit-content",
            }}
          >
            For businesses &amp; fleets
          </div>

          <h3
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              margin: "0 0 6px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Fleet Accounts
          </h3>
          <div
            style={{
              color: color,
              fontSize: "0.95rem",
              fontWeight: 700,
              margin: "0 0 12px",
              letterSpacing: "-0.01em",
            }}
          >
            One Account. Every Vehicle.
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.78rem",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Tell us about your fleet and we&rsquo;ll build a custom maintenance
            plan and pricing.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: "auto",
            }}
          >
            {[
              "Volume-based pricing",
              "Central invoicing",
              "Priority scheduling",
              "Dedicated account manager",
            ].map((text) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  style={{ flexShrink: 0 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span
                  style={{
                    fontSize: "0.76rem",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.4,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.62rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Prefer to call?
            </p>
            <a
              href="tel:0893591444"
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              (08) 9359 1444
            </a>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.62rem",
                marginTop: 3,
              }}
            >
              Mon–Fri 8am–5pm · Sat 8am–12pm
            </p>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 28px",
              borderBottom: "1px solid #f0f0f0",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "0.71rem",
                color: "#374151",
                letterSpacing: "0.3px",
              }}
            >
              Fields marked <span style={{ color: "red" }}>*</span> are required
            </span>
            <button
              onClick={handleClose}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#f3f4f6",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e5e7eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.1)",
                  border: "2px solid rgba(34,197,94,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#0b1c3a",
                  marginBottom: 8,
                }}
              >
                Enquiry Received!
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.84rem",
                  lineHeight: 1.65,
                  maxWidth: "320px",
                }}
              >
                Our fleet team will contact you within 1 business day with a
                custom quote.
              </p>
              {enquiryRef && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    padding: "6px 16px",
                    borderRadius: 6,
                    color: "#0b1c3a",
                    marginTop: 14,
                    letterSpacing: "1px",
                  }}
                >
                  {enquiryRef}
                </span>
              )}
              <button
                onClick={handleClose}
                style={{
                  marginTop: 28,
                  background: "#0b1c3a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 32px",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ flex: 1, overflowY: "auto", padding: "22px 28px 28px" }}
            >
              {/* Honeypot — visually hidden, off-screen, not tab-reachable. */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={set("website")}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "13px 16px",
                }}
              >
                <Field
                  label="Company Name *"
                  error={errors.company_name}
                  style={{ gridColumn: "1 / -1" }}
                >
                  <input
                    value={form.company_name}
                    onChange={set("company_name")}
                    placeholder="e.g. Acme Logistics Pty Ltd"
                    onFocus={() => setFocusedField("company_name")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(
                      !!errors.company_name,
                      focusedField === "company_name",
                    )}
                  />
                </Field>

                <Field label="ABN / Business Number" error={errors.abn}>
                  <input
                    value={form.abn}
                    onChange={set("abn")}
                    placeholder="12 345 678 901"
                    inputMode="numeric"
                    onFocus={() => setFocusedField("abn")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(!!errors.abn, focusedField === "abn")}
                  />
                </Field>

                <Field label="Fleet Size *" error={errors.fleet_size}>
                  <select
                    value={form.fleet_size}
                    onChange={set("fleet_size")}
                    onFocus={() => setFocusedField("fleet_size")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(
                      !!errors.fleet_size,
                      focusedField === "fleet_size",
                    )}
                  >
                    <option value="">Select a range…</option>
                    {FLEET_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Contact Person *" error={errors.contact_person}>
                  <input
                    value={form.contact_person}
                    onChange={set("contact_person")}
                    placeholder="John Smith"
                    onFocus={() => setFocusedField("contact_person")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(
                      !!errors.contact_person,
                      focusedField === "contact_person",
                    )}
                  />
                </Field>

                <Field label="Position / Role">
                  <input
                    value={form.position}
                    onChange={set("position")}
                    placeholder="Fleet Manager"
                    onFocus={() => setFocusedField("position")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(false, focusedField === "position")}
                  />
                </Field>

                <Field label="Phone *" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={set("phone")}
                    type="tel"
                    placeholder="0400 000 000"
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(!!errors.phone, focusedField === "phone")}
                  />
                </Field>

                <Field label="Email *" error={errors.email}>
                  <input
                    value={form.email}
                    onChange={set("email")}
                    type="email"
                    placeholder="accounts@company.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(!!errors.email, focusedField === "email")}
                  />
                </Field>

                <CheckboxGroup
                  label="Vehicle Types"
                  options={VEHICLE_TYPES}
                  selected={form.vehicle_types}
                  onToggle={(v) => toggleMulti("vehicle_types", v)()}
                  color={color}
                />

                <CheckboxGroup
                  label="Services Needed"
                  options={SERVICES_NEEDED}
                  selected={form.services_needed}
                  onToggle={(v) => toggleMulti("services_needed", v)()}
                  color={color}
                />

                <Field
                  label="Notes / Requirements"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={4}
                    placeholder="Current supplier, contract end date, specific brands, reporting needs, etc."
                    onFocus={() => setFocusedField("notes")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputStyle(false, focusedField === "notes"),
                      resize: "vertical",
                    }}
                  />
                </Field>
              </div>

              {status === "error" && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.8rem",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  Something went wrong. Please try again or call (08) 9359 1444.
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    flex: 1,
                    minWidth: "80px",
                    padding: "12px",
                    borderRadius: 10,
                    border: "1.5px solid #e5e7eb",
                    background: "#fff",
                    color: "#6b7280",
                    fontSize: "0.83rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    flex: 2,
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    background: color,
                    color: "#fff",
                    fontSize: "0.83rem",
                    fontWeight: 700,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    opacity: status === "loading" ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {status === "loading" ? "Sending…" : "Request Fleet Quote"}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fltFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fltSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 600px) {
          .flt-left { display: none !important; }
        }
      `}</style>
    </div>,
    document.body,
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
  color,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  color: string;
}) {
  return (
    <Field label={label} style={{ gridColumn: "1 / -1" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 12px",
                borderRadius: 8,
                border: active ? `1.5px solid ${color}` : "1.5px solid #e5e7eb",
                background: active ? `${color}12` : "#f9fafb",
                color: active ? "#0b1c3a" : "#374151",
                fontSize: "0.8rem",
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 4,
                  border: active
                    ? `1.5px solid ${color}`
                    : "1.5px solid #cbd5e1",
                  background: active ? color : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {active && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

function Field({
  label,
  children,
  error,
  style,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <label
        style={{
          display: "block",
          fontSize: "0.67rem",
          fontWeight: 700,
          color: "#374151",
          marginBottom: 5,
          letterSpacing: "0.6px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          style={{
            display: "block",
            fontSize: "0.65rem",
            color: "#ef4444",
            marginTop: 3,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

function inputStyle(hasError: boolean, focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "9px 11px",
    fontSize: "0.83rem",
    borderRadius: 8,
    border: hasError
      ? "1.5px solid #ef4444"
      : focused
        ? "1.5px solid #0b1c3a"
        : "1.5px solid #e5e7eb",
    outline: "none",
    background: focused ? "#fff" : "#f9fafb",
    color: "#111827",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s, background 0.15s",
  };
}
