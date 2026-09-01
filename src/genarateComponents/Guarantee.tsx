"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import tyre_track from "../../public/tyre_track.svg";
import { renderFinePrint } from "@/utils/finePrint";

type HeadeLine = {
  highlightColor: string;
  highlight: string;
  mainSubOne: string;
  mainSubTwo: string;
};

type GuranteePoint = {
  icon: string;
  title: string;
  description: string;
};

type guranteePointProps = GuranteePoint[];

type GuaranteeProps = {
  sectionColor: string;
  backgroundColor: string;
  borderColor: string;
  guranteeEyebrow: string;
  guranteeheader: HeadeLine;
  guranteePhara: string;
  guranteeSealIcon: string;
  guranteeSealTitle: string;
  guranteeSealSubTitle: string;
  guranteeSealCaption: string;
  guranteePoint: guranteePointProps;
  guranteeSigQuote: string;
};

export default function Guarantee({
  sectionColor,
  borderColor,
  guranteeEyebrow,
  guranteeheader,
  guranteePhara,
  guranteeSealTitle,
  guranteeSealSubTitle,
  guranteeSealCaption,
  guranteePoint,
  guranteeSigQuote,
}: GuaranteeProps) {
  const points = guranteePoint;

  // Derive a subtle tint from sectionColor for borders/shadows
  const colorAlpha = (opacity: string) => `${sectionColor}${opacity}`;

  return (
    <>
      {/* Keyframes must be defined before elements that use them */}
      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(0.95); opacity: 0.7; }
          70%  { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
      `}</style>

      <div
        id="guarantee"
        style={{
          background: "linear-gradient(180deg, #F8F9FC 0%, #FFFFFF 100%)",
          padding: "clamp(48px, 10vw, 96px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background orbs */}
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

        {/* Headline */}
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
              color: sectionColor,
              fontWeight: "bold",
              marginBottom: "16px",
              fontFamily: "var(--font-bebas)",
            }}
          >
            {guranteeEyebrow}
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
            {guranteeheader.mainSubOne}
            <em
              style={{
                fontStyle: "normal",
                color: guranteeheader.highlightColor || sectionColor,
                display: "block",
              }}
            >
              {guranteeheader.highlight}
            </em>
            {guranteeheader.mainSubTwo}
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
              {guranteePhara}
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
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
              {/* Badge */}
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
                  {/* Pulse ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "-12px",
                      borderRadius: "50%",
                      border: `10px solid ${colorAlpha("16")}`,
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
                      border: `10px solid ${sectionColor}`,
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
                      stroke={sectionColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: "clamp(36px, 8vw, 48px)",
                        height: "clamp(36px, 8vw, 48px)",
                        marginBottom: "1px",
                      }}
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline
                        points="9 12 11 14 15 10"
                        stroke={sectionColor}
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
                        marginLeft: "5px",
                      }}
                    >
                      {guranteeSealTitle.split(",")[0]} <br />
                      {guranteeSealTitle.split(",")[1]}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-bebas), system-ui",
                        fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
                        letterSpacing: "clamp(2px, 1vw, 3px)",
                        color: sectionColor,
                        marginTop: "10px",
                        padding: "0 16px",
                        marginLeft: "7px",
                      }}
                    >
                      {guranteeSealSubTitle}
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
                  {renderFinePrint(guranteeSealCaption)}
                </p>
              </motion.div>

              {/* Guarantee Cards */}
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
                        cursor: "default",
                        minHeight: "clamp(150px, 22vh, 170px)",
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          flexShrink: 0,
                          alignSelf: "center",
                          width: "clamp(48px, 7vw, 56px)",
                          height: "clamp(48px, 7vw, 56px)",
                          borderRadius: "16px",
                          background: sectionColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 8px 16px ${colorAlpha("33")}`,
                        }}
                      >
                        {point.icon &&
                        (point.icon.startsWith("/") ||
                          point.icon.startsWith("http")) ? (
                          <Image
                            src={point.icon}
                            alt={point.title}
                            width={24}
                            height={24}
                            style={{
                              objectFit: "contain",
                              filter: "brightness(0) invert(1)",
                              width: "clamp(22px, 4vw, 26px)",
                              height: "clamp(22px, 4vw, 26px)",
                            }}
                          />
                        ) : null}
                      </div>

                      {/* Text */}
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
                            color: "black",
                            lineHeight: 1.55,
                            fontWeight: 400,
                          }}
                        >
                          {renderFinePrint(point.description)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Signature */}
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
                borderTop: `2px solid ${colorAlpha("1a")}`,
              }}
            >
              {/* Avatar + name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(12px, 3vw, 16px)",
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
                    color: sectionColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: `2px solid ${sectionColor}`,
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
                      color: "black",
                    }}
                  >
                    Tyrepower WA’s Dealer of the Year 2025
                  </p>
                </div>
              </div>

              {/* Sig quote */}
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
                    color: sectionColor,
                    lineHeight: 1,
                    marginBottom: "1px",
                  }}
                >
                  <p style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
                    &ldquo;
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui",
                    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "black",
                    fontStyle: "italic",
                  }}
                >
                  {guranteeSigQuote}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
