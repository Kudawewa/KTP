"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import checkMark from "../../public/checkIcon.png";
import { getServiceDuration } from "@/data/serviceTimes";
import { renderFinePrint } from "@/utils/finePrint";
import { phoneError, emailError } from "@/utils/validators";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  serviceName?: string;
  color?: string;
  /** Pre-fills the "Preferred Date" field (YYYY-MM-DD) when the modal opens. */
  defaultDate?: string;
  /** Page slug recorded against the booking (defaults to "home"). */
  sourcePage?: string;
  /**
   * When set, the modal switches to "package booking" mode: the Service
   * dropdown is replaced by a locked, read-only Package field and the left
   * panel copy is sourced from the props below (see Offer.tsx PACKAGES config).
   */
  packageName?: string;
  /** Display price for the chosen package, e.g. "$705". */
  packagePrice?: string;
  /** Panel price line, e.g. "From $705 / bundle". */
  packagePriceLabel?: string;
  /** Left-panel heading for the package, e.g. "Book Your Full Service". */
  packageHeading?: string;
  /** Shows a "Most Popular" ribbon accent (used for Premium). */
  packagePopular?: boolean;
  /**
   * Average service time (in minutes) shown on the left panel for a package
   * booking. The Service dropdown is hidden in package mode, so there's no
   * service to look a duration up from — the caller supplies it. Defaults to
   * "120" when omitted.
   */
  packageMinutes?: string;
}

/**
 * Free/quick inspections. The left panel drops the service title for these and
 * leads with the time instead — the name is already on the button the customer
 * just clicked, and the turnaround is the thing worth reassuring them about.
 */
const CHECK_SERVICES = new Set([
  "Free Tyre Safety Check",
  "Free Work Vehicle Check",
  "Family Tyre Safety Check",
]);

/**
 * Extracts the pricing basis from a price label — "From $705 / Bundle" →
 * "Bundle". The Offer configs write the unit inconsistently ("Per Tyre" vs
 * "Per tyre"), so known units are normalised to one spelling; anything
 * unrecognised is passed through as authored.
 */
function normalisePriceUnit(priceLabel?: string): string {
  const raw = priceLabel?.split("/").pop()?.trim();
  if (!raw) return "";

  const lower = raw.toLowerCase();
  if (lower === "per tyre") return "Per Tyre";
  if (lower === "bundle") return "Bundle";
  return raw;
}

const professionalService = [
  "Tyre Supply & Fitment",
  "Wheel Alignment",
  "Puncture Repair",
  "Wheel Balancing",
  "Tyre Rotation",
  "Free Tyre Safety Check",
];

const tradieeService = [
  "Ute & Van Tyre Fitment",
  "Wheel Alignment",
  "Puncture Repair",
  "Wheel Balancing",
  "Tyre Rotation",
  "Free Work Vehicle Check",
];

const enthusiatService = [
  "Performance Tyre Fitment",
  "4 Wheel Precision Alignment",
  "Wheel Balancing",
  "Run Flat Fitment",
  "Staggered Fitment",
  "Spec Consultation",
];

const familyService = [
  "Family Tyre Safety Check",
  "Wheel Alignment",
  "Tyre Supply & Fitment",
  "Wheel Balancing",
  "Puncture Repair",
  "Tyre Rotation",
];

const budgetService = [
  "Wheel Alignment",
  "Tyre Supply & Fitment",
  "Wheel Balancing",
  "Puncture Repair",
  "Tyre Rotation",
  "Free Safety Check",
];

// The Service dropdown is tailored to the page the modal opened from. Keyed by
// the project slug (see projects.json); anything unmapped — including the home
// page — falls back to the professional list.
const SERVICE_LISTS: Record<string, string[]> = {
  professional: professionalService,
  tradiee: tradieeService,
  "tradie-landing": tradieeService,
  enthusiat: enthusiatService,
  family: familyService,
  budget: budgetService,
};

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRego: string;
  service: string;
  /** Booking record fields kept alongside `service` so package bookings are
   * distinguishable from single-service bookings in the backend/CRM. */
  packageName: string;
  packagePrice: string;
  date: string;
  time: string;
  notes: string;
};

