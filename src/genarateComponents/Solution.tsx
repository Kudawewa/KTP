"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "@/modal/BookingModal";
import clock_icon from "../../public/clock.png";
import dollar_icon from "../../public/dollars.png";
import check_icon from "../../public/checked.png";

import call_booking from "../../public/call_booking.svg";
import upfront_quote from "../../public/upfront_quote.svg";
import team_working from "../../public/team_working.png";
import come_back from "../../public/come_back.png";

import Image from "next/image";
import { renderFinePrint } from "@/utils/finePrint";

type solutionPillarItems = {
  num: string;
  title: string;
  desc: string;
};

type SolutionRoadMapItems = {
  num: string;
  title: string;
  desc: string;
  icon: string;
  gradient: string;
  label: string;
};

type solutionHeader = {
  main: string;
  highlight: string;
  second: string;
};

type SolutionPillarItemsProps = solutionPillarItems[];
type SolutionRoadMapItemsProps = SolutionRoadMapItems[];

type solutionProps = {
  sectionColor: string;
  borderColor: string;
  backgroundColor: string;
  solutionEyebrow: string;
  solutionHeader: solutionHeader;
  solutionPhara1: string;
  solutionPhara2: string;
  solutionPhara3: string;
  solutionPromiseLbl: string;
  solutionPromiseDecs: string;
  solutionPillarItems: SolutionPillarItemsProps;
  solutionRoadMapItems: SolutionRoadMapItemsProps;
};

