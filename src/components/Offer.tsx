"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import fleet_logo from "../../public/fleet_logo.jpg";
import FleetEnquiryModal from "@/modal/FleetEnquiryModal";
import BookingModal from "@/modal/BookingModal";

/**
 * Marketing copy for each package card. Lives here (single config object) so
 * the package booking modal is never hardcoded per package — the "Book Now"
 * button just passes the matching entry into <BookingModal />.
 */
type PackageKey = "Essential" | "Premium" | "Professional";
const PACKAGES: Record<
  PackageKey,
  {
    name: string;
    price: string;
    priceLabel: string;
    heading: string;
    popular?: boolean;
    /** Average service time (minutes) shown in the booking modal. */
    minutes: string;
  }
> = {
  Essential: {
    name: "Essential Package",
    price: "$149",
    priceLabel: "From $149 / Per Tyre",
    heading: "Book Your Tyres",
    minutes: "90",
  },
  Premium: {
    name: "Premium Package",
    price: "$705",
    priceLabel: "From $705 / Bundle",
    heading: "Book Your Full Service",
    popular: true,
    minutes: "120",
  },
  Professional: {
    name: "Professional Package",
    price: "$258",
    priceLabel: "From $258 / Per Tyre",
    heading: "Book Your Tyres",
    minutes: "120",
  },
};

