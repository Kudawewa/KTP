"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import logo from "../../public/newLogo.png";
import heroBg from "../../public/hero.png";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToNextSection = () => {
    setShowReviews(true);
    setTimeout(() => {
      if (reviewsRef.current && scrollableRef.current) {
        const reviewsTop = reviewsRef.current.offsetTop;
        scrollableRef.current.scrollTo({
          top: reviewsTop - 80,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <section
      id="hero"
      className="relative"
      style={{
        background: "var(--navy)",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(11,28,58,0.92) 0%, rgba(11,28,58,0.75) 45%, rgba(11,28,58,0.15) 100%), linear-gradient(to top, rgba(11,28,58,0.8) 0%, transparent 55%)",
        }}
      />

      {/* Left Red Accent */}
      <div
        className="absolute hidden md:block"
        style={{
          left: 0,
          top: "12%",
          bottom: "12%",
          width: "4px",
          background: "var(--red)",
          borderRadius: "0 2px 2px 0",
          zIndex: 20,
        }}
      />

      {/* Scrollable Content - Everything inside */}
      <div
        ref={scrollableRef}
        className="relative z-10 h-full overflow-y-auto"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {/* Header - Inside scrollable */}
        <div
          className="sticky top-0 left-0 right-0 z-30 transform"
          style={{
            padding: "16px 24px",
            paddingTop: "clamp(16px, 5vw, 22px)",
            paddingRight: "clamp(24px, 6vw, 60px)",
            paddingLeft: "clamp(24px, 6vw, 60px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(11,28,58,0.95)",
            backdropFilter: "blur(10px)",
            opacity: 0.3,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: "10px" }}>
              <Image
                src={logo}
                alt="Tyrepower Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
                    letterSpacing: "2px",
                    color: "var(--white)",
                    lineHeight: 1,
                  }}
                >
                  Tyrepower
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(0.55rem, 2vw, 0.65rem)",
                    letterSpacing: "clamp(2px, 1vw, 4px)",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  Kewdale
                </span>
              </div>
            </div>

            <div
              className="hidden md:flex items-center"
              style={{ gap: "28px" }}
            >
              <div
                className="flex items-center"
                style={{
                  gap: "7px",
                  color: "rgba(249,247,244,0.75)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-inter)",
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
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Same-day service available
              </div>
              <div
                className="flex items-center"
                style={{
                  gap: "7px",
                  color: "rgba(249,247,244,0.75)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-inter)",
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
                (08) 9359 1444
              </div>
              <a
                href="#"
                className="btn-primary"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--red)",
                  color: "var(--white)",
                  padding: "10px 22px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  borderRadius: "4px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b3000d";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("quote");
                }}
              >
                Get Free Quote
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            <button className="md:hidden text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="min-h-[calc(100vh-200px)] flex items-center">
          <div
            className="w-full mx-auto"
            style={{
              paddingLeft: "clamp(24px, 6vw, 60px)",
              paddingRight: "clamp(24px, 6vw, 60px)",
              paddingTop: "clamp(30px, 5vh, 50px)",
              paddingBottom: "clamp(30px, 5vh, 50px)",
            }}
          >
            <div>
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center mx-auto"
                style={{
                  gap: "8px",
                  background: "rgba(201, 168, 76, 0.1)",
                  border: "1px solid rgba(201, 168, 76, 0.25)",
                  borderRadius: "40px",
                  padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
                  marginBottom: "clamp(20px, 3vh, 28px)",
                  fontFamily: "var(--font-bebas)",
                }}
              >
                <div
                  style={{
                    width: "clamp(6px, 1vw, 8px)",
                    height: "clamp(6px, 1vw, 8px)",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    animation: "pulse 1.8s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(0.6rem, 2.5vw, 0.7rem)",
                    letterSpacing: "clamp(2px, 1vw, 3px)",
                    color: "var(--gold)",
                  }}
                >
                  Perth&apos;s Trusted Tyre Specialists Since 1998
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(2rem, 7vw, 5rem)",
                  lineHeight: "1",
                  color: "var(--white)",
                  letterSpacing: "-0.02em",
                  marginBottom: "clamp(16px, 2.5vh, 24px)",
                  fontWeight: 700,
                }}
              >
                Back On The Road
                <em
                  style={{
                    fontStyle: "normal",
                    color: "var(--red)",
                    display: "block",
                    marginTop: "clamp(8px, 1.5vh, 12px)",
                    fontSize: "clamp(2rem, 7vw, 5.5rem)",
                  }}
                >
                  Before Lunch.
                </em>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                  color: "var(--white)",
                  fontWeight: 300,
                  lineHeight: "1.5",
                  marginBottom: "clamp(24px, 4vh, 36px)",
                  maxWidth: "50%",
                  textAlign: "justify",
                  paddingRight: "clamp(0px, 2vw, 20px)",
                }}
              >
                Perth professionals don&rsquo;t have time to waste.{" "}
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Fast, transparent, done right first time
                </strong>{" "}
                tyre service with upfront pricing and zero upsells. Serving
                Kewdale, Belmont &amp; surrounding suburbs.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-start sm:flex-row items-center gap-3 sm:gap-4"
                style={{ marginBottom: "clamp(32px, 5vh, 40px)" }}
              >
                <a
                  href="#"
                  className="btn-primary justify-center"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "var(--red)",
                    color: "var(--white)",
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    fontWeight: 600,
                    padding: "clamp(10px, 1.5vh, 14px) clamp(20px, 3vw, 32px)",
                    borderRadius: "4px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#b3000d";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--red)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("booking");
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
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Check Wait Times &amp; Book Now
                </a>
                <a
                  href="#"
                  className="btn-secondary justify-center"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "transparent",
                    color: "var(--white)",
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    fontWeight: 500,
                    padding: "clamp(10px, 1.5vh, 14px) clamp(20px, 3vw, 32px)",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("services");
                  }}
                >
                  See our tyre range
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </motion.div>

              {/* Reviews Section */}
              {(showReviews || scrollY > 50) && (
                <div ref={reviewsRef}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
                    style={{
                      paddingTop: "clamp(24px, 4vh, 28px)",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap justify-center text-center sm:text-left">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="clamp(12px, 1.8vw, 16px)"
                            height="clamp(12px, 1.8vw, 16px)"
                            viewBox="0 0 24 24"
                            fill="#FBBC05"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                          color: "var(--white)",
                          lineHeight: "1.4",
                        }}
                      >
                        <strong
                          style={{
                            color: "var(--white)",
                            fontWeight: 500,
                            fontFamily: "var(--font-geist-sans)",
                          }}
                        >
                          4.8 / 5 &nbsp; 300+ Google Reviews
                        </strong>
                        <span className="hidden sm:inline text-xs">
                          &nbsp;&ldquo;Fixed in under an hour&rdquo;
                        </span>
                      </div>
                    </div>

                    <div
                      className="hidden md:block"
                      style={{
                        width: "1px",
                        height: "30px",
                        background: "rgba(255,255,255,0.15)",
                      }}
                    />

                    <div className="w-full sm:w-auto text-center sm:text-left">
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                          color: "var(--white)",
                          lineHeight: "1.4",
                        }}
                      >
                        <strong
                          style={{
                            color: "var(--white)",
                            fontWeight: 500,
                            fontFamily: "var(--font-geist-sans)",
                          }}
                        >
                          200+ Perth professionals served
                        </strong>
                        <span className="hidden sm:inline">
                          &nbsp;Kewdale&apos;s highest-rated
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>

        {/* Stats Bar - Bottom inside scrollable */}
        <div
          className="w-full sticky bottom-0"
          style={{
            padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 32px)",
            background: "rgba(11,28,58,0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            opacity: 0.3,
          }}
        >
          <div className="mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { number: "45", unit: "min", label: "AVERAGE SERVICE TIME" },
                { number: "300", unit: "+", label: "5-STAR GOOGLE REVIEWS" },
                { number: "25", unit: "+", label: "YEARS SERVING PERTH" },
                { number: "0", unit: "%", label: "HIDDEN FEES, EVER" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center sm:items-start text-center sm:text-left
                     ${i % 2 === 0 && i !== 3 ? "sm:border-r sm:border-white/10" : ""}
                    lg:border-b-0
                    ${i < 3 ? "lg:border-r lg:border-white/10" : "lg:border-r-0"}
                    `}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(1.1rem, 4vw, 1.6rem)",
                      letterSpacing: "1px",
                      color: "var(--white)",
                      lineHeight: 1,
                      marginBottom: "2px",
                    }}
                  >
                    {stat.number}
                    <span style={{ color: "var(--red)" }}>{stat.unit}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)",
                      letterSpacing: "1px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: "1.2",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`fixed z-30 flex-col items-center hidden md:flex cursor-pointer transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          right: "clamp(20px, 3vw, 48px)",
          bottom: "150px",
          gap: "8px",
        }}
        onClick={scrollToNextSection}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            animation: "scrollPulse 1.8s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "0.6rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>

      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: var(--red);
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #b3000d;
        }

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

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes scrollPulse {
          0%,
          100% {
            transform: scaleY(1);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(0.8);
            opacity: 0.8;
          }
        }

        @media (max-width: 640px) {
          .btn-primary,
          .btn-secondary {
            white-space: normal;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
