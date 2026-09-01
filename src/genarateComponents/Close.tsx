"use client";

import logo from "../../public/logo.png";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import BookingModal from "@/modal/BookingModal";
import FleetEnquiryModal from "@/modal/FleetEnquiryModal";
import { renderFinePrint } from "@/utils/finePrint";

type sectionThirteenHeadingProps = {
  main: string;
  highlight: string;
};

type sectionThirteenCloseTrustProps = {
  label: string;
  target: string;
};

type CloseTrustItem = {
  icon: string;
  description: string;
};

type CloseInfoItem = {
  id: string | number;
  infoTitle: string;
  infoDescription: string;
};

type SectionThirteenCloseTrustProps = CloseTrustItem[];
type sectionThirteenCloseInfoProps = CloseInfoItem[];
type SectionThirteenCloseFooterProps = sectionThirteenCloseTrustProps[];

type Props = {
  sectionColor: string;
  backgroundColor: string;
  boarderColor: string;
  iconBackColor: string;
  sectionThirteenEyebrow: string;
  sectionThirteenHeading: sectionThirteenHeadingProps;
  sectionThirteenPhara: string;
  sectionThirteenPrimaryBtn: string;
  sectionThirteenSecBtn: string;
  sectionThirteenCloseTrust: SectionThirteenCloseTrustProps;
  sectionThirteenCloseInfo: sectionThirteenCloseInfoProps;
  sectionThirteenCloseFooter: SectionThirteenCloseFooterProps;
};