export default function Offer() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const pathname = usePathname();
  const sourcePage =
    pathname === "/" || pathname === ""
      ? "professional"
      : pathname.split("/").pop() || "professional";

  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<PackageKey | null>(null);

  const openPackage = (key: PackageKey) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePackage(key);
  };

  return (
    <motion.section
      id="offer"
      ref={sectionRef}
      data-section="offer"
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "var(--off-white, #F0EDE8)", padding: "100px 60px" }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative z-1 mx-auto" style={{ maxWidth: "1100px" }}>
        {/* Header */}
        <div className="text-center">
          <motion.div
            className="mb-4 inline-flex items-center gap-2.5 font-semibold uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
            Choose your service
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(2.6rem, 4vw, 3.8rem)",
              lineHeight: 1,
              color: "var(--navy)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Transparent Packages.
            <br />
            <motion.em
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontStyle: "normal", color: "var(--red)" }}
            >
              No Surprises. Ever.
            </motion.em>
          </motion.h2>

          <div className="flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                color: "var(--text-dark)",
                fontWeight: 300,
                maxWidth: "560px",
                lineHeight: 1.7,
                marginTop: "15px",
              }}
            >
              Every price you see is the price you pay. Pick the package that
              suits you or call us and we&rsquo;ll build a custom quote in 2
              minutes.
            </motion.p>
          </div>
        </div>

        <div style={{ marginTop: "30px", marginBottom: "15px" }}>
          {/* Offer cards grid */}
          <div
            data-offer="grid"
            className="mb-12 grid gap-5.5"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {/* Essential Card */}
            <motion.div
              className="relative flex flex-col overflow-hidden transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              style={{
                background: "var(--card-bg, #FFFFFF)",
                borderRadius: "10px",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  padding: "28px 28px 20px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "1.6rem",
                    color: "var(--navy)",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                    fontWeight: 700,
                  }}
                >
                  Essential
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8rem",
                    color: "var(--text-dark)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  Tyres supplied and fitted. No fuss, no extras just the job
                  done right.
                </div>
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: "rgba(0,0,0,0.015)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.62rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--text-dark)",
                    marginBottom: "6px",
                  }}
                >
                  From
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "var(--navy)",
                    letterSpacing: "1px",
                  }}
                >
                  <sup
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--red)",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      verticalAlign: "super",
                    }}
                  >
                    $
                  </sup>
                  149{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    / Per tyre
                  </span>
                </motion.div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  Tyre + alignment{" "}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  All major brands in stock (subject to availability)
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                    fontWeight: "Bold",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  (T &amp; C’s apply)
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-2.5"
                style={{ padding: "20px 28px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.65rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--text-dark)",
                    marginBottom: "4px",
                  }}
                >
                  What&rsquo;s included
                </div>
                {[
                  "Tyre supply (your choice of brand)",
                  "Professional fitment",
                  "Wheel balancing & Tyre rotation",
                  "Tyre pressure set",
                  "Old tyre disposal",
                  "40000km-50000km durability(Depends on the brand)",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.82rem",
                      color: "var(--text-dark)",
                      lineHeight: 1.4,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--red)"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "1px" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </motion.div>
                ))}
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <motion.a
                  href="#"
                  onClick={openPackage("Essential")}
                  className="btn-full btn-full--outline"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid var(--navy)",
                    borderRadius: "4px",
                    color: "var(--navy)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--navy)";
                    e.currentTarget.style.color = "var(--white)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--navy)";
                  }}
                >
                  Book Now
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
                </motion.a>
              </div>
            </motion.div>

            {/* Premium Card -- Featured */}
            <motion.div
              data-offer="featured"
              className="relative flex flex-col overflow-hidden transition-all duration-200"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView
                  ? { opacity: 1, scale: [1, 1.08, 1, 1.08, 1] }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{
                opacity: { duration: 0.4, delay: 0.7 },
                scale: {
                  duration: 1.3,
                  times: [0, 0.14, 0.28, 0.42, 0.6],
                  repeat: Infinity,
                  repeatDelay: 1.1,
                  ease: "easeInOut",
                  delay: 0.9,
                },
              }}
              whileHover={{ y: -12 }}
              style={{
                background: "var(--card-bg,#FFFFF)",
                borderRadius: "10px",
                border: "2px solid var(--red)",
                transform: "translateY(-8px)",
                boxShadow: "0 20px 56px rgba(212,0,15,0.15)",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: "var(--red)",
                  color: "var(--white)",
                  textAlign: "center",
                  fontSize: "0.68rem",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  padding: "8px",
                  fontFamily: "var(--font-bebas)",
                }}
              >
                Most Popular Choice
              </motion.div>

              <div
                style={{
                  padding: "28px 28px 20px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "1.6rem",
                    color: "var(--navy)",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                    fontWeight: 700,
                  }}
                >
                  Premium
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8rem",
                    color: "var(--text-dark)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  Complete tyre service with alignment everything sorted in one
                  visit.
                </div>
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: "rgba(212,0,15,0.03)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.62rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--text-dark)",
                    marginBottom: "6px",
                  }}
                >
                  From
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "var(--navy)",
                    letterSpacing: "1px",
                  }}
                >
                  <sup
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--red)",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      verticalAlign: "super",
                    }}
                  >
                    $
                  </sup>
                  705{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    / Bundle
                  </span>
                </motion.div>

                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  Tyre bundle + alignment + full check{" "}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  All major brands in stock (subject to availability)
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                    fontWeight: "Bold",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  (T &amp; C’s apply)
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-2.5"
                style={{ padding: "20px 28px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.65rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--text-dark)",
                    marginBottom: "4px",
                  }}
                >
                  Everything in professional, plus
                </div>
                {[
                  "Tyre supply (your choice of brand)",
                  "Professional fitment",
                  "Wheel balancing",
                  "Full tyre rotation",
                  "Computerised wheel alignment",
                  "Before & after alignment report",
                  "Tyre pressure set",
                  "Old tyre disposal",
                  "40000km-50000km durability(Depends on the brand)",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.82rem",
                      color: "var(--text-dark)",
                      lineHeight: 1.4,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--red)"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "1px" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </motion.div>
                ))}
                {[
                  "Bonus: Priority booking for next visit",
                  "Bonus: At 5,000 km: One-time free tyre checkup.Every 10,000 km (up to 50,000 km): Rotation,balancing,alignment + 10% off the total bill",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.75 + idx * 0.05 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.82rem",
                      color: "var(--navy)",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "1px" }}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {item}
                  </motion.div>
                ))}
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <motion.a
                  href="#"
                  onClick={openPackage("Premium")}
                  className="btn-full btn-full--primary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "12px 20px",
                    background: "var(--red)",
                    border: "none",
                    borderRadius: "4px",
                    color: "var(--white)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#b3000d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--red)";
                  }}
                >
                  Book Now
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
                </motion.a>
              </div>
            </motion.div>

            {/* Professional Card */}
            <motion.div
              className="relative flex flex-col overflow-hidden transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              style={{
                background: "var(--card-bg, #FFFFFF)",
                borderRadius: "10px",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  padding: "28px 28px 20px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "1.6rem",
                    color: "var(--navy)",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                    fontWeight: 700,
                  }}
                >
                  Professional
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8rem",
                    color: "var(--black)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  Tyres supplied and fitted. No fuss, no extras just the job
                  done right.
                </div>
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: "rgba(0,0,0,0.015)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.62rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--black)",
                    marginBottom: "6px",
                  }}
                >
                  From
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "var(--navy)",
                    letterSpacing: "1px",
                  }}
                >
                  <sup
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--red)",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      verticalAlign: "super",
                    }}
                  >
                    $
                  </sup>
                  258{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    / Per tyre
                  </span>
                </motion.div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  Tyre + alignment{" "}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  All major brands in stock (subject to availability)
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                    fontWeight: "Bold",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  (T &amp; C’s apply)
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-2.5"
                style={{ padding: "20px 28px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.65rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--text-dark)",
                    marginBottom: "4px",
                  }}
                >
                  Everything in Essential, plus
                </div>
                {[
                  "Tyre supply (your choice of brand)",
                  "Professional fitment",
                  "Wheel balancing & Tyre rotation",
                  "Computerised wheel alignment",
                  "Before & after alignment report",
                  "Tyre pressure set",
                  "Old tyre disposal",
                  "40000km-50000km durability(Depends on the brand)",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.82rem",
                      color: "var(--text-dark)",
                      lineHeight: 1.4,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--red)"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "1px" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </motion.div>
                ))}
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <motion.a
                  href="#"
                  onClick={openPackage("Professional")}
                  className="btn-full btn-full--outline"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid var(--navy)",
                    borderRadius: "4px",
                    color: "var(--navy)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--navy)";
                    e.currentTarget.style.color = "var(--white)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--navy)";
                  }}
                >
                  Book Now
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
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Value stack */}
        <motion.div
          data-offer="value"
          className="grid items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{
            marginTop: "24px",
            background: "var(--card-bg,#FFFFFF)",
            borderRadius: "12px",
            padding: "48px 52px",
            gridTemplateColumns: "1fr auto",
            gap: "60px",
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.4 }}
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
              What you&rsquo;re actually getting
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "2rem",
                color: "var(--navy)",
                letterSpacing: "-0.01em",
                marginBottom: "24px",
                lineHeight: 1.1,
                fontWeight: 700,
              }}
            >
              The Premium Package
              <br />
              Everything Stacked Up
            </motion.div>

            <div className="flex flex-col gap-3">
              {[
                {
                  name: "Premium tyre supply & fitment",
                  price: "$596",
                  bonus: false,
                  decoration: false,
                },
                {
                  name: "Wheel balancing & rotation",
                  price: "$140",
                  bonus: false,
                  decoration: true,
                },
                {
                  name: "Computerised wheel alignment",
                  price: "$109",
                  bonus: false,
                  decoration: false,
                },
                // { name: "Full tyre rotation", price: "$40", bonus: false },
                {
                  name: "Tyre Disposal",
                  price: "$20",
                  bonus: true,
                  decoration: true,
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.name}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--navy)",
                  }}
                >
                  <div
                    className="flex items-center gap-2.5"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.85rem",
                      color: "var(--navy)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="2"
                      style={{ flexShrink: 0 }}
                    >
                      {item.bonus ? (
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      ) : (
                        <polyline points="20 6 9 17 4 12" />
                      )}
                    </svg>
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "1.1rem",
                      color: "var(--navy)",
                      letterSpacing: "0.5px",
                      textDecoration: `${item.decoration === true ? "line-through" : "none"}`,
                    }}
                  >
                    {item.price}
                  </div>
                </motion.div>
              ))}

              {/* Total row */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.98 }
                }
                transition={{ duration: 0.4, delay: 0.85 }}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "8px",
                  background: "rgba(212,0,15,0.1)",
                  border: "1px solid rgba(212,0,15,0.25)",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="flex items-center gap-2.5"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.85rem",
                    color: "var(--navy)",
                    fontWeight: 600,
                    flex: "1 1 auto",
                    minWidth: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Your Premium Package price
                </div>
                <div
                  className="flex items-baseline"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "0.5px",
                    gap: "8px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginLeft: "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--navy)",
                      fontWeight: 600,
                    }}
                  >
                    From
                  </span>
                  <span
                    style={{
                      fontSize: "1.05rem",
                      color: "rgba(0,0,0,0.4)",
                      textDecoration: "line-through",
                    }}
                  >
                    $865
                  </span>
                  <span
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--red)",
                      fontWeight: "bold",
                    }}
                  >
                    $705
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            data-offer="value-right"
            className="shrink-0 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView
                ? { opacity: 1, scale: [1, 1.08, 1, 1.08, 1] }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              opacity: { duration: 0.4, delay: 0.7 },
              scale: {
                duration: 1.3,
                times: [0, 0.14, 0.28, 0.42, 0.6],
                repeat: Infinity,
                repeatDelay: 1.1,
                ease: "easeInOut",
                delay: 0.9,
              },
            }}
            style={{
              minWidth: "200px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "0.95rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--navy)",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              You save up to
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "5rem",
                lineHeight: 0.9,
                color: "var(--navy)",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
            >
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--red)",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              >
                $
              </em>
              160
            </motion.div>
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                color: "var(--navy)",
                marginTop: "10px",
                lineHeight: 1.5,
              }}
            >
              Compared to booking each
              <br />
              service separately{" "}
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                  fontWeight: "Bold",
                }}
              >
                (T &amp; C’s apply)
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              style={{ marginTop: "24px" }}
            >
              <motion.a
                href="#"
                onClick={openPackage("Premium")}
                className="btn-gold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--gold)",
                  color: "var(--navy)",
                  padding: "12px 28px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d4b35c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--gold)";
                }}
              >
                Claim This Package
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
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Fleet & Multi -- separate section (not a package) */}
        <div
          data-offer="fleet-section"
          style={{ marginTop: "24px", marginBottom: "15px" }}
        >
          <motion.div
            data-offer="fleet-banner"
            className="grid items-stretch overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(115deg, #FFFFFF 0%, #FDFCFA 48%, rgba(212,0,15,0.02) 100%)",
              borderRadius: "12px",
              border: "1px solid rgba(212,0,15,0.22)",
              boxShadow:
                "0 18px 44px rgba(11,28,58,0.08), 0 2px 6px rgba(11,28,58,0.04)",
              gridTemplateColumns: "1fr auto",
            }}
          >
            {/* Left: info + features */}
            <div
              style={{
                padding: "40px 44px",
                position: "relative",
                borderLeft: "3px solid transparent",
                borderImage:
                  "linear-gradient(180deg, var(--red) 0%, rgba(212,0,15,0.15) 100%) 1",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "0.8rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "10px",
                }}
              >
                For businesses &amp; fleets
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "var(--navy)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  marginBottom: "8px",
                }}
              >
                Fleet &amp; Multi
              </div>
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9rem",
                  color: "var(--text-dark)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "480px",
                  marginBottom: "26px",
                }}
              >
                Multiple vehicles or a full set? We&rsquo;ll build a custom
                price that works for your business no fuss, no surprises.
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: "rgba(0,0,0,0.015)",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "0.62rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--black)",
                    marginBottom: "6px",
                  }}
                >
                  Pricing
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "var(--navy)",
                    letterSpacing: "1px",
                  }}
                >
                  <sup
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--red)",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      verticalAlign: "super",
                    }}
                  ></sup>
                  Custom{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--red)",
                    }}
                  >
                    Quote
                  </span>
                </motion.div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--text-dark)",
                    marginTop: "5px",
                  }}
                >
                  Based on vehicle count & brand (subject to availability)
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                    fontWeight: "Bold",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  (T &amp; C’s apply)
                </div>
              </div>

              <div
                data-offer="fleet-features"
                className="grid gap-x-8 gap-y-3.5"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                {[
                  { text: "2+ vehicles or full set of 4", bonus: false },
                  { text: "Volume pricing applied", bonus: false },
                  { text: "Dedicated booking slot", bonus: false },
                  { text: "Business account available", bonus: false },
                  { text: "Bonus: Invoice & monthly billing", bonus: true },
                ].map((item, idx) => (
                  <motion.div
                    key={item.text}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.85rem",
                      color: item.bonus ? "var(--navy)" : "var(--text-dark)",
                      fontWeight: item.bonus ? 500 : 400,
                      lineHeight: 1.4,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={item.bonus ? "var(--gold)" : "var(--red)"}
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      {item.bonus ? (
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      ) : (
                        <polyline points="20 6 9 17 4 12" />
                      )}
                    </svg>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: pricing + CTA */}
            <div
              data-offer="fleet-cta"
              className="flex flex-col justify-center items-center"
              style={{
                padding: "40px 44px",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.85) 65%, rgba(212,0,15,0.15) 95%, rgba(212,0,15,0.2) 100%)",
                borderLeft: "1px solid rgba(212,0,15,0.22)",
                minWidth: "400px",
                textAlign: "center",
              }}
            >
              <Image
                src={fleet_logo}
                alt="Fleet servicing"
                width={380}
                height={0}
                style={{
                  width: "clamp(110px, 14vw, 550px)",
                  height: "auto",
                  borderRadius: "6px",
                  display: "block",
                }}
              />

              <motion.button
                type="button"
                onClick={() => setFleetModalOpen(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px 24px",
                  background:
                    "linear-gradient(135deg, rgba(212,0,15,0.9) 0%, var(--red) 55%, rgba(212,0,15,0.7) 100%)",
                  boxShadow:
                    "0 10px 24px rgba(212,0,15,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
                  border: "none",
                  borderRadius: "6px",
                  color: "var(--white)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Talk to us
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
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`







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

        @media (max-width: 900px) {
          [data-section="offer"] {
            padding: 64px 24px !important;
          }
          [data-offer="grid"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          [data-offer="fleet-banner"] {
            grid-template-columns: 1fr !important;
          }
          [data-offer="fleet-features"] {
            grid-template-columns: 1fr !important;
          }
          [data-offer="fleet-cta"] {
            min-width: auto !important;
          }
          [data-offer="featured"] {
            transform: none !important;
            margin-top: 0 !important;
          }
          [data-offer="value"] {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding: 36px 28px !important;
          }
          [data-offer="value-right"] {
            text-align: left !important;
            min-width: auto !important;
          }
        }
      `}</style>

      <FleetEnquiryModal
        visible={fleetModalOpen}
        onClose={() => setFleetModalOpen(false)}
        color="var(--red)"
        sourcePage={sourcePage}
      />

      <BookingModal
        visible={activePackage !== null}
        onClose={() => setActivePackage(null)}
        color="var(--red)"
        sourcePage={sourcePage}
        packageName={activePackage ? PACKAGES[activePackage].name : undefined}
        packagePrice={activePackage ? PACKAGES[activePackage].price : undefined}
        packagePriceLabel={
          activePackage ? PACKAGES[activePackage].priceLabel : undefined
        }
        packageHeading={
          activePackage ? PACKAGES[activePackage].heading : undefined
        }
        packagePopular={
          activePackage ? PACKAGES[activePackage].popular : undefined
        }
        packageMinutes={
          activePackage ? PACKAGES[activePackage].minutes : undefined
        }
      />
    </motion.section>
  );
}
