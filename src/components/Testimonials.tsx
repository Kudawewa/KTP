"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import BookingModal from "@/modal/BookingModal";
import tyre_track_new from "../../public/tyer_track_new.svg";
import Image from "next/image";
const MotionImage = motion(Image);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const starPolygon =
    "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2";

  const cards = [
    {
      tag: "Wait Time",
      text: "In and out in under an hour. I was expecting a long wait like every other tyre shop. Booked online the night before, they were ready for me when I arrived.",
      initials: "JS",
      gradient: "linear-gradient(135deg,#1565C0,#0B1C3A)",
      name: "James S.",
      meta: "Belmont",
    },
    {
      tag: "Honest Pricing",
      text: "Quoted me a price, that's exactly what I paid. No add ons, no surprises at the counter. After getting burned at two other shops I was sceptical not anymore.",
      initials: "AL",
      gradient: "linear-gradient(135deg,#2D6A4F,#1B4332)",
      name: "Amanda L.",
      meta: "Victoria Park",
    },
    {
      tag: "Honest Advice",
      text: "Went in expecting to replace all four. They checked them and told me only two actually needed replacing. Saved me $200 on the spot.",
      initials: "DT",
      gradient: "linear-gradient(135deg,#7B2D8B,#4A1058)",
      name: "David T.",
      meta: "Welshpool",
    },
    {
      tag: "Done Right",
      text: "Car drove perfectly straight off the hoist. No vibration, no pulling, no coming back for a second visit. That's all you want.",
      initials: "SK",
      gradient: "linear-gradient(135deg,#C9A84C,#8B6914)",
      name: "Sarah K.",
      meta: "Burswood",
    },
    {
      tag: "Easy Booking",
      text: "Booked online at 10pm, got a confirmation immediately, same day appointment the next morning. The whole process took two minutes.",
      initials: "RC",
      gradient: "linear-gradient(135deg,#D4000F,#7B000A)",
      name: "Ryan C.",
      meta: "East Perth",
    },
    {
      tag: "Repeat Customer",
      text: "Third set of tyres from these guys. I've tried other places over the years and always come back. When you find a shop that doesn't mess you around, you stick with them.",
      initials: "PH",
      gradient: "linear-gradient(135deg,#2B6CB0,#1A3C5E)",
      name: "Paul H.",
      meta: "Kewdale",
    },
  ];

  const renderStars13 = () => (
    <div style={{ display: "flex", gap: "2px" }}>
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#FBBC05"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
        >
          <polygon points={starPolygon} />
        </motion.svg>
      ))}
    </div>
  );

  return (
    <div
      id="testimonials"
      style={{ background: "var(--off-white)" }}
      className="flex justify-center"
    >
      <motion.section
        ref={sectionRef}
        className="testimonials-section relative overflow-hidden"
        style={{
          background: "var(--off-white)",
          padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 60px)",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .testimonials-card-text {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .testimonials-card-text strong {
              font-style: normal;
              color: var(--red);
              font-weight: 600;
            }
            
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }

            @keyframes marqueeReverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }

            .testimonials-marquee {
              animation: marquee 40s linear infinite;
              display: flex;
              gap: 20px;
              width: fit-content;
            }

            .testimonials-marquee-reverse {
              animation: marqueeReverse 45s linear infinite;
              display: flex;
              gap: 20px;
              width: fit-content;
            }

            .testimonials-marquee:hover,
            .testimonials-marquee-reverse:hover {
              animation-play-state: paused;
            }

            /* Mobile styles */
            @media (max-width: 768px) {
              .testimonials-marquee,
              .testimonials-marquee-reverse {
                animation: none !important;
                flex-direction: column;
                width: 100%;
                gap: 16px;
              }
              
              .testimonials-card-text {
                -webkit-line-clamp: 3;
              }
            }
          `,
          }}
        />

        {/* Decorative SVG - hidden on mobile */}
        <motion.div
          className="absolute pointer-events-none hidden md:block"
          style={{
            right: "-10px",
            top: "-120px",
            width: "600px",
            height: "600px",
          }}
          aria-hidden="true"
        >
          <MotionImage
            src={tyre_track_new}
            alt="Decorative"
            width={600}
            height={600}
            className="w-full h-full object-contain"
            style={{ opacity: 0.5 }}
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={
              isInView
                ? { clipPath: "inset(0 0 0% 0)" }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="relative z-1 mx-auto" style={{ maxWidth: "1200px" }}>
          {/* Header - Responsive */}
          <div
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
            style={{ marginBottom: "clamp(40px, 8vw, 56px)" }}
          >
            <div className="w-full md:w-auto">
              <motion.div
                className="inline-flex items-center font-semibold uppercase"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.4, delay: 0.1 }}
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
                Real customers. Real results.
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
                  lineHeight: 1.1,
                  color: "var(--navy)",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                Don&rsquo;t Take Our Word For It
                <br />
                <motion.em
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="not-italic"
                  style={{ color: "var(--red)" }}
                >
                  Take Theirs.
                </motion.em>
              </motion.h2>
            </div>

            <motion.div
              className="flex items-center shrink-0 w-full md:w-auto justify-between md:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                gap: "14px",
                background: "var(--card-bg,#FFFFFF)",
                border: "1px solid rgba(212,0,15,0.1)",
                borderRadius: "8px",
                padding: "12px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC05" }}>o</span>
                <span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span>
                <span style={{ color: "#EA4335" }}>e</span>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "28px",
                  background: "rgba(212,0,15,0.15)",
                }}
              />
              <div className="flex flex-col" style={{ gap: "3px" }}>
                <div className="flex items-center" style={{ gap: "6px" }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(1.4rem, 2.5vw, 1.6rem)",
                      color: "var(--navy)",
                      lineHeight: 1,
                      letterSpacing: "0.5px",
                    }}
                  >
                    4.7
                  </motion.div>
                  {renderStars13()}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                    color: "var(--black)",
                    letterSpacing: "0.3px",
                  }}
                >
                  300+ verified Google reviews
                </div>
              </div>
            </motion.div>
          </div>

          {/* Featured Review - Responsive */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              background: "var(--card-bg,#FFFFFF)",
              borderRadius: "12px",
              padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 44px)",
              marginBottom: "clamp(24px, 5vw, 32px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              style={{
                position: "absolute",
                top: "clamp(12px, 2vw, 18px)",
                right: "clamp(12px, 2vw, 20px)",
                background: "rgba(212,0,15,0.08)",
                border: "1px solid rgba(212,0,15,0.15)",
                borderRadius: "4px",
                fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--red)",
                padding: "10px 12px",
                fontFamily: "var(--font-bebas)",
              }}
            >
              Top Review
            </motion.div>

            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <div
                className="absolute select-none"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "6rem",
                  lineHeight: 0.6,
                  color: "rgba(212,0,15,0.2)",
                  top: "28px",
                  left: "36px",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <div className="flex-1">
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                    color: "var(--navy)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    marginTop: "25px",
                  }}
                >
                  &ldquo;I&rsquo;ve been going to Kewdale Tyrepower for years
                  now. What keeps me coming back is simple.{" "}
                  <strong
                    style={{
                      fontStyle: "normal",
                      color: "var(--red)",
                      fontWeight: 600,
                    }}
                  >
                    they tell me upfront what it&rsquo;ll cost, they finish when
                    they say they will, and the job is always done right.
                  </strong>{" "}
                  I work in the city and I can&rsquo;t afford to lose half a day
                  to a tyre shop. These guys get that.&rdquo;
                </div>
              </div>

              <div className="md:shrink-0 flex flex-col items-center lg:items-end w-full lg:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="testimonials-author-avatar flex items-center justify-center"
                  style={{
                    marginTop: "20px",
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--red), #7B000A)",
                    fontSize: "1.4rem",
                    color: "var(--card-bg,#FFFFFF)",
                    letterSpacing: "1px",
                    fontFamily: "var(--font-bebas)",
                  }}
                >
                  MR
                </motion.div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(0.85rem, 2vw, 0.88rem)",
                    fontWeight: 600,
                    color: "var(--navy)",
                    marginBottom: "4px",
                  }}
                >
                  Michael R.
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.65rem, 1.5vw, 0.72rem)",
                    color: "var(--text-dark)",
                    marginBottom: "8px",
                  }}
                >
                  Business Owner, Kewdale
                </div>
                <div className="flex lg:justify-end" style={{ gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#FBBC05"
                    >
                      <polygon points={starPolygon} />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Section - Responsive with Blur Effects */}
          <div
            className="relative overflow-hidden"
            style={{ marginBottom: "clamp(32px, 6vw, 48px)" }}
          >
            {/* Left Blur Effect */}
            <div
              className="hidden md:block md:absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{
                width: "clamp(60px, 10vw, 120px)",
                background:
                  "linear-gradient(90deg, var(--off-white) 0%, rgba(248,248,250,0.9) 30%, rgba(248,248,250,0.4) 60%, transparent 100%)",
                backdropFilter: "blur(2px)",
              }}
            />

            {/* Right Blur Effect */}
            <div
              className="hidden md:block md:absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{
                width: "clamp(60px, 10vw, 120px)",
                background:
                  "linear-gradient(270deg, var(--off-white) 0%, rgba(248,248,250,0.9) 30%, rgba(248,248,250,0.4) 60%, transparent 100%)",
                backdropFilter: "blur(2px)",
              }}
            />

            {/* First row - Horizontal scroll on mobile, marquee on desktop */}
            <div
              className={
                isMobile ? "flex flex-col gap-4 " : "testimonials-marquee"
              }
              style={isMobile ? { gap: "16px" } : { marginBottom: "20px" }}
            >
              {(isMobile ? cards : [...cards, ...cards]).map((card, idx) => (
                <motion.div
                  key={`${card.initials}-${idx}`}
                  className="flex flex-col cursor-default w-full md:w-80 lg:w-96"
                  style={{
                    background: "var(--card-bg,#FFFFFF)",
                    border: "1px solid rgba(212,0,15,0.08)",
                    borderRadius: "12px",
                    padding: "clamp(14px, 2.5vw, 18px)",
                    gap: "10px",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease",
                  }}
                  whileHover={{
                    borderColor: "rgba(212,0,15,0.2)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div
                    className="inline-flex items-center uppercase"
                    style={{
                      gap: "5px",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.55rem)",
                      letterSpacing: "1.5px",
                      color: "var(--red)",
                      border: "1px solid rgba(212,0,15,0.15)",
                      borderRadius: "4px",
                      padding: "10px 10px",
                      width: "fit-content",
                      fontFamily: "var(--font-bebas)",
                      background: "rgba(212,0,15,0.05)",
                    }}
                  >
                    {card.tag}
                  </div>
                  {renderStars13()}
                  <div
                    className="testimonials-card-text"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                      color: "var(--text-dark)",
                      lineHeight: 1.5,
                      fontWeight: 400,
                      textAlign: "justify",
                    }}
                  >
                    {card.text}
                  </div>
                  <div
                    className="flex items-center"
                    style={{
                      gap: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid rgba(212,0,15,0.08)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "clamp(28px, 5vw, 32px)",
                        height: "clamp(28px, 5vw, 32px)",
                        borderRadius: "50%",
                        background: card.gradient,
                        fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                        color: "var(--card-bg,#FFFFFF)",
                        letterSpacing: "0.5px",
                        fontFamily: "var(--font-bebas)",
                      }}
                    >
                      {card.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                          fontWeight: 600,
                          color: "var(--navy)",
                          lineHeight: 1.2,
                        }}
                      >
                        {card.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.55rem, 1.5vw, 0.6rem)",
                          color: "var(--text-dark)",
                        }}
                      >
                        {card.meta}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second row - Only show on desktop */}
            {!isMobile && (
              <div
                style={isMobile ? { gap: "16px" } : { marginBottom: "20px" }}
                className="testimonials-marquee-reverse cursor-default w-full md:w-80 lg:w-96"
              >
                {[...cards, ...cards].reverse().map((card, idx) => (
                  <motion.div
                    key={`${card.initials}-reverse-${idx}`}
                    className="flex flex-col cursor-default"
                    style={{
                      background: "var(--card-bg,#FFFFFF)",
                      border: "1px solid rgba(212,0,15,0.08)",
                      borderRadius: "12px",
                      padding: "18px",
                      gap: "10px",
                      width: "384px",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.2s ease",
                    }}
                    whileHover={{
                      borderColor: "rgba(212,0,15,0.2)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div
                      className="inline-flex items-center uppercase"
                      style={{
                        gap: "5px",
                        fontSize: "0.55rem",
                        letterSpacing: "1.5px",
                        color: "var(--red)",
                        border: "1px solid rgba(212,0,15,0.15)",
                        borderRadius: "4px",
                        padding: "10px 10px",
                        width: "fit-content",
                        fontFamily: "var(--font-bebas)",
                        background: "rgba(212,0,15,0.05)",
                      }}
                    >
                      {card.tag}
                    </div>
                    {renderStars13()}
                    <div
                      className="testimonials-card-text"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.8rem",
                        color: "var(--text-dark)",
                        lineHeight: 1.5,
                        fontWeight: 400,
                      }}
                    >
                      {card.text}
                    </div>
                    <div
                      className="flex items-center"
                      style={{
                        gap: "10px",
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(212,0,15,0.08)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: card.gradient,
                          fontSize: "0.9rem",
                          color: "var(--card-bg,#FFFFFF)",
                          letterSpacing: "0.5px",
                          fontFamily: "var(--font-bebas)",
                        }}
                      >
                        {card.initials}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "var(--navy)",
                            lineHeight: 1.2,
                          }}
                        >
                          {card.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.6rem",
                            color: "var(--grey)",
                          }}
                        >
                          {card.meta}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {/* Third row - Horizontal scroll on mobile, marquee on desktop */}
            <div
              className={
                isMobile ? "flex flex-col gap-4" : "testimonials-marquee"
              }
              style={
                isMobile
                  ? { gap: "16px", marginTop: "20px" }
                  : { marginBottom: "20px" }
              }
            >
              {(isMobile ? cards : [...cards, ...cards]).map((card, idx) => (
                <motion.div
                  key={`${card.initials}-${idx}`}
                  className="flex flex-col cursor-default w-full md:w-80 lg:w-96"
                  style={{
                    background: "var(--card-bg,#FFFFFF)",
                    border: "1px solid rgba(212,0,15,0.08)",
                    borderRadius: "12px",
                    padding: "clamp(14px, 2.5vw, 18px)",
                    gap: "10px",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease",
                  }}
                  whileHover={{
                    borderColor: "rgba(212,0,15,0.2)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div
                    className="inline-flex items-center uppercase"
                    style={{
                      gap: "5px",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.55rem)",
                      letterSpacing: "1.5px",
                      color: "var(--red)",
                      border: "1px solid rgba(212,0,15,0.15)",
                      borderRadius: "4px",
                      padding: "10px 10px",
                      width: "fit-content",
                      fontFamily: "var(--font-bebas)",
                      background: "rgba(212,0,15,0.05)",
                    }}
                  >
                    {card.tag}
                  </div>
                  {renderStars13()}
                  <div
                    className="testimonials-card-text"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                      color: "var(--text-dark)",
                      lineHeight: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {card.text}
                  </div>
                  <div
                    className="flex items-center"
                    style={{
                      gap: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid rgba(212,0,15,0.08)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "clamp(28px, 5vw, 32px)",
                        height: "clamp(28px, 5vw, 32px)",
                        borderRadius: "50%",
                        background: card.gradient,
                        fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                        color: "var(--card-bg,#FFFFFF)",
                        letterSpacing: "0.5px",
                        fontFamily: "var(--font-bebas)",
                      }}
                    >
                      {card.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                          fontWeight: 600,
                          color: "var(--navy)",
                          lineHeight: 1.2,
                        }}
                      >
                        {card.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.55rem, 1.5vw, 0.6rem)",
                          color: "var(--grey)",
                        }}
                      >
                        {card.meta}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* fourth row - Only show on desktop */}
            {!isMobile && (
              <div
                style={isMobile ? { gap: "16px" } : { marginBottom: "20px" }}
                className="testimonials-marquee-reverse cursor-default w-full md:w-80 lg:w-96"
              >
                {[...cards, ...cards].reverse().map((card, idx) => (
                  <motion.div
                    key={`${card.initials}-reverse-${idx}`}
                    className="flex flex-col cursor-default"
                    style={{
                      background: "var(--card-bg,#FFFFFF)",
                      border: "1px solid rgba(212,0,15,0.08)",
                      borderRadius: "12px",
                      padding: "18px",
                      gap: "10px",
                      width: "384px",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.2s ease",
                    }}
                    whileHover={{
                      borderColor: "rgba(212,0,15,0.2)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div
                      className="inline-flex items-center uppercase"
                      style={{
                        gap: "5px",
                        fontSize: "0.55rem",
                        letterSpacing: "1.5px",
                        color: "var(--red)",
                        border: "1px solid rgba(212,0,15,0.15)",
                        borderRadius: "4px",
                        padding: "10px 10px",
                        width: "fit-content",
                        fontFamily: "var(--font-bebas)",
                        background: "rgba(212,0,15,0.05)",
                      }}
                    >
                      {card.tag}
                    </div>
                    {renderStars13()}
                    <div
                      className="testimonials-card-text"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.8rem",
                        color: "var(--text-dark)",
                        lineHeight: 1.5,
                        fontWeight: 400,
                      }}
                    >
                      {card.text}
                    </div>
                    <div
                      className="flex items-center"
                      style={{
                        gap: "10px",
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(212,0,15,0.08)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: card.gradient,
                          fontSize: "0.9rem",
                          color: "var(--card-bg,#FFFFFF)",
                          letterSpacing: "0.5px",
                          fontFamily: "var(--font-bebas)",
                        }}
                      >
                        {card.initials}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "var(--navy)",
                            lineHeight: 1.2,
                          }}
                        >
                          {card.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.6rem",
                            color: "var(--grey)",
                          }}
                        >
                          {card.meta}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {/* Fifth row - Horizontal scroll on mobile, marquee on desktop */}
            <div
              className={
                isMobile ? "flex flex-col gap-4" : "testimonials-marquee"
              }
              style={
                isMobile
                  ? { gap: "16px", marginTop: "20px" }
                  : { marginBottom: "20px" }
              }
            >
              {(isMobile ? cards : [...cards, ...cards]).map((card, idx) => (
                <motion.div
                  key={`${card.initials}-${idx}`}
                  className="flex flex-col cursor-default w-full md:w-80 lg:w-96"
                  style={{
                    background: "var(--card-bg,#FFFFFF)",
                    border: "1px solid rgba(212,0,15,0.08)",
                    borderRadius: "12px",
                    padding: "clamp(14px, 2.5vw, 18px)",
                    gap: "10px",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease",
                  }}
                  whileHover={{
                    borderColor: "rgba(212,0,15,0.2)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div
                    className="inline-flex items-center uppercase"
                    style={{
                      gap: "5px",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.55rem)",
                      letterSpacing: "1.5px",
                      color: "var(--red)",
                      border: "1px solid rgba(212,0,15,0.15)",
                      borderRadius: "4px",
                      padding: "10px 10px",
                      width: "fit-content",
                      fontFamily: "var(--font-bebas)",
                      background: "rgba(212,0,15,0.05)",
                    }}
                  >
                    {card.tag}
                  </div>
                  {renderStars13()}
                  <div
                    className="testimonials-card-text"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                      color: "var(--text-dark)",
                      lineHeight: 1.5,
                      fontWeight: 400,
                      textAlign: "justify",
                    }}
                  >
                    {card.text}
                  </div>
                  <div
                    className="flex items-center"
                    style={{
                      gap: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid rgba(212,0,15,0.08)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "clamp(28px, 5vw, 32px)",
                        height: "clamp(28px, 5vw, 32px)",
                        borderRadius: "50%",
                        background: card.gradient,
                        fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                        color: "var(--card-bg,#FFFFFF)",
                        letterSpacing: "0.5px",
                        fontFamily: "var(--font-bebas)",
                      }}
                    >
                      {card.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                          fontWeight: 600,
                          color: "var(--navy)",
                          lineHeight: 1.2,
                        }}
                      >
                        {card.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.55rem, 1.5vw, 0.6rem)",
                          color: "var(--text-dark)",
                        }}
                      >
                        {card.meta}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer - Responsive */}
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              paddingTop: "clamp(24px, 5vw, 32px)",
              borderTop: "1px solid rgba(212,0,15,0.1)",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.8rem, 2vw, 0.88rem)",
                color: "var(--text-dark)",
                fontWeight: 300,
              }}
            >
              <strong
                style={{
                  color: "var(--navy)",
                  fontWeight: 600,
                  display: "block",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  marginBottom: "4px",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                300+ Perth professionals have made the switch.
              </strong>
              Join them see what a tyre shop that respects your time actually
              feels like.
            </div>
            <div
              className="flex flex-col sm:flex-row items-center gap-3"
              style={{ gap: "16px" }}
            >
              <a
                href="https://www.google.com/search?q=kewdale+tyrepower&sxsrf=ANbL-n7YLawIdyK4FO1kA2fbMJfbSY8wRw%3A1779354188995&gs_ssp=eJzj4tZP1zcsSTMpKShONmC0UjWoMEo0NkpKTTFITTYyNktNS7IyqDBLMUtKM09NMUpNM0syNUjyEsxOLU9JzElVKKksSi3IL08tAgAO5BcO#lrd=0x2a32bed0ec236efb:0x6d6bf7ed2ef6b50b,1,,,,"
                className="btn-ghost"
                style={{
                  fontSize: "0.82rem",
                  color: "var(--white)",
                  textDecoration: "none",
                  padding: "12px 24px",
                  background: "var(--navy)",
                  borderRadius: "6px",
                  border: "1px solid rgba(212,0,15,0.15)",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--navy)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Read all reviews on Google
              </a>
              <a
                href="#"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "var(--red)",
                  color: "var(--white)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  padding: "12px 28px",
                  borderRadius: "6px",
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
                onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
              >
                Book My Appointment
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
          </motion.div>
        </div>
      </motion.section>
      <BookingModal visible={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
