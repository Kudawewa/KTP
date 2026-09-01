"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import clock_icon from "../../public/clock.png";
import shiled_icon from "../../public/shield.png";
import dollar_icon from "../../public/dollars.png";
import check_icon from "../../public/checked.png";
import google_icon from "../../public/google.png";
import afterpay_logo from "../../public/afterpay-logo.png";
import zip_logo from "../../public/zippay-logo.svg";
import Urgency from "./Urgency";

export default function Proof() {
  // All Tyre Brands (Unique)
  const tyreBrands = [
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/bfgoodrich.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/cooper.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/falken.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/kumho-tyres.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/maxxis.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/michelin.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/mickey-thompson.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/pirelli.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/toyo.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/yokohama.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/goodyear-tyres.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/dunlop.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/goodride.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/hankook.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/nitto.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/terrafirma.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/vitora.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/bridgestone.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/continental.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/federal.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/general-tire.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/giti.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/gt-radial.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/firestone.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/hifly.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/mastercraft.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/radar.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/zetum.png",
  ];

  // All Wheel Brands (Unique)
  const wheelBrands = [
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/elite.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/foose.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/fuel-offroad.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/fuel-utv.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/icon.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/ion-wheels.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/king-offroad.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/king-wheels.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/kmc.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/konig.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/loaded.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/mayhem-wheels.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/method-race-wheels.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/motegi.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/moto-metal.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/niche.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/petrol.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/raceline.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/rotiform.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/spyder.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/ssw.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/tsw-by-wheelpros.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/us-mags.png",
    "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/brands/xd.png",
  ];

  // Split brands into 4 UNIQUE groups (no overlap between rows)
  const row1Brands = [...tyreBrands.slice(0, 14)];
  const row2Brands = [...wheelBrands.slice(0, 12)];
  const row3Brands = [...tyreBrands.slice(14, 28)];
  const row4Brands = [...wheelBrands.slice(12, 24)];

  return (
    <div>
      <section
        id="proof"
        style={{
          background: "var(--white, #f6f3f4)",
          padding: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "var(--navy)",
            textAlign: "center",
            padding: "9px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
                textTransform: "uppercase",
                color: "var(--white)",
              }}
            >
              Trusted by{" "}
              <strong style={{ color: "var(--gold)", fontWeight: 500 }}>
                Perth&rsquo;s busy professionals
              </strong>{" "}
              verified Google reviews, real customers, real results
            </span>
          </div>
        </div>
        <div>
          <div
            className="w-full mt-20 mb-12 px-4 sm:px-6 md:px-8"
            style={{ background: "var(--page-bg)" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="overflow-hidden border-b border-gray-300 shadow-lg w-full"
            >
              {/* Google Reviews & Stats Section */}
              <div
                className="flex flex-col min-h-40 lg:flex-row lg:items-stretch w-full"
                style={{
                  maxWidth: "1500px",
                  margin: "0 auto",
                }}
              >
                {/* Google Reviews Section */}
                <div
                  className="flex items-center justify-center gap-4  lg:border-b-0 lg:border-r border-black/10 bg-linear-to-br from-gray-50/30 to-white"
                  style={{
                    padding: "clamp(20px, 4vw, 28px) clamp(24px, 5vw, 32px)",
                    background: "var(--page-bg)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 font-semibold"
                    style={{
                      fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <Image
                      src={google_icon}
                      alt="Google Logo"
                      width={65}
                      height={65}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-8 w-px bg-black/10" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span
                        className="leading-none font-bold"
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "clamp(1.8rem, 2.5vw, 2.5rem)",
                          color: "var(--navy)",
                          letterSpacing: "1px",
                        }}
                      >
                        4.7
                      </span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            fill="#FBBC05"
                            style={{
                              width: "clamp(14px, 2vw, 16px)",
                              height: "clamp(14px, 2vw, 16px)",
                            }}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span
                      className="tracking-wide font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(0.9rem, 0.9vw, 0.9rem)",
                        color: "var(--text-dark)",
                      }}
                    >
                      300+ verified Google reviews
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 flex-1">
                  {[
                    {
                      icon: clock_icon,
                      number: "90",
                      unit: "min",
                      line1: "Average wait time",
                      line2: "in and out",
                    },
                    {
                      icon: shiled_icon,
                      number: "25",
                      unit: "+",
                      line1: "Years serving",
                      line2: "Kewdale & Perth",
                    },
                    {
                      icon: dollar_icon,
                      number: "0",
                      unit: "%",
                      line1: "Hidden fees",
                      line2: "price upfront, always",
                    },
                    {
                      icon: check_icon,
                      number: "Same",
                      unit: "day",
                      line1: "Most jobs completed",
                      line2: "while you wait",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className={`
                      flex items-center gap-4 transition-all duration-200 hover:bg-white-50
                      ${i < 3 ? "border-r border-black/10" : ""}
                      ${i < 2 ? "border-b border-black/10" : ""}
                      lg:border-b-0
                      ${i < 3 ? "lg:border-r lg:border-black/10" : "lg:border-r-0"}
                    `}
                      style={{
                        padding:
                          "clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px)",
                        background: "var(--page-bg)",
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <div
                          className="leading-none flex flex-wrap items-baseline gap-1 font-bold whitespace-nowrap"
                          style={{
                            fontFamily: "var(--font-bebas)",
                            fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                            color: "var(--navy)",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {stat.number}
                          <span
                            style={{
                              color: "var(--red)",
                              textTransform: "uppercase",
                            }}
                          >
                            {stat.unit}
                          </span>
                        </div>
                        <div
                          className="leading-tight font-medium whitespace-nowrap"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)",
                            color: "var(--text-dark)",
                          }}
                        >
                          {stat.line1}
                          <br />
                          {stat.line2}{" "}
                          {stat.number == "90" && (
                            <span
                              style={{
                                fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                                fontWeight: "Bold",
                              }}
                            >
                              (Subject to availability)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <Urgency />

          {/* We Accept — Flexible Payment Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              maxWidth: "1300px",
              margin: "0 auto",
              padding: "clamp(32px, 6vw, 56px) clamp(20px, 4vw, 40px)",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,0,15,0.08) 0%, rgba(212,0,15,0.03) 40%, #FFFFFF 100%)",
                border: "1px solid rgba(212,0,15,0.15)",
                borderRadius: "16px",
                padding: "clamp(28px, 5vw, 48px)",
                textAlign: "center",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              {/* Eyebrow */}
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                  letterSpacing: "3.5px",
                  textTransform: "uppercase",
                  color: "var(--red)",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Flexible Payment Options available
              </div>

              {/* Heading */}
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                  fontWeight: 700,
                  color: "var(--navy)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "12px",
                }}
              >
                Buy Now, <span style={{ color: "var(--red)" }}>Pay Later.</span>
              </h3>

              {/* Subtext */}
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  color: "var(--text-dark)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                Get your tyres fitted today and spread the cost interest-free.
                Split your payment into easy installments with Afterpay or Zip.
              </p>

              {/* We Accept label */}
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--navy)",
                  fontWeight: "bold",
                  marginTop: "clamp(28px, 4vw, 36px)",
                  marginBottom: "clamp(16px, 3vw, 22px)",
                }}
              >
                We Accept
              </div>

              {/* Payment method cards */}
              <div
                className="flex flex-wrap items-stretch justify-center"
                style={{ gap: "clamp(16px, 3vw, 24px)" }}
              >
                {/* Afterpay */}
                <div
                  className="flex flex-col items-center justify-center"
                  style={{
                    background: "#B2FCE4",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "14px",
                    padding: "clamp(24px, 4vw, 34px) clamp(28px, 5vw, 48px)",
                    minWidth: "clamp(200px, 40vw, 260px)",
                    gap: "12px",
                    boxShadow: "0 6px 22px rgba(0,0,0,0.06)",
                  }}
                >
                  <Image
                    src={afterpay_logo}
                    alt="Afterpay"
                    height={48}
                    style={{
                      height: "clamp(34px, 7vw, 48px)",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Zip */}
                <div
                  className="flex flex-col items-center justify-center"
                  style={{
                    background: "#ede6ff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "14px",
                    padding: "clamp(24px, 4vw, 34px) clamp(28px, 5vw, 48px)",
                    minWidth: "clamp(200px, 40vw, 260px)",
                    gap: "12px",
                    boxShadow: "0 6px 22px rgba(0,0,0,0.06)",
                  }}
                >
                  <Image
                    src={zip_logo}
                    alt="Zip Pay"
                    width={150}
                    height={48}
                    style={{
                      height: "clamp(34px, 7vw, 48px)",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>

              {/* Trust note */}
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.68rem, 1.8vw, 0.78rem)",
                  color: "var(--text-dark)",
                  marginTop: "clamp(18px, 3vw, 22px)",
                  opacity: 0.8,
                }}
              >
                No hidden fees · Approval in minutes · 4 easy payments
              </div>
            </div>
          </motion.div>

          {/* Brand Logos Section - 4 UNIQUE ROWS */}
          <div
            id="tyre-brand"
            className="proof-brands relative overflow-hidden"
            style={{
              background: "var(--white, #F5F5F7)",
              padding: "clamp(48px, 8vh, 72px) clamp(20px, 4vw, 40px)",
              borderTop: "1px solid rgba(0,0,0,0.07)",
              maxWidth: "1300px",
              margin: "0 auto",
            }}
          >
            {/* Left Blur Effect */}
            <div
              className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none"
              style={{
                width: "clamp(80px, 15vw, 180px)",
                background:
                  "linear-gradient(90deg, var(--white, #F5F5F7) 0%, rgba(245,245,247,0.9) 40%, transparent 100%)",
              }}
            />

            {/* Right Blur Effect */}
            <div
              className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none"
              style={{
                width: "clamp(80px, 15vw, 180px)",
                background:
                  "linear-gradient(270deg, var(--white, #F5F5F7) 0%, rgba(245,245,247,0.9) 40%, transparent 100%)",
              }}
            />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
              style={{ marginBottom: "clamp(32px, 5vw, 48px)" }}
            >
              <span
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
                Our range
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  color: "var(--navy)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                  lineHeight: 1.1,
                }}
              >
                We Stock{" "}
                <em
                  style={{ fontStyle: "normal", color: "var(--red, #d4000f)" }}
                >
                  most of the major brands
                </em>
              </h2>
            </motion.div>

            {/* Row 1: Tyre Brands Set 1 */}
            <div className="mb-10">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <motion.div
                  className="flex gap-12 md:gap-16"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  style={{ display: "flex", width: "fit-content" }}
                >
                  {[...row1Brands, ...row1Brands].map((brand, index) => (
                    <div
                      key={`row1-${index}`}
                      className="flex shrink-0 items-center justify-center"
                      style={{
                        width: "clamp(120px, 15vw, 150px)",
                        height: "clamp(80px, 12vh, 90px)",
                      }}
                    >
                      <Image
                        src={brand}
                        alt="Tyre Brand"
                        width={105}
                        height={105}
                        className="object-contain hover:opacity-80 transition-all duration-300"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Row 2: Wheel Brands Set 1 - Reverse Direction */}
            <div className="mb-10">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <motion.div
                  className="flex gap-12 md:gap-16"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 35,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  style={{ display: "flex", width: "fit-content" }}
                >
                  {[...row2Brands, ...row2Brands].map((brand, index) => (
                    <div
                      key={`row2-${index}`}
                      className="flex shrink-0 items-center justify-center"
                      style={{
                        width: "clamp(120px, 15vw, 150px)",
                        height: "clamp(80px, 12vh, 90px)",
                      }}
                    >
                      <Image
                        src={brand}
                        alt="Wheel Brand"
                        width={105}
                        height={105}
                        className="object-contain hover:opacity-80 transition-all duration-300"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Row 3: Tyre Brands Set 2 */}
            <div className="mb-10">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <motion.div
                  className="flex gap-12 md:gap-16"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 45,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  style={{ display: "flex", width: "fit-content" }}
                >
                  {[...row3Brands, ...row3Brands].map((brand, index) => (
                    <div
                      key={`row3-${index}`}
                      className="flex shrink-0 items-center justify-center"
                      style={{
                        width: "clamp(120px, 15vw, 150px)",
                        height: "clamp(80px, 12vh, 90px)",
                      }}
                    >
                      <Image
                        src={brand}
                        alt="Tyre Brand"
                        width={105}
                        height={105}
                        className="object-contain hover:opacity-80 transition-all duration-300"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Row 4: Wheel Brands Set 2 - Reverse Direction */}
            <div>
              <div style={{ overflow: "hidden", position: "relative" }}>
                <motion.div
                  className="flex gap-12 md:gap-16"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 38,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  style={{ display: "flex", width: "fit-content" }}
                >
                  {[...row4Brands, ...row4Brands].map((brand, index) => (
                    <div
                      key={`row4-${index}`}
                      className="flex shrink-0 items-center justify-center"
                      style={{
                        width: "clamp(120px, 15vw, 150px)",
                        height: "clamp(80px, 12vh, 90px)",
                      }}
                    >
                      <Image
                        src={brand}
                        alt="Wheel Brand"
                        width={105}
                        height={105}
                        className="object-contain hover:opacity-80 transition-all duration-300"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
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
          
          @media (max-width: 768px) {
            .proof-brands {
              padding: 30px 16px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
