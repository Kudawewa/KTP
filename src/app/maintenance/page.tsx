import type { Metadata } from "next";
import Image from "next/image";
import logo from "../../../public/logo.png";

export const metadata: Metadata = {
  title: "We'll Be Back Shortly — Kewdale Tyrepower",
  description:
    "Our website is briefly down for scheduled maintenance. The workshop is still open — call (08) 9359 1444 to book.",
  robots: { index: false, follow: false },
};

export default function Maintenance() {
  return (
    <main
      className="flex flex-col items-center justify-center"
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          animation: "fadeUp 0.6s 0.1s ease both",
        }}
      >
        <Image
          src={logo}
          alt="Kewdale Tyrepower"
          width={180}
          height={45}
          priority
          className="w-auto h-10 md:h-12 object-contain mx-auto"
          style={{ marginBottom: "clamp(32px, 6vh, 48px)" }}
        />

        <div
          className="inline-flex items-center"
          style={{
            gap: "8px",
            fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 600,
            marginBottom: "16px",
          }}
        >
          Scheduled maintenance
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            lineHeight: 1.05,
            color: "var(--white)",
            letterSpacing: "-0.02em",
            fontWeight: 700,
            marginBottom: "clamp(16px, 3vh, 24px)",
          }}
        >
          We&rsquo;re Tightening Few Bolts
          <em
            style={{
              fontStyle: "normal",
              color: "#ffd204",
              display: "block",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
              marginTop: "clamp(8px, 1.5vh, 12px)",
            }}
          >
            Back On The Road Shortly.
          </em>
        </h1>

        <p
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
            color: "var(--white)",
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: "clamp(32px, 6vh, 44px)",
          }}
        >
          Our website is down for a short spell of maintenance.{" "}
          <strong style={{ fontWeight: 500 }}>
            The workshop is still open as usual
          </strong>{" "}
        give us a call and we&rsquo;ll get you booked in.
        </p>

        <div
          className="flex items-center justify-center flex-wrap"
          style={{ gap: "clamp(12px, 3vw, 16px)" }}
        >
          <a
            href="tel:0893591444"
            className="btn-primary"
            style={{
              boxShadow: "0 8px 32px rgba(212,0,15,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
            </svg>
            Call (08) 9359 1444
          </a>
        </div>
      </div>

      <div
        style={{
          marginTop: "clamp(48px, 8vh, 72px)",
          paddingTop: "clamp(24px, 4vh, 32px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          width: "min(100%, 720px)",
          fontSize: "clamp(0.75rem, 2.2vw, 0.82rem)",
          color: "rgba(249,247,244,0.6)",
          fontWeight: 300,
          lineHeight: 1.7,
          animation: "fadeUp 0.6s 0.25s ease both",
        }}
      >
        Mon &ndash; Fri: 8:00 AM &ndash; 5:00 PM &nbsp;·&nbsp; Saturday: 8:00 AM
        &ndash; 12:00 PM &nbsp;·&nbsp; Sunday: Closed
        <br />
        <span style={{ opacity: 0.7 }}>
          &copy; 2025 Kewdale Tyrepower. All rights reserved.
        </span>
      </div>
    </main>
  );
}
