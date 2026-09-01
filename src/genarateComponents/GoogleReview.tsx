"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import google_icon from "../../public/google.png";
import { renderFinePrint } from "@/utils/finePrint";

type ProofData = {
  icon: string;
  number: string;
  unit: string;
  line1: string;
  line2: string;
};

type proofDataProps = ProofData[];

type proofPops = {
  sectionColor: string;
  backgroundColor: string;
  proofLable: string;
  proofData: proofDataProps;
};

export default function GoogleReview({
  sectionColor,
  proofLable,
  proofData,
}: proofPops) {
  return (
    <section>
      <div
        id="googleReview"
        style={{
          background: "var(--navy)",
          textAlign: "center",
          padding: "9px 24px",
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
          {proofLable}
        </span>
      </div>
      {/* Google Reviews & Stats Section */}
      <div
        className="w-full mt-8 mb-10 px-4 sm:px-6 md:px-8"
        style={{ background: "var(--white, #F5F5F7)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="overflow-hidden w-full"
          style={{
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Google Reviews Sub Wrapper*/}
          <div
            className="flex flex-col min-h-40 lg:flex-row lg:items-stretch w-full"
            style={{
              maxWidth: "1500px",
              margin: "0 auto",
              background: "#FFFFFF",
            }}
          >
            {/* Google Reviews Section */}
            <div
              className="flex items-center justify-center gap-3 sm:gap-4 border-b lg:border-b-0 lg:border-r border-black/10"
              style={{
                padding: "clamp(14px, 3vw, 28px) clamp(16px, 4vw, 32px)",
                background: "var(--white, #F5F5F7)",
              }}
            >
              <div
                className="flex items-center gap-1.5 sm:gap-2 font-semibold"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)",
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
              <div className="h-6 sm:h-8 w-px bg-black/10 hidden sm:block" />
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 flex-wrap">
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
                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        fill="#FBBC05"
                        style={{
                          width: "clamp(10px, 2vw, 16px)",
                          height: "clamp(10px, 2vw, 16px)",
                        }}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span
                  className="tracking-wide font-medium whitespace-nowrap sm:whitespace-normal"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 divide-y divide-black/10 lg:divide-y-0 lg:divide-x">
              {proofData.map((stat, i) => (
                <div
                  key={i}
                  className={`
                      flex items-center gap-2 sm:gap-3 md:gap-4
                      transition-all duration-200
                      border-b border-black/10
                      ${(i + 1) % 2 !== 0 && i !== proofData.length - 1 ? "border-r border-black/10" : ""}
                      lg:border-b-0
                      ${i < 3 && i !== 3 ? "lg:border-r lg:border-black/10" : "lg:border-r-0"}
                    `}
                  style={{
                    padding: "clamp(16px, 3vw, 28px) clamp(16px, 2.5vw, 24px)",
                    background: "var(--white, #F5F5F7)",
                  }}
                >
                  <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                    <div
                      className="leading-none flex flex-wrap items-baseline gap-0.5 sm:gap-1 font-bold"
                      style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "clamp(1.1rem, 2.8vw, 2rem)",
                        color: "var(--navy)",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      <span
                        className="whitespace-nowrap"
                        style={{
                          fontSize: "clamp(1.3rem, 4vw, 2rem)",
                        }}
                      >
                        {stat.number}
                      </span>
                      <span
                        style={{
                          color: sectionColor,
                          textTransform: "uppercase",
                        }}
                      >
                        {stat.unit}
                      </span>
                    </div>
                    <div
                      className="leading-tight font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                        color: "var(--text-dark)",
                      }}
                    >
                      {renderFinePrint(stat.line1)}
                      {stat.line2 && (
                        <>
                          <br className="hidden sm:block" />
                          <span className="whitespace-normal sm:whitespace-nowrap">
                            {" "}
                            {stat.line2}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
