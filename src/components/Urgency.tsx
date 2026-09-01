"use client";

import { useState, useEffect } from "react";
import BookingModal from "@/modal/BookingModal";

const BASE_STORES = [
  "Experts recommend replacing tyres at 3mm don't leave it too late",
];

export default function Urgency() {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    mins: "00",
    secs: "00",
  });
  const [message, setMessage] = useState("open");
  const [mainMessageText, setMainMessage] = useState(
    "Today's booking closed. No slots remaining.",
  );
  const [subMessageText, setSubMessageText] = useState("");
  const [remainingSlot, setRemainingSlot] = useState("");
  const [dynamicStore, setDynamicStore] = useState("");
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
            addStories =
              "Shop opens at 8:00 AM today. Reserve your slot now.";
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

  return (
    <section
      id="urgency"
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "var(--white)",
        padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)",
      }}
    >
      <div
        className="relative z-1 mx-auto"
        style={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(40px, 6vw, 60px)",
        }}
      >
        {/* Main Content - Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(40px, 6vw, 60px)",
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
                fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--red)",
                fontWeight: "bold",
                marginBottom: "16px",
                fontFamily: "var(--font-bebas)",
              }}
            >
              Limited availability today
            </div>

            {/* Main Header */}
            <h2
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontFamily: "var(--font-geist-sans)",
                lineHeight: 1.1,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                fontWeight: 700,
              }}
            >
              Don&rsquo;t Put It Off.
              <br />
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--red)",
                  display: "block",
                  fontSize: "clamp(1.4rem, 4vw, 3rem)",
                  fontWeight: 600,
                }}
              >
                Worn tyres don&rsquo;t wait for a convenient time.
              </em>
            </h2>

            {/* Body Text */}
            <p
              style={{
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                color: "var(--black)",
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: "100%",
                marginBottom: "clamp(24px, 4vw, 32px)",
                fontFamily: "var(--font-inter)",
              }}
            >
              We get it you&rsquo;re busy. But the longer you leave it,{" "}
              <strong style={{ color: "var(--black)", fontWeight: 500 }}>
                the more it costs you.
              </strong>{" "}
              Uneven wear means replacing a full set instead of two. A slow
              puncture that becomes a blowout on the freeway. An alignment issue
              that chews through new tyres in six months. A 90 minute job today
              beats a serious problem tomorrow.
            </p>

            {/* Benefits List */}
            <div
              className="flex flex-col"
              style={{ gap: "10px", fontFamily: "var(--font-inter)" }}
            >
              <p
                className="flex items-start"
                style={{
                  gap: "12px",
                  fontSize: "clamp(0.8rem, 2.2vw, 0.88rem)",
                  color: "var(--black)",
                  fontWeight: 400,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    flexShrink: 0,
                    marginTop: "2px",
                    color: "var(--black)",
                  }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>90 mins average back at your desk <span style={{fontSize: "clamp(0.4rem, 1.2vw, 0.75rem)",fontWeight:"Bold"}}>(Subject to availability)</span></span>
              </p>

              <p
                className="flex items-start"
                style={{
                  gap: "12px",
                  fontSize: "clamp(0.8rem, 2.2vw, 0.88rem)",
                  color: "var(--black)",
                  fontWeight: 400,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    flexShrink: 0,
                    marginTop: "2px",
                    color: "var(--black)",
                  }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Price locked quote today, book whenever you&apos;re ready <span style={{fontSize: "clamp(0.4rem, 1.2vw, 0.75rem)",fontWeight:"Bold"}}>( T & C&apos;s apply)</span></span>
              </p>
              {[...BASE_STORES, ...(dynamicStore ? [dynamicStore] : [])].map(
                (text, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    style={{
                      gap: "12px",
                      fontSize: "clamp(0.8rem, 2.2vw, 0.88rem)",
                      color: "var(--black)",
                      fontWeight: 400,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{
                        flexShrink: 0,
                        marginTop: "2px",
                        color: "var(--black)",
                      }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{text}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right Column - Cards */}
          <div
            className="flex flex-col"
            style={{
              gap: "clamp(20px, 4vw, 24px)",
              animation: "fadeUp 0.6s 0.2s ease both",
            }}
          >
            {/* Slots Card */}
            <div
              className="text-center w-full"
              style={{
                background: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(0.6rem, 2vw, 0.65rem)",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  marginBottom: "12px",
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
                  color: "var(--red)",
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
                  fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  marginBottom: "20px",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                spots left
              </div>

              {/* loading dot animation */}
              <div
                className="flex justify-center flex-wrap"
                style={{ gap: "6px", marginBottom: "14px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: "clamp(8px, 2vw, 12px)",
                      height: "clamp(8px, 2vw, 12px)",
                      background: "var(--black)",
                      opacity: 0.6,
                    }}
                  />
                ))}
                <div
                  className="rounded-full"
                  style={{
                    width: "clamp(8px, 2vw, 12px)",
                    height: "clamp(8px, 2vw, 12px)",
                    background: "var(--red)",
                    animation: "blinkDot 1.2s infinite",
                  }}
                />
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i + 5}
                    className="rounded-full"
                    style={{
                      width: "clamp(8px, 2vw, 12px)",
                      height: "clamp(8px, 2vw, 12px)",
                      background: "var(--red)",
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.65rem, 2vw, 0.72rem)",
                  color: "var(--black)",
                  lineHeight: 1.4,
                  fontFamily: "var(--font-inter)",
                }}
              >
                Slots fill up fast on weekday mornings.
                <br />
                Book now to secure your time.
              </div>
            </div>

            {/* Timer Card */}
            <div
              className="text-center w-full"
              style={{
                background: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 28px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(0.55rem, 2vw, 0.62rem)",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  marginBottom: "12px",
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 500,
                }}
              >
                {subMessageText}
              </div>
              <div
                className="flex items-center justify-center"
                style={{ gap: "clamp(4px, 2vw, 6px)" }}
              >
                {["hours", "mins", "secs"].map((unit, idx) => (
                  <div
                    key={unit}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className="flex flex-col items-center"
                      style={{ gap: "2px" }}
                    >
                      <div
                        className="shadow-2xl"
                        style={{
                          fontSize: "clamp(1.5rem, 5vw, 2rem)",
                          color: "var(--black)",
                          letterSpacing: "1px",
                          lineHeight: 1,
                          minWidth: "clamp(36px, 8vw, 42px)",
                          textAlign: "center",
                          background: "rgba(0, 0, 0, 0.05)",
                          borderRadius: "4px",
                          padding:
                            "clamp(4px, 1.5vw, 8px) clamp(4px, 2vw, 8px)",
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
                          fontSize: "clamp(0.45rem, 1.8vw, 0.55rem)",
                          letterSpacing: "2px",
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
                          fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                          color: "rgba(0, 0, 0, 0.25)",
                          marginBottom: "14px",
                          marginLeft: "clamp(4px, 2vw, 6px)",
                          marginRight: "clamp(4px, 2vw, 6px)",
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
            <div className="flex flex-col w-full" style={{ gap: "10px" }}>
              <button
                className="flex items-center justify-center"
                style={{
                  gap: "10px",
                  background: "var(--red)",
                  color: "white",
                  fontSize: "clamp(0.8rem, 2.5vw, 0.92rem)",
                  fontWeight: 600,
                  padding: "clamp(20px, 3vw, 15px) clamp(16px, 4vw, 24px)",
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
                  fontSize: "clamp(0.75rem, 2.2vw, 0.82rem)",
                  fontWeight: 400,
                  padding: "clamp(10px, 2.5vw, 12px) clamp(20px, 4vw, 24px)",
                  borderRadius: "4px",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)";
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
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div style={{ marginTop: "24px", fontFamily: "var(--font-inter)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(0,0,0,0.07)",
              overflow: "hidden",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {[
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L1 21h22L12 2z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
                  </svg>
                ),
                line1: "Tread below 1.5mm",
                line2: "is illegal",
                line3: "in WA",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                line1: "Incorrect pressure",
                line2: "reduces fuel economy",
                line3: "by up to 3%",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M8 12h8" />
                  </svg>
                ),
                line1: "Bad alignment",
                line2: "wears tyres",
                line3: "2–3× faster",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                ),
                line1: "Free safety check",
                line2: "10 min,",
                line3: "no obligation",
              },
            ].map((item, idx) => (
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
                  // Fixed: Removed borderLeft:"1px solid red"
                  // Professional borders for grid
                  ...(!isMobile && {
                    borderRight:
                      (idx + 1) % 4 !== 0
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                    borderBottom:
                      idx < 4 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                  }),
                  ...(isMobile && {
                    borderBottom:
                      idx !== 3 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                    borderRight:
                      idx % 2 === 0 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                  }),
                }}
              >
                {/* Icon chip */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "44px" : "38px",
                    height: isMobile ? "44px" : "38px",
                    borderRadius: "12px",
                    background: "#FF000012",
                    color: "var(--red, #DC2626)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                {/* Text content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "6px" : "4px",
                    alignItems: isMobile ? "center" : "flex-start",
                    flex: "1",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile
                        ? "clamp(0.85rem, 4vw, 0.95rem)"
                        : "0.8rem",
                      fontWeight: 600,
                      color: "#111827",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.line1}
                  </span>

                  <span
                    style={{
                      fontSize: isMobile
                        ? "clamp(0.7rem, 3.5vw, 0.8rem)"
                        : "0.7rem",
                      fontWeight: 400,
                      color: "var(--black)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.line2}
                  </span>

                  <span
                    style={{
                      fontSize: isMobile
                        ? "clamp(0.85rem, 4vw, 0.95rem)"
                        : "0.8rem",
                      fontWeight: 700,
                      color: "var(--red, #DC2626)",
                    }}
                  >
                    {item.line3}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BookingModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
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

        @keyframes blinkDot {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @media (max-width: 768px) {
          .btn-white,
          .btn-ghost-white {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
