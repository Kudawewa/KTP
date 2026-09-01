"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import fleet_logo from "../../public/fleet_logo.jpg";
import FleetEnquiryModal from "@/modal/FleetEnquiryModal";
import BookingModal from "@/modal/BookingModal";

/** Data passed into the package booking modal when a card's button is clicked. */
type ActivePackage = {
  name: string;
  price: string;
  priceLabel: string;
  heading: string;
  popular?: boolean;
  /** Average service time (minutes) shown in the booking modal. */
  minutes: string;
};

// Packages whose booking modal should quote a 120-minute service time. Any
// package not listed here (and not the featured card, which is always 120)
// defaults to 90. Keyed by the card title from projects.json offerData.
const LONG_SERVICE_PACKAGES = new Set([
  "Safe Drive Protection",
  "Smart Saver",
  "Precision Handling",
  "Value",
  "Extreme",
]);

const packageMinutesFor = (title: string): string =>
  LONG_SERVICE_PACKAGES.has(title) ? "120" : "90";

type HeadeLine = {
  highlightColor: string;
  highlight: string;
  mainSubOne: string;
  mainSubTwo: string;
};

type OfferValueItem = {
  name: string;
  price: string;
  bonus: boolean;
};

type OfferValueItemsProps = OfferValueItem[];
type offerProps = {
  sectionColor: string;
  backgroundColor: string;
  borderColor: string;
  offerEyebrow: string;
  offerHeader: HeadeLine;
  offerPhara: string;
  offerCartOneTitle: string;
  offerCardOneDecs: string;
  offerCardOnePrice: string;
  offerCardOneSubPhara: string;
  offerCardOneLbl: string;
  offerCardOneInclude: string[];
  offerCardOneBtn: string;
  offerCardTwoBadge: string;
  offerCartTwoTitle: string;
  offerCardTwoDecs: string;
  offerCardTwoPrice: string;
  offerCardTwoSubPhara: string;
  offerCardTwoLbl: string;
  offerCardTwoInclude: string[];
  offerCardTwoIncludedBonus: string[];
  offerCardTwoIncludeOthers: string[];
  offerCardTwoBtn: string;
  offerCartThreeTitle: string;
  offerCardThreeDecs: string;
  offerCardThreePrice: string;
  offerCardThreeSubPhara: string;
  offerCardThreeLbl: string;
  offerCardThreeInclude: string[];
  offerCardThreeBtn: string;
  offerCartFourTitle: string;
  offerCardFourDecs: string;
  offerCardFourPrice: string;
  offerCardFourSubPhara: string;
  offerCardFourLbl: string;
  offerCardFourInclude: string[];
  offerCardFourBtn: string;
  offerShowCardFour?: boolean;

  offerValueEyeBrow: string;
  offerValueHeader: string;
  offerValueItems: OfferValueItemsProps;
  offerTotalLbl?: string;
  offerTotalOldPrice?: string;
  offerTotalPrice?: string;
  offerSaveLbl: string;
  offerSavePrice: string;
  offerSaveSubLbl: string;
  offerSaveBtn: string;
};

