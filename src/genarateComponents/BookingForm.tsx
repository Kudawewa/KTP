"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { splitFinePrint } from "@/utils/finePrint";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const DEFAULT_SERVICE_TYPES = [
  "Tyre Replacement",
  "Wheel Alignment",
  "Tyre Rotation",
  "Safety Check",
  "Flat Tyre Repair",
  "Wheel Balancing",
  "Other",
];

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  vehicle_make: "",
  vehicle_model: "",
  vehicle_year: "",
  vehicle_rego: "",
  service_type: "",
  preferred_date: "",
  preferred_time: "",
  notes: "",
};

type bookingProps = {
  sectionColor: string;
  backgroundColor: string;
  accentColor: string;
  bookingEyebrow: string;
  bookingHeader: string;
  bookingPhara: string;
  bookingTrustPoints: string[];
  bookingServiceTypes?: string[];
  bookingBtn: string;
  bookingSuccessTitle: string;
  bookingSuccessPhara: string;
  bookingErrorPhara: string;
};

export default function BookingForm({
  sectionColor,
  backgroundColor,
  accentColor,
  bookingEyebrow,
  bookingHeader,
  bookingPhara,
  bookingTrustPoints,
  bookingServiceTypes,
  bookingBtn,
  bookingSuccessTitle,
  bookingSuccessPhara,
  bookingErrorPhara,
}: bookingProps) {
  const pathname = usePathname();
  const sourcePage =
    pathname === "/" || pathname === ""
      ? "home"
      : pathname.split("/").pop() || "home";

  const serviceTypes =
    bookingServiceTypes && bookingServiceTypes.length > 0
      ? bookingServiceTypes
      : DEFAULT_SERVICE_TYPES;

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [refNumber, setRefNumber] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.phone)
      return;
    setStatus("loading");

    const payload = {
      source_page: sourcePage,
      source_cta: "booking_form",
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      vehicle_make: form.vehicle_make,
      vehicle_model: form.vehicle_model,
      vehicle_year: form.vehicle_year ? parseInt(form.vehicle_year) : undefined,
      vehicle_rego: form.vehicle_rego,
      service_type: form.service_type,
      preferred_date: form.preferred_date || undefined,
      preferred_time: form.preferred_time,
      notes: form.notes,
    };

    try {
      const res = await fetch(`${API_URL}/api/v1/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setRefNumber(data.booking_ref ?? "");
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <style>{`
        .bk-section {
          background: ${backgroundColor};
          padding: 90px 60px;
          scroll-margin-top: 80px;
        }
        .bk-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 80px;
          align-items: start;
        }
        .bk-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${accentColor}1A;
          border: 1px solid ${accentColor}40;
          border-radius: 2px;
          padding: 5px 14px;
          font-size: 0.68rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${accentColor};
          font-weight: 700;
          margin-bottom: 20px;
        }
        .bk-label-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${accentColor};
          animation: bkPulse 1.8s infinite;
        }
        @keyframes bkPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .bk-headline {
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .bk-subline {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .bk-trust {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bk-trust-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.75);
        }
        .bk-trust-text {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .bk-trust-note {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          margin-top: 2px;
        }
        .bk-trust-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: ${accentColor}26;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .bk-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 40px;
        }
        .bk-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .bk-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 100px;
          gap: 14px;
          margin-bottom: 14px;
        }
        .bk-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 14px;
        }
        .bk-field label {
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }
        .bk-field input,
        .bk-field select,
        .bk-field textarea {
          padding: 12px 16px;
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          font-size: 0.95rem;
          color: #fff;
          background: rgba(255,255,255,0.06);
          transition: border-color 0.2s, background 0.2s;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
        }
        .bk-field input::placeholder,
        .bk-field textarea::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .bk-field input:focus,
        .bk-field select:focus,
        .bk-field textarea:focus {
          border-color: ${accentColor};
          background: rgba(255,255,255,0.09);
        }
        .bk-field select option { background: #1a2a3a; color: #fff; }
        .bk-field textarea {
          resize: vertical;
          min-height: 90px;
        }
        .bk-btn {
          width: 100%;
          background: ${sectionColor};
          color: #fff;
          border: none;
          padding: 17px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.3px;
        }
        .bk-btn:hover:not(:disabled) { filter: brightness(0.85); transform: translateY(-2px); }
        .bk-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .bk-success {
          text-align: center;
          padding: 50px 20px;
          color: #fff;
        }
        .bk-success__icon {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: ${accentColor}26;
          border: 2px solid ${accentColor}66;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .bk-success__ref {
          display: inline-block;
          font-family: monospace;
          font-size: 1rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 6px 16px;
          border-radius: 6px;
          color: ${accentColor};
          margin-top: 12px;
          letter-spacing: 1px;
        }
        .bk-error {
          color: #ff8080;
          font-size: 0.88rem;
          margin-top: 12px;
          text-align: center;
        }
        @media (max-width: 900px) {
          .bk-section { padding: 60px 20px; }
          .bk-inner { grid-template-columns: 1fr; gap: 40px; }
          .bk-row { grid-template-columns: 1fr; }
          .bk-row-3 { grid-template-columns: 1fr 1fr; }
          .bk-card { padding: 24px 18px; }
        }
        @media (max-width: 480px) {
          .bk-row-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="booking" className="bk-section">
        <div className="bk-inner">
          {/* Left — copy */}
          <div>
            <div className="bk-label">
              <span className="bk-label-dot" />
              {bookingEyebrow}
            </div>
            <h2 className="bk-headline">{bookingHeader}</h2>
            <p className="bk-subline">{bookingPhara}</p>
            <div className="bk-trust">
              {bookingTrustPoints.map((item) => {
                const { main, note } = splitFinePrint(item);
                return (
                  <div key={item} className="bk-trust-item">
                    <div className="bk-trust-icon">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={accentColor}
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="bk-trust-text">
                      {main}
                      {note && <span className="bk-trust-note">{note}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className="bk-card">
            {status === "success" ? (
              <div className="bk-success">
                <div className="bk-success__icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    marginBottom: 10,
                  }}
                >
                  {bookingSuccessTitle}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.97rem",
                  }}
                >
                  {bookingSuccessPhara}
                </p>
                {refNumber && <span className="bk-success__ref">{refNumber}</span>}
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    display: "block",
                    margin: "24px auto 0",
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 6,
                    padding: "8px 20px",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bk-row">
                  <div className="bk-field">
                    <label>First Name *</label>
                    <input
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="bk-field">
                    <label>Last Name *</label>
                    <input
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>
                <div className="bk-row">
                  <div className="bk-field">
                    <label>Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      required
                    />
                  </div>
                  <div className="bk-field">
                    <label>Phone *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="04XX XXX XXX"
                      required
                    />
                  </div>
                </div>
                <div className="bk-row-3">
                  <div className="bk-field">
                    <label>Vehicle Make</label>
                    <input
                      name="vehicle_make"
                      value={form.vehicle_make}
                      onChange={handleChange}
                      placeholder="Toyota"
                    />
                  </div>
                  <div className="bk-field">
                    <label>Model</label>
                    <input
                      name="vehicle_model"
                      value={form.vehicle_model}
                      onChange={handleChange}
                      placeholder="HiLux"
                    />
                  </div>
                  <div className="bk-field">
                    <label>Year</label>
                    <input
                      name="vehicle_year"
                      type="number"
                      min="1990"
                      max="2030"
                      value={form.vehicle_year}
                      onChange={handleChange}
                      placeholder="2021"
                    />
                  </div>
                </div>
                <div className="bk-field">
                  <label>Rego / Registration Number</label>
                  <input
                    name="vehicle_rego"
                    value={form.vehicle_rego}
                    onChange={handleChange}
                    placeholder="1ABC 123"
                    maxLength={20}
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
                <div className="bk-field">
                  <label>Service Required</label>
                  <select
                    name="service_type"
                    value={form.service_type}
                    onChange={handleChange}
                  >
                    <option value="">Select a service…</option>
                    {serviceTypes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bk-row">
                  <div className="bk-field">
                    <label>Preferred Date</label>
                    <input
                      name="preferred_date"
                      type="date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="bk-field">
                    <label>Preferred Time</label>
                    <select
                      name="preferred_time"
                      value={form.preferred_time}
                      onChange={handleChange}
                    >
                      <option value="">Any time</option>
                      <option value="morning">Morning (7am–12pm)</option>
                      <option value="afternoon">Afternoon (12pm–5pm)</option>
                    </select>
                  </div>
                </div>
                <div className="bk-field">
                  <label>Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Anything else we should know — tyre size, specific issue, etc."
                  />
                </div>
                <button
                  type="submit"
                  className="bk-btn"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    "Submitting…"
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {bookingBtn}
                    </>
                  )}
                </button>
                {status === "error" && <p className="bk-error">{bookingErrorPhara}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
