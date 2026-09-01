"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plus } from "lucide-react";
import React from "react";

export default function Amplify() {
  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const items = [
    {
      label: "Your hourly rate",
      value: "80",
      sub: "Average Perth professional",
      em: true,
    },
    {
      label: "Wasted at a slow shop",
      value: "3",
      sub: "Average wait + travel time",
      em: false,
    },
    {
      label: "True cost of one visit",
      value: "240",
      sub: "Before you've paid for the tyres",
      em: true,
    },
    {
      label: "Stress tax",
      value: "∞",
      sub: "Priceless and avoidable",
      em: false,
      special: true,
    },
  ];

  return (
    <>
      <style>{`
        .amplify {
          background: var(--white);
          padding: 96px 60px;
          position: relative;
          overflow: hidden;
        }
        .amplify__inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .amplify__header {
          text-align: center;
          margin-bottom: 64px;
        }
        .amplify__calc {
          background: #F8FAFC;
          border: 1px solid rgba(212,0,15,0.1);
          border-radius: 10px;
          padding: 36px 40px;
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .calc-item {
          flex: 1;
          text-align: center;
          padding: 0 24px;
          border-right: 1px solid rgba(212,0,15,0.08);
        }
        .calc-item:last-child { border-right: none; }
        .calc-label {
          font-size: 0.68rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 10px;
        }
        .calc-value {
          font-size: 2.4rem;
          line-height: 1;
          color: var(--navy);
          letter-spacing: 1px;
        }
        .calc-value em {
          font-style: normal;
          color: var(--red);
        }
        .calc-sub {
          font-size: 0.72rem;
          color: #64748B;
          margin-top: 6px;
          line-height: 1.4;
        }
        .calc-operator {
          font-size: 2rem;
          color: rgba(0,0,0,0.15);
          padding: 0 8px;
          flex-shrink: 0;
        }
        .amplify__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 56px;
        }
        .cost-card {
          background: #F8FAFC;
          border: 1px solid rgba(212,0,15,0.08);
          border-radius: 8px;
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.2s ease;
          cursor: default;
        }
        .cost-card:hover {
          background: #FFFFFF;
          border-color: rgba(212,0,15,0.2);
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .cost-card__tag {
          position: absolute;
          top: 16px; right: 16px;
          font-size: 0.58rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--red);
          background: rgba(212,0,15,0.08);
          border: 1px solid rgba(212,0,15,0.15);
          border-radius: 2px;
          padding: 3px 8px;
          font-family: var(--font-bebas);
        }
        .cost-card__number {
          font-size: 2.8rem;
          line-height: 1;
          color: var(--red);
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .cost-card__title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .cost-card__desc {
          font-size: 0.8rem;
          color: #64748B;
          line-height: 1.6;
          font-weight: 300;
        }
        .amplify__kicker {
          text-align: center;
          padding: 48px 40px;
          background: #F8FAFC;
          border: 1px solid rgba(212,0,15,0.1);
          border-radius: 10px;
        }
        .kicker-pre {
          font-size: 0.72rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 16px;
        }
        .kicker-statement {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          color: var(--navy);
          line-height: 1.1;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          max-width: 780px;
          margin-left: auto;
          margin-right: auto;
        }
        .kicker-statement em {
          font-style: normal;
          color: var(--red);
        }
        .kicker-body {
          font-size: 0.95rem;
          color: #64748B;
          font-weight: 300;
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 28px;
        }
        .kicker-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--red);
          color: var(--white);
          font-size: 0.88rem;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 3px;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .kicker-cta:hover {
          background: #b3000d;
          transform: translateY(-2px);
        }
        @media (max-width: 820px) {
          .amplify { padding: 64px 24px; }
          .amplify__calc { flex-wrap: wrap; padding: 24px 20px; gap: 16px; justify-content: center; }
          .calc-item { border-right: none; padding: 8px 16px; min-width: 120px; flex: auto; }
          .calc-operator { display: none; }
          .amplify__grid { grid-template-columns: 1fr; gap: 16px; }
          .amplify__kicker { padding: 32px 24px; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        className="amplify"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="amplify__inner">
          {/* Header */}
          <div className="amplify__header">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="flex items-center justify-center gap-2.5"
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
                The real cost
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(2.8rem, 4.5vw, 4.2rem)",
                lineHeight: 1,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              Every Bad Tyre Experience
              <br />
              <motion.em
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ fontStyle: "normal", color: "var(--red)" }}
              >
                Costs You More Than You Think
              </motion.em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                color: "black",
                fontWeight: 300,
                maxWidth: 580,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              It&rsquo;s not just the inconvenience. When you factor in lost
              time, repeat visits, and premature tyre wear from poor fitment the
              bill adds up fast.
            </motion.p>
          </div>

          {/* Calculator */}
          <motion.div
            style={{ background: "var(--card-bg,#FFFFFF)" }}
            className="amplify__calc"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {items.map((item, idx) => (
              <React.Fragment key={`item-group-${idx}`}>
                <div className="calc-item h-29 flex flex-col items-center justify-between">
                  <div
                    className="calc-label"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {item.label}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + idx * 0.1,
                      type: "spring",
                    }}
                    className="calc-value"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {item.em ? (
                      <div className="flex items-center">
                        {item.value === "80" ? (
                          <>
                            {" "}
                            <em>$</em>
                            <div style={{ color: "var(--text-dark)" }}>
                              {" "}
                              {item.value}{" "}
                            </div>
                            <em>
                              <Plus size={35} />
                            </em>
                          </>
                        ) : (
                          <div style={{ color: "var(--text-dark)" }}>
                            <em>$</em>
                            {item.value}
                          </div>
                        )}
                      </div>
                    ) : item.special ? (
                      <em>{item.value}</em>
                    ) : item.value === "3" ? (
                      <>
                        <div style={{ color: "var(--text-dark)" }}>
                          {item.value} <em>hrs</em>
                        </div>
                      </>
                    ) : (
                      item.value
                    )}
                  </motion.div>
                  <div
                    className="calc-sub"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
                {idx < items.length - 1 && (
                  <motion.div
                    key={`operator-${idx}`}
                    className="calc-operator"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: 0.3, delay: 0.65 + idx * 0.1 }}
                    style={{
                      fontFamily: "var(--font-bebas)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {idx === 0 ? "×" : idx === 1 ? "=" : idx === 2 ? "+" : ""}
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Cost Cards Grid */}
          <div className="amplify__grid">
            {[
              {
                tag: "Time",
                number: "½ Day",
                title: "Lost every time you visit the wrong shop",
                desc: "That's a meeting missed, a deadline pushed, a client kept waiting. Time you can't get back spent sitting in a waiting room that has no WiFi.",
              },
              {
                tag: "Money",
                number: "$150+",
                title: "In hidden extras added at the counter",
                desc: "Disposal fees, valve replacement, \"mandatory\" balancing charges that weren't in the quote but are suddenly non negotiable when your car's already on the hoist.",
              },
              {
                tag: "Safety",
                number: "2–3×",
                title: "Faster tyre wear from incorrect fitment",
                desc: "Wrong inflation, skipped alignment check, improper torque on wheel nuts. Corners cut in a rush job cost you another set of tyres and potentially your safety.",
              },
              {
                tag: "Frustration",
                number: "2nd Trip",
                title: "Because it wasn't done right the first time",
                desc: "Going back to complain. Taking more time off. Re explaining the problem to someone different. All because a simple job wasn't done properly from the start.",
              },
              {
                tag: "Productivity",
                number: "3+ Days",
                title: "Planning around a shop that won't commit to a time",
                desc: '"Drop it off Monday, might be done by Wednesday." Businesses that don\'t value your schedule force you to build your week around their uncertainty.',
              },
              {
                tag: "Trust",
                number: "Zero",
                title: "Confidence that the job was done properly",
                desc: "No inspection report. No explanation. Just a bill and a key. You drive away hoping it's right because you have no way of knowing if it is.",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.tag}
                className="cost-card"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.7 + idx * 0.08 }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                style={{
                  background: "var(--card-bg,#FFFFFF)",
                  backdropFilter: "blur(0px)",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "24px",
                  padding: "28px 22px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Sleek header with gradient text */}
                <motion.h3
                  initial={{ opacity: 0, y: -5 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }
                  }
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.08 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    color: "var(--black)",
                    marginBottom: "16px",
                    letterSpacing: "-0.02em",
                    paddingBottom: "12px",
                    borderBottom: "2px solid #eef2ff",
                  }}
                >
                  {card.tag}
                </motion.h3>

                {/* Number with cool badge style */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.08 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "3rem",
                    fontWeight: 600,
                    color: "var(--red)",
                    marginBottom: "8px",
                    display: "inline-block",
                    background: "#f8fafc",
                    padding: "4px 12px",
                    borderRadius: "40px",
                    width: "fit-content",
                  }}
                >
                  {card.number}
                </motion.div>

                {/* Title */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + idx * 0.08 }}
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "black",
                    lineHeight: "1.35",
                    marginBottom: "10px",
                  }}
                >
                  {card.title}
                </motion.p>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + idx * 0.08 }}
                  style={{
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-inter), system-ui",
                    color: "black",
                    lineHeight: "1.6",
                    textAlign: "left",
                  }}
                >
                  {card.desc}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Kicker */}
          <motion.div
            className="amplify__kicker"
            style={{
              background: "var(--card-bg,#FFFFFF)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {/* "Here's the truth" - Now a bold, large header outside any box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.02 }}
              className="kicker-header"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "2rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--red)",
                textAlign: "center",
                marginBottom: "24px",
                lineHeight: "1.1",
                textTransform: "uppercase",
              }}
            >
              Here&rsquo;s the truth
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="kicker-statement"
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: "var(--navy)",
                fontWeight: 700,
              }}
            >
              You Shouldn&rsquo;t Have To Choose Between
              <br />
              <motion.em
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.4, delay: 1.15 }}
                style={{ fontStyle: "normal", color: "var(--red)" }}
              >
                Getting It Done Fast
              </motion.em>{" "}
              And{" "}
              <motion.em
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.4, delay: 1.2 }}
                style={{ fontStyle: "normal", color: "var(--red)" }}
              >
                Getting It Done Right.
              </motion.em>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.25 }}
              className="kicker-body"
              style={{ fontFamily: "var(--font-inter)", color: "black" }}
            >
              Perth professionals deserve a tyre shop that runs like they do on
              time, upfront, and done properly the first time. That&rsquo;s
              exactly what Kewdale Tyrepower was built for.
            </motion.p>
            <motion.div
              onClick={()=>{smoothScrollTo('how-to-works')}}
              className="kicker-cta"
              whileHover={{ background: "#b3000d", y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Show me how it works
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
