"use client";

import { useState, useEffect } from "react";
import BookingModal from "@/modal/BookingModal";
import { finePrintHtml, renderFinePrint } from "@/utils/finePrint";

type UrgencyStrip = {
  icon: string;
  stripDescription: string;
};
type urgencyStripProps = UrgencyStrip[];

type UrgencyProps = {
  sectionColor: string;
  backgroundColor: string;
  iconBackColor: string;
  urgencyEyebrow: string;
  urgencyheader: string;
  urgencySecHeader: string;
  urgencyPhara: string;
  urgencySubPhara: string[];

  urgencySlotBoxLbl: string;
  urgencySlotBoxCount: string;
  urgencySlotBoxUnit: string;
  urgencySlotBoxSub: string;
  urgencySlotBoxPrimaryBtn: string;
  urgencySlotBoxSecBtn: string;
  urgencyStrip: urgencyStripProps;
};

export default function Urgency({
  sectionColor,
  backgroundColor,
  iconBackColor,
  urgencyEyebrow,
  urgencyheader,
  urgencySecHeader,
  urgencyPhara,
  urgencySubPhara,

  urgencySlotBoxLbl,
  urgencySlotBoxCount,
  urgencySlotBoxUnit,
  urgencySlotBoxSub,
  urgencySlotBoxSecBtn,
  urgencyStrip,
}: UrgencyProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    mins: "00",
    secs: "00",
  });
  const [message, setMessage] = useState("open");
  const [subMessageText, setSubMessageText] = useState("");
  const [dynamicStore, setDynamicStore] = useState("");
  const [mainMessageText, setMainMessage] = useState(
    "Today's booking closed. No slots remaining.",
  );
  const [remainingSlot, setRemainingSlot] = useState(urgencySlotBoxCount);
  const [bookingDate, setBookingDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      // Perth, Western Australia — UTC+8, no DST
      const perthTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Australia/Perth" }),
      );

      const currentHour = perthTime.getHours();
      const currentMin = perthTime.getMinutes();
      const currentSec = perthTime.getSeconds();
      const dayOfWeek = perthTime.getDay();

      // Seconds elapsed since Perth midnight
      const nowSecs = currentHour * 3600 + currentMin * 60 + currentSec;

      let targetHour = 8;
      let extraDays = 0;
      let messageText = "";
      let subMessage = "";
      let slot = "";
      let addStories = "";
      let mainMessage = "";

      switch (dayOfWeek) {
        case 1: // Monday
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
        case 5: // Friday
          if (currentHour >= 8 && currentHour < 15) {
            targetHour = 15;
            slot = "3";
            subMessage = "Same day booking closes in";
            messageText = "Secure My Slot Now";
            mainMessage = "Same day slots remaining today";
            addStories = "Same day slots available. Book before 3PM today";
          } else if (currentHour < 8) {
            targetHour = 8;
            messageText = "Pre Book Today's Slot";
            subMessage = "Bookings open soon";
            mainMessage = "Opening soon book your slot";
            slot = "0";
            addStories = "Shop opens at 8:00 AM today. Reserve your slot now.";
          } else {
            targetHour = 8;
            extraDays = 1;
            messageText = "Pre Book Tomorrow's Slot";
            subMessage = "Next booking window opens in";
            mainMessage = "Closed for today reserve tomorrow's slot.";
            slot = "0";
            addStories =
              "We're closed for today. Reserve an early slot for 8:00 AM tomorrow.";
          }
          break;

        case 6: // Saturday
          if (currentHour >= 8 && currentHour < 10) {
            targetHour = 10;
            messageText = "Secure My Slot Now";
            subMessage = "Saturday booking closes in";
            mainMessage = "Saturday slots remaining today";
            slot = "3";
            addStories = "Saturday slots available. Book before 10AM today.";
          } else if (currentHour < 8) {
            targetHour = 8;
            messageText = "Pre Book Today's Slot";
            subMessage = "Saturday bookings open soon";
            mainMessage = "Opening soon book your slot";
            slot = "0";
            addStories =
              "Shop opens at 8:00 AM today. Reserve your Saturday slot now.";
          } else {
            // After 12PM Saturday — next opening Monday (2 days)
            targetHour = 8;
            extraDays = 2;
            messageText = "Pre Book Monday's Slot";
            subMessage = "Next booking window opens in";
            mainMessage = "Closed for the weekend reserve Monday's slot.";
            slot = "0";
            addStories =
              "Weekend hours are over. Reserve an early slot for Monday at 8:00 AM.";
          }
          break;

        case 0: // Sunday — closed all day, opens Monday
        default:
          targetHour = 8;
          extraDays = 1;
          messageText = "Pre Book Monday's Slot";
          subMessage = "Next booking window opens in";
          mainMessage = "Closed on Sundays reserve Monday's slot.";
          slot = "0";
          addStories =
            "We're closed on Sundays. Reserve an early slot for Monday at 8:00 AM.";
          break;
      }

      // Next available booking day = Perth date + extraDays (YYYY-MM-DD)
      const openDate = new Date(perthTime);
      openDate.setDate(openDate.getDate() + extraDays);
      const nextBookingDate = `${openDate.getFullYear()}-${String(
        openDate.getMonth() + 1,
      ).padStart(2, "0")}-${String(openDate.getDate()).padStart(2, "0")}`;

      // Compute diff purely in Perth-time seconds — no local timezone dependency
      const targetSecs = targetHour * 3600 + extraDays * 86400;
      const diffSecs = Math.max(0, targetSecs - nowSecs);

      const hours = Math.floor(diffSecs / 3600);
      const minutes = Math.floor((diffSecs % 3600) / 60);
      const seconds = diffSecs % 60;

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        mins: String(minutes).padStart(2, "0"),
        secs: String(seconds).padStart(2, "0"),
      });
      setMessage(messageText);
      setSubMessageText(subMessage);
      setRemainingSlot(slot);
      setDynamicStore(addStories);
      setMainMessage(mainMessage);
      setBookingDate(nextBookingDate);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const serviceSvgs = [
    // Clock
    <svg
      key="clock"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke={sectionColor}
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>,

    // Shield Check
    <svg
      key="shield"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke={sectionColor}
      className="w-5 h-5"
    >
      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>,

    // Dollar SVG
    <svg
      key="dollar"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke={sectionColor}
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2" />
    </svg>,

    // Fleet
    <svg
      key="fleet"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke={sectionColor}
      className="w-5 h-5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>,
  ];

  return (
    <section
      id="urgency"
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "var(--white)",
        padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 60px)",
      }}
    >
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
        }}
      /> */}

      <div
        className="relative z-1 mx-auto w-full"
        style={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(32px, 6vw, 60px)",
        }}
      >
        {/* Main Content - Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(32px, 6vw, 60px)",
            alignItems: "start",
          }}
        >
          {/* Left Column - Text Content */}
          <div style={{ animation: "fadeUp 0.6s 0.1s ease both" }}>
            {/* Badge */}
            <div
              className="inline-flex items-center"
              style={{
                gap: "8px",
                fontSize: "clamp(0.55rem, 2vw, 1.5rem)",
                letterSpacing: "clamp(2px, 1vw, 3.5px)",
                textTransform: "uppercase",
                color: sectionColor,
                fontWeight: "bold",
                marginBottom: "clamp(16px, 3vh, 20px)",
                fontFamily: "var(--font-bebas)",
              }}
            >
              {urgencyEyebrow}
            </div>

            {/* Main Header */}
            <h2
              style={{
                fontSize: "clamp(1.8rem, 6vw, 4rem)",
                fontFamily: "var(--font-geist-sans)",
                lineHeight: 1.1,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
                marginBottom: "clamp(12px, 2vh, 16px)",
                fontWeight: 700,
              }}
            >
              {urgencyheader}
              <br />
              <em
                style={{
                  fontStyle: "normal",
                  color: sectionColor,
                  display: "block",
                  fontSize: "clamp(1.3rem, 4vw, 2rem)",
                  fontWeight: 600,
                  marginTop: "clamp(8px, 1.5vh, 10px)",
                }}
              >
                {urgencySecHeader}
              </em>
            </h2>

            {/* Body Text */}
            <p
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                color: "var(--black)",
                lineHeight: 1.6,
                maxWidth: "100%",
                marginBottom: "clamp(20px, 4vw, 32px)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {urgencyPhara}
            </p>

            {/* Benefits List */}
            <div
              className="flex flex-col"
              style={{
                gap: "clamp(8px, 2vw, 12px)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {[
                ...urgencySubPhara,
                ...(dynamicStore ? [dynamicStore] : []),
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-start"
                  style={{
                    gap: "10px",
                    fontSize: "clamp(0.75rem, 2.2vw, 0.88rem)",
                    color: "var(--black)",
                  }}
                >
                  <svg
                    width="clamp(14px, 2vw, 16px)"
                    height="clamp(14px, 2vw, 16px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={sectionColor}
                    strokeWidth="2.5"
                    style={{
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    dangerouslySetInnerHTML={{ __html: finePrintHtml(text) }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Cards */}
          <div
            className="flex flex-col"
            style={{
              gap: "clamp(16px, 3vw, 24px)",
              animation: "fadeUp 0.6s 0.2s ease both",
            }}
          >
            {/* Slots Card */}
            <div
              className="text-center w-full"
              style={{
                background: "rgba(0, 0, 0, 0.04)",
                border: `1px solid ${sectionColor}20`,
                borderRadius: "12px",
                padding: "clamp(20px, 4vw, 28px) clamp(16px, 4vw, 32px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(0.55rem, 2vw, 0.65rem)",
                  letterSpacing: "clamp(2px, 1vw, 3px)",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  marginBottom: "clamp(8px, 1.5vh, 12px)",
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 500,
                }}
              >
                {mainMessageText}
              </div>
              <div
                style={{
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  lineHeight: 1,
                  color: sectionColor,
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                  fontWeight: "bold",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {remainingSlot}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
                  letterSpacing: "clamp(1.5px, 1vw, 2px)",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  marginBottom: "clamp(16px, 3vh, 20px)",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {urgencySlotBoxUnit}
              </div>
              <div
                className="flex justify-center flex-wrap"
                style={{
                  gap: "clamp(4px, 1.5vw, 6px)",
                  marginBottom: "clamp(12px, 2vh, 14px)",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: "clamp(6px, 1.8vw, 12px)",
                      height: "clamp(6px, 1.8vw, 12px)",
                      background: "rgba(0, 0, 0, 0.2)",
                    }}
                  />
                ))}
                <div
                  className="rounded-full"
                  style={{
                    width: "clamp(6px, 1.8vw, 12px)",
                    height: "clamp(6px, 1.8vw, 12px)",
                    background: sectionColor,
                    animation: "blinkDot 1.2s infinite",
                  }}
                />

                {[...Array(2)].map((_, i) => (
                  <div
                    key={i + 5}
                    className="rounded-full"
                    style={{
                      width: "clamp(6px, 1.8vw, 12px)",
                      height: "clamp(6px, 1.8vw, 12px)",
                      background: sectionColor,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.6rem, 2vw, 0.72rem)",
                  color: "var(--black)",
                  lineHeight: 1.4,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {urgencySlotBoxSub}
              </div>
            </div>

            {/* Timer Card */}
            <div
              className="text-center w-full"
              style={{
                background: "rgba(0, 0, 0, 0.04)",
                border: `1px solid ${sectionColor}20`,
                borderRadius: "12px",
                padding: "clamp(16px, 3vw, 20px) clamp(16px, 4vw, 28px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(0.5rem, 2vw, 0.62rem)",
                  letterSpacing: "clamp(1.5px, 1vw, 2.5px)",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  marginBottom: "clamp(10px, 2vh, 12px)",
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 500,
                }}
              >
                {subMessageText}
              </div>
              <div
                className="flex items-center justify-center"
                style={{ gap: "clamp(4px, 2vw, 8px)" }}
              >
                {["hours", "mins", "secs"].map((unit, idx) => (
                  <div
                    key={unit}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className="flex flex-col items-center"
                      style={{ gap: "4px" }}
                    >
                      <div
                        style={{
                          fontSize: "clamp(1.3rem, 5vw, 2.2rem)",
                          color: "var(--black)",
                          letterSpacing: "1px",
                          lineHeight: 1,
                          minWidth: "clamp(40px, 8vw, 50px)",
                          textAlign: "center",
                          background: "rgba(0, 0, 0, 0.05)",
                          borderRadius: "8px",
                          padding:
                            "clamp(6px, 1.5vw, 10px) clamp(4px, 2vw, 8px)",
                          fontFamily: "var(--font-geist-mono)",
                          fontWeight: 600,
                        }}
                      >
                        {
                          timeLeft[
                            unit === "hours"
                              ? "hours"
                              : unit === "mins"
                                ? "mins"
                                : "secs"
                          ]
                        }
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(0.4rem, 1.5vw, 0.55rem)",
                          letterSpacing: "clamp(1px, 1vw, 2px)",
                          textTransform: "uppercase",
                          color: "var(--black)",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {unit}
                      </div>
                    </div>
                    {idx < 2 && (
                      <div
                        style={{
                          fontSize: "clamp(1.2rem, 4vw, 2rem)",
                          color: "rgba(0, 0, 0, 0.2)",
                          marginBottom: "clamp(8px, 2vh, 14px)",
                          marginLeft: "clamp(4px, 2vw, 8px)",
                          marginRight: "clamp(4px, 2vw, 8px)",
                          fontFamily: "var(--font-geist-mono)",
                          fontWeight: 600,
                        }}
                      >
                        :
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col w-full" style={{ gap: "12px" }}>
              <button
                className="flex items-center justify-center"
                style={{
                  gap: "10px",
                  background: sectionColor,
                  color: "white",
                  fontSize: "clamp(0.8rem, 2.5vw, 0.92rem)",
                  fontWeight: 600,
                  padding: "clamp(12px, 3vw, 15px) clamp(16px, 4vw, 24px)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  letterSpacing: "0.2px",
                  textAlign: "center",
                  transition: "transform 0.2s, opacity 0.2s",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                  width: "100%",
                  opacity: 1,
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
                onClick={() => setModalOpen(true)}
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
                {message}
              </button>
              <a
                href="tel:0893591444"
                className="flex items-center justify-center"
                style={{
                  gap: "8px",
                  background: "transparent",
                  color: "var(--black)",
                  fontSize: "clamp(0.7rem, 2.2vw, 0.82rem)",
                  fontWeight: 400,
                  padding: "clamp(12px, 2.5vw, 12px) clamp(16px, 4vw, 24px)",
                  borderRadius: "8px",
                  border: `1px solid ${sectionColor}40`,
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${sectionColor}10`;
                  e.currentTarget.style.borderColor = sectionColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = `${sectionColor}40`;
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
                {urgencySlotBoxSecBtn}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div style={{ marginTop: "24px", fontFamily: "var(--font-inter)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : `repeat(${urgencyStrip.length}, 1fr)`,
              gap: "1px",
              background: "rgba(0,0,0,0.08)",
              overflow: "hidden",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {urgencyStrip.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  textAlign: isMobile ? "center" : "left",
                  gap: isMobile ? "12px" : "16px",
                  padding: isMobile
                    ? "clamp(18px, 5vw, 24px) clamp(14px, 4vw, 20px)"
                    : "clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px)",
                  background: "#ffffff",
                  height: "100%", // Ensures all cards have equal height
                  // Professional borders added
                  ...(!isMobile && {
                    borderRight:
                      (idx + 1) % 4 !== 0
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                    borderBottom:
                      idx < urgencyStrip.length - 4
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                    borderTop:
                      idx < 4 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                    borderLeft:
                      idx % 4 === 0 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                  }),
                  ...(isMobile && {
                    borderBottom:
                      idx !== urgencyStrip.length - 1
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                    borderRight:
                      idx % 2 === 0 && idx !== urgencyStrip.length - 1
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                  }),
                }}
              >
                {/* Icon chip */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "48px" : "44px",
                    height: isMobile ? "48px" : "44px",
                    borderRadius: "12px",
                    background: iconBackColor || `${sectionColor}12`,
                    color: sectionColor,
                    flexShrink: 0,
                  }}
                >
                  {serviceSvgs[idx]}
                </div>

                {/* Text */}
                <span
                  style={{
                    fontSize: isMobile
                      ? "clamp(0.78rem, 3.5vw, 0.85rem)"
                      : "clamp(0.75rem, 1.4vw, 0.85rem)",
                    fontWeight: 500,
                    color: "#1F2937",
                    lineHeight: 1.5,
                    fontFamily:
                      "var(--font-inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
                    flex: 1,
                  }}
                >
                  {renderFinePrint(item.stripDescription)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookingModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        color={sectionColor}
        defaultDate={bookingDate}
      />
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes blinkDot {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