export default function Offer({
  sectionColor,
  backgroundColor,
  borderColor,
  offerEyebrow,
  offerHeader,
  offerPhara,
  offerCartOneTitle,
  offerCardOneDecs,
  offerCardOnePrice,
  offerCardOneSubPhara,
  offerCardOneLbl,
  offerCardOneInclude,
  offerCardOneBtn,
  offerCardTwoBadge,
  offerCartTwoTitle,
  offerCardTwoDecs,
  offerCardTwoPrice,
  offerCardTwoSubPhara,
  offerCardTwoLbl,
  offerCardTwoInclude,
  offerCardTwoIncludedBonus,
  offerCardTwoIncludeOthers,
  offerCardTwoBtn,
  offerCartThreeTitle,
  offerCardThreeDecs,
  offerCardThreePrice,
  offerCardThreeSubPhara,
  offerCardThreeLbl,
  offerCardThreeInclude,
  offerCardThreeBtn,
  offerCartFourTitle,
  offerCardFourDecs,
  offerCardFourPrice,
  offerCardFourSubPhara,
  offerCardFourLbl,
  offerCardFourInclude,
  offerCardFourBtn,
  offerShowCardFour,
  offerValueEyeBrow,
  offerValueHeader,
  offerValueItems,
  offerTotalLbl,
  offerTotalOldPrice,
  offerTotalPrice,
  offerSaveLbl,
  offerSavePrice,
  offerSaveSubLbl,
  offerSaveBtn,
}: offerProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const pathname = usePathname();
  // Project landing pages live at /projects/[slug]; the slug is the source.
  // Matches genarateComponents/BookingForm.tsx so both forms on a page record
  // the same source_page, and never sends "" (the backend requires it).
  const sourcePage =
    pathname === "/" || pathname === ""
      ? "professional"
      : pathname.split("/").pop() || "professional";

  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<ActivePackage | null>(
    null,
  );

  // Opens the package booking modal, sourcing name/price from the card props so
  // nothing is hardcoded per package.
  const openPackage = (pkg: ActivePackage) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePackage(pkg);
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
              fontSize: "clamp(0.55rem, 2vw, 1.5rem)",
              letterSpacing: "3.5px",
              color: sectionColor,
              fontFamily: "var(--font-bebas)",
              width: "fit-content",
            }}
          >
            {offerEyebrow}
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
            {offerHeader.mainSubOne}
            <br />
            <motion.em
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontStyle: "normal", color: offerHeader.highlightColor }}
            >
              {offerHeader.highlight}
            </motion.em>
            {offerHeader.mainSubTwo}
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
              {offerPhara}
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
                border: `1px solid ${borderColor}`,
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
                  {offerCartOneTitle}
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
                  {offerCardOneDecs}
                </div>
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: backgroundColor,
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
                  {offerCardOnePrice}{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    / Per Tyre
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
                  {offerCardOneSubPhara}{" "}
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
                  <span
                    style={{
                      display: "block",
                      textAlign: "right",
                      fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                      fontWeight: "Bold",
                    }}
                  >
                    (T &amp; C’s apply)
                  </span>
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
                  {offerCardOneLbl}
                </div>
                {offerCardOneInclude.map((item, idx) => (
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
                      style={{
                        flexShrink: 0,
                        marginTop: "1px",
                        stroke: sectionColor,
                      }}
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
                  onClick={openPackage({
                    name: offerCartOneTitle,
                    price: `$${offerCardOnePrice}`,
                    priceLabel: `From $${offerCardOnePrice} / Per Tyre`,
                    heading: "Book Your Appointment",
                    minutes: packageMinutesFor(offerCartOneTitle),
                  })}
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
                    border: `1px solid ${borderColor}`,
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
                  {offerCardOneBtn}
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

            {/* Professional -- Featured Card */}
            <motion.div
              data-offer="featured"
              className="relative flex flex-col overflow-hidden transition-all duration-200"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: -8,
                      scale: [1, 1.035, 1, 1.035, 1],
                    }
                  : { opacity: 0, y: 30, scale: 0.98 }
              }
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut",
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
                border: `2px solid ${sectionColor}`,
                transform: "translateY(-8px)",
                boxShadow: `0 20px 56px ${backgroundColor}`,
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: sectionColor,
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
                {offerCardTwoBadge}
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
                  {offerCartTwoTitle}
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
                  {offerCardTwoDecs}
                </div>
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: backgroundColor,
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
                  {offerCardTwoPrice}{" "}
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
                  {offerCardTwoSubPhara}{" "}
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
                  <span
                    style={{
                      display: "block",
                      textAlign: "right",
                      fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                      fontWeight: "Bold",
                    }}
                  >
                    (T &amp; C’s apply)
                  </span>
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
                  {offerCardTwoLbl}
                </div>
                {offerCardTwoInclude.map((item, idx) => (
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
                      style={{
                        flexShrink: 0,
                        marginTop: "1px",
                        stroke: sectionColor,
                      }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </motion.div>
                ))}
                {offerCardTwoIncludedBonus.map((item, idx) => (
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
                {offerCardTwoIncludeOthers.map((item, idx) => (
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
                      style={{
                        flexShrink: 0,
                        marginTop: "1px",
                        visibility: "hidden",
                      }}
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
                  onClick={openPackage({
                    name: offerCartTwoTitle,
                    price: `$${offerCardTwoPrice}`,
                    priceLabel: `From $${offerCardTwoPrice} / Bundle`,
                    heading: "Book Your Appointment",
                    popular: true,
                    minutes: "120",
                  })}
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
                    background: sectionColor,
                    border: "none",
                    borderRadius: "4px",
                    color: "var(--white)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = sectionColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = sectionColor;
                  }}
                >
                  {offerCardTwoBtn}
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

            {/* Fleet & Multi Card */}
            <motion.div
              className="relative flex flex-col overflow-hidden transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              style={{
                background: "var(--card-bg, #FFFFFF)",
                borderRadius: "10px",
                border: `1px solid ${borderColor}`,
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
                  {offerCartThreeTitle}
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
                  {offerCardThreeDecs}
                </div>
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  background: backgroundColor,
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
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "var(--navy)",
                    letterSpacing: "1px",
                    paddingTop: "4px",
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
                  {offerCardThreePrice}{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    / Per Tyre
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
                  {offerCardThreeSubPhara}{" "}
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
                  <span
                    style={{
                      display: "block",
                      textAlign: "right",
                      fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                      fontWeight: "Bold",
                    }}
                  >
                    (T &amp; C’s apply)
                  </span>
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
                    color: "var(--black)",
                    marginBottom: "4px",
                  }}
                >
                  {offerCardThreeLbl}
                </div>
                {offerCardThreeInclude.map((item, idx) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.9 + idx * 0.05 }}
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
                      style={{
                        flexShrink: 0,
                        marginTop: "1px",
                        stroke: sectionColor,
                      }}
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
                  onClick={openPackage({
                    name: offerCartThreeTitle,
                    price: `$${offerCardThreePrice}`,
                    priceLabel: `From $${offerCardThreePrice} / Per Tyre`,
                    heading: "Book Your Appointment",
                    minutes: packageMinutesFor(offerCartThreeTitle),
                  })}
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
                    border: `1px solid ${borderColor}`,
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
                  {offerCardThreeBtn}
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

            {offerShowCardFour && (
              <>
                {/* Extend Card */}
                <motion.div
                  data-offer="extend"
                  className="relative flex flex-col overflow-hidden transition-all duration-200"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: "var(--card-bg, #FFFFFF)",
                    borderRadius: "10px",
                    border: `1px solid ${borderColor}`,
                    gridColumn: "2 / 3",
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
                      {offerCartFourTitle}
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
                      {offerCardFourDecs}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "20px 28px",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      background: backgroundColor,
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
                      transition={{ duration: 0.5, delay: 0.8 }}
                      style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "2rem",
                        lineHeight: 1,
                        color: "var(--navy)",
                        letterSpacing: "1px",
                        paddingTop: "4px",
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
                      {offerCardFourPrice}{" "}
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.8rem",
                          color: "var(--text-dark)",
                          fontWeight: 300,
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
                      {offerCardFourSubPhara}
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
                      <span
                        style={{
                          display: "block",
                          textAlign: "right",
                          fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                          fontWeight: "Bold",
                        }}
                      >
                        (T &amp; C’s apply)
                      </span>
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
                        color: "var(--black)",
                        marginBottom: "4px",
                      }}
                    >
                      {offerCardFourLbl}
                    </div>
                    {offerCardFourInclude.map((item, idx) => (
                      <motion.div
                        key={item}
                        className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ duration: 0.3, delay: 0.9 + idx * 0.05 }}
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
                          style={{
                            flexShrink: 0,
                            marginTop: "1px",
                            stroke: sectionColor,
                          }}
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
                      onClick={openPackage({
                        name: offerCartFourTitle,
                        price: `$${offerCardFourPrice}`,
                        priceLabel: `From $${offerCardFourPrice} / Per tyre`,
                        heading: "Book Your Appointment",
                        minutes: packageMinutesFor(offerCartFourTitle),
                      })}
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
                        border: `1px solid ${borderColor}`,
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
                      {offerCardFourBtn}
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
              </>
            )}
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
                color: sectionColor,
                fontWeight: "bold",
                marginBottom: "16px",
                fontFamily: "var(--font-bebas)",
              }}
            >
              {offerValueEyeBrow}
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
              {offerValueHeader}
            </motion.div>

            <div className="flex flex-col gap-3">
              {offerValueItems.map((item, idx) => (
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
                      style={{ flexShrink: 0, stroke: sectionColor }}
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
                      textDecoration:
                        idx == 0 || idx == 2 ? "none" : "line-through",
                    }}
                  >
                    {item.price}
                  </div>
                </motion.div>
              ))}

              {/* Total row */}
              {offerTotalPrice && (
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
                    background: backgroundColor,
                    border: `1px solid ${sectionColor}40`,
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
                      style={{ flexShrink: 0, stroke: sectionColor }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {offerTotalLbl}
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
                    {offerTotalOldPrice && (
                      <span
                        style={{
                          fontSize: "1.05rem",
                          color: "rgba(0,0,0,0.4)",
                          textDecoration: "line-through",
                        }}
                      >
                        {offerTotalOldPrice}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "1.4rem",
                        color: sectionColor,
                        fontWeight: "bold",
                      }}
                    >
                      ${offerTotalPrice}
                    </span>
                  </div>
                </motion.div>
              )}
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
              {offerSaveLbl}
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
              {offerSavePrice}
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
              {offerSaveSubLbl}
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
                onClick={openPackage({
                  name: offerCartTwoTitle,
                  price: `$${offerCardTwoPrice}`,
                  priceLabel: `From $${offerCardTwoPrice} / Bundle`,
                  heading: "Book Your Appointment",
                  popular: true,
                  minutes: "120",
                })}
                className="btn-gold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: sectionColor,
                  color: "var(--white)",
                  padding: "12px 28px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = sectionColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = sectionColor;
                }}
              >
                {offerSaveBtn}
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
          id="fleet"
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
              background: `linear-gradient(115deg, #FFFFFF 0%, #FDFCFA 48%, ${sectionColor}14 100%)`,
              borderRadius: "12px",
              border: `1px solid ${sectionColor}38`,
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
                borderImage: `linear-gradient(180deg, ${sectionColor} 0%, ${sectionColor}26 100%) 1`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "0.8rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--navy)",
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
                  color: sectionColor,
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

              {/* //Adding gradeint */}
              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  marginBottom: "20px",
                  background: backgroundColor,
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
                      stroke={item.bonus ? "var(--gold)" : sectionColor}
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
                background: `linear-gradient(160deg, rgba(255,255,255,0.92) 65%, ${borderColor} 95%, ${sectionColor}14 100%)`,
                borderLeft: `1px solid ${sectionColor}38`,
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
                  background: `linear-gradient(135deg, ${sectionColor}E6 0%, ${sectionColor} 55%, ${sectionColor}B3 100%)`,
                  boxShadow: `0 10px 24px ${sectionColor}47, inset 0 1px 0 rgba(255,255,255,0.18)`,
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
          [data-offer="extend"] {
            grid-column: auto !important;
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
        color={sectionColor}
        sourcePage={sourcePage}
      />

      <BookingModal
        visible={activePackage !== null}
        onClose={() => setActivePackage(null)}
        color={sectionColor}
        sourcePage={sourcePage}
        packageName={activePackage?.name}
        packagePrice={activePackage?.price}
        packagePriceLabel={activePackage?.priceLabel}
        packageHeading={activePackage?.heading}
        packagePopular={activePackage?.popular}
        packageMinutes={activePackage?.minutes}
      />
    </motion.section>
  );
}
