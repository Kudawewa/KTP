"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import clock_icon from "../../public/clock.png";
import shiled_icon from "../../public/shield.png";
import dollar_icon from "../../public/dollars.png";
import check_icon from "../../public/checked.png";
import tyre_track from "../../public/tyre_track.svg";

export default function Guarantee() {
  const typewriterWords = useMemo(
    () => ["Arguments.", "Hassle.", "Time waste."],
    [],
  );
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typewriterWords.length);
      }, 0);
    } else if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, 60);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, typewriterWords]);

  const points = [
    {
      title: "Done Right First Time Guarantee",
      desc: "Every fitment is checked before your car leaves the floor. If there's a problem with our workmanship, we fix it immediately no charge, no debate.",
      icon: clock_icon,
    },
    {
      title: "Price Lock Guarantee",
      desc: "The price we quote you is the price you pay. Period. If it ever differs at the counter without your approval, you don't pay the difference.",
      icon: dollar_icon,
    },
    {
      title: "On Time Guarantee",
      desc: "We give you a realistic time and we stick to it. In any case if we run over, we'll let you know.",
      icon: check_icon,
    },
    // {
    //   title: "12 Month Workmanship Warranty",
    //   desc: "All fitment and alignment work is covered for 12 months. If anything related to our work causes an issue in that time, it's covered. In writing.",
    //   icon: shiled_icon,
    // },
  ];

  return (
    <div
      id="guarantee"
      style={{
        background: "linear-gradient(180deg, #F8F9FC 0%, #FFFFFF 100%)",
        padding: "clamp(48px, 10vw, 96px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "min(600px, 80vw)",
          height: "min(600px, 80vw)",
          background:
            "radial-gradient(circle, rgba(212,0,15,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "min(500px, 70vw)",
          height: "min(500px, 70vw)",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Centered Headline Section */}
      <div
        className="flex flex-col items-center text-center px-4"
        style={{
          paddingTop: "clamp(0px, 4vw, 32px)",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="inline-flex items-center uppercase mx-auto"
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
          Zero risk
        </div>

        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "clamp(16px, 3vh, 20px)",
            color: "var(--navy)",
            fontWeight: 700,
          }}
        >
          If It&rsquo;s Not Right,
          <em
            style={{
              fontStyle: "normal",
              color: "var(--red)",
              display: "block",
            }}
          >
            We Fix It.
          </em>
          No{" "}
          <span style={{ color: "var(--navy)", whiteSpace: "nowrap" }}>
            {displayedText}
            <span
              style={{
                display: "inline-block",
                width: "3px",
                marginLeft: "2px",
                background: "var(--red)",
                animation: "blink 0.7s step-end infinite",
                verticalAlign: "middle",
                height: "0.85em",
              }}
            />
          </span>
          <span
            style={{
              display: "block",
              fontFamily:
                "var(--font-inter), system-ui, -apple-system, sans-serif",
              fontSize: "clamp(0.55rem, 2.2vw, 0.7rem)",
              fontWeight: "bold",
              color: "var(--navy)",
              letterSpacing: "0.02em",
              marginTop: "8px",
            }}
          >
            (T &amp; C&rsquo;s apply!)
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ maxWidth: "750px", width: "100%" }}
        >
          <p
            style={{
              fontFamily:
                "var(--font-inter), system-ui, -apple-system, sans-serif",
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              color: "var(--black)",
              lineHeight: 1.6,
            }}
          >
            We know you&apos;ve probably been burned before by vague promises
            that dissolved the moment something went wrong.{" "}
            <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>
              That&apos;s not how we operate.
            </strong>{" "}
            Every job we do is backed by a straight up guarantee: if you drive
            away and something&apos;s not right, bring it back and we&apos;ll
            sort it at no cost to you. No hoops. No excuses. Just fixed.
          </p>
        </motion.div>
      </div>

      {/* Main Content Section */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "transparent",
          padding: "clamp(48px, 8vw, 80px) clamp(16px, 5vw, 32px)",
          display: "flex",
          justifyContent: "center",
          marginTop: "clamp(16px, 4vh, 24px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Background tyre track - hidden on mobile */}
        <span
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{
            left: "50%",
            top: "5%",
            transform: "translate(-50%, -50%)",
            opacity: 0.3,
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <Image
            src={tyre_track}
            alt=""
            width={140}
            height={140}
            style={{ opacity: 1, filter: "grayscale(100%)" }}
          />
        </span>

        <div
          className="relative z-10 mx-auto w-full"
          style={{ maxWidth: "1280px" }}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-[360px_1fr] items-center gap-10 lg:gap-16">
            {/* Left Column - Badge (Enhanced) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-5 w-full"
            >
              <div
                style={{
                  position: "relative",
                  width: "clamp(180px, 35vw, 240px)",
                  height: "clamp(180px, 35vw, 240px)",
                  margin: "0 auto",
                }}
              >
                {/* Outer ring pulse animation */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-12px",
                    borderRadius: "50%",
                    border: "10px solid rgba(212, 0, 15, 0.15)",
                    animation: "pulseRing 2s ease-out infinite",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #0A1128 0%, #1a2a4a 100%)",
                    border: "10px solid var(--gold, #C9A84C)",
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,0.15), 0 0 0 8px rgba(201,168,76,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: "12px",
                      borderRadius: "50%",
                      border: "1px dashed rgba(201,168,76,0.3)",
                      pointerEvents: "none",
                    }}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: "clamp(36px, 8vw, 48px)",
                      height: "clamp(36px, 8vw, 48px)",
                      marginBottom: "8px",
                      flexShrink: 0,
                    }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline
                      points="9 12 11 14 15 10"
                      stroke="#C9A84C"
                      strokeWidth="2.5"
                    />
                  </svg>
                  <div
                    style={{
                      fontFamily: "var(--font-bebas), system-ui",
                      fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
                      letterSpacing: "2px",
                      color: "var(--white, #FFFFFF)",
                      fontWeight: "bold",
                      lineHeight: 1,
                      marginLeft: "22px",
                    }}
                  >
                    100%
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-bebas), system-ui",
                      fontSize: "clamp(0.55rem, 2vw, 0.7rem)",
                      letterSpacing: "clamp(2px, 1vw, 3px)",
                      color: "var(--gold, #C9A84C)",
                      marginTop: "6px",
                      padding: "0 16px",
                      marginLeft: "7px",
                    }}
                  >
                    SATISFACTION
                    <br />
                    GUARANTEED
                  </div>
                </div>
              </div>

              <p
                style={{
                  maxWidth: "260px",
                  fontFamily: "var(--font-inter), system-ui",
                  fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: "var(--black)",
                  marginTop: "8px",
                }}
              >
                Backed by Tyrepower WA&apos;s best dealer of 2025.If it&apos;s
                not right, we fix it. Simple as that.
              </p>
            </motion.div>

            {/* Right Column - Points Grid (Enhanced Cards) */}
            <div className="w-full">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
                style={{ marginBottom: "clamp(32px, 5vh, 44px)" }}
              >
                {points.map((point, idx) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: idx * 0.1,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    style={{
                      display: "flex",
                      gap: "clamp(14px, 3vw, 18px)",
                      padding: "clamp(18px, 3vw, 24px)",
                      borderRadius: "20px",
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      cursor: "default",
                      minHeight: "clamp(150px, 22vh, 170px)",
                    }}
                  >
                    {/* Icon Container */}
                    <div
                      style={{
                        flexShrink: 0,
                        alignSelf: "center",
                        width: "clamp(48px, 7vw, 56px)",
                        height: "clamp(48px, 7vw, 56px)",
                        borderRadius: "16px",
                        background:
                          "linear-gradient(135deg, #D4000F 0%, #b8000d 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 16px rgba(212,0,15,0.2)",
                      }}
                    >
                      <Image
                        src={point.icon}
                        alt={point.title}
                        width={20}
                        height={20}
                        style={{
                          objectFit: "contain",
                          filter: "brightness(0) invert(1)",
                          width: "clamp(22px, 4vw, 26px)",
                          height: "clamp(22px, 4vw, 26px)",
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui",
                          fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                          marginBottom: "8px",
                          lineHeight: 1.3,
                          color: "#0A0A0A",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {point.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-inter), system-ui",
                          fontSize: "clamp(0.8rem, 2.2vw, 0.9rem)",
                          color: "var(--black)",
                          lineHeight: 1.55,
                          fontWeight: 400,
                        }}
                      >
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Signature - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex justify-center px-4"
      >
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
            padding: "clamp(24px, 5vh, 36px) 0 clamp(16px, 3vh, 20px) 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "5px",
              paddingTop: "clamp(24px, 5vh, 32px)",
              borderTop: "2px solid rgba(212, 0, 15, 0.1)",
            }}
          >
            {/* Avatar + Signature line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(12px, 3vw, 10px)",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "clamp(52px, 8vw, 64px)",
                  height: "clamp(52px, 8vw, 64px)",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #0A1128 0%, #1a2a4a 100%)",
                  fontFamily: "var(--font-bebas), system-ui",
                  fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  letterSpacing: "1px",
                  color: "var(--gold, #C9A84C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "2px solid var(--gold, #C9A84C)",
                }}
              >
                KT
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui",
                    fontSize: "clamp(0.9rem, 3vw, 1rem)",
                    marginBottom: "4px",
                    color: "#0A0A0A",
                    fontWeight: 700,
                  }}
                >
                  The Kewdale Tyrepower Team
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui",
                    fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                    color: "var(--black)",
                  }}
                >
                  Tyrepower WA’s Dealer of the Year 2025
                </p>
              </div>
            </div>

            {/* Quote */}
            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                padding: "0 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  color: "rgba(212, 0, 15, 0.2)",
                  lineHeight: 1,
                  marginBottom: "1px",
                }}
              >
                <p style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>&ldquo;</p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui",
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "var(--black)",
                  fontStyle: "italic",
                }}
              >
                We&apos;ve built this business on repeat customers and word of
                mouth. We can&apos;t afford to get it wrong and we don&apos;t.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add keyframe animations */}
      <style>{`
        @keyframes pulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.05);
            opacity: 0;
          }
          100% {
            transform: scale(0.95);
            opacity: 0;
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