// Preferred-time options, matching the site's BookingForm.tsx dropdown.
const TIME_OPTIONS = [
  { value: "", label: "Any time" },
  { value: "morning", label: "Morning (7am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–5pm)" },
];

export default function BookingModal({
  visible,
  onClose,
  serviceName,
  color = "var(--red, #d4000f)",
  defaultDate,
  sourcePage,
  packageName,
  packagePrice,
  packagePriceLabel,
  packageHeading,
  packagePopular,
  packageMinutes,
}: BookingModalProps) {
  // When a caller doesn't pass sourcePage, record where the modal opened from:
  // the home page is "/", every other page is a project at /projects/[slug] and
  // the slug is the source. Never "" — the backend requires source_page.
  const pathname = usePathname();
  const effectiveSourcePage =
    sourcePage ??
    (pathname === "/" || pathname === ""
      ? "professional"
      : pathname.split("/").pop() || "professional");

  const isPackageMode = !!packageName;

  /**
   * The pricing basis ("Per Tyre" / "Bundle") pulled off the caller's price
   * label, e.g. "From $705 / Bundle" → "Bundle". Reading it from the label
   * keeps a single source of truth in the Offer PACKAGES config rather than
   * duplicating the unit as another prop.
   */
  const packagePriceUnit = normalisePriceUnit(packagePriceLabel);

  /** Price with its basis, e.g. "$705 / Bundle" — stored on the booking. */
  const packagePriceWithUnit =
    packagePrice && packagePriceUnit
      ? `${packagePrice} / ${packagePriceUnit}`
      : packagePrice || "";

  /**
   * Locked value shown in the Package field, e.g.
   * "Premium Package—$705 / Bundle".
   */
  const packageFieldValue =
    packageName && packagePriceWithUnit
      ? `${packageName}—${packagePriceWithUnit}`
      : packageName || "";

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleRego: "",
    service: serviceName || "",
    packageName: packageName || "",
    packagePrice: packagePrice || "",
    date: defaultDate || "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
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

  useEffect(() => {
    if (serviceName) setForm((f) => ({ ...f, service: serviceName }));
  }, [serviceName]);

  // Keep the locked package fields in sync with the card that was clicked.
  useEffect(() => {
    if (packageName) {
      setForm((f) => ({
        ...f,
        packageName,
        packagePrice: packagePrice || "",
      }));
    }
  }, [packageName, packagePrice]);

  // Pre-fill the preferred date each time the modal opens with a default.
  useEffect(() => {
    if (visible && defaultDate) {
      setForm((f) => ({ ...f, date: defaultDate }));
    }
  }, [visible, defaultDate]);

  // The shop closes at noon on Saturdays, so an afternoon slot can't apply.
  useEffect(() => {
    if (form.time === "afternoon" && isSaturday) {
      setForm((f) => ({ ...f, time: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.date]);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: "" }));
    };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    const phoneErr = phoneError(form.phone);
    if (phoneErr) e.phone = phoneErr;
    // Email is optional here, but must be well-formed when provided.
    if (form.email.trim()) {
      const emailErr = emailError(form.email);
      if (emailErr) e.email = emailErr;
    }
    if (!isPackageMode && !form.service) e.service = "Required";
    if (!form.date) e.date = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function handleSubmit() {
    if (!validate()) return;

    setSubmitError(false);
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_page: effectiveSourcePage,
          source_cta: isPackageMode ? "package_booking" : "service_booking",
          booking_type: isPackageMode ? "package" : "service",
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          vehicle_make: form.vehicleMake,
          vehicle_model: form.vehicleModel,
          vehicle_year: form.vehicleYear
            ? parseInt(form.vehicleYear)
            : undefined,
          vehicle_rego: form.vehicleRego,
          // In package mode the service line records the package name too, so
          // it reads sensibly in the calendar; package_selected + package_price
          // carry the structured values.
          service_type: isPackageMode ? packageName : form.service,
          package_selected: isPackageMode ? packageName : "",
          package_price: isPackageMode ? packagePriceWithUnit : "",
          preferred_date: form.date || undefined,
          preferred_time: form.time,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setBookingRef(data.booking_ref ?? "");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const handleClose = () => {
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError(false);
    setBookingRef("");
    setErrors({});
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleRego: "",
      service: serviceName || "",
      packageName: packageName || "",
      packagePrice: packagePrice || "",
      date: defaultDate || "",
      time: "",
      notes: "",
    });
    onClose();
  };

  // In package mode the caller supplies the duration (no service to look up);
  // otherwise derive it from the chosen service. Both default to "120".
  const serviceDuration = getServiceDuration(form.service);
  const serviceMinutes = isPackageMode
    ? packageMinutes || "120"
    : serviceDuration
      ? serviceDuration.replace(/\s*minutes?$/i, "")
      : "90";

  // Check-type services hide the title in the left panel (see CHECK_SERVICES).
  const hideServiceTitle = !isPackageMode && CHECK_SERVICES.has(form.service);

  // Services offered depend on which landing page the modal opened from. A
  // caller can still pre-select a service outside that page's list (e.g. from a
  // Services card) — keep it in the options so it renders as selected.
  const baseServices =
    SERVICE_LISTS[effectiveSourcePage] ?? professionalService;
  const serviceOptions =
    form.service && !baseServices.includes(form.service)
      ? [...baseServices, form.service]
      : baseServices;

  const today = new Date().toISOString().split("T")[0];

  const selectedDay = form.date
    ? new Date(form.date + "T00:00:00").getDay()
    : -1;
  const isSaturday = selectedDay === 6;
  const isSunday = selectedDay === 0;

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
        animation: "bkFadeIn 0.18s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          display: "flex",

          width: "100%",
          maxWidth: "1200px",
          maxHeight: "92vh",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
          animation: "bkSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Left Panel ── */}
        <div
          className="bk-left"
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
              background:
                "radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.08) 0%, transparent 60%)",
            }}
          />

          {!hideServiceTitle && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 100,
                fontSize: "1rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: color,
                fontWeight: 700,
                marginBottom: 24,
                width: "fit-content",
              }}
            >
              {isPackageMode ? packageName : form.service || "Booking"}
              {isPackageMode && packagePopular && (
                <span
                  style={{
                    background: color,
                    color: "#fff",
                    fontSize: "0.55rem",
                    letterSpacing: "1.5px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: 100,
                  }}
                >
                  Most Popular
                </span>
              )}
            </div>
          )}

          <h3
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              margin: "0 0 10px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {isPackageMode ? (
              packageHeading || "Book Your Appointment"
            ) : (
              <>
                Book Your
                <br />
                Appointment
              </>
            )}
          </h3>

          {isPackageMode && packagePriceLabel && (
            <div
              style={{
                color: color,
                fontSize: "1.05rem",
                fontWeight: 800,
                margin: "0 0 10px",
                letterSpacing: "-0.01em",
              }}
            >
              {/* Package pricing carries the same terms as the Offer.tsx
                  cards, which print the disclaimer under every price. */}
              {renderFinePrint(`${packagePriceLabel}`)}
              <p
                style={{
                  color: color,
                  fontSize: "0.5rem",
                  fontWeight: 800,
                  margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                }}
              >
                (T & C’s apply)
              </p>
            </div>
          )}
          <p
            style={{
              color: "white",
              fontSize: "0.75rem",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            We&rsquo;ll confirm by phone within 2 hours during business hours.
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
              "No obligation to proceed",
              "Price locked on confirmation",
              `${serviceMinutes} min average ${hideServiceTitle?"":"service"} time (Subject to availability)`,
              "Licensed technicians only",
            ].map((text) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Image
                  src={checkMark}
                  alt=""
                  width={26}
                  height={26}
                  style={{ display: "block", objectFit: "contain" }}
                />
                <span
                  style={{
                    fontSize: "0.76rem",
                    color: "white",
                    lineHeight: 1.4,
                  }}
                >
                  {renderFinePrint(text)}
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
                color: "white",
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
                letterSpacing: "-0.01em",
              }}
            >
              (08) 9359 1444
            </a>
            <p style={{ color: "white", fontSize: "0.62rem", marginTop: 3 }}>
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
          {/* Top bar */}
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
                color: "black",
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
                transition: "all 0.15s",
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

          {/* ── Success State ── */}
          {submitted ? (
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
                  letterSpacing: "-0.01em",
                }}
              >
                Request Received!
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.84rem",
                  lineHeight: 1.65,
                  maxWidth: "280px",
                }}
              >
                We&rsquo;ll call{" "}
                <strong style={{ color: "#0b1c3a" }}>{form.phone}</strong> to
                confirm your{" "}
                <strong style={{ color: "#0b1c3a" }}>
                  {isPackageMode ? packageName : form.service}
                </strong>{" "}
                booking.
              </p>
              {bookingRef && (
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
                  {bookingRef}
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
            /* ── Form ── */
            <div
              style={{ flex: 1, overflowY: "auto", padding: "22px 28px 28px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "13px 16px",
                }}
              >
                <Field label="First Name *" error={errors.firstName}>
                  <input
                    value={form.firstName}
                    onChange={set("firstName")}
                    placeholder="John"
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(
                      !!errors.firstName,
                      focusedField === "firstName",
                    )}
                  />
                </Field>

                <Field label="Last Name *" error={errors.lastName}>
                  <input
                    value={form.lastName}
                    onChange={set("lastName")}
                    placeholder="Smith"
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(
                      !!errors.lastName,
                      focusedField === "lastName",
                    )}
                  />
                </Field>

                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <Field
                    label="Phone *"
                    error={errors.phone}
                    style={{ flex: "0 0 auto", minWidth: "140px" }}
                  >
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="0400 000 000"
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle(!!errors.phone, focusedField === "phone"),
                        width: "auto",
                      }}
                    />
                  </Field>

                  <Field
                    label="Email"
                    error={errors.email}
                    style={{ flex: "1 1 0", minWidth: "160px" }}
                  >
                    <input
                      value={form.email}
                      onChange={set("email")}
                      placeholder="john@example.com"
                      type="email"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle(!!errors.email, focusedField === "email"),
                        width: "100%",
                      }}
                    />
                  </Field>
                </div>

                {isPackageMode ? (
                  <Field label="Package *" style={{ gridColumn: "1 / -1" }}>
                    <input
                      value={packageFieldValue}
                      readOnly
                      aria-readonly="true"
                      tabIndex={-1}
                      style={{
                        ...inputStyle(false, false),
                        background: "#eceff3",
                        color: "#4b5563",
                        cursor: "not-allowed",
                        fontWeight: 600,
                      }}
                    />
                  </Field>
                ) : (
                  <Field
                    label="Service *"
                    style={{ gridColumn: "1 / -1" }}
                    error={errors.service}
                  >
                    <select
                      value={form.service}
                      onChange={set("service")}
                      onFocus={() => setFocusedField("service")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle(
                        !!errors.service,
                        focusedField === "service",
                      )}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                )}

                <Field label="Vehicle Make">
                  <input
                    value={form.vehicleMake}
                    onChange={set("vehicleMake")}
                    placeholder="Toyota"
                    onFocus={() => setFocusedField("vehicleMake")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(false, focusedField === "vehicleMake")}
                  />
                </Field>

                <Field label="Vehicle Model">
                  <input
                    value={form.vehicleModel}
                    onChange={set("vehicleModel")}
                    placeholder="HiLux"
                    onFocus={() => setFocusedField("vehicleModel")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(false, focusedField === "vehicleModel")}
                  />
                </Field>

                <Field label="Vehicle Year">
                  <input
                    value={form.vehicleYear}
                    onChange={set("vehicleYear")}
                    type="number"
                    min="1990"
                    max="2030"
                    placeholder="2021"
                    onFocus={() => setFocusedField("vehicleYear")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(false, focusedField === "vehicleYear")}
                  />
                </Field>

                <Field label="Rego / Registration Number">
                  <input
                    value={form.vehicleRego}
                    onChange={set("vehicleRego")}
                    placeholder="1ABC 123"
                    maxLength={20}
                    onFocus={() => setFocusedField("vehicleRego")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputStyle(false, focusedField === "vehicleRego"),
                      textTransform: "uppercase",
                    }}
                  />
                </Field>

                <Field label="Preferred Date *" error={errors.date}>
                  <input
                    value={form.date}
                    onChange={set("date")}
                    type="date"
                    min={today}
                    onFocus={() => setFocusedField("date")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(!!errors.date, focusedField === "date")}
                  />
                  {isSunday && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 5,
                        padding: "4px 8px",
                        background: "#fef2f2",
                        borderRadius: 5,
                        border: "1px solid #fca5a5",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <circle cx="12" cy="16" r="0.5" fill="#dc2626" />
                      </svg>
                      <span
                        style={{
                          fontSize: "0.63rem",
                          color: "#991b1b",
                          fontWeight: 500,
                        }}
                      >
                        Closed Sundays Mon–Fri 8am–5pm, Sat 8am–12pm
                      </span>
                    </div>
                  )}
                  {isSaturday && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 5,
                        padding: "4px 8px",
                        background: "#fff8e1",
                        borderRadius: 5,
                        border: "1px solid #fcd34d",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d97706"
                        strokeWidth="2.5"
                      >
                        <path d="M12 2L1 21h22L12 2z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <circle cx="12" cy="17" r="0.5" fill="#d97706" />
                      </svg>
                      <span
                        style={{
                          fontSize: "0.63rem",
                          color: "#92400e",
                          fontWeight: 500,
                        }}
                      >
                        Saturday bookings available 8:00 AM to 11:30 AM only
                      </span>
                    </div>
                  )}
                </Field>

                <Field label="Preferred Time" style={{ gridColumn: "1 / -1" }}>
                  <select
                    value={form.time}
                    onChange={set("time")}
                    onFocus={() => setFocusedField("time")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(false, focusedField === "time")}
                  >
                    {TIME_OPTIONS.map((opt) => (
                      <option
                        key={opt.label}
                        value={opt.value}
                        disabled={opt.value === "afternoon" && isSaturday}
                      >
                        {opt.label}
                        {opt.value === "afternoon" && isSaturday
                          ? " — closed Sat"
                          : ""}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Notes" style={{ gridColumn: "1 / -1" }}>
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={2}
                    placeholder="Tyre size, specific concerns, or anything we should know..."
                    onFocus={() => setFocusedField("notes")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputStyle(false, focusedField === "notes"),
                      resize: "vertical",
                    }}
                  />
                </Field>
              </div>

              {submitError && (
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
                  onClick={handleClose}
                  disabled={submitting}
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
                    cursor: submitting ? "not-allowed" : "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSunday || submitting}
                  style={{
                    flex: 2,
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    background: isSunday ? "#e5e7eb" : color,
                    color: isSunday ? "#9ca3af" : "#fff",
                    fontSize: "0.83rem",
                    fontWeight: 700,
                    cursor: isSunday || submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "opacity 0.15s",
                    letterSpacing: "0.2px",
                    opacity: isSunday || submitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSunday && !submitting)
                      e.currentTarget.style.opacity = "0.88";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSunday && !submitting)
                      e.currentTarget.style.opacity = "1";
                  }}
                >
                  {submitting ? "Sending…" : "Confirm Booking"}
                  {!submitting && (
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
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bkFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bkSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 600px) {
          .bk-left { display: none !important; }
        }
      `}</style>
    </div>,
    document.body,
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