export default function Solution({
  sectionColor,
  borderColor,
  backgroundColor,
  solutionEyebrow,
  solutionHeader,
  solutionPhara1,
  solutionPhara2,
  solutionPhara3,
  solutionPromiseLbl,
  solutionPromiseDecs,
  solutionPillarItems,
  solutionRoadMapItems,
}: solutionProps) {
  const steps = solutionRoadMapItems;
  const [modalOpen, setModalOpen] = useState(false);
  const solutionImages = [
  call_booking,
  upfront_quote,
  team_working,
  come_back
];
  return (
    <>
      <section
        id="solution"
        style={{
          background: "#F5F5F7",
          padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)",
          fontFamily: "var(--font-inter)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Modern background accents */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: "min(300px, 50vw)",
            height: "min(300px, 50vw)",
            background:
              "radial-gradient(circle, rgba(212,0,15,0.03) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: "min(250px, 40vw)",
            height: "min(250px, 40vw)",
            background:
              "radial-gradient(circle, rgba(212,0,15,0.02) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header Section */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(40px, 8vw, 64px)",
            }}
          >
            <div
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
              {solutionEyebrow}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(1.75rem, 7vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--navy)",
                letterSpacing: "-0.01em",
                marginBottom: "16px",
                lineHeight: 1.2,
                padding: "0 clamp(8px, 3vw, 0)",
              }}
            >
              {solutionHeader.main}
              <br />
              <span
                style={{
                  color: "var(--red)",
                  display: "inline-block",
                }}
              />
              <em style={{ fontStyle: "normal", color: sectionColor }}>
                {solutionHeader.highlight}
              </em>
              <br />
              {solutionHeader.second}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.85rem, 3.5vw, 1.1rem)",
                color: "black",
                maxWidth: 550,
                margin: "0 auto",
                padding: "0 clamp(12px, 4vw, 0)",
              }}
            >
              {solutionPhara1}
            </p>
          </div>

          {/* Three Column Layout - FULLY RESPONSIVE */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
              gap: "clamp(20px, 4vw, 32px)",
            }}
          >
            {/* LEFT SIDE - Two Cards Stacked */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 4vw, 28px)",
              }}
            >
              {/* Card 1 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(20px, 4vw, 24px)",
                  padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 48px -12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "rgba(212,0,15,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 10vw, 52px)",
                    height: "clamp(44px, 10vw, 52px)",
                    background: borderColor,
                    borderRadius: "clamp(14px, 3vw, 18px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "clamp(16px, 4vw, 24px)",
                    boxShadow: "0 8px 16px -8px rgba(212,0,15,0.3)",
                  }}
                >
                  <svg
                    width="clamp(20px, 5vw, 24px)"
                    height="clamp(20px, 5vw, 24px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1rem, 4vw, 1.25rem)",
                    fontWeight: 600,
                    color: "var(--black)",
                    marginBottom: "clamp(8px, 2vw, 12px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {solutionPillarItems[0].title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
                    color: "var(--black)",
                    lineHeight: "1.6",
                  }}
                >
                  {renderFinePrint(solutionPillarItems[0].desc)}
                </p>
              </div>

              {/* Card 2 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(20px, 4vw, 24px)",
                  padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 48px -12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "rgba(212,0,15,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 10vw, 52px)",
                    height: "clamp(44px, 10vw, 52px)",
                    background: borderColor,
                    borderRadius: "clamp(14px, 3vw, 18px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "clamp(16px, 4vw, 24px)",
                    boxShadow: "0 8px 16px -8px rgba(212,0,15,0.3)",
                  }}
                >
                  <svg
                    width="clamp(20px, 5vw, 24px)"
                    height="clamp(20px, 5vw, 24px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1rem, 4vw, 1.25rem)",
                    fontWeight: 600,
                    color: "var(--black)",
                    marginBottom: "clamp(8px, 2vw, 12px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {solutionPillarItems[1].title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
                    color: "var(--black)",
                    lineHeight: "1.6",
                  }}
                >
                  {renderFinePrint(solutionPillarItems[1].desc)}
                </p>
              </div>
            </div>

            {/* MIDDLE - Content Section */}
            <div>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(20px, 4vw, 24px)",
                  padding: "clamp(20px, 5vw, 32px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
                    fontFamily: "var(--font-inter)",
                    color: "var(--black)",
                    textAlign: "left",
                    lineHeight: "1.7",
                    marginBottom: "clamp(16px, 3vw, 20px)",
                  }}
                >
                  {solutionPhara1}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
                    fontFamily: "var(--font-inter)",
                    color: "var(--black)",
                    textAlign: "left",
                    lineHeight: "1.7",
                    marginBottom: "clamp(16px, 3vw, 20px)",
                  }}
                >
                  {solutionPhara2}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
                    fontFamily: "var(--font-inter)",
                    color: "var(--black)",
                    textAlign: "left",
                    lineHeight: "1.7",
                    marginBottom: "clamp(16px, 3vw, 20px)",
                  }}
                >
                  {solutionPhara3}
                </p>

                {/* Core Promise Card */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, var(--navy) 0%, #0a1628 100%)",
                    color: "var(--white)",
                    borderRadius: "clamp(16px, 4vw, 20px)",
                    marginTop: "auto",
                    padding: "clamp(20px, 5vw, 28px)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 12px 24px -12px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(0.6rem, 2.5vw, 0.65rem)",
                      letterSpacing: "4px",
                      color: sectionColor,
                      fontWeight: "bold",
                      marginBottom: "clamp(8px, 2vw, 12px)",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    {solutionPromiseLbl}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.85rem, 3.5vw, 0.95rem)",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: "1.6",
                      textAlign: "center",
                    }}
                  >
                    {solutionPromiseDecs}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Two Cards Stacked */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 4vw, 28px)",
              }}
            >
              {/* Card 3 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(20px, 4vw, 24px)",
                  padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 48px -12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "rgba(212,0,15,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 10vw, 52px)",
                    height: "clamp(44px, 10vw, 52px)",
                    background: borderColor,
                    borderRadius: "clamp(14px, 3vw, 18px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "clamp(16px, 4vw, 24px)",
                    boxShadow: "0 8px 16px -8px rgba(212,0,15,0.3)",
                  }}
                >
                  <svg
                    width="clamp(20px, 5vw, 24px)"
                    height="clamp(20px, 5vw, 24px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1rem, 4vw, 1.25rem)",
                    fontWeight: 600,
                    color: "var(--black)",
                    marginBottom: "clamp(8px, 2vw, 12px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {solutionPillarItems[2].title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
                    color: "var(--black)",
                    lineHeight: "1.6",
                  }}
                >
                  {renderFinePrint(solutionPillarItems[2].desc)}
                </p>
              </div>

              {/* Card 4 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(20px, 4vw, 24px)",
                  padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 48px -12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "rgba(212,0,15,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 10vw, 52px)",
                    height: "clamp(44px, 10vw, 52px)",
                    background: borderColor,
                    borderRadius: "clamp(14px, 3vw, 18px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "clamp(16px, 4vw, 24px)",
                    boxShadow: "0 8px 16px -8px rgba(212,0,15,0.3)",
                  }}
                >
                  <svg
                    width="clamp(20px, 5vw, 24px)"
                    height="clamp(20px, 5vw, 24px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1rem, 4vw, 1.25rem)",
                    fontWeight: 600,
                    color: "var(--black)",
                    marginBottom: "clamp(8px, 2vw, 12px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {solutionPillarItems[3].title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
                    color: "var(--black)",
                    lineHeight: "1.6",
                  }}
                >
                  {renderFinePrint(solutionPillarItems[3].desc)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution road map section */}
      <section
        id="how-work-it"
        className="relative overflow-hidden flex flex-col justify-center items-center"
        style={{
          background: "#F5F5F7",
          padding: "80px 24px 80px 24px",
        }}
      >
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-50/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-gold-50/10 rounded-full blur-3xl" />
        </div>

        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          style={{ maxWidth: 1200 }}
        >
          <div
            className="relative"
            style={{
              background: "#FFFFFF",
              borderRadius: "32px",
              padding: "clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
              width: "100%",
            }}
          >
            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-10 lg:mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center gap-2 mb-5 mx-auto"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(4px)",
                    width: "fit-content",
                    padding: "15px 16px",
                  }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
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
                    How it works
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    color: "var(--navy)",
                    lineHeight: 1.2,
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Back On The Road In
                  <span className="block mt-2" style={{ color: sectionColor }}>
                    4 Simple Steps
                  </span>
                </motion.h2>

                <div
                  className={`w-20 h-1 bg-linear-to-r from-[${sectionColor}] to-[${sectionColor}] mx-auto mt-6 rounded-full`}
                />
              </div>

              {/* ROADMAP CONTAINER - Center Spine Layout */}
              <div
                className="relative"
                style={{ maxWidth: 1000, margin: "0 auto", marginTop: "24px" }}
              >
                {/* Center Spine Line - Hidden on mobile */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 hidden md:block"
                  style={{
                    width: "2px",
                    background: `repeating-linear-gradient(to bottom, ${sectionColor} 0px, ${sectionColor} 8px, transparent 8px, transparent 18px)`,
                    zIndex: 1,
                  }}
                />

                {/* Steps */}
                <div className="flex flex-col gap-10 md:gap-16">
                  {steps.map((step, idx) => {
                    const isEven = idx % 2 === 0; // Even = left, Odd = right

                    return (
                      <motion.div
                        key={step.num}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Center Dot (visible on desktop) */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: idx * 0.1 + 0.2,
                            }}
                            viewport={{ once: true }}
                            style={{
                              position: "relative",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              background: "#fff",
                              border: `3px solid ${sectionColor}`,
                              boxShadow: `0 0 0 4px ${sectionColor}26`,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: sectionColor,
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Step Marker - Mile Marker Style */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 md:top-1/2 md:-translate-y-1/2 hidden md:flex items-center justify-center z-20">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: idx * 0.1 + 0.3,
                              type: "spring",
                            }}
                            viewport={{ once: true }}
                            style={{
                              position: "relative",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              background: sectionColor,
                              border: "3px solid #fff",
                              boxShadow: `0 0 0 2px ${sectionColor}40, 0 2px 8px ${sectionColor}4d`,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "#fff",
                              }}
                            />

                            {/* Pulsing ring */}
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: sectionColor,
                                opacity: 0.35,
                                animation:
                                  "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Horizontal Connector Line (desktop only) */}
                        <div
                          className={`absolute top-1/2 h-px hidden md:block z-10 ${
                            isEven ? "right-1/2" : "left-1/2"
                          }`}
                          style={{
                            width: "7%",
                            background: `repeating-linear-gradient(to right, ${borderColor} 0px, ${borderColor} 6px, transparent 6px, transparent 12px)`,
                            transform: "translateY(-50%)",
                            ...(isEven
                              ? { right: "calc(50% + 10px)" }
                              : { left: "calc(50% + 10px)" }),
                          }}
                        />

                        {/* Content Side - Text */}
                        <div
                          style={{
                            padding: "10px",
                          }}
                          className={`w-full md:w-1/2 ${
                            isEven
                              ? "md:pr-12 md:text-right order-2 md:order-1"
                              : "md:pl-12 md:text-left order-2 md:order-2"
                          }`}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: idx * 0.1 + 0.1,
                            }}
                            viewport={{ once: true }}
                          >
                            {/* Step Label */}
                            <div
                              className="text-xs font-bold uppercase mb-2 text-center md:text-left"
                              style={{
                                color: sectionColor,
                                fontFamily: "var(--font-bebas)",
                              }}
                            >
                              {step.label}
                            </div>

                            {/* Title - Hidden on mobile (shown in icon card) */}
                            <h3
                              className="text-xl lg:text-2xl font-bold mb-3 hidden md:block"
                              style={{
                                fontFamily: "var(--font-bebas)",
                                color: sectionColor,
                                lineHeight: 1.3,
                                textAlign: "center",
                                marginTop: "10px",
                              }}
                            >
                              {step.title}
                            </h3>

                            {/* Description */}
                            <p
                              className="text-sm leading-relaxed text-center md:text-center"
                              style={{
                                fontFamily: "var(--font-bebas)",
                                color: "var(--text-dark)",
                                lineHeight: 1.6,
                                padding: "0 0 0 0",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              {renderFinePrint(step.desc)}
                            </p>

                            {/* Progress Bar */}
                            <div className="pt-3 border-t border-white/10">
                              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "100%" }}
                                  transition={{
                                    duration: 0.8,
                                    delay: idx * 0.15,
                                  }}
                                  viewport={{ once: true }}
                                  className="h-full rounded-full"
                                  style={{ background: sectionColor }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Icon/Card Side */}
                        <div
                          className={`w-full md:w-[40%] flex justify-center order-1 md:order-2 ${
                            isEven ? "md:order-2" : "md:order-1"
                          }`}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: idx * 0.1 + 0.2,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group relative w-full max-w-70 md:max-w-none"
                          >
                            <div className="relative rounded-xl transition-all duration-300">
                              {/* Step Number Badge */}
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{
                                  duration: 0.5,
                                  delay: idx * 0.1 + 0.3,
                                }}
                                viewport={{ once: true }}
                                className={`absolute -top-3 ${
                                  isEven
                                    ? "-left-3 md:-left-3"
                                    : "-right-3 md:-right-3"
                                } w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg bg-black`}
                                style={{
                                  fontFamily: "var(--font-bebas)",
                                  fontSize: "1.1rem",
                                  zIndex: 20,
                                  background: sectionColor,
                                }}
                              >
                                {step.num}
                              </motion.div>

                              {/* Icon */}
                              <div className="flex flex-col items-center gap-3 md:gap-4">
                                <Image
                                  src={solutionImages[idx]}
                                  alt="icon"
                                  width={250}
                                  height={250}
                                />

                                {/* Mobile-only title */}
                                <h3
                                  className="text-base md:text-lg font-bold text-center md:hidden"
                                  style={{
                                    fontFamily: "var(--font-bebas)",
                                    color: "var(--black)",
                                  }}
                                >
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM DIV - CTA Section & Trust Badges */}
              <div
                style={{
                  marginTop: "40px",
                }}
                className="mt-10 lg:mt-16 text-center relative z-10"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalOpen(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-semibold overflow-hidden w-full sm:w-auto"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "0.85rem",
                      background: `linear-gradient(135deg, ${sectionColor}, ${borderColor})`,
                      color: "white",
                      cursor: "pointer",
                      boxShadow: `0 8px 20px -6px ${sectionColor}`,
                      padding: "12px 24px",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                      Book My Appointment
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </motion.a>
                </div>

                {/* Trust Badges */}
                <div
                  style={{
                    marginTop: "28px",
                  }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6"
                >
                  {[
                    { text: "No hidden fees", icon: check_icon },
                    { text: "90 min average", icon: clock_icon },
                    { text: "Upfront pricing", icon: dollar_icon },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(4px)",
                        border: "1px solid rgba(0,0,0,0.2)",
                        padding: "6px 12px sm:8px 16px",
                      }}
                    >
                      <span
                        style={{
                          paddingLeft: "10px",
                        }}
                        className="text-amber-400 text-sm font-bold"
                      >
                        <Image
                          src={badge.icon}
                          alt="icon"
                          width={14}
                          height={14}
                          className="object-contain md:w-4.5 md:h-4.5"
                          style={{ filter: "brightness(0) saturate(100%)" }}
                        />
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{
                          fontFamily: "var(--font-bebas)",
                          color: "var(--text-dark)",
                          padding: "10px 4px",
                        }}
                      >
                        {badge.text === "90 min average" ? (
                          <>
                            90 min average{" "}
                            <span
                              style={{
                                fontSize: "clamp(0.4rem, 1.2vw, 0.75rem)",
                                fontWeight: "bold",
                              }}
                            >
                              (Subject to availability)
                            </span>
                          </>
                        ) : (
                          badge.text
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          color={sectionColor}
        />

        {/* Add keyframe animation for pulse */}
        <style jsx global>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
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
    </>
  );
}