export default function Close({
  sectionColor,
  backgroundColor,
  boarderColor,
  iconBackColor,
  sectionThirteenEyebrow,
  sectionThirteenHeading,
  sectionThirteenPhara,
  sectionThirteenPrimaryBtn,
  sectionThirteenSecBtn,
  sectionThirteenCloseTrust,
  sectionThirteenCloseInfo,
  sectionThirteenCloseFooter,
}: Props) {
  const pathname = usePathname();
  // Project landing pages live at /projects/[slug]; the slug is the source.
  // Mirrors Offer.tsx so every form on a page records the same source_page.
  const sourcePage =
    pathname === "/" || pathname === ""
      ? "professional"
      : pathname.split("/").pop() || "professional";

  // The secondary CTA is a phone link on most pages, but the tradie pages label
  // it "Fleet account" (see projects.json) — there it opens the fleet enquiry
  // modal instead of dialling.
  const isFleetSecondaryBtn = /fleet/i.test(sectionThirteenSecBtn);

  const icons = [
    <svg
      key="clock-1"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={sectionColor}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>,

    <svg
      key="clock-2"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={sectionColor}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>,

    <svg
      key="clock-3"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={sectionColor}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
    </svg>,
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [fleetModalOpen, setFleetModalOpen] = useState(false);

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
        // maxWidth: "1100px",
        // margin: "0 auto",
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
        {/* Badge */}
        <div
          className="inline-flex items-center text-center"
          style={{
            gap: "8px",
            fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            color: sectionColor,
            fontWeight: "bold",
            marginBottom: "16px",
            fontFamily: "var(--font-bebas)",
          }}
        >
          {sectionThirteenEyebrow}
        </div>

        {/* Main Headers */}
        <div className="flex flex-col items-center justify-center">
          <h2
            className="mx-auto"
            style={{
              fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
              lineHeight: "1.05",
              color: "var(--white)",
              letterSpacing: "-0.02em",
              marginBottom: "clamp(16px, 3vh, 24px)",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 700,
            }}
          >
            {sectionThirteenHeading.main}
            <em
              style={{
                fontStyle: "normal",
                color: sectionColor,
                display: "block",
                fontWeight: 800,
                fontSize: "clamp(2rem, 6.5vw, 5rem)",
                marginTop: "clamp(8px, 1.5vh, 12px)",
              }}
            >
              {sectionThirteenHeading.highlight}
            </em>
          </h2>
        </div>

        {/* Body Text */}
        <div className="flex justify-center">
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              color: "var(--white)",
              fontWeight: 300,
              lineHeight: "1.6",
              width: "min(90%, 80%)",
              marginBottom: "clamp(32px, 6vh, 44px)",
            }}
          >
            {sectionThirteenPhara}
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex items-center justify-center flex-wrap"
          style={{
            gap: "clamp(12px, 3vw, 16px)",
            marginBottom: "clamp(32px, 6vh, 40px)",
          }}
        >
          <a
            href="#"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: sectionColor,
              color: "var(--white)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              fontWeight: 600,
              padding: "clamp(12px, 2vh, 18px) clamp(24px, 5vw, 38px)",
              borderRadius: "4px",
              textDecoration: "none",
              letterSpacing: "0.3px",
              boxShadow: `0 8px 32px ${sectionColor}40`,
              fontFamily: "var(--font-geist-mono)",
              whiteSpace: "nowrap",
            }}
          >
            Book My Appointment Now
            {/* {sectionThirteenPrimaryBtn} */}
          </a>
          <a
            href={isFleetSecondaryBtn ? "#" : "tel:0893591444"}
            className="btn-ghost"
            onClick={
              isFleetSecondaryBtn
                ? (e) => {
                    e.preventDefault();
                    setFleetModalOpen(true);
                  }
                : undefined
            }
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
            {sectionThirteenSecBtn}
          </a>
        </div>

        {/* Trust Indicators */}
        <div
          className="flex items-center justify-center flex-wrap"
          style={{
            gap: "clamp(16px, 4vw, 28px)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {sectionThirteenCloseTrust.map((item, index) => (
            <div
              key={index}
              style={{
                color: "var(--white)",
                fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                border: `3px solid ${boarderColor}`,
                padding: "clamp(10px, 2vw, 15px) clamp(20px, 5vw, 30px)",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <p>{renderFinePrint(item.description)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards Section - Responsive Grid */}
      <div
        className="relative z-1"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          animation: "fadeUp 0.6s 0.25s ease both",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {sectionThirteenCloseInfo.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col text-center md:text-left items-center md:items-start"
            style={{
              padding: "clamp(32px, 6vw, 48px) clamp(20px, 5vw, 48px)",
              borderRight:
                index < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
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
                background: iconBackColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icons[index]}
            </div>
            <div>
              {/* Card Header */}
              <div
                style={{
                  fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)",
                  fontWeight: 600,
                  color: "var(--white)",
                  marginBottom: "4px",
                  fontFamily: "var(--font-geist-sans)",
                  letterSpacing: "-0.01em",
                  // textAlign: "center md:text-left",
                }}
              >
                {item.infoTitle}
              </div>

              {/* Card Body */}
              <div
                style={{
                  fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                  color: "var(--white)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {index === 0 && (
                  <div
                    style={{
                      minHeight: "clamp(150px, 25vh, 160px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ marginTop: "10px" }}>{item.infoDescription}</p>
                    <div>
                      <a
                        target="_blank"
                        href="https://www.google.com/maps/place/Tyrepower+Kewdale/data=!4m2!3m1!1s0x0:0x6d6bf7ed2ef6b50b?sa=X&ved=1t:2428&ictx=111"
                        style={{
                          color: "var(--white)",
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.15)",
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.7rem, 1.8vw, 0.75rem)",
                        }}
                      >
                        Get directions &rarr;
                      </a>
                    </div>
                  </div>
                )}

                {index === 1 && (
                  <div
                    style={{
                      minHeight: "clamp(150px, 25vh, 160px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.infoDescription.split(",").map((text, i, arr) => (
                      <div key={i}>
                        {i === arr.length - 1 && <br />}
                        <p style={{ marginTop: "10px" }}>{text.trim()}</p>
                      </div>
                    ))}
                  </div>
                )}

                {index === 2 && (
                  <div
                    style={{
                      minHeight: "clamp(150px, 25vh, 160px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    className="items-center md:items-start"
                  >
                    {item.infoDescription.split(",").map((text, i, arr) => (
                      <div key={i}>
                        {i === arr.length - 1 && (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center md:justify-start",
                            flexWrap: "wrap",
                          }}
                        >
                          <p style={{ marginTop: "10px" }}>
                            {text.split(":")[0]}:
                          </p>
                          <p
                            style={{
                              marginTop: "10px",
                              cursor: "pointer",
                              transition: "color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = sectionColor)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "inherit")
                            }
                          >
                            {text.split(":")[1]?.trim()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section - Fully Responsive */}
      <div
        className="relative z-1 flex flex-col md:flex-row items-center justify-between flex-wrap"
        style={{
          padding: "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 60px)",
          gap: "clamp(16px, 4vw, 24px)",
          animation: "fadeUp 0.6s 0.4s ease both",
          textAlign: "center",
          maxWidth: "1400px",
          margin: "0 auto",
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
          {sectionThirteenCloseFooter.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                smoothScrollTo(item.target);
              }}
              style={{
                fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                color: "var(--white)",
                textDecoration: "none",
                fontFamily: "var(--font-inter)",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                cursor:"pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--grey)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--white)")
              }
            >
              {item.label.charAt(0).toUpperCase() +
                item.label.slice(1).toLowerCase()}
            </a>
          ))}
        </div>

        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.65rem, 1.8vw, 0.72rem)",
            color: "var(--white)",
          }}
        >
          &copy; 2025 Kewdale Tyrepower. All rights reserved.
        </div>
      </div>

      <BookingModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        color={sectionColor}
      />

      <FleetEnquiryModal
        visible={fleetModalOpen}
        onClose={() => setFleetModalOpen(false)}
        color={sectionColor}
        sourcePage={sourcePage}
      />

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
