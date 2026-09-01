"use client";
import { useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import BookingModal from "@/modal/BookingModal";

export default function Close() {
  const [modalOpen, setModalOpen] = useState(false);
  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="abouthUs"
      className="relative overflow-hidden"
      style={{
        background: "var(--navy)",

        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
        className="relative z-1 text-center"
        style={{
          padding:
            "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 60px) clamp(40px, 8vw, 60px)",
          animation: "fadeUp 0.6s 0.1s ease both",
        }}
      >
        {/* Badge - Responsive */}
        <div
          className="inline-flex items-center mx-auto"
          style={{
            gap: "8px",
            fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: "bold",
            marginBottom: "16px",
            fontFamily: "var(--font-bebas)",
          }}
        >
          Your move
        </div>

        {/* Main Headers - Responsive Typography */}
        <div className="flex flex-col items-center justify-center">
          <h2
            className="mx-auto"
            style={{
              fontSize: "clamp(2rem, 6vw, 5.5rem)",
              lineHeight: 1.05,
              color: "var(--white)",
              letterSpacing: "-0.02em",
              marginBottom: "clamp(16px, 3vh, 24px)",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 700,
            }}
          >
            Perth&rsquo;s Smartest Professionals
            <em
              style={{
                fontStyle: "normal",
                color: "#ffd204",
                display: "block",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 5.5vw, 5rem)",
                marginTop: "clamp(8px, 1.5vh, 12px)",
              }}
            >
              Don&rsquo;t Waste Time On The Wrong Tyre Shop.
            </em>
          </h2>
        </div>

        {/* Body Text - Responsive */}
        <div className="flex justify-center px-4">
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              color: "var(--white)",
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: "min(90%, 800px)",
              marginBottom: "clamp(32px, 6vh, 44px)",
            }}
          >
            You&rsquo;ve seen what we do and how we do it.{" "}
            <strong style={{ color: "var(--white)", fontWeight: 500 }}>
              Upfront pricing, honest advice, done right, done fast.
            </strong>{" "}
            All that&rsquo;s left is booking takes two minutes, and your car
            could be sorted before lunch.
          </p>
        </div>

        {/* Buttons - Responsive */}
        <div
          className="flex items-center justify-center flex-wrap"
          style={{
            gap: "clamp(12px, 3vw, 16px)",
            marginBottom: "clamp(32px, 6vh, 40px)",
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--red)",
              color: "var(--white)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              fontWeight: 600,
              padding: "clamp(12px, 2vh, 18px) clamp(24px, 5vw, 38px)",
              borderRadius: "4px",
              textDecoration: "none",
              letterSpacing: "0.3px",
              boxShadow: "0 8px 32px rgba(212,0,15,0.35)",
              fontFamily: "var(--font-geist-mono)",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book My Appointment Now
          </a>
          <a
            href="tel:0893591444"
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.06)",
              color: "var(--white)",
              fontSize: "clamp(0.8rem, 1.8vw, 0.92rem)",
              fontWeight: 400,
              padding: "clamp(12px, 2vh, 18px) clamp(20px, 5vw, 82px)",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.12)",
              textDecoration: "none",
              fontFamily: "var(--font-geist-mono)",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width="14"
              height="14"
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
        <BookingModal visible={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      {/* Info Cards Section - Fully Responsive Grid */}
      <div
        className="relative z-1"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          animation: "fadeUp 0.6s 0.25s ease both",
        }}
      >
        {/* Card 1 - Find Us */}
        <div
          className="flex flex-col text-center md:text-left items-center md:items-start"
          style={{
            padding: "clamp(32px, 6vw, 48px) clamp(20px, 5vw, 48px)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            gap: "18px",
          }}
        >
          <div
            className="flex items-center justify-center md:justify-start"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)",
                fontWeight: 600,
                color: "var(--white)",
                marginBottom: "8px",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
              }}
            >
              Find Us in Kewdale
            </div>
            <div
              style={{
                fontSize: "clamp(0.75rem, 2.2vw, 0.8rem)",
                color: "var(--white)",
                fontWeight: 300,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter)",
              }}
            >
              Conveniently located for Kewdale, Belmont,Forrestfield, Welshpool,
              High Wycombe, Maida Vale, Kalamunda and Lesmurdie & surrounding
              suburbs.
              <br />
              <br />
              <a
                target="_blank"
                href="https://www.google.com/maps/place/Tyrepower+Kewdale/data=!4m2!3m1!1s0x0:0x6d6bf7ed2ef6b50b?sa=X&ved=1t:2428&ictx=111"
                style={{
                  color: "var(--white)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                }}
              >
                Get directions &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 - Trading Hours */}
        <div
          className="flex flex-col text-center md:text-left items-center md:items-start"
          style={{
            padding: "clamp(32px, 6vw, 48px) clamp(20px, 5vw, 48px)",
            gap: "18px",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="flex items-center justify-center md:justify-start"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)",
                fontWeight: 600,
                color: "var(--white)",
                marginBottom: "8px",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
              }}
            >
              Trading Hours
            </div>
            <div
              style={{
                fontSize: "clamp(0.75rem, 2.2vw, 0.8rem)",
                color: "var(--white)",
                fontWeight: 300,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter)",
              }}
            >
              Mon &ndash; Fri: 8:00 AM &ndash; 5:00 PM
              <br />
              Saturday: 8:00 AM &ndash; 12:00 PM
              <br />
              Sunday: Closed
              <br />
              <br />
              Same day bookings close at 3:00 PM.
            </div>
          </div>
        </div>

        {/* Card 3 - Get In Touch */}
        <div
          className="flex flex-col text-center md:text-left items-center md:items-start"
          style={{
            padding: "clamp(32px, 6vw, 48px) clamp(20px, 5vw, 48px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            gap: "18px",
          }}
        >
          <div
            className="flex items-center justify-center md:justify-start"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)",
                fontWeight: 600,
                color: "var(--white)",
                marginBottom: "8px",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
              }}
            >
              Get In Touch
            </div>
            <div
              style={{
                fontSize: "clamp(0.75rem, 2.2vw, 0.8rem)",
                color: "var(--white)",
                fontWeight: 300,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter)",
              }}
            >
              Phone:{" "}
              <a
                href="tel:0893591444"
                style={{
                  color: "var(--white)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                (08) 9359 1444
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:kewdale@tyrepower.com.au"
                style={{
                  color: "var(--white)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                kewdale@tyrepower.com.au
              </a>
              <br />
              <br />
              We answer the phone. No robot, no hold music.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Fully Responsive */}
      <div
        className="relative z-1 flex flex-col md:flex-row items-center justify-between flex-wrap"
        style={{
          padding: "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 60px)",
          gap: "clamp(16px, 4vw, 24px)",
          animation: "fadeUp 0.6s 0.4s ease both",
          textAlign: "center",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ gap: "10px" }}
        >
          <Image
            src={logo}
            alt="Tyrepower Logo"
            width={160}
            height={40}
            className="w-auto h-8 md:h-10 lg:h-auto object-contain"
          />
        </div>

        <div
          className="flex flex-wrap justify-center"
          style={{ gap: "clamp(16px, 4vw, 24px)" }}
        >
          {[
            {
              label: "Privacy Policy",
              onClick: () => {
                smoothScrollTo("privacy-policy");
              },
            },
            {
              label: "Terms of Service",
              onClick: () => {
                smoothScrollTo("terms-of-service");
              },
            },
            {
              label: "Tyre Brands",
              onClick: () => {
                smoothScrollTo("tyre-brand");
              },
            },
            {
              label: "Google Reviews",
              onClick: () => {
                smoothScrollTo("testimonials");
              },
            },
          ].map((item, index) => (
            <a
              key={index}
              onClick={item.onClick}
              style={{
                fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
                color: "var(--white)",
                textDecoration: "none",
                fontFamily: "var(--font-inter)",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                cursor:"pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--white)")
              }
            >
              {item.label}
            </a>
          ))}
        </div>

        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.6rem, 1.8vw, 0.72rem)",
            color: "var(--white)",
          }}
        >
          &copy; 2025 Kewdale Tyrepower. All rights reserved.
        </div>
      </div>

      {/* Add fadeUp animation keyframes */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
